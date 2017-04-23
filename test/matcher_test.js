const assert = require('assert');

const {equal, match, rewrite, parse, print} = require('../docs/bundle.js');

// returns the rewritten string
const rewriteString = (matchPattern, rewritePattern, input) => {
    const ast = rewrite(
        parse(matchPattern),
        parse(rewritePattern),
        parse(input)
    )

    return print(ast)
}

// returns the matched node in the AST of the parsed input
const matchString = (pattern, input) => {
    return match(parse(pattern), parse(input));
}

describe('matcher', () => {

    it('should return true when the expressions are equal', () => {
        const ast1 = parse('1 + 2');
        const ast2 = parse(' 1  +  2');

        assert(equal(ast1, ast2));
    });

    it('should return true for sub-expressions in add and mul nodes', () => {
        assert(equal(parse('1 + 2'), parse('1 + 2 + 3')));
        assert(equal(parse('1 * 2'), parse('1 * 2 * 3')));
    });

    it('should return false for sub-expressions not in add and mul nodes', () => {
        assert.equal(equal(parse('4 + 5'), parse('1 + 2 + 3')), false);
        assert.equal(equal(parse('4 * 5'), parse('1 * 2 * 3')), false);
    });

    it('should find a match for a sub-expression pattern in add and mul nodes', () => {
        assert(matchString('#a + #b', '1 + 2 + 3'));
        assert(matchString('#a * #b', '1 * 2 * 3'));
    });

    it('should find not find a match', () => {
        assert.equal(matchString('#a + #a', '1 + 2'), null);
    });

    it('should find match equal nodes', () => {
        assert(matchString('#a + #a', '1 + 1'));
    });

    it('should find match complex equal nodes', () => {
        assert(matchString('#a + #a', '1/a + 1/a'));
    });

    it('should find a match inside sub-expressions', () => {
        assert(matchString('#a + #b', '3 * (1 + 2)'));
    });

    it('should find match different complex expressions', () => {
        const result = matchString('#a + #b', '2 * a + 3 * b ^ 2');
        assert(result);
        const {node} = result;
        assert.equal(equal(node.args[0], parse('2 * a')), true);
        assert.equal(equal(node.args[1], parse('3 * b ^ 2')), true);
    });

    it('should match patterns including constants', () => {
        assert(matchString('0 + #a', '0 + -5'));
        assert(matchString('#a + 0', '23 + 0'));
    });

    it('should match patterns including identifiers', () => {
        assert(matchString('#a x', '3 x'));
        assert(matchString('#a x + #b x', '3 x + 5 x'));
        assert.equal(matchString('#a x + #b x', '3 x + 5 y'), null);
    });

    it('should replace x + 0', () => {
        const result = rewriteString('#a + 0', '#a', '2 * (x + 0)');
        assert.equal(result, '2 * x');
    });

    it('should replace x + 0 as a subexpression', () => {
        const result = rewriteString('#a + 0', '#a', '2 * (x + 0)');
        assert.equal(result, '2 * x');
    });

    it('should replace the innermost x + 0', () => {
        const result = rewriteString('#a + 0', '#a', '(x + 0) + 0');
        assert.equal(result, 'x + 0');
    });

    it('should replace x + 0 within a large expression', () => {
        const result = rewriteString('#a + 0', '#a', '1 + x + 0 + 2');
        assert.equal(result, '1 + x + 2');
    });

    it('should replace an single node with an add operation', () => {
        const result = rewriteString('2 #a', '#a + #a', '1 + 2 x + 2');
        assert.equal(result, '1 + (x + x) + 2');
    });

    it('should replace an single node with a mul operation', () => {
        const result = rewriteString('2 #a', '#a + #a', '1 * 2 x * 3');
        assert.equal(result, '1 * (x + x) * 3');
    });

    it('should work from the inside out', () => {
        const result = rewriteString('#a + 0', '#a', '((x + 0) + 0) + 0');
        assert.equal(result, '(x + 0) + 0');
    });

    it('should apply the rule a single time', () => {
        const result = rewriteString('#a + 0', '#a', '(x + 0) + (x + 0)');
        assert.equal(result, 'x + (x + 0)');

        const result2 = rewriteString('#a + 0', '#a', 'x + 0 + x + 0');
        assert.equal(result2, 'x + x + 0');
    });
});
