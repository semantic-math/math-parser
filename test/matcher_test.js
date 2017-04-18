const assert = require('assert');

const {equal, match, rewrite, parse} = require('../docs/bundle.js');

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
        assert(match(parse('#a + #b'), parse('1 + 2 + 3')));
        assert(match(parse('#a * #b'), parse('1 * 2 * 3')));
    });

    it('should find not find a match', () => {
        const pattern = parse('#a + #a');
        const ast = parse('1 + 2');

        assert.equal(match(pattern, ast), null);
    });

    it('should find match equal nodes', () => {
        const pattern = parse('#a + #a');
        const ast = parse('1 + 1');

        assert(match(pattern, ast));
    });

    it('should find match complex equal nodes', () => {
        const pattern = parse('#a + #a');
        const ast = parse('1/a + 1/a');

        const matchedNode = match(pattern, ast);
        assert(matchedNode);
    });

    it('should find a match inside sub-expressions', () => {
        const pattern = parse('#a + #b');
        const ast = parse('3 * (1 + 2)');

        const matchedNode = match(pattern, ast);
        assert(matchedNode);
    });

    it('should find match different complex expressions', () => {
        const pattern = parse('#a + #b');
        const ast = parse('2 * a + 3 * b ^ 2');

        const result = match(pattern, ast);
        assert(result);
        const {node} = result;
        assert.equal(equal(node.args[0], parse('2 * a')), true);
        assert.equal(equal(node.args[1], parse('3 * b ^ 2')), true);
    });

    it('should match patterns including constants', () => {
        assert(match(parse('0 + #a'), parse('0 + -5')));
        assert(match(parse('#a + 0'), parse('23 + 0')));
    });

    it('should match patterns including identifiers', () => {
        assert(match(parse('#a x'), parse('3 x')));
        assert(match(parse('#a x + #b x'), parse('3 x + 5 x')));
        assert.equal(match(parse('#a x + #b x'), parse('3 x + 5 y')), null);
    });

    it('should replace x + 0', () => {
        assert(true);

        const result = rewrite(parse('#a + 0'), parse('#a'), parse('2 * (x + 0)'));

        assert.equal(result, '2 * x');
    });

    it('should replace x + 0 as a subexpression', () => {
        assert(true);

        const result = rewrite(parse('#a + 0'), parse('#a'), parse('2 * (x + 0)'));

        assert.equal(result, '2 * x');
    });

    it('should replace the innermost x + 0', () => {
        assert(true);

        const result = rewrite(parse('#a + 0'), parse('#a'), parse('(x + 0) + 0'));

        assert.equal(result, 'x + 0');
    });

    // TODO: figure out how to replace some of the operands in an add/mul operation
    it.skip('should replace x + 0 within a large expression', () => {
        assert(true);

        const result = rewrite(parse('#a + 0'), parse('#a'), parse('x + 0 + 1'));

        assert.equal(result, 'x + 1');
    });
});
