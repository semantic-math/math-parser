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
import print from './print'

function isIdentifierToken(token) {
    return token && /[a-zA-Z][a-zA-Z0-9]*/.test(token.value);
}

function isNumberToken(token) {
    return token && /\d*\.\d+|\d+\.\d*|\d+/.test(token.value);
}

const tokenPattern =
      /\.\.\.|[a-zA-Z][a-zA-Z0-9]*|<=|>=|!=|[\'\<\>\!\=\(\)\+\-\/\*\^\<\>|\,\#\_]|\d*\.\d+|\d+\.\d*|\d+/;

// matches either dx or d to a power
const derivativeNumeratorPattern =
      /d[a-zA-Z]{1}|d[\^]\d+/;

// match groups of dx's
const derivativeDenominatorPattern =
      /(d[a-zA-Z])+/;

const relationTokenMap = {
    '=': 'eq',
    '<': 'lt',
    '<=': 'le',
    '>': 'gt',
    '>=': 'ge',
    '!=': 'ne',
}

function isIdentifier(node) {
    return node.type === 'Identifier';
}

function isRelation(node) {
    return node.type === 'Apply' && Object.values(relationTokenMap).includes(node.op);
}

function isExpression(node) {
    return ['System', 'List', 'Sequence'].indexOf(node.type) === -1 ||
        isRelation(node);
}

function matches(token, value) {
    return token && token.value === value;
}

class Parser {
    consume(expectedValue) {
        const token = this.currentToken();
        if (expectedValue !== undefined) {
            if (!matches(token, expectedValue)) {
                throw new Error(
                    `expected '${expectedValue}' received '${token.value}'`);
            }
        }
        this.i++;
        return token;
    }

    currentToken() {
        return this.tokens[this.i]
    }

    parse(input) {
        this.i = 0;
        this.tokens = [];

        const regex = new RegExp(tokenPattern, 'g');

        let index = 0;
        let match;

        while ((match = regex.exec(input)) != null) {
            const start = match.index;
            const end = match.index + match[0].length;

            this.tokens.push({
                value: match[0],
                start: start,
                end: end,
            });

            if (index !== start) {
                const skipped = input.slice(index, start).trim();
                if (skipped !== '') {
                    throw new Error(`'${skipped}' not recognized`)
                }
            }

            index = end;
        }

        if (index !== input.length) {
            const skipped = input.slice(index, input.length).trim();
            if (skipped !== '') {
                throw new Error(`'${skipped}' not recognized`)
            }
        }

        const result = this.list()

        if (this.i < this.tokens.length) {
            throw new Error('extra input not recognized')
        }

        return result
    }

    list() {
        const items = [this.relationsOrRelationOrExpression()];

        while (true) {
            const token = this.currentToken();

            if (matches(token, ',')) {
                this.consume(',');
                items.push(this.relationsOrRelationOrExpression());
            } else {
                break;
            }
        }

        if (items.length > 1) {
            if (items.every((item) => isRelation(item))) {
                return {
                    type: 'System', // of equations
                    relations: items,
                };
            } else if (items.every(isExpression)) {
                return {
                    type: 'Sequence',
                    items,
                };
            } else {
                return {
                    type: 'List',
                    items,
                };
            }
        } else {
            return items[0];
        }
    }

    relationsOrRelationOrExpression() {
        const relations = [];
        const args = [];

        let left;
        let right;

        left = this.expression();

        while (true) {
            const token = this.currentToken();

            if (token && token.value in relationTokenMap) {
                this.consume();
                right = this.expression();
                const rel = relationTokenMap[token.value]
                relations.push(build.applyNode(rel, [left, right]));
                args.push(left);
                left = right;
            } else {
                break;
            }
        }
        args.push(right);

        if (relations.length > 1) {
            return {
                type: 'Apply',
                op: relations[0].op,
                args: args
            };
        } else if (relations.length > 0) {
            return relations[0];
        } else {
            return left;
        }
    }

    expression() {
        const args = [];

        args.push(this.explicitMul());

        while (true) {
            const token = this.currentToken();

            if (matches(token, '-')) {
                this.consume('-');
                args.push(
                    build.applyNode('neg', [this.explicitMul()], {wasMinus: true})
                );
            } else if (matches(token, '+')) {
                this.consume('+');
                args.push(this.explicitMul());
            } else {
                break;
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

    explicitMul() {
        const factors = [];

        factors.push(this.implicitMul());

        while (true) {
            if (matches(this.currentToken(), '*')) {
                this.consume('*');
                factors.push(this.implicitMul());
            } else {
                break;
            }
        }

        return factors.length > 1
            ? build.applyNode('mul', factors)
            : factors[0];
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
    implicitMul() {
        const factors = [];
        factors.push(this.division());

        while (true) {
            let token = this.currentToken();

            if (matches(token, '(')) {
                factors.push(this.division());
            } else if (matches(token, '#') || isIdentifierToken(token) || isNumberToken(token)) {
                factors.push(this.division());
            } else {
                break;
            }

            if (this.i > this.tokens.length) {
                break;
            }
        }

        return factors.length > 1
            ? build.applyNode('mul', factors, {implicit: true})
        : factors[0];
    }

    division() {
        let numerator;
        let denominator;
        let frac;

        numerator = this.factor();

        while (true) {
            const token = this.currentToken();

            if (matches(token, '/')) {
                this.consume('/');
                denominator = this.factor();
                if (frac) {
                    frac = build.apply('div', [frac, denominator]);
                } else {
                    frac = build.applyNode('div', [numerator, denominator]);
                }
            } else {
                break;
            }
        }

        return frac || numerator;
    }

    /**
     * Parse any of the following:
     * - unary operations, e.g. +, -
     * - numbers
     * - identifiers
     * - parenthesis
     * - absolute value function, e.g. |x|
     * - exponents, e.g. x^2
     */
    factor() {
        let token = this.currentToken();

        if (matches(token, '...')) {
            this.consume('...')
            return {
                type: 'Ellipsis',
            }
        }

        let signs = [];

        // handle multiple unary operators
        while (matches(token, '+') || matches(token, '-')) {
            signs.push(token);
            this.consume(token.value);
            token = this.currentToken();
        }

        let base, exp;
        let addParens = false

        if (matches(token, '#') || isIdentifierToken(token)) {
            const node = this.identifierOrPlaceholder()

            const r1 = new RegExp(derivativeNumeratorPattern);
            const r2 = new RegExp(derivativeDenominatorPattern);

            // Lagrange notation
            if (node.name === 'f' && matches(this.currentToken(), `'`)) {
                let order = 0
                while(matches(this.currentToken(), `'`)) {
                    token = this.consume(`'`);
                    order++;
                }

                if (matches(this.currentToken(), '(')) {
                    this.consume('(')
                    const args = this.argumentList();
                    this.consume(')')
                    if (args.length > 1) {
                        throw new Error (`f' takes only 1 arg`)
                    } else {
                        base = build.apply({type: 'Apply', op: 'diff', args: ['f', order]}, args)
                    }
                }  else {
                    base = build.apply('diff', ['f'].concat(Array(order).fill('_')))
                }
            }
            // Leibniz notation (single diff)
            else if (node.name.match(r1) != null) {
                const firstVar = node.name.charAt(1)
                if (matches(this.currentToken(), '/')) {
                    this.consume('/')
                    // check if denom is correct
                    token = this.currentToken()
                    if  (token.value.match(r2) != null) {
                        const secondVar = token.value.charAt(1)
                        this.consume(token.value)
                        if (matches(this.currentToken() , '(')) {
                            this.consume('(')
                            const args = this.argumentList()
                            token = this.consume(')')
                            base = build.apply('diff', [firstVar, secondVar])
                        }
                    }
                }
            }
            // nthRoot
            else if (matches(this.currentToken(), '(')) {
                this.consume('(');
                const args = this.argumentList();
                token = this.consume(')');
                if (node.name === 'nthRoot') {
                    if (args.length < 1 || args.length > 2) {
                        throw new Error('nthRoot takes 1 or 2 args')
                    } else {
                        base = build.nthRoot(...args)
                    }
                } else {
                    base = build.apply(node, args)
                }
            } else {
                // TODO(kevinb) valid the constraint type against the node
                // e.g. if it's a 'Number' then it can't have a subscript
                base = node;
            }
        } else if (isNumberToken(token)) {
            this.consume(token.value);
            base = build.number(token.value);
        } else if (matches(token, '(')) {
            this.consume('(');
            base = this.expression();
            token = this.consume(')');
            addParens = true
            if (base.type === 'Number' || isIdentifier(base)) {
                base = build.parensNode(base);
                addParens = false
            }
        } else if (matches(token, '|')) {
            this.consume('|');
            base = this.expression();
            token = this.consume('|');

            base = build.applyNode('abs', [base])
        }

        if (matches(this.currentToken(), '!')) {
            this.consume('!')
            // print will add parentheses back in if a 'fact' node wraps the
            // expression.
            addParens = false
            base = build.applyNode('fact', [base])
        }

        let factor = base;

        // TODO handle exponents separately
        if (matches(this.currentToken(), '^')) {
            this.consume('^');
            exp = this.factor();
            factor = build.apply('pow', [base, exp]);
            addParens = false
        }

        // Reverse the signs so that we process them from the sign nearest
        // to the factor to the furthest.
        signs.reverse();

        signs.forEach((sign) => {
            if (sign.value === '+') {
                factor = build.apply('pos', [factor]);
            } else {
                factor = build.apply('neg', [factor]);
            }
            addParens = false
        });

        if (addParens) {
            factor.addParens = addParens
        }

        return factor;
    }

    identifierOrPlaceholder() {
        let token = this.currentToken()

        let isPlaceholder = false
        if (matches(token, '#')) {
            isPlaceholder = true
            this.consume('#')
            token = this.currentToken()
        }

        if (!isIdentifierToken(token)) {
            throw new Error(`'#' must be followed by an identifier`)
        }

        const result = this.identifier()

        if (isPlaceholder) {
            result.type = 'Placeholder'
        }

        return result
    }

    identifier() {
        let token = this.currentToken()

        const name = token.value
        const result = build.identifierNode(name)
        this.consume(name)

        token = this.currentToken()

        // This only handles very simple subscripts, e.g. a_0, a_n
        // It doesn't handle: a_-1, a_(m+n), etc.
        // The precedence of subscripts is very high: a_0^2 => (a_0)^2
        if (matches(token, '_')) {
            this.consume('_')

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

    argumentList() {
        const args = [this.expression()];
        while (true) {
            const token = this.currentToken();
            if (!matches(token, ',')) {
                break;
            }
            this.consume(',');
            args.push(this.expression());
        }
        return args;
    }
}

const parser = new Parser();

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
