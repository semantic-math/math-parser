/**
 * print - return a string representation of the nodes.
 */

const isNeg = (node) => {
    return node.type === 'Operation' && node.op === 'neg';
}

const isAdd = (node) => {
    return node.type === 'Operation' && node.op === 'add';
}

const isMul = (node) => {
    return node.type === 'Operation' && node.op === '*' && node.args.length > 1;
}

function printOperation(node, parent) {
    let result;

    switch (node.op) {
        case 'add':
            result = print(node.args[0]);
            for (let i = 1; i < node.args.length; i++) {
                const arg = node.args[i];
                if (isNeg(arg) && arg.wasMinus) {
                    result += ` - ${print(arg.args[0], node)}`;
                } else {
                    result += ` + ${print(arg, node)}`;
                }
            }
            return parent ? `(${result})` : result;
        case 'neg':
            return `-${print(node.args[0], node)}`;
        case 'pos':
            return `+${print(node.args[0], node)}`;
        case 'pn':
            throw new Error(`we don't handle 'pn' operations yet`);
        case 'np':
            throw new Error(`we don't handle 'np' operations yet`);
        case 'mul':
            if (node.implicit) {
                return node.args.map(arg => print(arg, node)).join(` `);
            } else {
                return node.args.map(arg => print(arg, node)).join(` * `);
            }
        case 'div':
            result = '';
            if (isAdd(node.args[0]) || isMul(node.args[0])) {
                result += `(${print(node.args[0], node)})`;
            } else {
                result += print(node.args[0], node);
            }
            result += ' / ';
            if (isAdd(node.args[1]) || isMul(node.args[1])) {
                result += `(${print(node.args[1], node)})`;
            } else {
                result += print(node.args[1], node);
            }
            return result;
        case 'pow':
            return `${print(node.args[0], node)}^${print(node.args[1], node)}`;
        case 'fact':
            throw new Error(`we don't handle 'fact' operations yet`);
        default:
            throw new Error('unrecognized operation');
    }
}

export default function print(node, parent = null) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
            return node.args.map(arg => print(arg, node)).join(` ${node.rel} `);
        case 'Operation':
            return printOperation(node, parent);
        case 'Function':
            return `${node.fn}(${node.args.map(arg => print(arg, node)).join(', ')})`;

        // leaf nodes
        case 'Identifier':
            return node.name;
        case 'Number':
            return node.value;

        // irregular non-leaf nodes
        case 'Brackets':
            return `(${print(node.content, node)})`;

        default:
            console.log(node);
            throw new Error('unrecognized node');
    }
}
