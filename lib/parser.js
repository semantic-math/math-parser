/**
 * Defines the Parser class which parses math expressions to an AST
 */
const nodes = require('./nodes');

function isSymbolToken(token) {
    return token && /[a-zA-Z][a-zA-Z0-9]*/.test(token);
}

function isNumberToken(token) {
    return token && /\d*\.\d+|\d+\.\d*|\d+/.test(token);
}

// TODO don't treat spaces as explicit tokens...
// if two symbols are beside each turn that into multiplication
var tokenRegex = /([a-zA-Z][a-zA-Z0-9]*)|([\(\)\+\-\/\*\^\=])|(\d*\.\d+|\d+\.\d*|\d+)/g;

function isExpression(node) {
    return node.type === 'Operation' && node.op === '+';
}

function isSymbol(node) {
    return node.type === 'Symbol';
}

function isProduct(node) {
    return node.type === 'Operation' && node.op === '*';
}

function isNumber(node) {
    return node.type == 'Number';
}

class Parser {
    consume() {
        this.i++;
    }

    currentToken() {
        return this.tokens[this.i];
    }

    parse(input) {
        this.i = 0;
        // TODO: switch from 'match' to 'exec' so that an invalid input raises an error
        this.tokens = input.replace(/\s+/, ' ').match(tokenRegex);

        return this.equation();
    }

    equation() {
        var left = this.expression();
        var token = this.currentToken();
        if (token === '=') {
            this.consume();
            var right = this.expression();
            return nodes.equationNode(left, right);
        }
        return left;
    }

    expression() {
        var tokens = this.tokens;
        var args = [];

        args.push(this.term());

        var token = this.currentToken();
        while (token === '+' || token === '-') {
            this.consume();
            if (token === '-') {
                args.push(nodes.negationNode(this.term()));
            } else {
                args.push(this.term());
            }
            token = this.currentToken();
        }

        if (args.length === 1) {
            return args[0];
        }

        return nodes.operationNode('+', args);
    };

    term() {
        var tokens = this.tokens;
        var numerator = [];
        var denominator = [];

        numerator.push(this.factor());
        var token = this.currentToken();

        while (token === '(' || token === '*' || token === '/' || isSymbolToken(token) || isNumberToken(token)) {
            if (token === '(') {
                this.consume(); // '('
                var expr = this.expression();
                token = this.currentToken();
                if (token !== ')') {
                    throw new Error('expected )');
                }
                this.consume(); // ')'
                numerator.push(expr);
            } else if (token === '*') {
                this.consume(); // '*'
                numerator.push(this.factor());
            } else if (token === '/') {
                this.consume(); // '/'
                denominator.push(this.factor());
            } else {
                numerator.push(this.factor());
            }

            token = this.currentToken();

            if (this.i > tokens.length) {
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
        var tokens = this.tokens;
        var token = this.currentToken();
        var sign = '';

        // TODO: think about multiple unary minuses
        if (token === '+' || token === '-') {
            this.consume();
            sign = token;
            token = this.currentToken();
        }

        var base, exp;

        if (isSymbolToken(token)) {
            var name = token;
            this.consume(); // name
            token = this.currentToken();

            // TODO multiple arguments separated by commas
            if (token === '(') {
                this.consume(); // '('
                var expr = this.expression();
                token = this.currentToken();
                if (token !== ')') {
                    throw new Error('expected )');
                }
                this.consume(); // ')'
                base = nodes.functionNode(name, [expr]);
            } else {
                base = nodes.symbolNode(name);
            }
        } else if (isNumberToken(token)) {
            this.consume(); // the number
            base = nodes.numberNode(token);
        } else if (token === '(') {
            this.consume(); // '('
            base = this.expression();
            token = this.currentToken();
            if (token !== ')') {
                throw new Error('expected )');
            }
            this.consume(); // ')'
            if (isNumber(base) || isSymbol(base)) {
                base = nodes.parenthesisNode(base);
            }
        }

        // TODO handle exponents separately
        if (this.currentToken() === '^') {
            this.consume(); // '^'
            exp = this.factor();
            return nodes.operationNode('^', [base, exp]);
        } else {
            var factor = base;

            if (sign === '-') {
                if (isNumber(factor)) {
                    factor.value = -factor.value;
                } else {
                    factor = nodes.negationNode(factor);
                }
            }

            return factor;
        }
    };
}

module.exports = Parser;
