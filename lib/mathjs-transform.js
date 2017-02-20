/**
 * transform - transform a math-parser AST tree to a mathjs expression tree.
 */

import replace from './replace';

const opFns = {
    neg: 'unaryMinus',
    add: 'add',
    mul: 'multiply',
    div: 'divide',
    pow: 'pow',
}

const ops = {
    neg: '-',
    add: '+',
    mul: '*',
    div: '/',
    pow: '^',
};

export default function transform(ast) {
    return replace(ast, {
        enter: () => {},
        leave: (node) => {
            switch (node.type) {
                case 'Function':
                    return {
                        type: 'FunctionNode',
                        fn: node.fn,
                        args: node.args,
                    };
                case 'Identifier':
                    return {
                        type: 'SymbolNode',
                        name: node.name,
                    };
                case 'Number':
                    return {
                        type: 'ConstantNode',
                        value: node.value,
                        valueType: 'number',
                    };
                case 'Operation':
                    return {
                        type: 'OperatorNode',
                        op: ops[node.op],
                        fn: opFns[node.op],
                        implicit: !!node.implicit,
                        args: node.args,
                    };
                case 'Brackets':
                    return {
                        type: 'ParenthesisNode',
                        content: node.content,
                    };
                default:
                    throw new Error(`'${node.type}' node cannot be transformed`);
            }
        }
    });
}
