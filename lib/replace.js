/**
 * replace - visit all nodes in the tree with the ability to replace them.
 *
 * This function may modify the node passed in and/or any of its descendants.
 *
 * If neither 'enter' nor 'leave' return a value, the node is unchanged.
 * If 'enter' returns a new node, the children of the new node will be traversed
 * instead of the old one.  If both 'enter' and 'leave' return values, the
 * value returned by 'leave' is the node that will end up in the new AST.
 */

export default function replace(node, {enter, leave}) {
    let rep = (enter && enter(node)) || node;

    switch (rep.type) {
        // regular non-leaf nodes
        case 'Relation':
        case 'Operation':
        case 'Function':
            for (let i = 0; i < rep.args.length; i++) {
                const arg = rep.args[i];
                rep.args[i] = replace(arg, {enter, leave});
            }
            break;

        // Skip leaf nodes because they're handled by the enter/leave calls at
        // the start/end of replace.
        case 'Identifier':
        case 'Number':
            break;

        // irregular non-leaf nodes
        case 'Brackets':
            rep.content = replace(rep.content, {enter, leave});
            break;

        case 'List':
        case 'Sequence':
            for (let i = 0; i < rep.args.length; i++) {
                const item = rep.items[i];
                rep.items[i] = replace(item, {enter, leave});
            }
            break;

        case 'System':
            for (let i = 0; i < rep.relations.length; i++) {
                const rel = rep.relations[i];
                rep.relations[i] = replace(rel, {enter, leave});
            }
            break;

        case 'Placeholder':
            // TODO(kevinb) handle children of the placeholder
            // e.g. we there might #a_0 could match x_0, y_0, z_0, etc.
            break;

        default:
            throw new Error('unrecognized node');
    }

    return (leave && leave(rep)) || rep;
}
