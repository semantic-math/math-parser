export function relationNode(rel, args) {
    return {
        type: 'Relation',
        rel: rel,
        loc: {
            start: args[0].start,
            end: args[args.length - 1].end,
        },
        args: args,
    };
}

// TODO(kevinb) handle post fix operators
export function operationNode(op, args, options) {
    return {
        type: 'Operation',
        op: op,
        loc: {
            start: args[0].start,
            end: args[args.length - 1].end,
        },
        ...options,
        args: args,
    };
}

export function functionNode(fn, args, start, end) {
    return {
        type: 'Function',
        fn: fn, // TODO: switch this out to be an Identifier
        loc: {start, end},
        args: args,
    };
}

export function identifierNode(name, start, end) {
    return {
        type: 'Identifier',
        name: name,
        loc: {start, end},
        // TODO: add subscript
    };
}

export function numberNode(value, start, end) {
    return {
        type: 'Number',
        value: value,
        loc: {start, end},
    };
}

export function bracketsNode(content, start, end) {
    return {
        type: 'Brackets',
        loc: {start, end},
        content: content
        // TODO: add left, right
    };
}
