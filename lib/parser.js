/**
 * Defines the Parser class which parses math expressions to an AST
 */

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

    parse(input) {
        this.i = 0;
        // TODO: switch from 'match' to 'exec' so that an invalid input raises an error
        this.tokens = input.replace(/\s+/, ' ').match(tokenRegex);

        return this.equation();
    }

    equation() {
        var left = this.expression();
        var token = this.tokens[this.i];
        if (token === '=') {
            this.consume();
            var right = this.expression();
            return {
                type: 'Equation',
                left,
                right
            };
        }
        return left;
    }

    expression() {
        var tokens = this.tokens;
        var args = [];

        args.push(this.term());

        var token = tokens[this.i];
        while (token === '+' || token === '-') {
            this.consume();
            if (token === '-') {
                args.push({
                    type: 'Negation',
                    expression: this.term(),
                });
            } else {
                args.push(this.term());
            }
            token = tokens[this.i];
        }

        if (args.length === 1) {
            return args[0];
        }

        return {
            type: 'Operation',
            op: '+',
            args: args,
        }
    };

    term() {
        var tokens = this.tokens;
        var numerator = [];
        var denominator = [];

        numerator.push(this.factor());
        var token = tokens[this.i];

        while (token === '(' || token === '*' || token === '/' || isSymbolToken(token) || isNumberToken(token)) {
            if (token === '(') {
                this.consume(); // '('
                var expr = this.expression();
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

            token = tokens[this.i];

            if (this.i > tokens.length) {
                break;
            }
        }

        if (numerator.length > 1) {
            numerator = {
                type: 'Operation',
                op: '*',
                args: numerator
            };
        } else {
            numerator = numerator[0];
        }

        if (denominator.length > 0) {
            if (denominator.length > 1) {
                denominator = {
                    type: 'Operation',
                    op: '*',
                    args: denominator
                };
            } else {
                denominator = denominator[0];
            }
            return {
                type: 'Operation',
                op: '/',
                args: [numerator, denominator],
            }
        } else {
            return numerator;
        }
    }


    factor() {
        var tokens = this.tokens;
        var token = tokens[this.i];
        var sign = '';

        // TODO: think about multiple unary minuses
        if (token === '+' || token === '-') {
            this.consume();
            sign = token;
            token = tokens[this.i];
        }

        var base, exp;

        if (isSymbolToken(token)) {
            var name = token;
            this.consume(); // name
            token = tokens[this.i];

            // TODO multiple arguments separated by commas
            if (token === '(') {
                this.consume(); // '('
                var expr = this.expression();
                token = tokens[this.i];
                if (token !== ')') {
                    throw new Error('expected )');
                }
                this.consume(); // ')'
                base = {
                    type: 'Function',
                    fn: name,
                    args: [expr],
                }
            } else {
                base = {
                    type: 'Symbol',
                    name: name
                };
            }
        } else if (isNumberToken(token)) {
            this.consume(); // the number
            base = {
                type: 'Number',
                value: token
            }
        } else if (token === '(') {
            this.consume(); // '('
            base = this.expression();
            token = tokens[this.i];
            if (token !== ')') {
                throw new Error('expected )');
            }
            this.consume(); // ')'
            if (isNumber(base) || isSymbol(base)) {
                base = {
                    type: 'Parenthesis',
                    content: base,
                };
            }
        }

        // TODO handle exponents separately
        if (tokens[this.i] === '^') {
            this.consume(); // '^'
            exp = this.factor();
            return {
                type: 'Operation',
                op: '^',
                args: [base, exp],
            };
        } else {
            var factor = base;

            if (sign === '-') {
                if (isNumber(factor)) {
                    factor.value = -factor.value;
                } else {
                    factor = {
                        type: 'Negation',
                        expression: factor
                    };
                }
            }

            return factor;
        }
    };
}

module.exports = Parser;
