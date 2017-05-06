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

    // TODO: re-enable after changing parser to not produce a System (or eqns)
    // node.  We should only be produce such a node for the following:
    // x + 2 = y, 3x - 5 = 2y, 2y - x = 10
    suite("relations (n-ary)", [
        'a = b = c',
        'a + b = c + d = e + f',
        'a > b > c',
        'a + b > c + d > e + f',
        'a != b != c',
        'a + b != c + d != e + f',

    ])
});

// TODO: add tests verify different ways of writing the same thing, e.g.
// a*b/c/d/ === a*b/(c*d)
