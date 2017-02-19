export function relationNode(rel, args) {
    return {
        type: 'Relation',
        rel: rel,
        args: args,
        loc: {
            start: args[0].start,
            end: args[args.length - 1].end,
        },
    };
}

// TODO(kevinb) handle post fix operators
export function operationNode(op, args, options) {
    return {
        type: 'Operation',
        op: op,
        args: args,
        loc: {
            start: args[0].start,
            end: args[args.length - 1].end,
        },
        ...options,
    };
}

export function functionNode(fn, args, start, end) {
    return {
        type: 'Function',
        fn: fn, // TODO: switch this out to be an Identifier
        args: args,
        loc: {start, end},
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
        content: content,
        loc: {start, end}
        // TODO: add left, right
    };
}
