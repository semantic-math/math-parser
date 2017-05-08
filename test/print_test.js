import assert from 'assert'

import parse from '../lib/parse'
import print from '../lib/print'

describe("print", () => {
    describe("wasMinus", () => {
        const tests = [
            '1 + -2',
            '1 - 2',
            '1 - -2',
            'a - b',
            'a + -b',
        ]

        tests.forEach(t =>
            it(t, () => assert.equal(print(parse(t)),t))
        )
    })

    describe("relations", () => {
        const tests = [
            'a = b',
            'a > b',
            'a >= b',
            'a < b',
            'a <= b',
            'a != b',
        ]

        tests.forEach(t =>
            it(t, () => assert.equal(print(parse(t)),t))
        )
    })

    describe("fractions", () => {
        const tests = [
            ['(x + 1) / 1', '(x + 1) / 1'],
            ['1/2/3', '1 / 2 / 3'], // (1/2) / 3
            ['1*2/3', '1 * 2 / 3'], // 1 * (2/3)
            ['(1*2)/3', '(1 * 2) / 3'],
            ['a/(b/c)', 'a / (b / c)'],
        ]

        tests.forEach(t =>
            it(`${t[0]} => ${t[1]}`, () =>
                assert.equal(print(parse(t[0])),t[1])
            )
        )
    })

    describe("exponents", () => {
        const tests = [
            ['x^2', 'x^2'],
            ['x^(x / 2)','x^(x / 2)'],
            ['x^(y + 1)', 'x^(y + 1)'],
            ['x^(x / (x + 2))', 'x^(x / (x + 2))'],
            ['x^((x + 1)/(2 * 2))', 'x^((x + 1) / (2 * 2))'],
            ['x^(x + x + (x + y))', 'x^(x + x + (x + y))'],
            ['(y+1)^((x + 1) + 2)', '(y + 1)^((x + 1) + 2)'],
            ['-2^x', '-2^x'],
            ['(-2)^x', '(-2)^x'],
            ['(-2)^-1', '(-2)^-1'],
        ]

        tests.forEach(t =>
            it(`${t[0]} => ${t[1]}`, () =>
                assert.equal(print(parse(t[0])),t[1])
            )
        )
    })

    describe('order of operations', () => {
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

        tests.forEach(t =>
            it(`${t[0]} => ${t[1]}`, () =>
                assert.equal(print(parse(t[0])),t[1])
            )
        )
    })
})
