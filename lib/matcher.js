import traverse from './traverse'
import replace from './replace'

// NOTE: left can contain placeholder nodes
export const matchNode = (pattern, node, matchedNodes = {}, indexes = {}) => {
    if (pattern.type === 'Placeholder') {
        if (pattern.name in matchedNodes) {
            return matchNode(matchedNodes[pattern.name], node, matchedNodes);
        } else {
            // TODO: enforce constraints on Placeholder
            matchedNodes[pattern.name] = clone(node);
            return true;
        }
    }

    const patternKeys = Object.keys(pattern).filter(key => key !== 'loc');
    const nodeKeys = Object.keys(node).filter(key => key !== 'loc');

    if (patternKeys.length !== nodeKeys.length) {
        return false;
    }

    return patternKeys.every(key => {
        if (key === 'args'
            && pattern.type === 'Operation'
            && pattern.op === node.op
            && ['mul', 'add'].includes(pattern.op)) {

            if (Array.isArray(pattern[key]) && Array.isArray(node[key])) {
                for (let i = 0; i <= node[key].length - pattern[key].length; i++) {
                    const rightSubArray = node[key].slice(i, i + pattern[key].length);
                    // we need to be able to recover from a failed match at for
                    // each sub-array so we copy the matched nodes before doing
                    // the comparison.
                    const matchedNodesCopy = {...matchedNodes};
                    const isEqual = pattern[key].every((elem, index) => {
                        return matchNode(
                            pattern[key][index],
                            rightSubArray[index],
                            matchedNodesCopy);
                    });
                    if (isEqual) {
                        indexes.start = i;
                        indexes.end = i + pattern[key].length;
                        Object.assign(matchedNodes, matchedNodesCopy);
                        return true;
                    }
                }
                return false;
            } else {
                return false;
            }
        } else if (Array.isArray(pattern[key])) {
            if (!Array.isArray(node[key])) {
                return false;
            }
            if (pattern[key].length !== node[key].length) {
                return false;
            }
            return pattern[key].every((elem, index) => {
                return matchNode(pattern[key][index], node[key][index], matchedNodes);
            });
        } else if (typeof pattern[key] === 'object') {
            return matchNode(pattern[key], node[key], matchedNodes);
        } else {
            return pattern[key] === node[key];
        }
    });
}

export const match = (pattern, input) => {
    let result = null
    let path = []

    traverse(input, {
        enter(node) {
            path.push(node);
        },
        leave(node) {
            // TODO: for sub array matches we need to know what sub-section of
            // the array matches
            const matchedNodes = {};
            const indexes = {};
            if (!result && matchNode(pattern, node, matchedNodes, indexes)) {
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

const checkBounds = (indexes, array) =>
    'start' in indexes &&
    'end' in indexes &&
    indexes.start > 0 || indexes.end < array.length - 1

// Rewrite matches a single node in input based on matchPattern.  If a match
// is found it will replace that single node with the rewritePattern.
export const rewrite = (matchPattern, rewritePattern, input) => {
    const {node, placeholders, indexes} = match(matchPattern, input);
    const matchedNode = node;

    if (matchedNode) {
        const replacement = replace(rewritePattern, {
            leave(node) {
                if (node.type === 'Placeholder' && node.name in placeholders) {
                    return clone(placeholders[node.name]);
                }
            }
        });

        const output = replace(input, {
            leave(node) {
                if (node === matchedNode) {
                    if (checkBounds(indexes, node.args)) {
                        // TODO: make running that pass optional so that it
                        // can be done separately if necessary
                        node.args.splice(
                            indexes.start,
                            indexes.end - indexes.start,
                            clone(replacement))
                    } else {
                        return clone(replacement)
                    }
                }
            }
        })

        return output
    }

    return null;
}
