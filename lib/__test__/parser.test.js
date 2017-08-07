import assert from 'assert'
import stringify from 'json-stable-stringify'

import parse from '../parse'

const reverseAlphabetical = (a, b) => a.key < b.key ? 1 : -1

const serializer = {
    print(val) {
        return stringify(val, {cmp: reverseAlphabetical, space: '    '})
    },
    test() {
        return true
    },
}

expect.addSnapshotSerializer(serializer)  // eslint-disable-line

const suite = (name, cases) => {
    describe(name, () => {
        cases.forEach((c) => {
            it(c, () => {
                const ast = parse(c)
                expect(ast).toMatchSnapshot()  // eslint-disable-line
            })
        })
    })
}

suite.only = (name, cases) => {
    describe.only(name, () => {
        cases.forEach((c) => {
            it(c, () => {
                const ast = parse(c)
                expect(ast).toMatchSnapshot()  // eslint-disable-line
            })
        })
    })
}

describe('Parser.parse', () => {
    it('should fail with invalid tokens', () => {
        assert.throws(() => parse('a ; b'))
        assert.throws(() => parse('; a b'))
        assert.throws(() => parse('a b ;'))
    })

    suite('addition/subtraction', [
        'a + b + c',
        'a - b - c',
        'a + -b - c',
        'a - b - -c',
        '1 - 2',
        '1 - -2',
    ])

    suite('multiplication', [
        'a b c',
        'a*b c',        // mix of explicit and implicit multiplication
        'a b * b * b c',
        'a*b*c',
        '(a)(b)(c)',
        '(a)b(c)',      // a times function b evaluated at c
    ])

    suite('division', [
        'a/b/c',        // (a/b) / c
        'a*b*c/d',      // a * b * (c/d)
        'a b c/d',      // a * b * (c/d)
        'a/b*c/d',      // (a/b) * (c/d)
        '(a*b)/(c*d)',  // (a*b) / (c*d)
        'a^2/b^2',
        '2x/4',
        '2(x+1)/4',
    ])

    suite('powers', [
        'a^b^c',
        '-a^-b',
        '-1^-2',
        'a^-1.23',
        '(-2)^x',
    ])

    suite('functions', [
        // 'f()',
        'f(a,b)',
        'f(a+b)',
        'f(f(a))',
        // 'cos^2(x)',
    ])

    suite('nthRoot', [
        'nthRoot(x)',
        'nthRoot(x, 2)',
        'nthRoot(-27, 3)',
    ])
    // TODO: add failing tests for:
    // - nthRoot()
    // - nthRoot(1, 2, 3)

    suite('abs', [
        '|a - b|',
        '||a - b| - |b - c||',
    ])

    suite('parentheses', [
        'a * (b + c)',
        '(x + y) - (a + b)',
        '(a)(b)',
        '5 + (3 * 6)',
        '5 + ((3 * 6))',
        '(1 + 2)',
        '((1 + 2))',
        '(a * b)',
        '((a * b))',
    ])

    suite('unary operators', [
        '-a',
        '-2',
        '--a',
        '--2',
        '+a',
        '+2',
    ])

    suite('relations (binary)', [
        'a = b',
        'a > b',
        'a >= b',
        'a < b',
        'a <= b',
        'a != b',
    ])

    suite('relations (n-ary)', [
        'a = b = c',
        'a + b = c + d = e + f',
        'a > b > c',
        'a + b > c + d > e + f',
        'a != b != c',
        'a + b != c + d != e + f',
        'a = b >= c != d < e - f',
        'a = b = c >= d <= e <= f',
    ])

    suite('systems of equations', [
        'x + 2 = y, 3x - 5 = 2y',
        'x + 1 = 2, x^2 + 2x + 1 = 0',
        'a = b, b = c, c = d'
    ])

    suite('sequences', [
        '1, 1, 2, 3, 5',
        'x, x + 1, x + 3',
        'a, a^3, a^5',
        'r_1, r_2, r_3',
    ])

    suite('placeholders', [
        '#a',
        '#a #b / #c',
        '#f(#x)',
        '#a #f(#x)',
        '#eval(#a + #b)',
    ])

    suite('subscripts', [
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
    ])

    suite('ellipsis', [
        'a + ... + z',
        '1 * ... * n',
        // 'a ... z',  // implicit multiplication
        '1, 2, ..., n',
        '#a_0#x + ... + #a_n#x',
    ])

    suite('factorial', [
        '5!',
        'x!',
        '5!^2',
        '(5^2)!',
        'x^2!',
        '2 * n!',
        '(2 * n)!',
    ])

    suite('integrals', [
        'int x^2 dx',
        'int_0^1 x^2 dx',
        'int_0^1 x^2 2x dx',
        'int_0^1 int_0^1 x^2 y^2 dx dy',
        'int_0^1 int_0^1 x^2 + y^2 dx dy',
    ])
})

// TODO: add tests verify different ways of writing the same thing, e.g.
// a*b/c/d/ === a*b/(c*d)
