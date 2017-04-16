/**
 * replace - visit all nodes in the tree with the ability to replace them.
 *
 * This function return a new AST and does not mutate any nodes in the original
 * AST.  If neither 'enter' nor 'leave' return a value, the node is unchanged.
 * If 'enter' returns a new node, the children of the new node will be traversed
 * instead of the old one.  If both 'enter' and 'leave' return values, the
 * value returned by 'leave' is the node that will end up in the new AST.
 */

export default function replace(node, {enter, leave}) {
    let rep = enter(node) || {...node};

    switch (node.type) {
        // regular non-leaf nodes
        case 'Relation':
        case 'Operation':
        case 'Function':
            rep = {
                ...rep,
                args: rep.args.map((arg) => replace(arg, {enter, leave})),
            };
            break;

        // skip leaf nodes
        case 'Identifier':
        case 'Number':
            rep = {...rep};
            break;

        // irregular non-leaf nodes
        case 'Brackets':
            rep = {
                ...rep,
                content: replace(rep.content, {enter, leave}),
            };
            break;

        case 'List':
        case 'Sequence':
            rep = {
                ...rep,
                items: rep.items.map((item) => replace(item, {enter, leave})),
            }
            break;

        case 'System':
            rep = {
                ...rep,
                relations:
                    rep.relations.map((rel) => replace(rel, {enter, leave})),
            }
            break;

        case 'Placeholder':
            // TODO(kevinb) handle children of the placeholder
            // e.g. we there might #a_0 could match x_0, y_0, z_0, etc.
            rep = {...rep};
            break;

        default:
            throw new Error('unrecognized node');
    }

    return leave(rep) || rep;
}
