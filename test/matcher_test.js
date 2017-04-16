const assert = require('assert');

const {equal, match, parse} = require('../docs/bundle.js');

describe('matcher', () => {

    it('should return true when the expressions are equal', () => {
        const ast1 = parse('1 + 2');
        const ast2 = parse(' 1  +  2');

        assert(equal(ast1, ast2));
    });

    it('should return false with different number of args', () => {
        const ast1 = parse('1 + 2');
        const ast2 = parse('1 + 2 + 3');

        assert.equal(equal(ast1, ast2), false);
    });

    it('should find a match', () => {
        // TODO: figure out how to match a + b inside a + b + c + d
        const pattern = parse('#a + #b');
        const ast = parse('1 + 2');

        assert(match(pattern, ast));
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

        const matchedNode = match(pattern, ast);
        assert(matchedNode);
        assert.equal(equal(matchedNode.args[0], parse('2 * a')), true);
        assert.equal(equal(matchedNode.args[1], parse('3 * b ^ 2')), true);
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
});
