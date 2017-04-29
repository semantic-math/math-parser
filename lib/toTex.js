/**
   * toTex - return a string representation of the nodes in LaTeX
   */

const isNeg = (node) => {
    return node.type === 'Operation' && node.op === 'neg' && node.args.length > 1;
};

const isAdd = (node) => {
    return node.type === 'Operation' && node.op === 'add' && node.args.length > 1;
};

const isMul = (node) => {
    return node.type === 'Operation' && node.op === '*' && node.args.length > 1;
};

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
        return parent ? `\left(${result}\right)` : result;
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
            return node.args.map(arg => toTex(arg, node)).join(` \ast `); // ast for asterisk and \time for x
        }
    case 'div':
        result = '';
        result += '\frac';
        //add parentheses when numerator or denominator has multiple terms
        //e.g latex fractions: \frac{a}{b} => a/b
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

export default function toTex(node, parent = null){
    switch(node.type){
        // regular non-leaf nodes
    case 'Relation':
        // e.g a = b or ax^3 + bx^2 + cx + d = 0
        return node.args.map(arg => toTex(arg, node)).join(` ${node.rel} `);
    case 'Operation':
        return toTexOperation(node, parent);
    case 'Function':
        // e.g f(x, y, z)
        return `${node.fn}(${node.args.map(arg => toTex(arg, node)).join(', ')})`;

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
