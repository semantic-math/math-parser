/**
  * toTex - return a string representation of the nodes in LaTeX
  */

const isNeg = (node) => {
    return node.type === 'Apply' && node.op === 'neg';
};

const isAdd = (node) => {
    return node.type === 'Apply' && node.op === 'add';
};

const relationTokens = ['=', '<', '<=', '>', '>=', '!='];

function toTexOperation(node, parent){
    let result;

    switch(node.op){
    case 'add':
        //e.g a + (-a) => a - a
        result = toTex(node.args[0], node);
        for (let i = 1; i < node.args.length; i++){
            const arg = node.args[i];
            if (isNeg(arg) && arg.wasMinus){
                result += ` - ${toTex(arg.args[0], node)}`;
            } else {
                result += ` + ${toTex(arg, node)}`;
            }
        }
        return parent ? `\\left(${result}\\right)` : result;
    case 'neg':
        return `-${toTex(node.args[0], node)}`;
    case 'pos':
        return `+${toTex(node.args[0], node)}`;
    case 'pn':
        throw new Error(`we don't handle 'pn' operations yet`);
    case 'np':
        throw new Error(`we don't handle 'np' operations yet`);
    case 'mul':
        if (node.implicit) {
            //e.g 2 x
            return node.args.map(arg => toTex(arg, node)).join(` `);
        } else {
            //e.g 2 * x
            return node.args.map(arg => toTex(arg, node)).join(` \\times `);
        }
    case 'div':
        result = '';
        result += '\\frac';
        //add parentheses when numerator or denominator has multiple terms
        //e.g latex fractions: \frac{a}{b} => a/b
        result += `{${toTex(node.args[0], node)}}`;
        result += `{${toTex(node.args[1], node)}}`;
        return result;
    case 'pow':
        //
        return `${toTex(node.args[0], node)}^{${toTex(node.args[1], node)}}`;
    case 'fact':
        throw new Error(`we don't handle 'fact' operations yet`);
    default:
        throw new Error('unrecognized operation');
    }
}

const applyToTex = (node, parent) => {
    const {op, args} = node;

    if (op === 'add') {
        //e.g a + (-a) => a - a
        let result = toTex(node.args[0], node);
        for (let i = 1; i < node.args.length; i++){
            const arg = node.args[i];
            if (isNeg(arg) && arg.wasMinus){
                result += ` - ${toTex(arg.args[0], node)}`;
            } else {
                result += ` + ${toTex(arg, node)}`;
            }
        }
        return parent ? `\\left(${result}\\right)` : result;
    } else if (op === 'mul') {
        if (node.implicit) {
            //e.g 2 x
            return node.args.map(arg => toTex(arg, node)).join(` `);
        } else {
            //e.g 2 * x
            return node.args.map(arg => toTex(arg, node)).join(` \\times `);
        }
    } else if (op === 'div') {
        let result = '';
        result += '\\frac';
        //add parentheses when numerator or denominator has multiple terms
        //e.g latex fractions: \frac{a}{b} => a/b
        result += `{${toTex(node.args[0], node)}}`;
        result += `{${toTex(node.args[1], node)}}`;
        return result;
    } else if (op === 'pow') {
        return `${toTex(node.args[0], node)}^{${toTex(node.args[1], node)}}`;
    } else if (op === 'neg') {
        return `-${toTex(args[0], node)}`;
    } else if (op === 'pos') {
        return `+${toTex(args[0], node)}`;
    } else if (op === 'pn') {
        throw new Error(`we don't handle 'pn' operations yet`);
    } else if (op === 'np') {
        throw new Error(`we don't handle 'np' operations yet`);
    } else if (op === 'fact') {
        throw new Error(`we don't handle 'fact' operations yet`);
    } else if (relationTokens.includes(op)) {
        return args.map(arg => toTex(arg, node)).join(` ${op} `);
    } else {
        return `${op}(${args.map(arg => toTex(arg, node)).join(', ')})`;
    }
}

export default function toTex(node, parent = null){
    switch(node.type){
        // regular non-leaf nodes
        case 'Apply':
            return applyToTex(node, parent);

        //leaf nodes
        case 'Identifier':
            return node.name;
        case 'Number':
            return node.value;

        //irregular node-leaf nodes
        case 'Brackets':
            //e.g [[2,3], [3,4]]
            return `\lbrack${toTex(node.content, node)}\rbrack`;

        default:
            console.log(node); // eslint-disable-line no-console
            throw new Error('unrecognized node');
    }
}
