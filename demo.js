const Parser = require("./lib/parser.js");

// const math = "1 + 2 * -(3 - 4)/(10*(x + y))";
// const math = "x+y=1+2-3(4-x(2))";
// const math = "ab/b/c*(d*e)";
// const math = "a^b^c";
// const math = "a 2.5atan2(3-f(x-1))"
// const math = "x^(-2)"
// const math = "1 + 2 - 3 + -4 - -5";
const math = "--2";

const parser = new Parser();
const ast = parser.parse(math);

console.log(math);
console.log(JSON.stringify(ast, null, 4));
