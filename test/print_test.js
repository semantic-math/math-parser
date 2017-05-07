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

    it("handles fractions correctly", () => {
        const tests = [
            ['(x + 1) / 1', '(x + 1) / 1'],
            ['1/2/3', '1 / 2 / 3'], // (1/2) / 3
            ['1*2/3', '1 * 2 / 3'], // 1 * (2/3)
            ['(1*2)/3', '(1 * 2) / 3'],
            ['a/(b/c)', 'a / (b / c)'],
        ]

        tests.forEach(test => assert.equal(print(parse(test[0])), test[1]))
    })

    it("handles exponents correctly", () => {
        const tests = [
            ['x^2', 'x^2'],
            ['x^(x / 2)','x^(x / 2)'],
            ['x^(y + 1)', 'x^(y + 1)'],
            ['x^(x / (x + 2))', 'x^(x / (x + 2))'],
            ['x^((x + 1)/(2 * 2))', 'x^((x + 1) / (2 * 2))'],
            ['x^(x + x + (x + y))', 'x^(x + x + (x + y))'],
            ['(y+1)^((x + 1) + 2)', '(y + 1)^((x + 1) + 2)']
        ]
        tests.forEach(test => assert.equal(print(parse(test[0])),test[1]))
    })

    it('handles order of operations correct', () => {
        const tests = [
            ['1 * (2 * (3 * 4))', '1 * (2 * (3 * 4))'],
            ['((1 * 2) * 3) * 4', '((1 * 2) * 3) * 4'],
            ['1 + (2 + (3 + 4))', '1 + (2 + (3 + 4))'],
            ['((1 + 2) + 3) + 4', '((1 + 2) + 3) + 4'],
            ['2 x y + 3 x y', '2 x y + 3 x y'],
            ['(2 x y) / (3 x y)', '(2 x y) / (3 x y)'],
            ['(x y)^(2 * 3)', '(x y)^(2 * 3)'],
            ['(x / y)^(2 / 3)', '(x / y)^(2 / 3)'],
        ]

        tests.forEach(test => assert.equal(print(parse(test[0])),test[1]))
    })
})
