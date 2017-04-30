module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.relationNode = relationNode;
exports.operationNode = operationNode;
exports.functionNode = functionNode;
exports.identifierNode = identifierNode;
exports.numberNode = numberNode;
exports.bracketsNode = bracketsNode;
function relationNode(rel, args) {
    return {
        type: 'Relation',
        rel: rel,
        loc: {
            start: args[0].loc.start,
            end: args[args.length - 1].loc.end
        },
        args: args
    };
}

// TODO(kevinb) handle post fix operators
function operationNode(op, args, options) {
    var result = _extends({
        type: 'Operation',
        op: op,
        loc: {
            start: args[0].loc.start,
            end: args[args.length - 1].loc.end
        }
    }, options, {
        args: args
    });

    return result;
}

function functionNode(fn, args, start, end) {
    return {
        type: 'Function',
        fn: fn, // TODO: switch this out to be an Identifier
        loc: { start: start, end: end },
        args: args
    };
}

function identifierNode(name, start, end) {
    return {
        type: 'Identifier',
        name: name,
        loc: { start: start, end: end }
    };
}

function numberNode(value, start, end) {
    return {
        type: 'Number',
        value: value,
        loc: { start: start, end: end }
    };
}

function bracketsNode(content, start, end) {
    return {
        type: 'Brackets',
        loc: { start: start, end: end },
        content: content
        // TODO: add left, right
    };
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = evaluate;
/**
 * evaluate -
 */

var operations = {
    'add': function add(args) {
        return args.reduce(function (sum, val) {
            return sum + val;
        }, 0);
    },
    'neg': function neg(args) {
        if (args.length === 1) {
            return -args[0];
        } else {
            throw new Error('\'-\' can\'t be performed on ' + args.length + ' arguments');
        }
    },
    'mul': function mul(args) {
        return args.reduce(function (prod, val) {
            return prod * val;
        }, 1);
    },
    'div': function div(args) {
        if (args.length !== 2) {
            throw new Error('\'/\' can only be performed with 2 arguments');
        }
        return args[0] / args[1];
    },
    'pow': function pow(args) {
        return Math.pow(args[0], args[1]);
    }
};

// TODO: check the number of args
var relations = {
    'eq': function eq(_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            left = _ref2[0],
            right = _ref2[1];

        return left === right;
    },
    'lt': function lt(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            left = _ref4[0],
            right = _ref4[1];

        return left < right;
    },
    'le': function le(_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            left = _ref6[0],
            right = _ref6[1];

        return left <= right;
    },
    'ge': function ge(_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            left = _ref8[0],
            right = _ref8[1];

        return left >= right;
    },
    'gt': function gt(_ref9) {
        var _ref10 = _slicedToArray(_ref9, 2),
            left = _ref10[0],
            right = _ref10[1];

        return left > right;
    },
    'ne': function ne(_ref11) {
        var _ref12 = _slicedToArray(_ref11, 2),
            left = _ref12[0],
            right = _ref12[1];

        return left !== right;
    }
};

// TODO: add context parm to hold variables, functions, operations, and relations
function evaluate(node) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
            if (node.rel in relations) {
                return relations[node.rel](node.args.map(evaluate));
            } else {
                throw new Error('\'$node.op\' is not a valid relation in this context');
            }
        case 'Operation':
            if (node.op in operations) {
                return operations[node.op](node.args.map(evaluate));
            } else {
                throw new Error('\'' + node.op + '\' is not a valid operation in this context');
            }
        case 'Function':
            if (!Math[node.fn]) {
                throw new Error('\'' + node.fn + '\' does not exist on Math global');
            }
            if (Math[node.fn].length !== node.args.length) {
                throw new Error('\'' + node.fn + '\' takes ' + Math[node.fn].length + ' parameters, ' + node.args.length + ' was provided');
            }
            return Math[node.fn].apply(null, node.args.map(evaluate));

        // leaf nodes
        case 'Identifier':
            throw new Error('\'' + node.name + ' does not exist in this context');
        case 'Number':
            return parseFloat(node.value);

        // irregular non-leaf nodes
        case 'Brackets':
            return evaluate(node.content);

        default:
            throw new Error('unrecognized node');
    }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
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


exports.default = parse;

var _mathTraverse = __webpack_require__(4);

var _nodes = __webpack_require__(0);

var nodes = _interopRequireWildcard(_nodes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isIdentifierToken(token) {
    return token && /[a-zA-Z][a-zA-Z0-9]*/.test(token.value);
}

function isNumberToken(token) {
    return token && /\d*\.\d+|\d+\.\d*|\d+/.test(token.value);
}

var tokenPattern = /[a-zA-Z][a-zA-Z0-9]*|[\<\>\!\=\(\)\+\-\/\*\^\<\>|\,\#]|\d*\.\d+|\d+\.\d*|\d+/;

var relationTokens = ['=', '<', '<=', '>', '>=', '!='];

function isSymbol(node) {
    return node.type === 'Symbol';
}

function isNegativeNumber(node) {
    return node.type === 'Operation' && node.op === 'neg' && node.args[0].type === 'Number';
}

function isPositiveNumber(node) {
    return node.type === 'Operation' && node.op === 'pos' && node.args[0].type === 'Number';
}

function isNumber(node) {
    return node.type === 'Number' || isNegativeNumber(node) || isPositiveNumber(node);
}

function isExpression(node) {
    return ['Relation', 'System', 'List', 'Sequence'].indexOf(node.type) === -1;
}

function matches(token, value) {
    return token && token.value === value;
}

var Parser = function () {
    function Parser() {
        _classCallCheck(this, Parser);
    }

    _createClass(Parser, [{
        key: 'consume',
        value: function consume(expectedValue) {
            var token = this.currentToken();
            if (expectedValue !== undefined) {
                if (!matches(token, expectedValue)) {
                    throw new Error('expected \'' + expectedValue + '\' received \'' + token.value + '\'');
                }
            }
            this.i++;
            return token;
        }
    }, {
        key: 'currentToken',
        value: function currentToken() {
            return this.tokens[this.i];
        }
    }, {
        key: 'parse',
        value: function parse(input) {
            this.i = 0;
            this.tokens = [];
            // TODO: switch from 'match' to 'exec' so that an invalid input raises an error
            // TODO: add 'END_OF_STREAM' token

            var regex = new RegExp(tokenPattern, 'g');

            var match = void 0;
            while ((match = regex.exec(input)) != null) {
                this.tokens.push({
                    value: match[0],
                    start: match.index,
                    end: match.index + match[0].length
                });
            }

            return this.list();
        }
    }, {
        key: 'list',
        value: function list() {
            var items = [this.relationsOrRelationOrExpression()];

            while (true) {
                var token = this.currentToken();

                if (matches(token, ',')) {
                    this.consume(',');
                    items.push(this.relationsOrRelationOrExpression());
                } else {
                    break;
                }
            }

            if (items.length > 1) {
                if (items.every(function (item) {
                    return item.type === 'Relation';
                })) {
                    return {
                        type: 'System', // of equations
                        relations: items
                    };
                } else if (items.every(isExpression)) {
                    return {
                        type: 'Sequence',
                        items: items
                    };
                } else {
                    return {
                        type: 'List',
                        items: items
                    };
                }
            } else {
                return items[0];
            }
        }
    }, {
        key: 'relationsOrRelationOrExpression',
        value: function relationsOrRelationOrExpression() {
            var relations = [];

            var left = void 0;
            var right = void 0;

            left = this.expression();

            while (true) {
                var token = this.currentToken();

                if (relationTokens.indexOf(token && token.value) !== -1) {
                    this.consume();
                    right = this.expression();
                    relations.push(nodes.relationNode(token.value, [left, right]));
                    left = right;
                } else {
                    break;
                }
            }

            if (relations.length > 1) {
                return {
                    type: 'System',
                    collapsed: true,
                    relations: relations
                };
            } else if (relations.length > 0) {
                return relations[0];
            } else {
                return left;
            }
        }
    }, {
        key: 'expression',
        value: function expression() {
            var args = [];

            args.push(this.explicitMul());

            while (true) {
                var token = this.currentToken();

                if (matches(token, '-')) {
                    this.consume('-');
                    args.push(nodes.operationNode('neg', [this.explicitMul()], { wasMinus: true }));
                } else if (matches(token, '+')) {
                    this.consume('+');
                    args.push(this.explicitMul());
                } else {
                    break;
                }
            }

            return args.length > 1 ? nodes.operationNode('add', args) : args[0];
        }
    }, {
        key: 'explicitMul',
        value: function explicitMul() {
            var factors = [];

            factors.push(this.implicitMul());

            while (true) {
                if (matches(this.currentToken(), '*')) {
                    this.consume('*');
                    factors.push(this.implicitMul());
                } else {
                    break;
                }
            }

            return factors.length > 1 ? nodes.operationNode('mul', factors) : factors[0];
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

    }, {
        key: 'implicitMul',
        value: function implicitMul() {
            var factors = [];

            factors.push(this.division());

            while (true) {
                var token = this.currentToken();

                var isPlaceholder = false;
                if (matches(token, '#')) {
                    isPlaceholder = true;
                    this.consume('#');
                    token = this.currentToken();
                }

                if (matches(token, '(')) {
                    factors.push(this.division());
                } else if (isIdentifierToken(token) || isNumberToken(token)) {
                    var factor = this.division();
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

            return factors.length > 1 ? nodes.operationNode('mul', factors, { implicit: true }) : factors[0];
        }
    }, {
        key: 'division',
        value: function division() {
            var numerator = void 0;
            var denominator = void 0;
            var frac = void 0;

            numerator = this.factor();

            while (true) {
                var token = this.currentToken();

                if (matches(token, '/')) {
                    this.consume('/');
                    denominator = this.factor();
                    if (frac) {
                        frac = nodes.operationNode('div', [frac, denominator]);
                    } else {
                        frac = nodes.operationNode('div', [numerator, denominator]);
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

    }, {
        key: 'factor',
        value: function factor() {
            var token = this.currentToken();
            var signs = [];

            // handle multiple unary operators
            while (matches(token, '+') || matches(token, '-')) {
                signs.push(token);
                this.consume(token.value);
                token = this.currentToken();
            }

            var base = void 0,
                exp = void 0;

            var start = token.start;

            var isPlaceholder = false;
            if (matches(token, '#')) {
                isPlaceholder = true;
                this.consume('#');
                token = this.currentToken();
            }

            if (isIdentifierToken(token)) {
                var name = token.value;
                this.consume(name);

                if (matches(this.currentToken(), '(')) {
                    this.consume('(');
                    var args = this.argumentList();
                    token = this.consume(')');
                    base = nodes.functionNode(name, args, start, token.end);
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
                    base = nodes.bracketsNode(base, start, token.end);
                }
            } else if (matches(token, '|')) {
                this.consume('|');
                base = this.expression();
                token = this.consume('|');

                base = nodes.functionNode('abs', [base], start, token.end);
            }

            var factor = base;

            // TODO handle exponents separately
            if (matches(this.currentToken(), '^')) {
                this.consume('^');
                exp = this.factor();
                var loc = {
                    start: base.loc.start,
                    end: exp.loc.end
                };
                factor = nodes.operationNode('pow', [base, exp], { loc: loc });
            }

            // Reverse the signs so that we process them from the sign nearest
            // to the factor to the furthest.
            signs.reverse();

            signs.forEach(function (sign) {
                var loc = {
                    start: sign.start,
                    end: factor.loc.end
                };
                if (sign.value === '+') {
                    factor = nodes.operationNode('pos', [factor], { loc: loc });
                } else {
                    factor = nodes.operationNode('neg', [factor], { loc: loc });
                }
            });

            return factor;
        }
    }, {
        key: 'argumentList',
        value: function argumentList() {
            var args = [this.expression()];
            while (true) {
                var token = this.currentToken();
                if (!matches(token, ',')) {
                    break;
                }
                this.consume(',');
                args.push(this.expression());
            }
            return args;
        }
    }]);

    return Parser;
}();

var postProcess = function postProcess(ast) {
    return (0, _mathTraverse.replace)(ast, {
        enter: function enter() {},
        leave: function leave(node) {
            // #a * #b / #c --> (#a * #b) / #c, given #a.type === 'Number' and #b.type === 'Identifier'
            if (node.type === 'Operation' && node.op === 'mul' && node.args.length === 2) {
                if (node.args[0].type === 'Number' && node.args[1].type === 'Operation' && node.args[1].op === 'div') {
                    var _node$args$1$args = _slicedToArray(node.args[1].args, 2),
                        numerator = _node$args$1$args[0],
                        denominator = _node$args$1$args[1];

                    if (numerator.type === 'Identifier') {
                        return {
                            type: 'Operation',
                            op: 'div',
                            args: [{
                                type: 'Operation',
                                op: 'mul',
                                args: [node.args[0], numerator],
                                implicit: node.implicit
                            }, denominator]
                        };
                    }
                }
            }
        }
    });
};

var parser = new Parser();

function parse(math) {
    return postProcess(parser.parse(math));
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = print;
/**
 * print - return a string representation of the nodes.
 */

var isNeg = function isNeg(node) {
    return node.type === 'Operation' && node.op === 'neg';
};

var isAdd = function isAdd(node) {
    return node.type === 'Operation' && node.op === 'add';
};

var isMul = function isMul(node) {
    return node.type === 'Operation' && node.op === '*' && node.args.length > 1;
};

function printOperation(node, parent) {
    var result = void 0;

    switch (node.op) {
        case 'add':
            result = print(node.args[0], node);
            for (var i = 1; i < node.args.length; i++) {
                var arg = node.args[i];
                if (isNeg(arg) && arg.wasMinus) {
                    result += ' - ' + print(arg.args[0], node);
                } else {
                    result += ' + ' + print(arg, node);
                }
            }
            return parent ? '(' + result + ')' : result;
        case 'neg':
            return '-' + print(node.args[0], node);
        case 'pos':
            return '+' + print(node.args[0], node);
        case 'pn':
            throw new Error('we don\'t handle \'pn\' operations yet');
        case 'np':
            throw new Error('we don\'t handle \'np\' operations yet');
        case 'mul':
            if (node.implicit) {
                return node.args.map(function (arg) {
                    return print(arg, node);
                }).join(' ');
            } else {
                return node.args.map(function (arg) {
                    return print(arg, node);
                }).join(' * ');
            }
        case 'div':
            result = '';
            if (isAdd(node.args[0]) || isMul(node.args[0])) {
                result += '(' + print(node.args[0], node) + ')';
            } else {
                result += print(node.args[0], node);
            }
            result += ' / ';
            if (isAdd(node.args[1]) || isMul(node.args[1])) {
                result += '(' + print(node.args[1], node) + ')';
            } else {
                result += print(node.args[1], node);
            }
            return result;
        case 'pow':
            return print(node.args[0], node) + '^' + print(node.args[1], node);
        case 'fact':
            throw new Error('we don\'t handle \'fact\' operations yet');
        default:
            throw new Error('unrecognized operation');
    }
}

function print(node) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
            return node.args.map(function (arg) {
                return print(arg, node);
            }).join(' ' + node.rel + ' ');
        case 'Operation':
            return printOperation(node, parent);
        case 'Function':
            return node.fn + '(' + node.args.map(function (arg) {
                return print(arg, node);
            }).join(', ') + ')';

        // leaf nodes
        case 'Identifier':
            return node.name;
        case 'Number':
            return node.value;

        // irregular non-leaf nodes
        case 'Brackets':
            return '(' + print(node.content, node) + ')';

        default:
            console.log(node); // eslint-disable-line no-console
            throw new Error('unrecognized node');
    }
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * replace - visit all nodes in the tree with the ability to replace them.
 *
 * This function may modify the node passed in and/or any of its descendants.
 *
 * If neither 'enter' nor 'leave' return a value, the node is unchanged.
 * If 'enter' returns a new node, the children of the new node will be traversed
 * instead of the old one.  If both 'enter' and 'leave' return values, the
 * value returned by 'leave' is the node that will end up in the new AST.
 */

function replace(node, _ref) {
    var enter = _ref.enter,
        leave = _ref.leave;

    var rep = enter && enter(node) || node;

    switch (rep.type) {
        // regular non-leaf nodes
        case 'Relation':
        case 'Operation':
        case 'Function':
            for (var i = 0; i < rep.args.length; i++) {
                var arg = rep.args[i];
                rep.args[i] = replace(arg, { enter: enter, leave: leave });
            }
            break;

        // Skip leaf nodes because they're handled by the enter/leave calls at
        // the start/end of replace.
        case 'Identifier':
        case 'Number':
            break;

        // irregular non-leaf nodes
        case 'Brackets':
            rep.content = replace(rep.content, { enter: enter, leave: leave });
            break;

        case 'List':
        case 'Sequence':
            for (var _i = 0; _i < rep.args.length; _i++) {
                var item = rep.items[_i];
                rep.items[_i] = replace(item, { enter: enter, leave: leave });
            }
            break;

        case 'System':
            for (var _i2 = 0; _i2 < rep.relations.length; _i2++) {
                var rel = rep.relations[_i2];
                rep.relations[_i2] = replace(rel, { enter: enter, leave: leave });
            }
            break;

        case 'Placeholder':
            // TODO(kevinb) handle children of the placeholder
            // e.g. we there might #a_0 could match x_0, y_0, z_0, etc.
            break;

        default:
            throw new Error('unrecognized node');
    }

    return leave && leave(rep) || rep;
}

module.exports = replace;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * traverse - walk all of the nodes in a tree.
 */

function traverse(node, _ref) {
    var _ref$enter = _ref.enter,
        enter = _ref$enter === undefined ? function () {} : _ref$enter,
        _ref$leave = _ref.leave,
        leave = _ref$leave === undefined ? function () {} : _ref$leave;

    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
        case 'Operation':
        case 'Function':
            enter(node);
            node.args.forEach(function (arg) {
                return traverse(arg, { enter: enter, leave: leave });
            });
            leave(node);
            break;

        // leaf nodes
        case 'Identifier':
        case 'Number':
            enter(node);
            leave(node);
            break;

        // irregular non-leaf nodes
        case 'Brackets':
            enter(node);
            traverse(node.content, { enter: enter, leave: leave });
            leave(node);
            break;

        case 'List':
        case 'Sequence':
            enter(node);
            node.items.forEach(function (item) {
                return traverse(item, { enter: enter, leave: leave });
            });
            leave(node);
            break;

        case 'System':
            enter(node);
            node.relations.forEach(function (rel) {
                return traverse(rel, { enter: enter, leave: leave });
            });
            leave(node);
            break;

        case 'Placeholder':
            // TODO(kevinb) handle children of the placeholder
            // e.g. we there might #a_0 could match x_0, y_0, z_0, etc.
            enter(node);
            leave(node);
            break;

        default:
            throw new Error('unrecognized node: ' + node.type);
    }
}

module.exports = traverse;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    replace: __webpack_require__(0),
    traverse: __webpack_require__(1)
};

/***/ })
/******/ ]);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.print = exports.parse = exports.nodes = exports.evaluate = undefined;

var _evaluate = __webpack_require__(1);

var _evaluate2 = _interopRequireDefault(_evaluate);

var _nodes = __webpack_require__(0);

var nodes = _interopRequireWildcard(_nodes);

var _parse = __webpack_require__(2);

var _parse2 = _interopRequireDefault(_parse);

var _print = __webpack_require__(3);

var _print2 = _interopRequireDefault(_print);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.evaluate = _evaluate2.default;
exports.nodes = nodes;
exports.parse = _parse2.default;
exports.print = _print2.default;

/***/ })
/******/ ]);