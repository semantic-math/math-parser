const assert = require('assert');

const {evaluateMathJS, parse, transformMathJS} = require('../docs/bundle.js');

const evaluate = (math) => evaluateMathJS(transformMathJS(parse(math)));

// TODO add a matcher that checks if values are within a certain epsilon

describe("Parser.parse + transformMathJS + evaluateMathJS", () => {
    it('should evaluate numeric expression', () => {
        assert.equal(evaluate('1 + 2 + 3'), 6);
        assert.equal(evaluate('1 - 2 - 3'), -4);
        assert.equal(evaluate('1 / 2'), 0.5);
        assert.equal(evaluate('2^3'), 8);
        assert.equal(evaluate('-(1 + 2)'), -3);
        assert.equal(evaluate('sin(0)'), 0);

        // TODO should evaluate to NaN b/c the left/right limits don't match
        assert.equal(evaluate('1 / 0'), Infinity);
    });

    // TODO use fraction.js
    it.skip('should be able to perform exact math with rational numbers', () => {
        assert.equal(evaluate('1/10 + 2/10'), 0.3);
    })

    it('should throw if the expression contains variables', () => {
        assert.throws(() => evaluate('a + b'));
    });

    it('should throw if a function does not exist', () => {
        assert.throws(() => evaluate('bessel(1)'));
    });
});
