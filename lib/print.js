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

function printOperation(node) {
    let result;

    switch (node.op) {
        case 'add':
            result = print(node.args[0]);
            for (let i = 1; i < node.args.length; i++) {
                const arg = node.args[i];
                if (isNeg(arg) && arg.wasMinus) {
                    result += ` - ${print(arg.args[0])}`;
                } else {
                    result += ` + ${print(arg)}`;
                }
            }
            return result;
        case 'neg':
            return `-${print(node.args[0])}`;
        case 'pos':
            return `+${print(node.args[0])}`;
        case 'pn':
            throw new Error(`we don't handle 'pn' operations yet`);
        case 'np':
            throw new Error(`we don't handle 'np' operations yet`);
        case 'mul':
            if (node.implicit) {
                return node.args.map(print).join(` `);
            } else {
                return node.args.map(print).join(` * `);
            }
        case 'div':
            result = '';
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
        case 'pow':
            return `${print(node.args[0])}^${print(node.args[1])}`;
        case 'fact':
            throw new Error(`we don't handle 'fact' operations yet`);
        default:
            throw new Error('unrecognized operation');
    }
}

export default function print(node) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
            return node.args.map(print).join(` ${node.rel} `);
        case 'Operation':
            return printOperation(node);
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
