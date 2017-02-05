module.exports = {
    equationNode(left, right) {
        return {
            type: 'Equation',
            left: left,
            right: right,
        };
    },

    operationNode(op, args) {
        return {
            type: 'Operation',
            op: op,
            args: args
        };
    },

    negationNode(content) {
        return {
            type: 'Negation',
            content: content,
        };
    },

    functionNode(fn, args) {
        return {
            type: 'Function',
            fn: fn,
            args: args,
        };
    },

    symbolNode(name) {
        return {
            type: 'Symbol',
            name: name,
        };
    },

    numberNode(value) {
        return {
            type: 'Number',
            value: value,   // TODO: convert value to fraction.js instance
        };
    },

    parenthesisNode(content) {
        return {
            type: 'Parenthesis',
            content: base,
        };
    },
}
