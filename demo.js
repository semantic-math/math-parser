var Parser = require("./lib/parser.js");

// var math = "1 + 2 * -(3 - 4)/(10*(x + y))";
// var math = "x+y=1+2-3(4-x(2))";
// var math = "ab/b/c*(d*e)";
// var math = "a^b^c";
var math = "a 2.5bold23(3-y(x-1))"
// var math = "x^(-2)"
// var math = "1 + 2 + -3 - 4 - -5";

var parser = new Parser();
var ast = parser.parse(math);

console.log(math);
console.log(JSON.stringify(ast, null, 4));
