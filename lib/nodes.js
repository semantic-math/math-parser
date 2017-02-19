export function relationNode(rel, args) {
    return {
        type: 'Relation',
        rel: rel,
        args: args,
    };
}

export function operationNode(op, args, options) {
    return {
        type: 'Operation',
        op: op,
        args: args,
        ...options,
    };
}

export function functionNode(fn, args) {
    return {
        type: 'Function',
        fn: fn, // TODO: switch this out to be an Identifier
        args: args,
    };
}

export function identifierNode(name) {
    return {
        type: 'Identifier',
        name: name,
        // TODO: add subscript
    };
}

export function numberNode(value) {
    return {
        type: 'Number',
        value: value,   // TODO: convert value to fraction.js instance
    };
}

export function bracketsNode(content) {
    return {
        type: 'Brackets',
        content: content,
        // TODO: add left, right
    };
}
