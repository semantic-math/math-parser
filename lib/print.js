/**
 * print - return a string representation of the nodes.
 */

export default function print(node) {
    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
            return node.args.map(print).join(` ${node.rel} `);
        case 'Operation':
            if (node.args.length > 1) {
                return node.args.map(print).join(` ${node.op} `);
            } else if (node.args.length > 0) {
                return `${node.op}${print(node.args[0])}`;
            } else {
                throw new Error('Operations must have one or more operands');
            }
        case 'Function':
            return `${node.fn}(${node.args.map(print).join(', ')})`;

        // leave nodes
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
