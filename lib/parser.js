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
        var token = this.tokens[this.i++];
        if (token === '=') {
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

        var token = tokens[this.i++];
        while (token === '+' || token === '-') {
            if (token === '-') {
                args.push({
                    type: 'Negation',
                    expression: this.term(),
                });
            } else {
                args.push(this.term());
            }
            token = tokens[this.i++];
        }
        this.i--;   // backup

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

        var token = tokens[this.i++];

        while (token === '*' || token === '/' || token === '(' || isSymbolToken(token) || isNumberToken(token)) {
            if (token === '(') {
                var expr = this.expression();
                token = tokens[this.i++];
                if (token !== ')') {
                    throw new Error('expected )');
                }
                numerator.push(expr);
                token = tokens[this.i++];
            } else if (isSymbolToken(token)) {  // TODO: figure out why we can't let factor() handle this
                this.i--; // put the alpha back on so factor() can deal with it
                // TODO: create a peek function to handle this more elegantly
                numerator.push(this.factor());
                token = tokens[this.i++];
            } else if (isNumberToken(token)) {
                this.i--;
                numerator.push(this.factor());
                token = tokens[this.i++];
            } else if (token === '*') {
                numerator.push(this.factor());
                token = tokens[this.i++];
            } else if (token === '/') {
                denominator.push(this.factor());
                token = tokens[this.i++];
            }

            if (this.i > tokens.length) {
                break;
            }
        }
        this.i--;

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
        var token = tokens[this.i++];
        var sign = '';

        // TODO: think about multiple unary minuses
        if (token === '+' || token === '-') {
            sign = token;
            token = tokens[this.i++];
        }

        var base, exp;

        if (isSymbolToken(token)) {
            var name = token;
            token = tokens[this.i++];

            // TODO multiple arguments separated by commas
            if (token === '(') {
                var expr = this.expression();
                token = tokens[this.i++];
                if (token !== ')') {
                    throw new Error('expected )');
                }
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
                this.i--;  // backup
            }
        } else if (isNumberToken(token)) {
            base = {
                type: 'Number',
                value: token
            }
        } else if (token === '(') {
            base = this.expression();
            token = tokens[this.i++];
            if (token !== ')') {
                throw new Error('expected )');
            }
            if (isNumber(base) || isSymbol(base)) {
                base = {
                    type: 'Parenthesis',
                    content: base,
                };
            }
        }

        // TODO handle exponents separately
        if (tokens[this.i++] === '^') {
            exp = this.factor();
            return {
                type: 'Operation',
                op: '^',
                args: [base, exp],
            };
        } else {
            this.i--;

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
