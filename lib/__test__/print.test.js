import assert from 'assert'

import parse from '../parse'
import print from '../print'

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
            'a + b = c - d',
            'a + b > c - d',
            'a + b >= c - d',
            'a + b < c - d',
            'a + b <= c - d',
            'a + b != c - d',
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
            '1 * (2 * (3 * 4))',
            '((1 * 2) * 3) * 4',
            '1 + (2 + (3 + 4))',
            '((1 + 2) + 3) + 4',
            '2 x y + 3 x y',
            '(2 x y) / (3 x y)',
            '(x y)^(2 * 3)',
            '(x / y)^(2 / 3)',
            '2 x * 3 x y',
            '(2 x) (3 x y)',
        ]

        tests.forEach(t =>
            it(t, () => assert.equal(print(parse(t)),t))
        )
    })

    describe('subscripts', () => {
        const tests = [
            'a_0',
            'a_123',
            'a_n',
            'a_xyz',
            'a_0^2',
            '#a_0',
            // 'a_-1',
            // 'a_(m+n),
            // 'a_b_c',
            // 'f_n(x)',
        ]

        tests.forEach(t =>
            it(t, () => assert.equal(print(parse(t)), t))
        )
    })

    describe('ellipsis', () => {
        const tests = [
            'a + ... + z',
            '1 * ... * n',
            // 'a ... z',  // implicit multiplication
            '1, 2, ..., n',
            '#a_0 #x + ... + #a_n #x',
        ]

        tests.forEach(t =>
            it(t, () => assert.equal(print(parse(t)), t))
        )
    })

    describe('functions', () => {
        const tests = [
            'f(x)',
            'gcd(1, 2, 3)',
            '#eval(#a_0, ...)',
            '#eval(lcm(#a_0, ...))',
        ]

        tests.forEach(t =>
            it(t, () => assert.equal(print(parse(t)), t))
        )
    })

    describe('parentheses', () => {
        const tests = [
            '5 + (3 * 6)',
            '5 + ((3 * 6))',
            '5 + (((3 * 6)))',
            '(1 + 2)',
            '((1 + 2))',
            '(((1 + 2)))',
            '(a * b)',
            '((a * b))',
            '(((a * b)))',
        ]

        tests.forEach(t =>
            it(t, () => assert.equal(print(parse(t)), t))
        )
    })

    describe('nthRoot', () => {
        const tests = [
            ['nthRoot(x)', 'nthRoot(x, 2)'],
            ['nthRoot(x, 3)', 'nthRoot(x, 3)'],
            ['nthRoot(8, 3)', 'nthRoot(8, 3)'],
            ['nthRoot(x^2, 4)', 'nthRoot(x^2, 4)'],
        ]

        tests.forEach(t =>
            it(t[0], () => assert.equal(print(parse(t[0])), t[1]))
        )
    })

    describe('factorial', () => {
        const tests = [
            '5!',
            'n!',
            'x^2!',
            '(x + 1)!',
            '(5 * 2)!',
            '(8 / 2)!',
            '(x^2)!',
        ]

        tests.forEach(t =>
            it(t, () => assert.equal(print(parse(t)), t))
        )
    })

    describe('abs', () => {
        const tests = [
            '|-1|',
            '|x|',
            '|x + 1|',
            '|x| - |y|',
            '||x| - |y||',
        ]

        tests.forEach(t =>
            it(t, () => assert.equal(print(parse(t)), t))
        )
    })
})
