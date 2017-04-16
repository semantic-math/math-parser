import traverse from './traverse';

// NOTE: left can contain placeholder nodes
export const equal = (left, right, matchedNodes = {}) => {
    if (left.type === 'Placeholder') {
        if (left.name in matchedNodes) {
            return equal(matchedNodes[left.name], right, matchedNodes);
        } else {
            // TODO: enforce constraints on Placeholder
            matchedNodes[left.name] = right;
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
        // if left.type === right.type === 'Operation' and 'op' === 'add'
        // then check if left.args.length <= right.args.length and then
        // check if any sub-array of right.args of length left.args.length
        // matches left.args
        if (Array.isArray(left[key])) {
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
    let matchedNode = null;

    traverse(input, {
        enter(node) {},
        leave(node) {
            if (!matchedNode && equal(pattern, node)) {
                matchedNode = node;
            }
        },
    });

    return matchedNode;
}
