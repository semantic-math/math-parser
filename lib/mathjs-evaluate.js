/**
 * Evaluate a flattened mathjs AST produced by mathjs-transform.js.
 */

const ops = {
    add: (...args) => args.reduce((sum, val) => sum + val, 0),
    unaryMinus: (arg) => -arg,
    multiply: (...args) => args.reduce((prod, val) => prod * val, 1),
    divide: (num, den) => num / den,
    pow: (base, exp) => Math.pow(base, exp),
};

const evaluate = (node) => {
    switch (node.type) {
        case 'FunctionNode':
            if (node.fn in Math) {
                return Math[node.fn](...node.args.map(evaluate));
            } else {
                throw new Error(`Undefined function ${node.fn}`);
            }
        case 'SymbolNode':
            throw new Error(`Undefined symbol ${node.name}`);
        case 'ConstantNode':
            return parseFloat(node.value);
        case 'OperatorNode':
            return ops[node.fn](...node.args.map(evaluate));
        case 'Brackets':
            return evaluate(node.content);
        default:
            throw new Error(`Unrecognized node of type '${node.type}'`);
    }
}

export {evaluate as default};
