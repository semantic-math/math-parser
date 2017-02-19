/**
 * print - return a string representation of the nodes.
 */

const isNeg = (node) => {
    return node.type === 'Operation' && node.op === '-' && node.args.length === 1;
}

const isAdd = (node) => {
    return node.type === 'Operation' && node.op === '+' && node.args.length > 1;
}

const isMul = (node) => {
    return node.type === 'Operation' && node.op === '*' && node.args.length > 1;
}

export default function print(node) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
            return node.args.map(print).join(` ${node.rel} `);
        case 'Operation':
            if (node.args.length > 1) {
                if (node.op === '+') {
                    let result = print(node.args[0]);
                    for (let i = 1; i < node.args.length; i++) {
                        const arg = node.args[i];
                        if (isNeg(arg) && arg.wasMinus) {
                            result += ` - ${print(arg.args[0])}`;
                        } else {
                            result += ` + ${print(arg)}`;
                        }
                    }
                    return result;
                } else if (node.op === '/') {
                    let result = '';
                    if (isAdd(node.args[0]) || isMul(node.args[0])) {
                        result += `(${print(node.args[0])})`;
                    } else {
                        result += print(node.args[0]);
                    }
                    result += ' / ';
                    if (isAdd(node.args[1]) || isMul(node.args[1])) {
                        result += `(${print(node.args[1])})`;
                    } else {
                        result += print(node.args[1]);
                    }
                    return result;
                } else {
                    return node.args.map(print).join(` ${node.op} `);
                }
            } else if (node.args.length > 0) {
                return `${node.op}${print(node.args[0])}`;
            } else {
                throw new Error('Operations must have one or more operands');
            }
        case 'Function':
            return `${node.fn}(${node.args.map(print).join(', ')})`;

        // leaf nodes
        case 'Identifier':
            return node.name;
        case 'Number':
            return node.value;

        // irregular non-leaf nodes
        case 'Brackets':
            return `(${print(node.content)})`;

        default:
            console.log(node);
            throw new Error('unrecognized node');
    }
}
