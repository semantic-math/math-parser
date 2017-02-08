/**
 * evaluate -
 */

const operations = {
    '+': (args) => args.reduce((sum, val) => sum + val, 0),
    '-': (args) => {
        if (args.length === 1) {
            return -args[0];
        } else if (args.length === 2) {
            return args[0] - args[1];
        } else {
            throw new Error(`'-' can't be performed on ${args.length} arguments`);
        }
    },
    '*': (args) => args.reduce((prod, val) => prod * val, 1),
    '/': (args) => {
        if (args.length !== 2) {
            throw new Error(`'/' can only be performed with 2 arguments`);
        }
        return args[0] / args[1];
    },
}

// TODO: check the number of args
const relations = {
    '=': ([left, right]) => left === right,
    '<': ([left, right]) => left < right,
    '<=': ([left, right]) => left <= right,
    '>=': ([left, right]) => left >= right,
    '>': ([left, right]) => left > right,
    '!=': ([left, right]) => left !== right,
}

// TODO: add context parm to hold variables, functions, operations, and relations
export default function evaluate(node) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
            if (node.rel in relations) {
                return relations[node.rel](node.args.map(evaluate));
            } else {
                throw new Error(`'$node.op' is not a valid relation in this context`);
            }
        case 'Operation':
            if (node.op in operations) {
                return operations[node.op](node.args.map(evaluate));
            } else {
                throw new Error(`'$node.op' is not a valid operation in this context`);
            }
        case 'Function':
            if (!Math[node.fn]) {
                throw new Error(`'${node.fn}' does not exist on Math global`);
            }
            if (Math[node.fn].length !== node.args.length) {
                throw new Error(`'${node.fn}' takes ${Math[node.fn].length} parameters, ${node.args.length} was provided`);
            }
            return Math[node.fn].apply(null, node.args.map(evaluate));

        // leaf nodes
        case 'Identifier':
            throw new Error(`'${node.name} does not exist in this context`);
        case 'Number':
            return parseFloat(node.value);

        // irregular non-leaf nodes
        case 'Brackets':
            return evaluate(node.content);

        default:
            console.log(node);
            throw new Error('unrecognized node');
    }
}
