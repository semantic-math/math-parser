import assert from 'assert'

import parse from '../lib/parse'
import print from '../lib/print'

describe("print", () => {
    it("handles wasMinus correctly", () => {
        assert.equal(print(parse('1 + -2')), '1 + -2');
        assert.equal(print(parse('1 - 2')), '1 - 2');
        assert.equal(print(parse('1 - -2')), '1 - -2');
        assert.equal(print(parse('a - b')), 'a - b');
        assert.equal(print(parse('a + -b')), 'a + -b');
    });

    // TODO(kevinb) enable these tests after updating division parsing behavior
    it.skip("handles fractions correctly", () => {
        assert.equal(print(parse('1/2/3')), '1 / 2 / 3');
        assert.equal(parse('1*2/3'), '1 * (2 / 3)');
        // assert.equal(print(parser.parse('(1*2)/3')), '(1 * 2) / 3');
    });
});
