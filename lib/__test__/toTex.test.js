import assert from 'assert'

import parse from '../parse'
import toTex from '../toTex.js'

describe("toTex", () => {
    it("handles wasMinus correctly", () => {
        const tests = [
            // arithmetic
            ['1 + -2', '1 + -2'],
            ['1 - -2', '1 - -2'],
            ['a - b', 'a - b'],
            ['a + -b', 'a + -b'],
            ['1 * 2', '1 \\times 2'],
            // implicit multiplication
            ['x * 2x', 'x \\times 2 x'],
            ['-3', '-3'],
            // brackets
            //['[2 , 3]', '']
        ]

        tests.forEach(t => assert.equal(toTex(parse(t[0])), t[1]))
    });

    it("handles fractions correctly", () => {
        const tests = [
            ['1/2', '\\frac{1}{2}'],
            ['1/2/3', '\\frac{\\frac{1}{2}}{3}'],
            ['x/2', '\\frac{x}{2}'],
            ['(x+2)/(x+3)', '\\frac{\\left(x + 2\\right)}{\\left(x + 3\\right)}'],
        ]

        tests.forEach(t => assert.equal(toTex(parse(t[0])), t[1]))
    });

    it("handles equations correctly", () => {
        const tests = [
            ['x = 5/2', 'x = \\frac{5}{2}'],
            ['x = 3 * (2/x)', 'x = 3 \\times \\frac{2}{x}'],
            ['3 + x = 3/x', '\\left(3 + x\\right) = \\frac{3}{x}'],
        ]

        tests.forEach(t => assert.equal(toTex(parse(t[0])), t[1]))
    });

    it("relations", () => {
        const tests = [
            'a = b',
            'a > b',
            'a >= b',
            'a < b',
            'a <= b',
            'a != b',
        ]

        tests.forEach(test => assert.equal(toTex(parse(test)), test))
    })

    it("functions", () => {
        const tests = [
            // nthRoot
            ['nthRoot(x^1, 2)', '\\sqrt{x^1}'],
            ['nthRoot(y^-6, -3)', '\\sqrt[-3]{y^-6}'],
            ['nthRoot(2, 2)', '\\sqrt{2}'],
            ['nthRoot(x^2)', '\\sqrt{x^2}'],
            ['nthRoot(x^2 y^2, -2)', '\\sqrt[-2]{x^{2} y^{2}}'],

            // integrals
            ['int(x^2, dx)', '\\int x^{2} dx'],
            ['int(x^2, dx, D)', '\\int_D x^{2} dx'],
            ['int(x^2, dx, a, b)', '\\int_{a}^{b} x^{2} dx'],
            ['int(int(x^2 + y^2, dx, a, b), dy, c, d)', '\\int_{c}^{d} \\int_{a}^{b} \\left(x^{2} + y^{2}\\right) dx dy']
            
        ]

        tests.forEach(t => assert.equal(toTex(parse(t[0])), t[1]))
    })
});
