import assert from 'assert'

import parse from '../lib/parse'
import toTex from '../lib/toTex.js'

describe("toTex", () => {
    it("handles wasMinus correctly", () => {
        // arithmetic
        assert.equal(toTex(parse('1 + -2')), '1 + -2');
        assert.equal(toTex(parse('1 - -2')), '1 - -2');
        assert.equal(toTex(parse('a - b')), 'a - b');
        assert.equal(toTex(parse('a + -b')), 'a + -b');
        assert.equal(toTex(parse('1 * 2')), '1 \\times 2');
        // implicit multiplication
        assert.equal(toTex(parse('x * 2x')), 'x \\times 2 x');
        assert.equal(toTex(parse('-3')), '-3');
        // brackets
        //assert.equal(toTex(parse('[2 , 3]')), '');
    });

    it("handles fractions correctly", () => {
        assert.equal(toTex(parse('1/2')), '\\frac{1}{2}');
        assert.equal(toTex(parse('1/2/3')), '\\frac{\\frac{1}{2}}{3}');
        assert.equal(toTex(parse('x/2')), '\\frac{x}{2}');
        assert.equal(toTex(parse('(x+2)/(x+3)')), '\\frac{\\left(x + 2\\right)}{\\left(x + 3\\right)}');
    });

    it("handles equations correctly", () => {
        assert.equal(toTex(parse('x = 5/2')), 'x = \\frac{5}{2}');
        assert.equal(toTex(parse('x = 3 * (2/x)')), 'x = 3 \\times \\frac{2}{x}'); 
        assert.equal(toTex(parse('3 + x = 3/x')), '\\left(3 + x\\right) = \\frac{3}{x}'); 
    });
});
