/**
 * Defines the Parser class which parses math expressions to an AST
 */
import * as nodes from './nodes';

function isIdentifierToken(token) {
    return token && /[a-zA-Z][a-zA-Z0-9]*/.test(token.value);
}

function isNumberToken(token) {
    return token && /\d*\.\d+|\d+\.\d*|\d+/.test(token.value);
}

const tokenPattern =
    /([a-zA-Z][a-zA-Z0-9]*)|[\<\>\!]\=|([\(\)\+\-\/\*\^\=\<\>|\,])|(\d*\.\d+|\d+\.\d*|\d+)/;

const relationTokens = ['=', '<', '<=', '>', '>=', '!='];

function isSymbol(node) {
    return node.type === 'Symbol';
}

function isNumber(node) {
    return node.type == 'Number';
}

function matches(token, value) {
    return token && token.value === value;
}

class Parser {
    consume(expectedValue) {
        if (expectedValue !== undefined) {
            const token = this.currentToken();
            if (!matches(token, expectedValue)) {
                throw new Error(
                    `expected '${expectedValue}' received '${token.value}'`);
            }
        }
        this.i++;
    }

    currentToken() {
        return this.tokens[this.i];
    }

    parse(input) {
        this.i = 0;
        this.tokens = [];
        // TODO: switch from 'match' to 'exec' so that an invalid input raises an error
        // TODO: add 'END_OF_STREAM' token

        const regex = new RegExp(tokenPattern, 'g');

        let match;
        while ((match = regex.exec(input)) != null) {
            this.tokens.push({
                value: match[0],
                start: match.index,
                end: match.index + match[0].length,
            });
        }

        return this.equation();
    }

    equation() {
        const left = this.expression();
        const token = this.currentToken();

        // TODO(kevinb) handle more than one relation token
        if (token && relationTokens.indexOf(token.value) !== -1) {
            this.consume();
            const right = this.expression();
            return nodes.relationNode(token.value, [left, right]);
        }
        return left;
    }

    expression() {
        const args = [];

        args.push(this.term());

        while (true) {
            const token = this.currentToken();

            if (matches(token, '-')) {
                this.consume('-');
                args.push(nodes.operationNode('-', [this.term()], {wasMinus: true}));
            } else if (matches(token, '+')) {
                this.consume('+');
                args.push(this.term());
            } else {
                break;
            }
        }

        if (args.length === 1) {
            return args[0];
        }

        return nodes.operationNode('+', args);
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

        factors.push(this.factor());

        while (true) {
            const token = this.currentToken();

            if (matches(token, '(')) {
                this.consume('(');
                const expr = this.expression();
                this.consume(')');
                factors.push(expr);
            } else if (isIdentifierToken(token) || isNumberToken(token)) {
                factors.push(this.factor());
            } else {
                break;
            }

            if (this.i > this.tokens.length) {
                break;
            }
        }

        if (factors.length > 1) {
            return nodes.operationNode('*', factors, {implicit: true});
        } else {
            return factors[0];
        }
    }

    term() {
        let numerator = [];
        let denominator = [];

        numerator.push(this.implicitMul());

        while (true) {
            const token = this.currentToken();

            if (matches(token, '(')) {
                this.consume('(');
                const expr = this.expression();
                this.consume(')');
                numerator.push(expr);
            } else if (matches(token, '*')) {
                this.consume('*');
                numerator.push(this.implicitMul());
            } else if (matches(token, '/')) {
                this.consume('/');
                denominator.push(this.factor());
            } else {
                break;
            }

            if (this.i > this.tokens.length) {
                break;
            }
        }

        if (numerator.length > 1) {
            numerator = nodes.operationNode('*', numerator);
        } else {
            numerator = numerator[0];
        }

        if (denominator.length > 0) {
            if (denominator.length > 1) {
                denominator = nodes.operationNode('*', denominator);
            } else {
                denominator = denominator[0];
            }
            return nodes.operationNode('/', [numerator, denominator]);
        } else {
            return numerator;
        }
    }

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

        if (isIdentifierToken(token)) {
            const name = token.value;
            const id = token;
            this.consume(name);
            token = this.currentToken();

            if (matches(token, '(')) {
                this.consume('(');
                const args = this.argumentList();
                const token = this.currentToken();
                this.consume(')');
                base = nodes.functionNode(name, args, id.start, token.end);
            } else {
                base = nodes.identifierNode(name, id.start, id.end);
            }
        } else if (isNumberToken(token)) {
            this.consume(token.value);
            base = nodes.numberNode(token.value, token.start, token.end);
        } else if (matches(token, '(')) {
            const start = token.start;
            this.consume('(');
            base = this.expression();
            token = this.currentToken();
            this.consume(')');
            const end = token.end;
            if (isNumber(base) || isSymbol(base)) {
                base = nodes.bracketsNode(base, start, end);
            }
        } else if (matches(token, '|')) {
            const start = token.start;
            this.consume('|');
            base = this.expression();
            token = this.currentToken();
            this.consume('|');

            base = nodes.functionNode('abs', [base], start, token.end);
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
            factor = nodes.operationNode('^', [base, exp], {loc});
        }

        // Reverse the signs so that we process them from the sign neareset
        // to the factor to the furthest.
        signs.reverse();

        signs.forEach((sign) => {
            if (isNumber(factor) && factor.value > 0) {
                factor.value = `${sign.value}${factor.value}`;
                factor.loc.start = sign.start;
            } else {
                const loc = {
                    start: sign.start,
                    end: factor.loc.end,
                };
                factor = nodes.operationNode('-', [factor], {loc});
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

export default Parser;
