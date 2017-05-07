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
import * as nodes from './nodes';

function isIdentifierToken(token) {
    return token && /[a-zA-Z][a-zA-Z0-9]*/.test(token.value);
}

function isNumberToken(token) {
    return token && /\d*\.\d+|\d+\.\d*|\d+/.test(token.value);
}

const tokenPattern =
    /[a-zA-Z][a-zA-Z0-9]*|<=|>=|!=|[\<\>\!\=\(\)\+\-\/\*\^\<\>|\,\#]|\d*\.\d+|\d+\.\d*|\d+/;

const relationTokenMap = {
    '=': 'eq',
    '<': 'lt',
    '<=': 'le',
    '>': 'gt',
    '>=': 'ge',
    '!=': 'ne',
}

function isSymbol(node) {
    return node.type === 'Symbol';
}

function isNegativeNumber(node) {
    return node.type === 'Apply' &&
           node.op === 'neg' &&
           node.args[0].type === 'Number';
}

function isPositiveNumber(node) {
    return node.type === 'Apply' &&
           node.op === 'pos' &&
           node.args[0].type === 'Number';
}

function isNumber(node) {
    return node.type === 'Number' ||
           isNegativeNumber(node) ||
           isPositiveNumber(node);
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
        return this.tokens[this.i];
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

        return this.list();
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
                relations.push(nodes.applyNode(rel, [left, right]));
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
                    nodes.applyNode(
                        'neg',
                        [this.explicitMul()],
                        null,
                        {wasMinus: true}
                    )
                );
            } else if (matches(token, '+')) {
                this.consume('+');
                args.push(this.explicitMul());
            } else {
                break;
            }
        }

        return args.length > 1
            ? nodes.applyNode('add', args)
            : args[0];
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
            ? nodes.applyNode('mul', factors)
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

            let isPlaceholder = false;
            if (matches(token, '#')) {
                isPlaceholder = true;
                this.consume('#');
                token = this.currentToken();
            }

            if (matches(token, '(')) {
                factors.push(this.division());
            } else if (isIdentifierToken(token) || isNumberToken(token)) {
                const factor = this.division();
                if (isPlaceholder) {
                    factor.type = 'Placeholder';
                }
                factors.push(factor);
            } else {
                break;
            }

            if (this.i > this.tokens.length) {
                break;
            }
        }

        return factors.length > 1
            ? nodes.applyNode('mul', factors, null, {implicit: true})
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
                    frac = nodes.applyNode('div', [frac, denominator]);
                } else {
                    frac = nodes.applyNode('div', [numerator, denominator]);
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
        let signs = [];

        // handle multiple unary operators
        while (matches(token, '+') || matches(token, '-')) {
            signs.push(token);
            this.consume(token.value);
            token = this.currentToken();
        }

        let base, exp;

        const start = token.start;

        let isPlaceholder = false;
        if (matches(token, '#')) {
            isPlaceholder = true;
            this.consume('#');
            token = this.currentToken();
        }

        if (isIdentifierToken(token)) {
            const name = token.value;
            this.consume(name);

            if (matches(this.currentToken(), '(')) {
                this.consume('(');
                const args = this.argumentList();
                token = this.consume(')');
                base = nodes.applyNode(name, args, {start, end: token.end})
                if (isPlaceholder) {
                    base.type = 'Placeholder';
                    base.constraint = 'Function';
                }
            } else {
                // TODO(kevinb) valid the constraint type against the node
                // e.g. if it's a 'Number' then it can't have a subscript
                base = nodes.identifierNode(name, start, token.end);
                if (isPlaceholder) {
                    base.type = 'Placeholder';
                }
            }
        } else if (isNumberToken(token)) {
            this.consume(token.value);
            base = nodes.numberNode(token.value, start, token.end);
        } else if (matches(token, '(')) {
            this.consume('(');
            base = this.expression();
            token = this.consume(')');
            if (isNumber(base) || isSymbol(base)) {
                base = nodes.parensNode(base, start, token.end);
            }
        } else if (matches(token, '|')) {
            this.consume('|');
            base = this.expression();
            token = this.consume('|');

            base = nodes.applyNode('abs', [base], {start, end: token.end})
        }

        let factor = base;

        // TODO handle exponents separately
        if (matches(this.currentToken(), '^')) {
            this.consume('^');
            exp = this.factor();
            const loc = {
                start: base.loc.start,
                end: exp.loc.end,
            };
            factor = nodes.applyNode('pow', [base, exp], loc);
        }

        // Reverse the signs so that we process them from the sign nearest
        // to the factor to the furthest.
        signs.reverse();

        signs.forEach((sign) => {
            const loc = {
                start: sign.start,
                end: factor.loc.end,
            };
            if (sign.value === '+') {
                factor = nodes.applyNode('pos', [factor], loc);
            } else {
                factor = nodes.applyNode('neg', [factor], loc);
            }
        });

        return factor;
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
    return parser.parse(math);
}
