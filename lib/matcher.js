import traverse from './traverse';
import replace from './replace';
import print from './print';

// NOTE: left can contain placeholder nodes
export const equal = (left, right, matchedNodes = {}, indexes = {}) => {
    if (left.type === 'Placeholder') {
        if (left.name in matchedNodes) {
            return equal(matchedNodes[left.name], right, matchedNodes);
        } else {
            // TODO: enforce constraints on Placeholder
            matchedNodes[left.name] = clone(right);
            return true;
        }
    }
    if (Object.keys(left).length !== Object.keys(right).length) {
        return false;
    }
    return Object.keys(left).filter(key => key !== 'loc').every(key => {
        if (!right.hasOwnProperty(key)) {
            return false;
        }
        if (key === 'args'
                && left.type === 'Operation'
                && left.op === right.op
                && ['mul', 'add'].includes(left.op)) {

            if (Array.isArray(left[key]) && Array.isArray(right[key])) {
                for (let i = 0; i <= right[key].length - left[key].length; i++) {
                    const rightSubArray = right[key].slice(i, i + left[key].length);
                    // we need to be able to recover from a failed match at for
                    // each sub-array so we copy the matched nodes before doing
                    // the comparison.
                    const matchedNodesCopy = {...matchedNodes};
                    const isEqual = left[key].every((elem, index) => {
                        return equal(left[key][index], rightSubArray[index], matchedNodesCopy);
                    });
                    if (isEqual) {
                        indexes.start = i;
                        indexes.end = i + left[key].length;
                        Object.assign(matchedNodes, matchedNodesCopy);
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        } else if (Array.isArray(left[key])) {
            if (!Array.isArray(right[key])) {
                return false;
            }
            if (left[key].length !== right[key].length) {
                return false;
            }
            return left[key].every((elem, index) => {
                return equal(left[key][index], right[key][index], matchedNodes);
            });
        } else if (typeof left[key] === 'object') {
            return equal(left[key], right[key], matchedNodes);
        } else {
            return left[key] === right[key];
        }
    });
}

export const match = (pattern, input) => {
    let result = null;
    let path = [];

    traverse(input, {
        enter(node) {
            path.push(node);
        },
        leave(node) {
            // TODO: for sub array matches we need to know what sub-section of
            // the array matches
            const matchedNodes = {};
            const indexes = {};
            if (!result && equal(pattern, node, matchedNodes, indexes)) {
                result = {
                    node: node,
                    path: [...path], // copy the path
                    placeholders: matchedNodes,
                    indexes: indexes,
                };
            }
            path.pop();
        },
    });

    return result;
}

const clone = node => JSON.parse(JSON.stringify(node));

export const rewrite = (matchPattern, rewritePattern, input) => {
    const {node, placeholders, indexes} = match(matchPattern, input);

    // const node = path[path.length - 1];
    // const parent = path[path.length - 2];
    // const index = parent.args.findIndex(arg => arg === node);

    const matchedNode = node;

    if (matchedNode) {
        const replacement = replace(rewritePattern, {
            enter() {},
            leave(node) {
                if (node.type === 'Placeholder' && node.name in placeholders) {
                    return clone(placeholders[node.name]);
                }
            }
        });



        const output = replace(input, {
            enter(node) {
                if (node === matchedNode) {
                    if ('start' in indexes && 'end' in indexes) {
                        if (indexes.start > 0 || indexes.end < node.args.length - 1) {
                            // TODO: do another pass that removes unnecessary parenthesis
                            // TODO: make running that pass optional so that it can be done separately if necessary
                            node.args.splice(indexes.start, indexes.end - indexes.start, replacement);
                        } else {
                            return clone(replacement);
                        }
                    } else {
                        return clone(replacement);
                    }
                }
            },
            leave() {}
        })

        return print(output);
    }

    return null;
}
