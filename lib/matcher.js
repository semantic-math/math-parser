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
        if (key === 'args'
                && left.type === 'Operation'
                && left.op === right.op
                && ['mul', 'add'].includes(left.op)) {

            if (Array.isArray(left[key]) && Array.isArray(right[key])) {
                for (let i = 0; i <= right[key].length - left[key].length; i++) {
                    const rightSubArray = right[key].slice(i, i + left[key].length);
                    const isEqual = left[key].every((elem, index) => {
                        return equal(left[key][index], rightSubArray[index], matchedNodes);
                    });
                    if (isEqual) {
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
    let matchedNode = null;

    traverse(input, {
        enter() {},
        leave(node) {
            // TODO: for sub array matches we need to know what sub-section of
            // the array matches
            if (!matchedNode && equal(pattern, node)) {
                matchedNode = node;
            }
        },
    });

    return matchedNode;
}
