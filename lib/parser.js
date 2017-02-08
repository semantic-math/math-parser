/**
 * Defines the Parser class which parses math expressions to an AST
 */
import * as nodes from './nodes';

function isIdentifierToken(token) {
    return token && /[a-zA-Z][a-zA-Z0-9]*/.test(token);
}

function isNumberToken(token) {
    return token && /\d*\.\d+|\d+\.\d*|\d+/.test(token);
}

const tokenRegex =
    /([a-zA-Z][a-zA-Z0-9]*)|[\<\>\!]\=|([\(\)\+\-\/\*\^\=\<\>|\,])|(\d*\.\d+|\d+\.\d*|\d+)/g;

const equalityTokens = ['=', '<', '<=', '>', '>=', '!='];

function isSymbol(node) {
    return node.type === 'Symbol';
}

function isNumber(node) {
    return node.type == 'Number';
}

class Parser {
    consume(expectedToken) {
        if (expectedToken !== undefined) {
            const token = this.currentToken();
            if (token !== expectedToken) {
                throw new Error(`expected '${expectedToken}' received '${token}'`);
            }
        }
        this.i++;
    }

    currentToken() {
        return this.tokens[this.i];
    }

    parse(input) {
        this.i = 0;
        // TODO: switch from 'match' to 'exec' so that an invalid input raises an error
        // TODO: add 'END_OF_STREAM' token
        this.tokens = input.replace(/\s+/, ' ').match(tokenRegex);

        return this.equation();
    }

    equation() {
        const left = this.expression();
        const token = this.currentToken();
        if (equalityTokens.indexOf(token) !== -1) {
            this.consume();
            const right = this.expression();
            return nodes.relationNode(token, [left, right]);
        }
        return left;
    }

    expression() {
        const args = [];

        args.push(this.term());

        while (true) {
            const token = this.currentToken();

            if (token === '-') {
                this.consume('-');
                args.push(nodes.operationNode('-', [this.term()]));
            } else if (token === '+') {
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

    term() {
        let numerator = [];
        let denominator = [];

        numerator.push(this.factor());

        while (true) {
            const token = this.currentToken();

            if (token === '(') {
                this.consume('(');
                const expr = this.expression();
                this.consume(')');
                numerator.push(expr);
            } else if (token === '*') {
                this.consume('*');
                numerator.push(this.factor());
            } else if (token === '/') {
                this.consume('/');
                denominator.push(this.factor());
            } else if (isIdentifierToken(token) || isNumberToken(token)) {
                numerator.push(this.factor());
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
        while (token === '+' || token === '-') {
            signs.push(token);
            this.consume(token);
            token = this.currentToken();
        }

        let base, exp;

        if (isIdentifierToken(token)) {
            const name = token;
            this.consume(name); // name
            token = this.currentToken();

            if (token === '(') {
                this.consume('(');
                const args = this.argumentList();
                this.consume(')');
                base = nodes.functionNode(name, args);
            } else {
                base = nodes.identifierNode(name);
            }
        } else if (isNumberToken(token)) {
            this.consume(token);
            base = nodes.numberNode(token);
        } else if (token === '(') {
            this.consume('(');
            base = this.expression();
            this.consume(')');
            if (isNumber(base) || isSymbol(base)) {
                base = nodes.bracketsNode(base);
            }
        } else if (token === '|') {
            this.consume('|');
            base = this.expression();
            this.consume('|');

            base = nodes.functionNode('abs', [base]);
        }

        // TODO handle exponents separately
        if (this.currentToken() === '^') {
            this.consume('^');
            exp = this.factor();
            return nodes.operationNode('^', [base, exp]);
        } else {
            let factor = base;

            signs.forEach((sign) => {
                if (isNumber(factor) && factor.value > 0) {
                    factor.value = `${sign}${factor.value}`;
                } else {
                    factor = nodes.operationNode('-', [factor]);
                }
            });

            return factor;
        }
    }

    argumentList() {
        const args = [this.expression()];
        while (this.currentToken() === ',') {
            this.consume(',');
            args.push(this.expression());
        }
        return args;
    }
}

export default Parser;
