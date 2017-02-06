export function equationNode(op, left, right) {
    return {
        type: 'Equation',
        op: op,
        left: left,
        right: right,
    };
}

export function operationNode(op, args) {
    return {
        type: 'Operation',
        op: op,
        args: args
    };
}

// only allow '+' or '-'
export function unaryOperationNode(op, arg) {
    return {
        type: 'UnaryOperation',
        op: op,
        arg: arg
    }
}

export function functionNode(fn, args) {
    return {
        type: 'Function',
        fn: fn,
        args: args,
    };
}

export function symbolNode(name) {
    return {
        type: 'Symbol',
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
