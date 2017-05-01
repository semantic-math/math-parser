import assert from 'assert'

import parse from '../lib/parse'
import print from '../lib/print'

describe("print", () => {
    it("wasMinus", () => {
        const tests = [
            '1 + -2',
            '1 - 2',
            '1 - -2',
            'a - b',
            'a + -b',
        ]

        tests.forEach(test => assert.equal(print(parse(test)), test))
    })

    it("relations", () => {
        const tests = [
            'a = b',
            'a > b',
            'a >= b',
            'a < b',
            'a <= b',
            'a != b',
        ]

        tests.forEach(test => assert.equal(print(parse(test)), test))
    })

    // TODO(kevinb) enable these tests after updating division parsing behavior
    it.skip("handles fractions correctly", () => {
        assert.equal(print(parse('1/2/3')), '1 / 2 / 3');
        // assert.equal(print(parse('1*2/3')), '1 * (2 / 3)');
        assert.equal(print(parse('(1*2)/3')), '(1 * 2) / 3');
    });
});
