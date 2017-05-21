/**
 * print - return a string representation of the nodes.
 */
import {query} from 'math-nodes'

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
            if (query.isNeg(arg) && arg.wasMinus) {
                result += ` - ${print(arg.args[0], node)}`;
            } else {
                result += ` + ${print(arg, node)}`;
            }
        }
        return parent && !query.isRel(parent) && parent.type !== 'Parentheses'
            ? `(${result})`
            : result;
    } else if (op === 'mul') {
        const result = node.implicit
            ? args.map(arg => print(arg, node)).join(` `)
            : args.map(arg => print(arg, node)).join(` * `);
        if (query.isMul(parent)) {
            if (node.implicit && !parent.implicit) {
                return result
            } else {
                return `(${result})`
            }
        } else if (query.isPow(parent) || query.isDiv(parent)) {
            return `(${result})`
        } else {
            return result
        }
    } else if (op === 'div') {
        let result = '';
        result += print(args[0], node);
        result += ' / ';
        if (query.isDiv(args[1])) {
            result += `(${print(args[1], node)})`;
        } else {
            result += print(args[1], node);
        }
        return query.isPow(parent)
            ? `(${result})`
            : result;
    } else if (op === 'pow') {
        const [base, exp] = node.args;
        return query.isNeg(base)
            ? `(${print(base, node)})^${print(exp, node)}`
            : `${print(base, node)}^${print(exp, node)}`;
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
        return `${print(op)}(${args.map(arg => print(arg, node)).join(', ')})`;
    }
}

export default function print(node, parent = null) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Apply':
            return printApply(node, parent)

        // irregular non-leaf nodes
        case 'Parentheses':
            return `(${print(node.body, node)})`

        case 'Sequence':
            return node.items.map(print).join(', ')

        // leaf nodes
        case 'Identifier':
            if (node.subscript) {
                return `${node.name}_${print(node.subscript)}`
            } else {
                return node.name;
            }

        case 'Placeholder':
            if (node.subscript) {
                return `#${node.name}_${print(node.subscript)}`
            } else {
                return `#${node.name}`
            }

        case 'Number':
            return node.value

        case 'Ellipsis':
            return '...'

        default:
            console.log(node)   // eslint-disable-line no-console
            throw new Error('unrecognized node')
    }
}
