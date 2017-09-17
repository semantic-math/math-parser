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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Functions to build nodes
 */

var apply = exports.apply = function apply(op, args) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return _extends({
        type: 'Apply',
        op: op,
        args: args
    }, options);
};

// Operations

var neg = exports.neg = function neg(arg) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return apply('neg', [arg], options);
}; // options: wasMinus
var add = exports.add = function add() {
    for (var _len = arguments.length, terms = Array(_len), _key = 0; _key < _len; _key++) {
        terms[_key] = arguments[_key];
    }

    return apply('add', terms);
};
var sub = exports.sub = function sub(minuend, subtrahend) {
    return apply('add', [minuend, neg(subtrahend, { wasMinus: true })]);
};
var mul = exports.mul = function mul() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return apply('mul', args);
};
var implicitMul = exports.implicitMul = function implicitMul() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return apply('mul', args, { implicit: true });
};
var div = exports.div = function div(numerator, denominator) {
    return apply('div', [numerator, denominator]);
};
var pow = exports.pow = function pow(base, exponent) {
    return apply('pow', [base, exponent]);
};
var abs = exports.abs = function abs(arg) {
    return apply('abs', [arg]);
};
var fact = exports.fact = function fact(arg) {
    return apply('fact', [arg]);
};
var nthRoot = exports.nthRoot = function nthRoot(radicand, index) {
    return apply('nthRoot', [radicand, index || number('2')]);
};

// Relations

var eq = exports.eq = function eq() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    return apply('eq', args);
};
var ne = exports.ne = function ne() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
    }

    return apply('ne', args);
};
var lt = exports.lt = function lt() {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
    }

    return apply('lt', args);
};
var le = exports.le = function le() {
    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
    }

    return apply('le', args);
};
var gt = exports.gt = function gt() {
    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
    }

    return apply('gt', args);
};
var ge = exports.ge = function ge() {
    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
    }

    return apply('ge', args);
};

var identifier = exports.identifier = function identifier(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _extends({
        type: 'Identifier',
        name: name
    }, options);
};

var number = exports.number = function number(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _extends({
        type: 'Number',
        value: String(value)
    }, options);
};

var parens = exports.parens = function parens(body) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _extends({
        type: 'Parentheses',
        body: body
    }, options);
};

// deprecated aliases
var parensNode = exports.parensNode = parens;
var numberNode = exports.numberNode = number;
var identifierNode = exports.identifierNode = identifier;
var applyNode = exports.applyNode = apply;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Functions to query properties of nodes
 */

var build = __webpack_require__(0);

var _require = __webpack_require__(3),
    print = _require.print;

var isIdentifier = exports.isIdentifier = function isIdentifier(node) {
    return node && node.type === 'Identifier';
};
var isApply = exports.isApply = function isApply(node) {
    return node && node.type === 'Apply';
};
var isParens = exports.isParens = function isParens(node) {
    return node && node.type === 'Parentheses';
};

// deprecated, use isApply
var isOperation = exports.isOperation = function isOperation(node) {
    return isApply(node) && !isNumber(node);
};
var isFunction = exports.isFunction = function isFunction(node) {
    return isApply(node) && isIdentifier(node.op);
};

// TODO: curry it?
var _isOp = exports._isOp = function _isOp(op, node) {
    return isApply(node) && node.op === op;
};
var hasArity = exports.hasArity = function hasArity(arity, node) {
    return node.args && node.args.length === arity;
};

var isAdd = exports.isAdd = function isAdd(node) {
    return _isOp('add', node) && node.args.length > 1;
};
var isMul = exports.isMul = function isMul(node) {
    return _isOp('mul', node) && node.args.length > 1;
};
var isDiv = exports.isDiv = function isDiv(node) {
    return _isOp('div', node) && hasArity(2, node);
};
var isPow = exports.isPow = function isPow(node) {
    return _isOp('pow', node) && hasArity(2, node);
};
var isNeg = exports.isNeg = function isNeg(node) {
    return _isOp('neg', node) && hasArity(1, node);
};
var isPos = exports.isPos = function isPos(node) {
    return _isOp('pos', node) && hasArity(1, node);
};
var isAbs = exports.isAbs = function isAbs(node) {
    return _isOp('abs', node) && hasArity(1, node);
};
var isFact = exports.isFact = function isFact(node) {
    return _isOp('fact', node) && hasArity(1, node);
};
var isNthRoot = exports.isNthRoot = function isNthRoot(node) {
    return _isOp('nthRoot', node) && hasArity(2, node);
};

var isFraction = exports.isFraction = function isFraction(node) {
    return isNeg(node) ? isFraction(node.args[0]) : isDiv(node);
};
var isConstantFraction = exports.isConstantFraction = function isConstantFraction(node) {
    return isFraction(node) && node.args.every(isNumber);
};
var isIntegerFraction = exports.isIntegerFraction = function isIntegerFraction(node) {
    return isFraction(node) && node.args.every(isInteger);
};
var isDecimal = exports.isDecimal = function isDecimal(node) {
    return isNumber(node) && getValue(node) % 1 != 0;
};

var relationIdentifierMap = {
    'eq': '=',
    'lt': '<',
    'le': '<=',
    'gt': '>',
    'ge': '>=',
    'ne': '!='
};

var isRel = exports.isRel = function isRel(node) {
    return isApply(node) && node.op in relationIdentifierMap;
};

var isNumber = exports.isNumber = function isNumber(node) {
    if (node.type === 'Number') {
        return true;
    } else if (isNeg(node)) {
        return isNumber(node.args[0]);
    } else {
        return false;
    }
};

var isInteger = exports.isInteger = function isInteger(node) {
    return isNumber(node) && Number.isInteger(getValue(node));
};

var isPolynomial = exports.isPolynomial = function isPolynomial(node) {
    if (isPolynomialTerm(node)) {
        return true;
    } else if (isDiv(node)) {
        return isNumber(getDenominator(node)) && isPolynomial(getNumerator(node));
    } else if (isAdd(node) || isMul(node)) {
        return node.args.every(isPolynomialTerm);
    } else {
        return false;
    }
};

var isVariableFactor = exports.isVariableFactor = function isVariableFactor(node) {
    return isIdentifier(node) || isPow(node) && (isPolynomial(node.args[0]) || isPolynomialTerm(node)) && (isNumber(node.args[1]) || isVariableFactor(node.args[1]));
};

var isPolynomialTerm = exports.isPolynomialTerm = function isPolynomialTerm(node) {
    if (isNumber(node) || isConstantFraction(node) || isDecimal(node)) {
        return true;
    } else if (isIdentifier(node)) {
        return true;
    } else if (isPow(node)) {
        var _node$args = _slicedToArray(node.args, 2),
            base = _node$args[0],
            exponent = _node$args[1];

        var positiveExp = isInteger(exponent) ? getValue(exponent) >= 1 : true;
        return isPolynomial(base) && isPolynomial(exponent) && positiveExp;
    } else if (isNeg(node)) {
        return isPolynomialTerm(node.args[0]);
    } else if (isMul(node)) {
        return node.args.every(isPolynomialTerm) && node.implicit;
    } else {
        return false;
    }
};

var isImplicitMul = exports.isImplicitMul = function isImplicitMul(node) {
    if (isMul(node)) {
        return node.implicit;
    } else if (isNeg(node)) {
        return isImplicitMul(node.args[0]);
    } else {
        return false;
    }
};

// check if it's a number before trying to get its value
var getValue = exports.getValue = function getValue(node) {
    if (node.type === 'Number') {
        return parseFloat(node.value);
    } else if (isNeg(node)) {
        return -getValue(node.args[0]);
    } else if (isPos(node)) {
        return getValue(node.args[0]);
    } else {
        return null;
    }
};

var getNumerator = exports.getNumerator = function getNumerator(node) {
    if (isFraction(node)) {
        return isNeg(node) ? getNumerator(node.args[0]) : node.args[0];
    } else {
        return null;
    }
};

var getDenominator = exports.getDenominator = function getDenominator(node) {
    if (isFraction(node)) {
        return isNeg(node) ? getDenominator(node.args[0]) : node.args[1];
    } else {
        return null;
    }
};

var hasConstantBase = exports.hasConstantBase = function hasConstantBase(node) {
    return isPow(node) && (isNumber(node.args[0]) || isConstantFraction(node.args[0]) || isIntegerFraction(node.args[0]));
};

// TODO: handle multivariable polynomials
// Get degree of a polynomial term
// e.g. 6x^2 -> 2
var getPolyDegree = exports.getPolyDegree = function getPolyDegree(node) {
    if (isNumber(node)) {
        return build.number(0);
    } else if (isIdentifier(node)) {
        return build.number(1);
    } else if (isPow(node)) {
        return node.args[1];
    } else if (isMul(node)) {
        // TODO: Math.max(...node.args.map(getPolyDegree))
        // TODO: same base appearing more than once
        return getPolyDegree(node.args[1]);
    } else if (isNeg(node)) {
        var variable = node.args[0];
        return getPolyDegree(variable.args[1]);
    } else {
        return null;
    }
};

// TODO: 2^2
var getCoefficient = exports.getCoefficient = function getCoefficient(node) {
    if (isNumber(node) || hasConstantBase(node)) {
        return node;
    } else if (isIdentifier(node) || isPow(node)) {
        return build.numberNode('1');
    } else if (isNeg(node)) {
        return build.neg(getCoefficient(node.args[0]), { wasMinus: node.wasMinus });
    } else if (isMul(node)) {
        var numbers = node.args.filter(function (arg) {
            return isNumber(arg) || isConstantFraction(arg);
        });
        if (numbers.length > 1) {
            return build.mul.apply(build, _toConsumableArray(numbers));
        } else if (numbers.length === 1) {
            return numbers[0];
        } else {
            return build.numberNode('1');
        }
    }
};

var getVariableFactors = exports.getVariableFactors = function getVariableFactors(node) {
    if (isVariableFactor(node)) {
        return [node];
    } else if (isMul(node)) {
        return node.args.filter(isVariableFactor);
    } else if (isNeg(node)) {
        // TODO: figure out how to handle (x)(-y)(z)
        return getVariableFactors(node.args[0]);
    } else {
        return [];
    }
};

var getVariableFactorName = exports.getVariableFactorName = function getVariableFactorName(node) {
    if (isIdentifier(node)) {
        return node.name;
    } else if (isPow(node)) {
        return getVariableFactorName(node.args[0]);
    } else {
        return null;
    }
};

var sortVariables = exports.sortVariables = function sortVariables(variables) {
    return variables.sort(function (a, b) {
        return getVariableFactorName(a) > getVariableFactorName(b);
    });
};

/*
  Returns a dictionary containing a coefficient map, a list of constants
  and other miscellaenous terms
  The coefficient map is a dictionary with unique polynomial terms as keys
  and a list of respective coefficients that appear in the expression as values.

  e.g. 2x^2 + 5x^2 + 3x + 3
  {constants: [3], coefficientMap: ['x^2': [2, 5], 'x': [3]]}
*/
var getCoefficientsAndConstants = exports.getCoefficientsAndConstants = function getCoefficientsAndConstants(node) {
    var coefficientMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var constants = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var others = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    if (isNumber(node) || isConstantFraction(node)) {
        constants.push(node);
    } else if (isFunction(node)) {
        // cos, sin, f(a), etc
        others.push(node);
    } else if (isPolynomialTerm(node) && !hasConstantBase(node)) {
        // x^2, 3x^2

        // sort the variables first (2yzx -> 2xyz)
        var sortedVariables = sortVariables(getVariableFactors(node));

        var coefficient = getCoefficient(node);
        var implicit = isImplicitMul(node);
        var key = sortedVariables.length > 1 ? print(build.applyNode('mul', sortedVariables, { implicit: implicit })) : print(sortedVariables[0]);

        if (!(key in coefficientMap)) {
            coefficientMap[key] = [coefficient];
        } else {
            coefficientMap[key].push(coefficient);
        }
    } else if (isPolynomial(node) || isApply(node)) {
        // 2x^2 + 3x + 1, 3x^2 * 2x^2
        node.args.forEach(function (arg) {
            getCoefficientsAndConstants(arg, coefficientMap, constants, others);
        });
    } else {
        others.push(node);
    }

    return { coefficientMap: coefficientMap, constants: constants, others: others };
};

// returns true if two nodes have the same base variable
// e.g. (x + 1)^1 and (x + 1)^3 , true
// e.g. x^2, (x + 1)^2, false
var hasSameBase = exports.hasSameBase = function hasSameBase(node1, node2) {
    return nodeEquals(node1, node2) || isPow(node1) && nodeEquals(node1.args[0], node2) || isPow(node2) && nodeEquals(node1, node2.args[0]) || isPow(node1) && isPow(node2) && nodeEquals(node1.args[0], node2.args[0]);
};

var nodeEquals = exports.nodeEquals = function nodeEquals(node1, node2) {
    return print(node1) === print(node2);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.query = exports.build = undefined;

var _build = __webpack_require__(0);

var build = _interopRequireWildcard(_build);

var _query = __webpack_require__(1);

var query = _interopRequireWildcard(_query);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.build = build;
exports.query = query;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Functions to build nodes
 */

var apply = exports.apply = function apply(op, args) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return _extends({
        type: 'Apply',
        op: op,
        args: args
    }, options);
};

// Operations

var neg = exports.neg = function neg(arg) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return apply('neg', [arg], options);
}; // options: wasMinus
var add = exports.add = function add() {
    for (var _len = arguments.length, terms = Array(_len), _key = 0; _key < _len; _key++) {
        terms[_key] = arguments[_key];
    }

    return apply('add', terms);
};
var sub = exports.sub = function sub(minuend, subtrahend) {
    return apply('add', [minuend, neg(subtrahend, { wasMinus: true })]);
};
var mul = exports.mul = function mul() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return apply('mul', args);
};
var implicitMul = exports.implicitMul = function implicitMul() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return apply('mul', args, { implicit: true });
};
var div = exports.div = function div(numerator, denominator) {
    return apply('div', [numerator, denominator]);
};
var pow = exports.pow = function pow(base, exponent) {
    return apply('pow', [base, exponent]);
};
var abs = exports.abs = function abs(arg) {
    return apply('abs', [arg]);
};
var fact = exports.fact = function fact(arg) {
    return apply('fact', [arg]);
};
var nthRoot = exports.nthRoot = function nthRoot(radicand, index) {
    return apply('nthRoot', [radicand, index || number('2')]);
};

// Relations

var eq = exports.eq = function eq() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    return apply('eq', args);
};
var ne = exports.ne = function ne() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
    }

    return apply('ne', args);
};
var lt = exports.lt = function lt() {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
    }

    return apply('lt', args);
};
var le = exports.le = function le() {
    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
    }

    return apply('le', args);
};
var gt = exports.gt = function gt() {
    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
    }

    return apply('gt', args);
};
var ge = exports.ge = function ge() {
    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        args[_key9] = arguments[_key9];
    }

    return apply('ge', args);
};

var identifier = exports.identifier = function identifier(name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _extends({
        type: 'Identifier',
        name: name
    }, options);
};

var number = exports.number = function number(value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _extends({
        type: 'Number',
        value: value
    }, options);
};

var parens = exports.parens = function parens(body) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _extends({
        type: 'Parentheses',
        body: body
    }, options);
};

// deprecated aliases
var parensNode = exports.parensNode = parens;
var numberNode = exports.numberNode = number;
var identifierNode = exports.identifierNode = identifier;
var applyNode = exports.applyNode = apply;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Functions to query properties of nodes
 */

var isIdentifier = exports.isIdentifier = function isIdentifier(node) {
    return node && node.type === 'Identifier';
};
var isApply = exports.isApply = function isApply(node) {
    return node && node.type === 'Apply';
};

var isOperation = exports.isOperation = function isOperation(node) {
    return isApply(node) && !isNumber(node);
};
var isFunction = exports.isFunction = function isFunction(node) {
    return isApply(node) && isIdentifier(node.op);
};

// TODO: curry it?
var _isOp = function _isOp(op, node) {
    return isApply(node) && node.op === op;
};

var isAdd = exports.isAdd = function isAdd(node) {
    return _isOp('add', node);
};
var isMul = exports.isMul = function isMul(node) {
    return _isOp('mul', node);
};
var isDiv = exports.isDiv = function isDiv(node) {
    return _isOp('div', node);
};
var isPow = exports.isPow = function isPow(node) {
    return _isOp('pow', node);
};
var isNeg = exports.isNeg = function isNeg(node) {
    return _isOp('neg', node);
};
var isPos = exports.isPos = function isPos(node) {
    return _isOp('pos', node);
};
var isAbs = exports.isAbs = function isAbs(node) {
    return _isOp('abs', node);
};
var isFact = exports.isFact = function isFact(node) {
    return _isOp('fact', node);
};
var isNthRoot = exports.isNthRoot = function isNthRoot(node) {
    return _isOp('nthRoot', node);
};

var relationIdentifierMap = {
    'eq': '=',
    'lt': '<',
    'le': '<=',
    'gt': '>',
    'ge': '>=',
    'ne': '!='
};

var isRel = exports.isRel = function isRel(node) {
    return isApply(node) && node.op in relationIdentifierMap;
};

var isNumber = exports.isNumber = function isNumber(node) {
    if (node.type === 'Number') {
        return true;
    } else if (isNeg(node)) {
        return isNumber(node.args[0]);
    } else {
        return false;
    }
};

// check if it's a number before trying to get its value
var getValue = exports.getValue = function getValue(node) {
    if (node.type === 'Number') {
        return parseFloat(node.value);
    } else if (isNeg(node)) {
        return -getValue(node.args[0]);
    } else if (isPos(node)) {
        return getValue(node.args[0]);
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.query = exports.build = undefined;

var _build = __webpack_require__(0);

var build = _interopRequireWildcard(_build);

var _query = __webpack_require__(1);

var query = _interopRequireWildcard(_query);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.build = build;
exports.query = query;

/***/ })
/******/ ]);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _mathNodes = __webpack_require__(0);

var _mathTraverse = __webpack_require__(3);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isIdentifierToken(token) {
    return token && /[a-zA-Z][a-zA-Z0-9]*/.test(token.value);
}

function isNumberToken(token) {
    return token && /\d*\.\d+|\d+\.\d*|\d+/.test(token.value);
}

var tokenPattern = /\.\.\.|[a-zA-Z][a-zA-Z0-9]*|<=|>=|!=|[\<\>\!\=\(\)\+\-\/\*\^\<\>|\,\#\_]|\d*\.\d+|\d+\.\d*|\d+/;

var relationTokenMap = {
    '=': 'eq',
    '<': 'lt',
    '<=': 'le',
    '>': 'gt',
    '>=': 'ge',
    '!=': 'ne'
};

function isIdentifier(node) {
    return node.type === 'Identifier';
}

function isRelation(node) {
    return node.type === 'Apply' && Object.values(relationTokenMap).includes(node.op);
}

function isExpression(node) {
    return ['System', 'List', 'Sequence'].indexOf(node.type) === -1 || isRelation(node);
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

            var regex = new RegExp(tokenPattern, 'g');

            var index = 0;
            var match = void 0;

            while ((match = regex.exec(input)) != null) {
                var start = match.index;
                var end = match.index + match[0].length;

                this.tokens.push({
                    value: match[0],
                    start: start,
                    end: end
                });

                if (index !== start) {
                    var skipped = input.slice(index, start).trim();
                    if (skipped !== '') {
                        throw new Error('\'' + skipped + '\' not recognized');
                    }
                }

                index = end;
            }

            if (index !== input.length) {
                var _skipped = input.slice(index, input.length).trim();
                if (_skipped !== '') {
                    throw new Error('\'' + _skipped + '\' not recognized');
                }
            }

            var result = this.list();

            if (this.i < this.tokens.length) {
                throw new Error('extra input not recognized');
            }

            return result;
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
                    return isRelation(item);
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
            var args = [];

            var left = void 0;
            var right = void 0;

            left = this.expression();

            while (true) {
                var token = this.currentToken();

                if (token && token.value in relationTokenMap) {
                    this.consume();
                    right = this.expression();
                    var rel = relationTokenMap[token.value];
                    relations.push(_mathNodes.build.applyNode(rel, [left, right]));
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
    }, {
        key: 'expression',
        value: function expression() {
            var args = [];

            args.push(this.explicitMul());

            while (true) {
                var token = this.currentToken();

                if (matches(token, '-')) {
                    this.consume('-');
                    args.push(_mathNodes.build.applyNode('neg', [this.explicitMul()], { wasMinus: true }));
                } else if (matches(token, '+')) {
                    this.consume('+');
                    args.push(this.explicitMul());
                } else {
                    break;
                }
            }

            if (args.length > 1) {
                return _mathNodes.build.applyNode('add', args.map(function (term) {
                    return term.addParens ? _mathNodes.build.parensNode(term) : term;
                }));
            } else {
                if (args[0].addParens) {
                    return _mathNodes.build.parensNode(args[0]);
                } else {
                    return args[0];
                }
            }
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

            return factors.length > 1 ? _mathNodes.build.applyNode('mul', factors) : factors[0];
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

            return factors.length > 1 ? _mathNodes.build.applyNode('mul', factors, { implicit: true }) : factors[0];
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
                        frac = _mathNodes.build.applyNode('div', [frac, denominator]);
                    } else {
                        frac = _mathNodes.build.applyNode('div', [numerator, denominator]);
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

            if (matches(token, '...')) {
                this.consume('...');
                return {
                    type: 'Ellipsis'
                };
            }

            var signs = [];

            // handle multiple unary operators
            while (matches(token, '+') || matches(token, '-')) {
                signs.push(token);
                this.consume(token.value);
                token = this.currentToken();
            }

            var base = void 0,
                exp = void 0;
            var addParens = false;

            if (matches(token, '#') || isIdentifierToken(token)) {
                var node = this.identifierOrPlaceholder();

                if (matches(this.currentToken(), '(')) {
                    this.consume('(');
                    var args = this.argumentList();
                    token = this.consume(')');
                    if (node.name === 'nthRoot') {
                        if (args.length < 1 || args.length > 2) {
                            throw new Error('nthRoot takes 1 or 2 args');
                        } else {
                            base = _mathNodes.build.nthRoot.apply(_mathNodes.build, _toConsumableArray(args));
                        }
                    } else {
                        base = _mathNodes.build.applyNode(node, args);
                    }
                } else {
                    // TODO(kevinb) valid the constraint type against the node
                    // e.g. if it's a 'Number' then it can't have a subscript
                    base = node;
                }
            } else if (isNumberToken(token)) {
                this.consume(token.value);
                base = _mathNodes.build.numberNode(token.value);
            } else if (matches(token, '(')) {
                this.consume('(');
                base = this.expression();
                token = this.consume(')');
                addParens = true;
                if (base.type === 'Number' || isIdentifier(base)) {
                    base = _mathNodes.build.parensNode(base);
                    addParens = false;
                }
            } else if (matches(token, '|')) {
                this.consume('|');
                base = this.expression();
                token = this.consume('|');

                base = _mathNodes.build.applyNode('abs', [base]);
            }

            if (matches(this.currentToken(), '!')) {
                this.consume('!');
                // print will add parentheses back in if a 'fact' node wraps the
                // expression.
                addParens = false;
                base = _mathNodes.build.applyNode('fact', [base]);
            }

            var factor = base;

            // TODO handle exponents separately
            if (matches(this.currentToken(), '^')) {
                this.consume('^');
                exp = this.factor();
                factor = _mathNodes.build.applyNode('pow', [base, exp]);
                addParens = false;
            }

            // Reverse the signs so that we process them from the sign nearest
            // to the factor to the furthest.
            signs.reverse();

            signs.forEach(function (sign) {
                if (sign.value === '+') {
                    factor = _mathNodes.build.applyNode('pos', [factor]);
                } else {
                    factor = _mathNodes.build.applyNode('neg', [factor]);
                }
                addParens = false;
            });

            if (addParens) {
                factor.addParens = addParens;
            }
            return factor;
        }
    }, {
        key: 'identifierOrPlaceholder',
        value: function identifierOrPlaceholder() {
            var token = this.currentToken();

            var isPlaceholder = false;
            if (matches(token, '#')) {
                isPlaceholder = true;
                this.consume('#');
                token = this.currentToken();
            }

            if (!isIdentifierToken(token)) {
                throw new Error('\'#\' must be followed by an identifier');
            }

            var result = this.identifier();

            if (isPlaceholder) {
                result.type = 'Placeholder';
            }

            return result;
        }
    }, {
        key: 'identifier',
        value: function identifier() {
            var token = this.currentToken();

            var name = token.value;
            var result = _mathNodes.build.identifierNode(name);
            this.consume(name);

            token = this.currentToken();

            // This only handles very simple subscripts, e.g. a_0, a_n
            // It doesn't handle: a_-1, a_(m+n), etc.
            // The precedence of subscripts is very high: a_0^2 => (a_0)^2
            if (matches(token, '_')) {
                this.consume('_');

                token = this.currentToken();

                if (isNumberToken(token)) {
                    result.subscript = _mathNodes.build.numberNode(token.value);
                    this.consume(token.value);
                } else if (isIdentifierToken(token)) {
                    result.subscript = _mathNodes.build.identifierNode(token.value);
                    this.consume(token.value);
                } else {
                    throw new Error('Can\'t handle \'' + token.value + '\' as a subscript');
                }
            }

            return result;
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

var parser = new Parser();

function parse(math) {
    var ast = parser.parse(math);
    (0, _mathTraverse.traverse)(ast, {
        leave: function leave(node) {
            if (node.hasOwnProperty('addParens')) {
                delete node.addParens;
            }
        }
    });
    return ast;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * print - return a string representation of the nodes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


exports.default = print;

var _mathNodes = __webpack_require__(0);

var relationIdentifierMap = {
    'eq': '=',
    'lt': '<',
    'le': '<=',
    'gt': '>',
    'ge': '>=',
    'ne': '!='
};

var printApply = function printApply(node, parent) {
    var op = node.op,
        args = node.args;


    if (op === 'add') {
        var result = print(args[0], node);
        for (var i = 1; i < args.length; i++) {
            var arg = args[i];
            if (_mathNodes.query.isNeg(arg) && arg.wasMinus) {
                result += ' - ' + print(arg.args[0], node);
            } else {
                result += ' + ' + print(arg, node);
            }
        }
        return parent && !_mathNodes.query.isRel(parent) && parent.type !== 'Parentheses' ? '(' + result + ')' : result;
    } else if (op === 'mul') {
        var _result = node.implicit ? args.map(function (arg) {
            return print(arg, node);
        }).join(' ') : args.map(function (arg) {
            return print(arg, node);
        }).join(' * ');
        if (_mathNodes.query.isMul(parent)) {
            if (node.implicit && !parent.implicit) {
                return _result;
            } else {
                return '(' + _result + ')';
            }
        } else if (_mathNodes.query.isPow(parent) || _mathNodes.query.isDiv(parent)) {
            return '(' + _result + ')';
        } else {
            return _result;
        }
    } else if (op === 'div') {
        var _result2 = '';
        _result2 += print(args[0], node);
        _result2 += ' / ';
        if (_mathNodes.query.isDiv(args[1])) {
            _result2 += '(' + print(args[1], node) + ')';
        } else {
            _result2 += print(args[1], node);
        }
        return _mathNodes.query.isPow(parent) ? '(' + _result2 + ')' : _result2;
    } else if (op === 'pow') {
        var _node$args = _slicedToArray(node.args, 2),
            base = _node$args[0],
            exp = _node$args[1];

        return _mathNodes.query.isNeg(base) ? '(' + print(base, node) + ')^' + print(exp, node) : print(base, node) + '^' + print(exp, node);
    } else if (op === 'neg') {
        return '-' + print(args[0], node);
    } else if (op === 'pos') {
        return '+' + print(args[0], node);
    } else if (op === 'pn') {
        throw new Error('we don\'t handle \'pn\' operations yet');
    } else if (op === 'np') {
        throw new Error('we don\'t handle \'np\' operations yet');
    } else if (op === 'fact') {
        if (args[0].op === 'pow' || args[0].op === 'mul' || args[0].op === 'div') {
            return '(' + print(args[0], node) + ')!';
        } else {
            return print(args[0], node) + '!';
        }
    } else if (op === 'nthRoot') {
        return 'nthRoot(' + args.map(function (arg) {
            return print(arg, node);
        }).join(', ') + ')';
    } else if (op === 'abs') {
        return '|' + print(args[0]) + '|';
    } else if (op in relationIdentifierMap) {
        var symbol = relationIdentifierMap[op];
        return args.map(function (arg) {
            return print(arg, node);
        }).join(' ' + symbol + ' ');
    } else {
        return print(op) + '(' + args.map(function (arg) {
            return print(arg, node);
        }).join(', ') + ')';
    }
};

function print(node) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply':
            return printApply(node, parent);

        // irregular non-leaf nodes
        case 'Parentheses':
            return '(' + print(node.body, node) + ')';

        case 'Sequence':
            return node.items.map(print).join(', ');

        // leaf nodes
        case 'Identifier':
            if (node.subscript) {
                return node.name + '_' + print(node.subscript);
            } else {
                return node.name;
            }

        case 'Placeholder':
            if (node.subscript) {
                return '#' + node.name + '_' + print(node.subscript);
            } else {
                return '#' + node.name;
            }

        case 'Number':
            return node.value;

        case 'Ellipsis':
            return '...';

        default:
            console.log(node); // eslint-disable-line no-console
            throw new Error('unrecognized node');
    }
}

/***/ }),
/* 3 */
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
        case 'Apply':
            for (var i = 0; i < rep.args.length; i++) {
                var arg = rep.args[i];
                rep.args[i] = replace(arg, { enter: enter, leave: leave });
            }
            break;

        // Skip leaf nodes because they're handled by the enter/leave calls at
        // the start/end of replace.
        case 'Identifier':
        case 'Number':
        case 'Ellipsis':
            break;

        // irregular non-leaf nodes
        case 'Parentheses':
            rep.body = replace(rep.body, { enter: enter, leave: leave });
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


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * traverse - walk all of the nodes in a tree.
 */

function traverse(node, _ref) {
    var _ref$enter = _ref.enter,
        enter = _ref$enter === undefined ? function () {} : _ref$enter,
        _ref$leave = _ref.leave,
        leave = _ref$leave === undefined ? function () {} : _ref$leave;
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply':
            enter(node, path);
            node.args.forEach(function (arg, index) {
                return traverse(arg, { enter: enter, leave: leave }, [].concat(_toConsumableArray(path), ['args', index]));
            });
            leave(node, path);
            break;

        // leaf nodes
        case 'Identifier':
        case 'Number':
        case 'Ellipsis':
            enter(node, path);
            leave(node, path);
            break;

        // irregular non-leaf nodes
        case 'Parentheses':
            enter(node, path);
            traverse(node.body, { enter: enter, leave: leave }, [].concat(_toConsumableArray(path), ['body']));
            leave(node, path);
            break;

        case 'List':
        case 'Sequence':
            enter(node, path);
            node.items.forEach(function (item, index) {
                return traverse(item, { enter: enter, leave: leave }, [].concat(_toConsumableArray(path), ['items', index]));
            });
            leave(node, path);
            break;

        case 'System':
            enter(node, path);
            node.relations.forEach(function (rel, index) {
                return traverse(rel, { enter: enter, leave: leave }, [].concat(_toConsumableArray(path), ['relations', index]));
            });
            leave(node, path);
            break;

        case 'Placeholder':
            // TODO(kevinb) handle children of the placeholder
            // e.g. we there might #a_0 could match x_0, y_0, z_0, etc.
            enter(node, path);
            leave(node, path);
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.print = exports.parse = undefined;

var _parse = __webpack_require__(1);

var _parse2 = _interopRequireDefault(_parse);

var _print = __webpack_require__(2);

var _print2 = _interopRequireDefault(_print);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.parse = _parse2.default;
exports.print = _print2.default;

/***/ })
/******/ ]);

/***/ })
/******/ ]);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _mathNodes = __webpack_require__(0);

var _mathTraverse = __webpack_require__(4);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isIdentifierToken(token) {
    return token && /^[a-zA-Z][a-zA-Z0-9]*$/.test(token.value);
}

function isNumberToken(token) {
    return token && /^(\d*\.\d+|\d+\.\d*|\d+)$/.test(token.value);
}

var tokenPattern = /\.\.\.|[a-zA-Z][a-zA-Z0-9]*|<=|>=|!=|[\<\>\!\=\(\)\+\-\/\*\^\<\>|\,\#\_]|\d*\.\d+|\d+\.\d*|\d+/;

var relationTokenMap = {
    '=': 'eq',
    '<': 'lt',
    '<=': 'le',
    '>': 'gt',
    '>=': 'ge',
    '!=': 'ne'
};

function isIdentifier(node) {
    return node.type === 'Identifier';
}

function isRelation(node) {
    return node.type === 'Apply' && Object.values(relationTokenMap).includes(node.op);
}

function isExpression(node) {
    return ['System', 'List', 'Sequence'].indexOf(node.type) === -1 || isRelation(node);
}

function matches(token, value) {
    return token && token.value === value;
}

// TODO(kevinb): make this list more complete
var wellKnownIdentifiers = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2', 'pi', 'e', 'alpha', 'beta', 'delta', 'gamma', 'int', 'abs', 'nthRoot'];

function isWellKnown(identifier) {
    return wellKnownIdentifiers.includes(identifier.name);
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
            this.integrals = 0;

            var regex = new RegExp(tokenPattern, 'g');

            var index = 0;
            var match = void 0;

            while ((match = regex.exec(input)) != null) {
                var start = match.index;
                var end = regex.lastIndex;

                this.tokens.push({
                    value: match[0],
                    start: start,
                    end: end
                });

                if (index !== start) {
                    var skipped = input.slice(index, start).trim();
                    if (skipped !== '') {
                        throw new Error('\'' + skipped + '\' not recognized');
                    }
                }

                index = end;
            }

            if (index !== input.length) {
                var _skipped = input.slice(index, input.length).trim();
                if (_skipped !== '') {
                    throw new Error('\'' + _skipped + '\' not recognized');
                }
            }

            var result = this.list();

            if (this.i < this.tokens.length) {
                throw new Error('extra input not recognized');
            }

            return result;
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
                    return isRelation(item);
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
            var args = [];

            var left = void 0;
            var right = void 0;

            left = this.expression();

            while (true) {
                var token = this.currentToken();

                if (token && token.value in relationTokenMap) {
                    this.consume();
                    right = this.expression();
                    var rel = relationTokenMap[token.value];
                    relations.push(_mathNodes.build.applyNode(rel, [left, right]));
                    args.push(left);
                    left = right;
                } else {
                    break;
                }
            }
            args.push(right);

            if (relations.length > 1) {
                var _ret = function () {
                    relations.reverse();

                    var output = {
                        type: 'Apply',
                        op: 'and',
                        args: []
                    };

                    var current = {
                        type: 'Apply',
                        op: relations[0].op,
                        args: []
                    };

                    relations.forEach(function (item) {
                        if (item.op !== current.op) {
                            current.args.unshift(item.args[1]);

                            output.args.unshift(current);

                            current = {
                                type: 'Apply',
                                op: item.op,
                                args: [item.args[1]]
                            };
                        } else {
                            current.args.unshift(item.args[1]);
                        }
                    });

                    current.args.unshift(relations[relations.length - 1].args[0]);
                    output.args.unshift(current);

                    if (output.args.length === 1) {
                        return {
                            v: output.args[0]
                        };
                    }

                    return {
                        v: output
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
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
                    args.push(_mathNodes.build.applyNode('neg', [this.explicitMul()], { wasMinus: true }));
                } else if (matches(token, '+')) {
                    this.consume('+');
                    args.push(this.explicitMul());
                } else {
                    break;
                }
            }

            if (args.length > 1) {
                return _mathNodes.build.applyNode('add', args.map(function (term) {
                    return term.addParens ? _mathNodes.build.parensNode(term) : term;
                }));
            } else {
                if (args[0].addParens) {
                    return _mathNodes.build.parensNode(args[0]);
                } else {
                    return args[0];
                }
            }
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

            return factors.length > 1 ? _mathNodes.build.applyNode('mul', factors) : factors[0];
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

            var factor = this.division();
            if (_mathNodes.query.isIdentifier(factor) && !isWellKnown(factor)) {
                factors = factor.name.split('').map(_mathNodes.build.identifier);
                if (factor.subscript) {
                    factors[factors.length - 1].subscript = factor.subscript;
                }
            } else if (_mathNodes.query.isImplicitMul(factor) && factor.wasSplit) {
                var _factors;

                (_factors = factors).push.apply(_factors, _toConsumableArray(factor.args));
            } else {
                factors.push(factor);
            }

            while (true) {
                var token = this.currentToken();

                if (matches(token, '(') || matches(token, '#') || isIdentifierToken(token) || isNumberToken(token)) {
                    var _factor = this.division();
                    if (_factor) {
                        if (_mathNodes.query.isIdentifier(_factor) && !isWellKnown(_factor)) {
                            var _factors2;

                            (_factors2 = factors).push.apply(_factors2, _toConsumableArray(_factor.name.split('').map(_mathNodes.build.identifier)));
                            if (_factor.subscript) {
                                factors[factors.length - 1].subscript = _factor.subscript;
                            }
                        } else if (_mathNodes.query.isImplicitMul(_factor) && _factor.wasSplit) {
                            var _factors3;

                            (_factors3 = factors).push.apply(_factors3, _toConsumableArray(_factor.args));
                        } else {
                            factors.push(_factor);
                        }
                    } else {
                        break;
                    }
                } else {
                    break;
                }

                if (this.i > this.tokens.length) {
                    break;
                }
            }

            return factors.length > 1 ? _mathNodes.build.applyNode('mul', factors, { implicit: true }) : factors[0];
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
                        frac = _mathNodes.build.applyNode('div', [frac, denominator]);
                    } else {
                        frac = _mathNodes.build.applyNode('div', [numerator, denominator]);
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

            if (matches(token, '...')) {
                this.consume('...');
                return {
                    type: 'Ellipsis'
                };
            }

            var signs = [];

            // handle multiple unary operators
            while (matches(token, '+') || matches(token, '-')) {
                signs.push(token);
                this.consume(token.value);
                token = this.currentToken();
            }

            var base = void 0,
                exp = void 0;
            var addParens = false;

            if (matches(token, '#') || isIdentifierToken(token)) {
                var node = this.identifierOrPlaceholder();

                if (this.integrals > 0 && isIdentifier(node) && /d[a-z]+/.test(node.name)) {
                    // backup
                    this.integrals--;
                    return;
                }

                if (matches(this.currentToken(), '(')) {
                    this.consume('(');
                    var args = this.argumentList();
                    token = this.consume(')');
                    if (node.name === 'nthRoot') {
                        if (args.length < 1 || args.length > 2) {
                            throw new Error('nthRoot takes 1 or 2 args');
                        } else {
                            base = _mathNodes.build.nthRoot.apply(_mathNodes.build, _toConsumableArray(args));
                        }
                    } else if (node.name === 'int') {
                        // TODO(kevinb(remove) this version of integrals
                        if (args.length >= 2 && args.length <= 4) {
                            base = _mathNodes.build.apply('int', args);
                        } else {
                            throw new Error('integral takes between 2 and 4 args');
                        }
                    } else {
                        if (_mathNodes.query.isIdentifier(node) && node.name === 'abs') {
                            base = _mathNodes.build.apply('abs', args);
                        } else {
                            base = _mathNodes.build.apply(node, args);
                        }
                    }
                } else {
                    if (_mathNodes.query.isIdentifier(node) && !isWellKnown(node) && node.name.length > 1) {
                        var factors = node.name.split('').map(_mathNodes.build.identifier);
                        if (node.subscript) {
                            factors[factors.length - 1].subscript = node.subscript;
                        }
                        base = _mathNodes.build.implicitMul.apply(_mathNodes.build, _toConsumableArray(factors));
                        base.wasSplit = true;
                    } else {
                        // TODO(kevinb) valid the constraint type against the node
                        // e.g. if it's a 'Number' then it can't have a subscript
                        base = node;
                    }
                }
            } else if (isNumberToken(token)) {
                this.consume(token.value);
                base = _mathNodes.build.numberNode(token.value);
            } else if (matches(token, '(')) {
                this.consume('(');
                base = this.expression();
                token = this.consume(')');
                addParens = true;
                if (base.type === 'Number' || isIdentifier(base)) {
                    base = _mathNodes.build.parensNode(base);
                    addParens = false;
                }
            } else if (matches(token, '|')) {
                this.consume('|');
                base = this.expression();
                token = this.consume('|');

                base = _mathNodes.build.applyNode('abs', [base]);
            }

            if (matches(this.currentToken(), '!')) {
                this.consume('!');
                // print will add parentheses back in if a 'fact' node wraps the
                // expression.
                addParens = false;
                base = _mathNodes.build.applyNode('fact', [base]);
            }

            var factor = base;

            // TODO handle exponents separately
            if (matches(this.currentToken(), '^')) {
                this.consume('^');
                exp = this.factor();
                if (_mathNodes.query.isImplicitMul(base) && base.wasSplit) {
                    var lastFactor = factor.args[factor.args.length - 1];
                    factor.args[factor.args.length - 1] = _mathNodes.build.applyNode('pow', [lastFactor, exp]);
                } else {
                    factor = _mathNodes.build.applyNode('pow', [base, exp]);
                }
                addParens = false;
            }

            // Reverse the signs so that we process them from the sign nearest
            // to the factor to the furthest.
            signs.reverse();

            signs.forEach(function (sign) {
                if (sign.value === '+') {
                    factor = _mathNodes.build.applyNode('pos', [factor]);
                } else {
                    factor = _mathNodes.build.applyNode('neg', [factor]);
                }
                addParens = false;
            });

            if (addParens) {
                factor.addParens = addParens;
            }

            if (_mathNodes.query.isPow(factor)) {
                var _factor$args = _slicedToArray(factor.args, 2),
                    _base = _factor$args[0],
                    exponent = _factor$args[1];

                if (_mathNodes.query.isIdentifier(_base) && _base.name === 'int') {
                    this.integrals++;
                    var body = this.expression();

                    // backup to get the token we ignore
                    this.i--;
                    token = this.currentToken();
                    this.consume(token.value);

                    var result = {
                        type: 'Apply',
                        op: 'int',
                        args: [body, _mathNodes.build.identifier(token.value)],
                        limits: [_base.subscript, exponent]
                    };

                    return result;
                }
            } else if (_mathNodes.query.isIdentifier(factor) && factor.name === 'int') {
                this.integrals++;
                var _body = this.expression();

                // backup to get the token we ignore
                this.i--;
                token = this.currentToken();
                this.consume(token.value);

                var _result = {
                    type: 'Apply',
                    op: 'int',
                    args: [_body, _mathNodes.build.identifier(token.value)]
                };

                return _result;
            }

            // TODO(kevinb): split up the factor if we can to handle cases like
            // xy^2z => (mul x (pow y 2) z)

            return factor;
        }
    }, {
        key: 'identifierOrPlaceholder',
        value: function identifierOrPlaceholder() {
            var token = this.currentToken();

            var isPlaceholder = false;
            if (matches(token, '#')) {
                isPlaceholder = true;
                this.consume('#');
                token = this.currentToken();
            }

            if (!isIdentifierToken(token)) {
                throw new Error('\'#\' must be followed by an identifier');
            }

            var result = this.identifier();

            if (isPlaceholder) {
                result.type = 'Placeholder';
            }

            return result;
        }
    }, {
        key: 'identifier',
        value: function identifier() {
            var token = this.currentToken();

            var name = token.value;
            var result = _mathNodes.build.identifier(name);
            this.consume(name);

            token = this.currentToken();

            // This only handles very simple subscripts, e.g. a_0, a_n
            // It doesn't handle: a_-1, a_(m+n), etc.
            // The precedence of subscripts is very high: a_0^2 => (a_0)^2
            if (matches(token, '_')) {
                this.consume('_');

                token = this.currentToken();

                if (isNumberToken(token)) {
                    result.subscript = _mathNodes.build.number(token.value);
                    this.consume(token.value);
                } else if (isIdentifierToken(token)) {
                    result.subscript = _mathNodes.build.identifier(token.value);
                    this.consume(token.value);
                } else {
                    throw new Error('Can\'t handle \'' + token.value + '\' as a subscript');
                }
            }

            return result;
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

var parser = new Parser();

function parse(math) {
    var ast = parser.parse(math);
    (0, _mathTraverse.traverse)(ast, {
        leave: function leave(node) {
            if (node.hasOwnProperty('addParens')) {
                delete node.addParens;
            }
        }
    });
    return ast;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * print - return a string representation of the nodes.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


exports.default = print;

var _mathNodes = __webpack_require__(0);

var relationIdentifierMap = {
    'eq': '=',
    'lt': '<',
    'le': '<=',
    'gt': '>',
    'ge': '>=',
    'ne': '!='
};

var printApply = function printApply(node, parent) {
    var op = node.op,
        args = node.args;


    if (op === 'add') {
        var result = printNode(args[0], node);
        for (var i = 1; i < args.length; i++) {
            var arg = args[i];
            if (_mathNodes.query.isNeg(arg) && arg.wasMinus) {
                result += ' - ' + printNode(arg.args[0], node);
            } else {
                result += ' + ' + printNode(arg, node);
            }
        }
        return parent && !_mathNodes.query.isRel(parent) && parent.type !== 'Parentheses' ? '(' + result + ')' : result;
    } else if (op === 'mul') {
        var _result = void 0;
        // printNode coefficients with no spaces when possible - e.g. 2x not 2 x
        // if there are more than 3 args, we can't do 2xy because if that was
        // reparsed it'd treat xy as one symbol
        if (node.implicit && node.args.length === 2 && _mathNodes.query.isNumber(node.args[0]) && _mathNodes.query.isIdentifier(node.args[1])) {
            _result = args.map(function (arg) {
                return printNode(arg, node);
            }).join('');
        } else if (node.implicit) {
            _result = args.map(function (arg) {
                return printNode(arg, node);
            }).join('');
        } else {
            _result = args.map(function (arg) {
                return printNode(arg, node);
            }).join(' * ');
        }

        if (_mathNodes.query.isMul(parent)) {
            if (node.implicit && !parent.implicit) {
                return _result;
            } else {
                return '(' + _result + ')';
            }
        } else if (_mathNodes.query.isPow(parent) || _mathNodes.query.isDiv(parent)) {
            return '(' + _result + ')';
        } else {
            return _result;
        }
    } else if (op === 'div') {
        var _result2 = '';
        // this lets us printNode things like 2/3 and x/5 instead of 2 / 3 and x / 5
        // (but the spaces are helpful for reading more complicated fractions)
        if ((_mathNodes.query.isIdentifier(args[0]) || _mathNodes.query.isNumber(args[0])) && (_mathNodes.query.isIdentifier(args[1]) || _mathNodes.query.isNumber(args[1]))) {
            _result2 = printNode(args[0]) + '/' + printNode(args[1]);
        } else {
            _result2 += printNode(args[0], node);
            _result2 += ' / ';
            if (_mathNodes.query.isDiv(args[1])) {
                _result2 += '(' + printNode(args[1], node) + ')';
            } else {
                _result2 += printNode(args[1], node);
            }
        }
        return _mathNodes.query.isPow(parent) ? '(' + _result2 + ')' : _result2;
    } else if (op === 'pow') {
        var _node$args = _slicedToArray(node.args, 2),
            base = _node$args[0],
            exp = _node$args[1];

        return _mathNodes.query.isNeg(base) ? '(' + printNode(base, node) + ')^' + printNode(exp, node) : printNode(base, node) + '^' + printNode(exp, node);
    } else if (op === 'neg') {
        return '-' + printNode(args[0], node);
    } else if (op === 'pos') {
        return '+' + printNode(args[0], node);
    } else if (op === 'pn') {
        throw new Error('we don\'t handle \'pn\' operations yet');
    } else if (op === 'np') {
        throw new Error('we don\'t handle \'np\' operations yet');
    } else if (op === 'fact') {
        if (args[0].op === 'pow' || args[0].op === 'mul' || args[0].op === 'div') {
            return '(' + printNode(args[0], node) + ')!';
        } else {
            return printNode(args[0], node) + '!';
        }
    } else if (op === 'nthRoot') {
        return 'nthRoot(' + args.map(function (arg) {
            return printNode(arg, node);
        }).join(', ') + ')';
    } else if (op === 'int') {
        return 'int(' + args.map(function (arg) {
            return printNode(arg, node);
        }).join(', ') + ')';
    } else if (op === 'abs') {
        return '|' + printNode(args[0]) + '|';
    } else if (op in relationIdentifierMap) {
        var symbol = relationIdentifierMap[op];
        return args.map(function (arg) {
            return printNode(arg, node);
        }).join(' ' + symbol + ' ');
    } else {
        return printNode(op) + '(' + args.map(function (arg) {
            return printNode(arg, node);
        }).join(', ') + ')';
    }
};

function printNode(node) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply':
            return printApply(node, parent);

        // irregular non-leaf nodes
        case 'Parentheses':
            return '(' + printNode(node.body, node) + ')';

        case 'Sequence':
            return node.items.map(printNode).join(', ');

        // leaf nodes
        case 'Identifier':
            {
                var name = node.name.length > 1 ? ' ' + node.name : node.name;
                if (node.subscript) {
                    return name + '_' + printNode(node.subscript).trim();
                } else {
                    return name;
                }
            }
        case 'Placeholder':
            if (node.subscript) {
                return '#' + node.name + '_' + printNode(node.subscript).trim();
            } else {
                return '#' + node.name;
            }

        case 'Number':
            return node.value;

        case 'Ellipsis':
            return '...';

        default:
            console.log(node); // eslint-disable-line no-console
            throw new Error('unrecognized node');
    }
}

function print(node) {
    var result = printNode(node);
    return result.replace(/ [ ]+/g, ' ').replace(/\([ ]+/g, '(').trim();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           * toTex - return a string representation of the nodes in LaTeX
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           */

exports.default = toTex;

var _mathNodes = __webpack_require__(0);

var relationIdentifierMap = {
    'eq': '=',
    'lt': '<',
    'le': '<=',
    'gt': '>',
    'ge': '>=',
    'ne': '!='
};

var applyToTex = function applyToTex(node, parent) {
    var op = node.op,
        args = node.args;


    if (op === 'add') {
        //e.g a + (-a) => a - a
        var result = toTex(node.args[0], node);
        for (var i = 1; i < node.args.length; i++) {
            var arg = node.args[i];
            if (_mathNodes.query.isNeg(arg) && arg.wasMinus) {
                result += ' - ' + toTex(arg.args[0], node);
            } else {
                result += ' + ' + toTex(arg, node);
            }
        }
        return parent ? '\\left(' + result + '\\right)' : result;
    } else if (op === 'mul') {
        if (node.implicit) {
            //e.g 2 x
            return node.args.map(function (arg) {
                return toTex(arg, node);
            }).join(' ');
        } else {
            //e.g 2 * x
            return node.args.map(function (arg) {
                return toTex(arg, node);
            }).join(' \\times ');
        }
    } else if (op === 'div') {
        var _result = '';
        _result += '\\frac';
        //add parentheses when numerator or denominator has multiple terms
        //e.g latex fractions: \frac{a}{b} => a/b
        _result += '{' + toTex(node.args[0], node) + '}';
        _result += '{' + toTex(node.args[1], node) + '}';
        return _result;
    } else if (op === 'pow') {
        return toTex(node.args[0], node) + '^{' + toTex(node.args[1], node) + '}';
    } else if (op === 'neg') {
        return '-' + toTex(args[0], node);
    } else if (op === 'pos') {
        return '+' + toTex(args[0], node);
    } else if (op === 'pn') {
        throw new Error('we don\'t handle \'pn\' operations yet');
    } else if (op === 'np') {
        throw new Error('we don\'t handle \'np\' operations yet');
    } else if (op === 'fact') {
        throw new Error('we dont handle fact operations yet');
    } else if (op === 'nthRoot') {
        var _node$args = _slicedToArray(node.args, 2),
            radicand = _node$args[0],
            index = _node$args[1];

        var base = void 0,
            exponent = void 0;
        var _result2 = void 0;

        if (_mathNodes.query.isPow(radicand)) {
            var _radicand$args = _slicedToArray(radicand.args, 2);

            base = _radicand$args[0];
            exponent = _radicand$args[1];

            _result2 = index == '' || _mathNodes.query.getValue(index) == 2 ? '\\sqrt{' + toTex(base, node) + '^' + toTex(exponent, node) + '}' : '\\sqrt[' + toTex(index, node) + ']{' + toTex(base, node) + '^' + toTex(exponent, node) + '}';
        } else {
            base = radicand;
            _result2 = index == '' || _mathNodes.query.getValue(index) == 2 ? '\\sqrt{' + toTex(base, node) + '}' : '\\sqrt[' + toTex(index, node) + ']{' + toTex(base, node) + '}';
        }
        return _result2;
    } else if (op === 'int') {
        var _result3 = void 0;
        if (node.args.length == 2) {
            var _node$args2 = _slicedToArray(node.args, 2),
                input = _node$args2[0],
                variable = _node$args2[1];

            _result3 = '\\int ' + toTex(input, node) + ' d' + toTex(variable, node);
        } else if (node.args.length == 3) {
            var _node$args3 = _slicedToArray(node.args, 3),
                _input = _node$args3[0],
                _variable = _node$args3[1],
                domain = _node$args3[2];

            _result3 = '\\int_' + toTex(domain, node) + ' ' + toTex(_input, node) + ' d' + toTex(_variable, node);
        } else if (node.args.length == 4) {
            var _node$args4 = _slicedToArray(node.args, 4),
                _input2 = _node$args4[0],
                _variable2 = _node$args4[1],
                upper = _node$args4[2],
                lower = _node$args4[3];

            _result3 = '\\int_{' + toTex(upper, node) + '}^{' + toTex(lower, node) + '} ' + toTex(_input2, node) + ' d' + toTex(_variable2, node);
        }
        return _result3;
    } else if (op in relationIdentifierMap) {
        var symbol = relationIdentifierMap[op];
        return args.map(function (arg) {
            return toTex(arg, node);
        }).join(' ' + symbol + ' ');
    } else {
        return op + '(' + args.map(function (arg) {
            return toTex(arg, node);
        }).join(', ') + ')';
    }
};

function toTex(node) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply':
            return applyToTex(node, parent);

        // irregular node-leaf nodes
        case 'Parentheses':
            return 'left(' + toTex(node.body, node) + '\right)';

        //leaf nodes
        case 'Identifier':
            return node.name;
        case 'Number':
            return node.value;

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
        case 'Apply':
            for (var i = 0; i < rep.args.length; i++) {
                var arg = rep.args[i];
                rep.args[i] = replace(arg, { enter: enter, leave: leave });
            }
            break;

        // Skip leaf nodes because they're handled by the enter/leave calls at
        // the start/end of replace.
        case 'Identifier':
        case 'Number':
        case 'Ellipsis':
            break;

        // irregular non-leaf nodes
        case 'Parentheses':
            rep.body = replace(rep.body, { enter: enter, leave: leave });
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


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * traverse - walk all of the nodes in a tree.
 */

function traverse(node, _ref) {
    var _ref$enter = _ref.enter,
        enter = _ref$enter === undefined ? function () {} : _ref$enter,
        _ref$leave = _ref.leave,
        leave = _ref$leave === undefined ? function () {} : _ref$leave;
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply':
            enter(node, path);
            node.args.forEach(function (arg, index) {
                return traverse(arg, { enter: enter, leave: leave }, [].concat(_toConsumableArray(path), ['args', index]));
            });
            leave(node, path);
            break;

        // leaf nodes
        case 'Identifier':
        case 'Number':
        case 'Ellipsis':
            enter(node, path);
            leave(node, path);
            break;

        // irregular non-leaf nodes
        case 'Parentheses':
            enter(node, path);
            traverse(node.body, { enter: enter, leave: leave }, [].concat(_toConsumableArray(path), ['body']));
            leave(node, path);
            break;

        case 'List':
        case 'Sequence':
            enter(node, path);
            node.items.forEach(function (item, index) {
                return traverse(item, { enter: enter, leave: leave }, [].concat(_toConsumableArray(path), ['items', index]));
            });
            leave(node, path);
            break;

        case 'System':
            enter(node, path);
            node.relations.forEach(function (rel, index) {
                return traverse(rel, { enter: enter, leave: leave }, [].concat(_toConsumableArray(path), ['relations', index]));
            });
            leave(node, path);
            break;

        case 'Placeholder':
            // TODO(kevinb) handle children of the placeholder
            // e.g. we there might #a_0 could match x_0, y_0, z_0, etc.
            enter(node, path);
            leave(node, path);
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
exports.toTex = exports.print = exports.parse = undefined;

var _parse = __webpack_require__(1);

var _parse2 = _interopRequireDefault(_parse);

var _print = __webpack_require__(2);

var _print2 = _interopRequireDefault(_print);

var _toTex = __webpack_require__(3);

var _toTex2 = _interopRequireDefault(_toTex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.parse = _parse2.default;
exports.print = _print2.default;
exports.toTex = _toTex2.default;

/***/ })
/******/ ]);