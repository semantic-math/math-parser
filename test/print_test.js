const assert = require('assert');

const {Parser, print} = require('../build/bundle.js');

const parser = new Parser();

describe("print", () => {
    it("handles wasMinus correctly", () => {
        assert.equal(print(parser.parse('1 + -2')), '1 + -2');
        assert.equal(print(parser.parse('1 - 2')), '1 - 2');
        assert.equal(print(parser.parse('1 - -2')), '1 - -2');
        assert.equal(print(parser.parse('a - b')), 'a - b');
        assert.equal(print(parser.parse('a + -b')), 'a + -b');
    });

    // TODO(kevinb) enable these tests after updating division parsing behavior
    it.skip("handles fractions correctly", () => {
        assert.equal(print(parser.parse('1/2/3')), '(1 / 2) / 3');
        assert.equal(print(parser.parse('1*2/3')), '1 * (2 / 3)');
        assert.equal(print(parser.parse('(1*2)/3')), '(1 * 2) / 3');
    });
});
