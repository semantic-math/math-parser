/**
 * evaluate
 */

const operations = {
    'add': (args) => args.reduce((sum, val) => sum + val, 0),
    'neg': (args) => {
        if (args.length === 1) {
            return -args[0];
        } else {
            throw new Error(`'-' can't be performed on ${args.length} arguments`);
        }
    },
    'mul': (args) => args.reduce((prod, val) => prod * val, 1),
    'div': (args) => {
        if (args.length !== 2) {
            throw new Error(`'/' can only be performed with 2 arguments`);
        }
        return args[0] / args[1];
    },
    'pow': (args) => Math.pow(args[0], args[1]),

    // TODO: check the number of args
    'eq': ([left, right]) => left === right,
    'lt': ([left, right]) => left < right,
    'le': ([left, right]) => left <= right,
    'ge': ([left, right]) => left >= right,
    'gt': ([left, right]) => left > right,
    'ne': ([left, right]) => left !== right,
}


// TODO: add context parm to hold variables, functions, operations, and relations
// TODO: create an evaluate factory which takes an operations dictionary as well
// as a function to turn a number value string into a specific number type that
// can be used with the functions in the operations dictionary.  This will be
// useful when using different number types like bignum or fraction.js
export default function evaluate(node) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply': {
            const {op, args} = node;

            if (op in operations) {
                return operations[op](args.map(evaluate));
            } else if (op.type === 'Identifier') {
                const fn = op.name

                if (Math[fn].length === args.length) {
                    return Math[fn].apply(null, args.map(evaluate));
                } else {
                    throw new Error(`'${fn}' takes ${Math[fn].length} parameters, ${args.length} was provided`);
                }
            } else {
                throw new Error(`'${op}' is not a valid operation in this context`);
            }
        }

        // leaf nodes
        case 'Identifier':
            throw new Error(`'${node.name} does not exist in this context`);
        case 'Number':
            return parseFloat(node.value);

        // irregular non-leaf nodes
        case 'Parentheses':
            return evaluate(node.body);

        default:
            throw new Error(`unrecognized node: type = '${node.type}'`);
    }
}
