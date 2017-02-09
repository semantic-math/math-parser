/**
 * transform - transform a math-parser AST tree to a mathjs expression tree.
 */

import replace from './replace';

function getOperatorFn(node) {
    switch (node.op) {
        case '-':
            if (node.args.length === 1) {
                return 'unaryMinus';
            } else if (node.args.length === 2) {
                return 'subtract';
            }
            throw new Error(`invalid argCount for '-'`);
        case '+':
            return 'add';
        case '*':
            return 'multiply';
        case '/':
            return 'divide';
        case '^':
            return 'pow';
        default:
            throw new Error(`unknown operator '${node.op}' encountered`);
    }
}

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
                        op: node.op,
                        fn: getOperatorFn(node),
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
