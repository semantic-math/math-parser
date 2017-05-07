/**
 * print - return a string representation of the nodes.
 */

const isNeg = (node) => {
    return node.type === 'Apply' && node.op === 'neg';
}

const isAdd = (node) => {
    return node.type === 'Apply' && node.op === 'add';
}

const isMul = (node) => {
    return node.type === 'Apply' && node.op === 'mul';
}

const isDiv = (node) => {
    return node.type === 'Apply' && node.op === 'div';
}

const relationIdentifierMap = {
    'eq': '=',
    'lt': '<',
    'le': '<=',
    'gt': '>',
    'ge': '>=',
    'ne': '!=',
}

const printApply = (node, parent) => {
    const {op, args} = node;

    if (op === 'add') {
        let result = print(args[0], node);
        for (let i = 1; i < args.length; i++) {
            const arg = args[i];
            if (isNeg(arg) && arg.wasMinus) {
                result += ` - ${print(arg.args[0], node)}`;
            } else {
                result += ` + ${print(arg, node)}`;
            }
        }
        return result;
    } else if (op === 'mul') {
        if (node.implicit) {
            return args.map(arg => print(arg, node)).join(` `);
        } else {
            return args.map(arg => print(arg, node)).join(` * `);
        }
    } else if (op === 'div') {
        const result = `${print(args[0],node)} / ${print(args[1],node)}`;
        return result;
    } else if (op === 'pow') {
        const [base, exp] = node.args;
        return `${print(base, node)}^${print(exp, node)}`;
    } else if (op === 'neg') {
        return `-${print(args[0], node)}`;
    } else if (op === 'pos') {
        return `+${print(args[0], node)}`;
    } else if (op === 'pn') {
        throw new Error(`we don't handle 'pn' operations yet`);
    } else if (op === 'np') {
        throw new Error(`we don't handle 'np' operations yet`);
    } else if (op === 'fact') {
        throw new Error(`we don't handle 'fact' operations yet`);
    } else if (op in relationIdentifierMap) {
        const symbol = relationIdentifierMap[op];
        return args.map(arg => print(arg, node)).join(` ${symbol} `);
    } else {
        return `${op}(${args.map(arg => print(arg, node)).join(', ')})`;
    }
}

export default function print(node, parent = null) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply':
            return printApply(node, parent);

        // irregular non-leaf nodes
        case 'Parentheses':
            return `(${print(node.content, node)})`;

        // leaf nodes
        case 'Identifier':
            return node.name;
        case 'Number':
            return node.value;

        default:
            console.log(node);  // eslint-disable-line no-console
            throw new Error('unrecognized node');
    }
}
