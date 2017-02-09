const {
    evaluate,
    nodes,
    Parser,
    print,
    replace,
    transformMathJS,
} = require("./build/bundle");

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

console.log(`original :    ${math}`);
console.log(`printed  :    ${print(ast)}`);

const expr = "0.5 + atan2(1, 1) + 2 * 3 - 4 / 5";
const result = evaluate(parser.parse(expr));

console.log(`expr     :    ${expr}`);
console.log(`result   :    ${result}`);

console.log('');
console.log('math-parser AST');
console.log(ast);

const exprTree = transformMathJS(ast);

console.log('');
console.log('mathjs expression tree');
console.log(exprTree);

const newTree = replace(ast, {
    enter: () => {},
    leave: (node) => {
        if (node.type === 'Number') {
            return nodes.numberNode(parseFloat(node.value));
        } else if (node.type === 'Operation') {
            if (node.op === '-' && node.args.length === 1) {
                if (node.args[0].type === 'Number') {
                    return nodes.numberNode(-1 * node.args[0].value);
                }
            }
        }
    },
});

console.log('');
console.log('transformed math-parser AST with unary minuses applied to number nodes');
console.log(newTree);
