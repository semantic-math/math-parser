export function relationNode(rel, args) {
    return {
        type: 'Relation',
        rel: rel,
        args: args,
    };
}

export function operationNode(op, args) {
    return {
        type: 'Operation',
        op: op,
        args: args
    };
}

export function functionNode(fn, args) {
    return {
        type: 'Function',
        fn: fn,
        args: args,
    };
}

export function identifierNode(name) {
    return {
        type: 'Identifier',
        name: name,
    };
}

export function numberNode(value) {
    return {
        type: 'Number',
        value: value,   // TODO: convert value to fraction.js instance
    };
}

export function parenthesisNode(content) {
    return {
        type: 'Parenthesis',
        content: content,
    };
}
