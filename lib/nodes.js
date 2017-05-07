// TODO: handle op being an identifier or other nodes, e.g. pow where exp = -1
export function applyNode(op, args, loc, options = {}) {
    return {
        type: 'Apply',
        op: op,
        args: args,
        loc: loc || {
            start: args[0].loc.start,
            end: args[args.length - 1].loc.end,
        },
        ...options,
    }
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

export function parensNode(content, start, end) {
    return {
        type: 'Parentheses',
        loc: {start, end},
        content: content
    };
}
