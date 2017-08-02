/**
 * Parses a math string to an AST.
 *
 * Notes:
 * - The output AST tries to conform to the math-ast spec, but some aspects may
 *   be a little off.  This will be fixed in future versions.
 * - The input syntax covers the parts of the mathjs syntax being used by
 *   mathsteps
 *
 * TODO:
 * - Better adherence to and more comprehensive coverage of the math-ast spec.
 * - Specify what the syntax is, e.g. operator precedence, implicit multiplication,
 *   etc.
 */
import {build, query} from 'math-nodes'
import {traverse} from 'math-traverse'

function isIdentifierToken(token) {
    return token && /[a-zA-Z][a-zA-Z0-9]*/.test(token.value)
}

function isNumberToken(token) {
    return token && /\d*\.\d+|\d+\.\d*|\d+/.test(token.value)
}

const tokenPattern =
    /\.\.\.|[a-zA-Z][a-zA-Z0-9]*|<=|>=|!=|[\<\>\!\=\(\)\+\-\/\*\^\<\>|\,\#\_]|\d*\.\d+|\d+\.\d*|\d+/

const relationTokenMap = {
    '=': 'eq',
    '<': 'lt',
    '<=': 'le',
    '>': 'gt',
    '>=': 'ge',
    '!=': 'ne',
}

// The difference between isIdentifierToken and isIdentifier is that
// isIdentifierToken takes in a token while isIdentifier takes in a node
function isIdentifier(node) {
    return node.type === 'Identifier'
}

function isRelation(node) {
    return node.type === 'Apply' && Object.values(relationTokenMap).includes(node.op)
}

function isExpression(node) {
    return ['System', 'List', 'Sequence'].indexOf(node.type) === -1 ||
           isRelation(node)
}

function matches(token, value) {
    return token && token.value === value
}

class Parser {
    // Takes in an expectedValue and checks to see if it matches the
    // currentToken. It then increments the i variable and returns the
    // currentToken before the increment.
    consume(expectedValue) {
        const token = this.currentToken()
        if (expectedValue !== undefined) {
            if (!matches(token, expectedValue)) {
                throw new Error(
                    `expected '${expectedValue}' received '${token.value}'`)
            }
        }
        this.i++
        return token
    }

    // Returns the current token based on the variable i
    currentToken() {
        return this.tokens[this.i]
    }

    // Takes in a string and returns a parsed version of it
    parse(input) {
        this.i = 0
        this.tokens = []
        this.integrals = 0

        const regex = new RegExp(tokenPattern, 'g')

        let index = 0
        let match

        // Matches all the tokens
        while ((match = regex.exec(input)) != null) {
            const start = match.index
            const end = regex.lastIndex

            this.tokens.push({
                value: match[0],
                start: start,
                end: end,
            })

            // If anything was skipped before the next match that isn't
            // whitespace, return an error
            if (index !== start) {
                const skipped = input.slice(index, start).trim()
                if (skipped !== '') {
                    throw new Error(`'${skipped}' not recognized`)
                }
            }

            index = end
        }

        // If the last match is not the end of the input return an error
        if (index !== input.length) {
            const skipped = input.slice(index, input.length).trim()
            if (skipped !== '') {
                throw new Error(`'${skipped}' not recognized`)
            }
        }

        // Parse the tokens
        const result = this.list()

        // If it does not parse all the tokens return an error
        if (this.i < this.tokens.length) {
            throw new Error('extra input not recognized')
        }

        return result
    }

    // Continues calling relationsOrRelationOrExpression until there is no comma
    // after and then classifies the output as a 'System', 'Sequence', 'List',
    // or just returns it.
    list() {
        const items = [this.relationsOrRelationOrExpression()]

        while (true) {
            const token = this.currentToken()

            if (matches(token, ',')) {
                this.consume(',')
                items.push(this.relationsOrRelationOrExpression())
            } else {
                break
            }
        }

        if (items.length > 1) {
            if (items.every((item) => isRelation(item))) {
                return {
                    type: 'System', // of equations
                    relations: items,
                }
            } else if (items.every(isExpression)) {
                return {
                    type: 'Sequence',
                    items,
                }
            } else {
                return {
                    type: 'List',
                    items,
                }
            }
        } else {
            return items[0]
        }
    }

    // Continues calling 'expression' until there is no relation (=, >=, etc.)
    // after it and then returns the equation/s or expression.
    // This means 'expression' is called on every left and right side of
    // a relation (if there is no relation 'expression' is called once).
    relationsOrRelationOrExpression() {
        const relations = []
        const args = []

        let left
        let right

        left = this.expression()

        while (true) {
            const token = this.currentToken()

            if (token && token.value in relationTokenMap) {
                this.consume()
                right = this.expression()
                const rel = relationTokenMap[token.value]
                relations.push(build.applyNode(rel, [left, right]))
                args.push(left)
                left = right
            } else {
                break
            }
        }
        args.push(right)

        if (relations.length > 1) {
            return {
                type: 'Apply',
                op: relations[0].op,
                args: args
            }
        } else if (relations.length > 0) {
            return relations[0]
        } else {
            return left
        }
    }

    // Continues calling 'explicitMul' until there is no '+' or '-' found and then
    // returns the parsed expression.
    // This means 'explicitMul' is called on every term in the expression (if
    // there is only one term 'explicitMul' is called once).
    expression() {
        const args = []

        args.push(this.explicitMul())

        while (true) {
            const token = this.currentToken()

            if (matches(token, '-')) {
                this.consume('-')
                args.push(
                    build.applyNode('neg', [this.explicitMul()], {wasMinus: true})
                )
            } else if (matches(token, '+')) {
                this.consume('+')
                args.push(this.explicitMul())
            } else {
                break
            }
        }

        if (args.length > 1) {
            return build.applyNode('add', args.map(term =>
                term.addParens ? build.parensNode(term) : term))
        } else {
            if (args[0].addParens) {
                return build.parensNode(args[0])
            } else {
                return args[0]
            }
        }
    }

    // Continues calling 'implicitMul' until there is no '*' after it and then
    // returns all the factors multiplied or just one factor.
    // This means 'implicitMul' is called on every factor or groups of factors
    // separated by explicit multiplication (if there is no explicit
    // multiplication 'implicitMul' is called once).
    explicitMul() {
        const factors = []

        factors.push(this.implicitMul())

        while (true) {
            if (matches(this.currentToken(), '*')) {
                this.consume('*')
                factors.push(this.implicitMul())
            } else {
                break
            }
        }

        return factors.length > 1
            ? build.applyNode('mul', factors)
            : factors[0]
    }

    /**
     * Parse the following forms of implicit multiplication:
     * - a b c
     * - (a)(b)(c)
     *
     * Note: (a)b(c) is actually: 'a' times function 'b' evaluated at 'c'
     *
     * If the multiplication was detected, a single parsed factor is returned.
     */
     // Continues calling 'division' until there is no '(', placeholder,
     // identifier, or number and then returns everything implicitly multiplied
     // or just as it is.
     // This means 'division' is called on every group separated by (but
     // included in the 'division' call) '(', placeholder, identifier,
     // or number (if there is only one such group 'division' is called once).
    implicitMul() {
        let factors = []

        factors.push(this.division())

        while (true) {
            let token = this.currentToken()

            if (matches(token, '(') || matches(token, '#') || isIdentifierToken(token) || isNumberToken(token)) {
                const factor = this.division()
                if (factor) {
                    factors.push(factor)
                } else {
                    break
                }
            } else {
                break
            }

            if (this.i > this.tokens.length) {
                break
            }
        }

        return factors.length > 1
            ? build.applyNode('mul', factors, {implicit: true})
            : factors[0]
    }

    // Continues calling 'factor' until there is no '/' and then returns a
    // fraction or just a factor.
    // This means factor is called on everything except for what is consumed
    // after it returns.
    division() {
        let numerator
        let denominator
        let frac

        numerator = this.factor()

        while (true) {
            const token = this.currentToken()

            if (matches(token, '/')) {
                this.consume('/')
                denominator = this.factor()
                if (frac) {
                    frac = build.applyNode('div', [frac, denominator])
                } else {
                    frac = build.applyNode('div', [numerator, denominator])
                }
            } else {
                break
            }
        }

        return frac || numerator
    }

    /**
     * Parse any of the following:
     * - unary operations, e.g. +, -
     * - numbers
     * - identifiers
     * - parenthesis (parses everything inside the parenthesis as well)
     * - absolute value function, e.g. |x|
     * - exponents, e.g. x^2
     */
    factor() {
        let token = this.currentToken()

        if (matches(token, '...')) {
            this.consume('...')
            return {
                type: 'Ellipsis',
            }
        }

        let signs = []

        // handle multiple unary operators
        while (matches(token, '+') || matches(token, '-')) {
            signs.push(token)
            this.consume(token.value)
            token = this.currentToken()
        }

        let base, exp
        let addParens = false

        if (matches(token, '#') || isIdentifierToken(token)) {
            // The current token is increased by this call
            const node = this.identifierOrPlaceholder()

            if (this.integrals > 0 && isIdentifier(node) && /d[a-z]+/.test(node.name)) {
                // backup
                this.integrals--
                return
            }

            if (matches(this.currentToken(), '(')) {
                this.consume('(')
                const args = this.argumentList()
                token = this.consume(')')
                if (node.name === 'nthRoot') {
                    if (args.length < 1 || args.length > 2) {
                        throw new Error('nthRoot takes 1 or 2 args')
                    } else {
                        base = build.nthRoot(...args)
                    }
                } else if (node.name === 'int') {
                    if (args.length >= 2 && args.length <= 4) {
                        base = build.apply('int', args)
                    } else {
                        throw new Error('integral takes between 2 and 4 args')
                    }
                } else {
                    base = build.apply(node, args)
                }
            } else {
                // TODO(kevinb) valid the constraint type against the node
                // e.g. if it's a 'Number' then it can't have a subscript
                base = node
            }
        } else if (isNumberToken(token)) {
            this.consume(token.value)
            base = build.numberNode(token.value)
        } else if (matches(token, '(')) {
            this.consume('(')
            base = this.expression()
            token = this.consume(')')
            addParens = true
            if (base.type === 'Number' || isIdentifier(base)) {
                base = build.parensNode(base)
                addParens = false
            }
        } else if (matches(token, '|')) {
            this.consume('|')
            base = this.expression()
            token = this.consume('|')

            base = build.applyNode('abs', [base])
        }

        if (matches(this.currentToken(), '!')) {
            this.consume('!')
            // print will add parentheses back in if a 'fact' node wraps the
            // expression.
            addParens = false
            base = build.applyNode('fact', [base])
        }

        let factor = base

        // TODO handle exponents separately
        if (matches(this.currentToken(), '^')) {
            this.consume('^')
            exp = this.factor()
            factor = build.applyNode('pow', [base, exp])
            addParens = false
        }

        // Reverse the signs so that we process them from the sign nearest
        // to the factor to the furthest.
        signs.reverse()

        signs.forEach((sign) => {
            if (sign.value === '+') {
                factor = build.applyNode('pos', [factor])
            } else {
                factor = build.applyNode('neg', [factor])
            }
            addParens = false
        })

        if (addParens) {
            factor.addParens = addParens
        }

        // Handles integrals
        if (query.isPow(factor)) {
            const [base, exponent] = factor.args
            if (isIdentifier(base) && base.name === 'int') {
                this.integrals++
                const body = this.expression()

                // backup to get the token we ignore
                this.i--
                token = this.currentToken()
                this.consume(token.value)

                const result = {
                    type: 'Apply',
                    op: 'int',
                    args: [body, build.identifier(token.value)],
                    limits: [base.subscript, exponent],
                }

                return result
            }
        } else if (isIdentifier(factor) && factor.name === 'int') {
            this.integrals++
            const body = this.expression()

            // backup to get the token we ignore
            this.i--
            token = this.currentToken()
            this.consume(token.value)

            const result = {
                type: 'Apply',
                op: 'int',
                args: [body, build.identifier(token.value)],
            }

            return result
        }

        return factor
    }

    // Returns an identifier or placeholder based on the current token
    identifierOrPlaceholder() {
        let token = this.currentToken()

        let isPlaceholder = false
        if (matches(token, '#')) {
            isPlaceholder = true
            this.consume('#')
            // 'token' is now equal to the token after the '#'
            token = this.currentToken()
        }

        if (!isIdentifierToken(token)) {
            throw new Error('\'#\' must be followed by an identifier')
        }

        const result = this.identifier()

        if (isPlaceholder) {
            result.type = 'Placeholder'
        }

        return result
    }

    // Returns an identifierNode built from the current token
    identifier() {
        let token = this.currentToken()

        const name = token.value
        const result = build.identifierNode(name)
        this.consume(name)

        // 'token' is now the token following the identifier
        token = this.currentToken()

        // Checks if the token after the identifier is an underscore
        // This only handles very simple subscripts, e.g. a_0, a_n
        // It doesn't handle: a_-1, a_(m+n), etc.
        // The precedence of subscripts is very high: a_0^2 => (a_0)^2
        if (matches(token, '_')) {
            this.consume('_')

            // 'token' is now the token following the underscore
            token = this.currentToken()

            if (isNumberToken(token)) {
                result.subscript = build.numberNode(token.value)
                this.consume(token.value)
            } else if (isIdentifierToken(token)) {
                result.subscript = build.identifierNode(token.value)
                this.consume(token.value)
            } else {
                throw new Error(`Can't handle '${token.value}' as a subscript`)
            }
        }

        return result
    }

    // Continues calling 'expression' until there is no ',' and then returns a
    // list of expressions.
    // This means 'expression' will be called on a comma separated list of
    // arguments. This is normally used after nthRoot or a function.
    argumentList() {
        const args = [this.expression()]
        while (true) {
            const token = this.currentToken()
            if (!matches(token, ',')) {
                break
            }
            this.consume(',')
            args.push(this.expression())
        }
        return args
    }
}

const parser = new Parser()

export default function parse(math) {
    const ast = parser.parse(math)
    traverse(ast, {
        leave(node) {
            if (node.hasOwnProperty('addParens')) {
                delete node.addParens
            }
        },
    })
    return ast
}
