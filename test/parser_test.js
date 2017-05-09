import assert from 'assert'
import path from 'path'
import fs from 'fs'

const scriptName = path.basename(__filename);

const snapshotName = path.join(
    __dirname, '__snapshots__', scriptName.replace('_test.js', '_snap.json')
);

const snapshot = fs.existsSync(snapshotName)
    ? JSON.parse(fs.readFileSync(snapshotName, 'utf-8'))
    : {};

const snapshotMatches = (title, actual) => {
    const expected = snapshot[title];

    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        assert.fail(
            actual,
            expected,
            `snapshots don't match`,
            `snapshotMatches`
        );
    }
};

import parse from '../lib/parse'

const suite = (name, cases) => {
    describe(name, () => {
        cases.forEach((c) => {
            it(c, () => {
                const ast = parse(c);
                snapshotMatches(c, ast);
            });
        });
    });
}

describe("Parser.parse", () => {
    it('should fail with invalid tokens', () => {
        assert.throws(() => parse('a ; b'));
        assert.throws(() => parse('; a b'));
        assert.throws(() => parse('a b ;'));
    });

    suite("addition/subtraction", [
        'a + b + c',
        'a - b - c',
        'a + -b - c',
        'a - b - -c',
        '1 - 2',
        '1 - -2',
    ]);

    suite("multiplication", [
        'a b c',
        'a*b c',        // mix of explicit and implicit multiplication
        'a b * b * b c',
        'a*b*c',
        '(a)(b)(c)',
        '(a)b(c)',      // a times function b evaluated at c
    ]);

    suite("division", [
        'a/b/c',        // (a/b) / c
        'a*b*c/d',      // a * b * (c/d)
        'a b c/d',      // a * b * (c/d)
        'a/b*c/d',      // (a/b) * (c/d)
        '(a*b)/(c*d)',  // (a*b) / (c*d)
        'a^2/b^2',
        '2x/4',
        '2(x+1)/4',
    ]);

    suite("powers", [
        'a^b^c',
        '-a^-b',
        '-1^-2',
        'a^-1.23',
        '(-2)^x',
    ]);

    suite("functions", [
        // 'f()',
        'f(a,b)',
        'f(a+b)',
        'f(f(a))',
        // 'cos^2(x)',
    ]);

    suite("abs", [
        '|a - b|',
        '||a - b| - |b - c||',
    ]);

    suite("parenthesis", [
        'a * (b + c)',
        '(x + y) - (a + b)',
    ]);

    suite("unary operators", [
        '-a',
        '-2',
        '--a',
        '--2',
        '+a',
        '+2',
    ]);

    suite("relations (binary)", [
        'a = b',
        'a > b',
        'a >= b',
        'a < b',
        'a <= b',
        'a != b',
    ])

    suite("relations (n-ary)", [
        'a = b = c',
        'a + b = c + d = e + f',
        'a > b > c',
        'a + b > c + d > e + f',
        'a != b != c',
        'a + b != c + d != e + f',

    ])

    suite("systems of equations", [
        'x + 2 = y, 3x - 5 = 2y',
        'x + 1 = 2, x^2 + 2x + 1 = 0',
        'a = b, b = c, c = d'
    ])

    suite("sequences", [
        '1, 1, 2, 3, 5',
        'x, x + 1, x + 3',
        'a, a^3, a^5',
        'r_1, r_2, r_3',
    ])

    suite("subscripts", [
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
});

// TODO: add tests verify different ways of writing the same thing, e.g.
// a*b/c/d/ === a*b/(c*d)
