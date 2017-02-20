const assert = require('assert');

const {Parser, print} = require('../docs/bundle.js');

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
        assert.equal(print(parser.parse('1/2/3')), '1 / 2 / 3');
        const ast = parser.parse('1*2/3');
        console.log(JSON.stringify(ast, null, 2));
        assert.equal(print(ast), '1 * (2 / 3)');
        // assert.equal(print(parser.parse('(1*2)/3')), '(1 * 2) / 3');
    });
});
