/**
 * Traverse and optionally replace nodes in a mathjs AST.
 */

export default function replace(node, { enter, leave }) {
    let rep = enter(node) || { ...node };

    switch (node.type) {
        // regular non-leaf nodes
        case 'FunctionNode':
        case 'OperatorNode':
            rep = {
                ...rep,
                args: rep.args.map((arg) => replace(arg, { enter, leave })),
            };
            break;

        // skip leaf nodes
        case 'SymbolNode':
        case 'ConstantNode':
            rep = {...rep };
            break;

        // irregular non-leaf nodes
        case 'ParenthesisNode':
            rep = {
                ...rep,
                content: replace(rep.content, { enter, leave }),
            };
            break;

        default:
            throw new Error('unrecognized node');
    }

    return leave(rep) || rep;
}
