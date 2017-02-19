const assert = require('assert');
const path = require('path');
const fs = require('fs');

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

const {Parser, transformMathJS} = require('../build/bundle.js');

const parser = new Parser();

const parseMathJS = (text) => transformMathJS(parser.parse(text));

const suite = (name, cases) => {
    describe(name, () => {
        cases.forEach((c) => {
            it(c, () => {
                const ast = parseMathJS(c);
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
        `a - b - -c`,
    ]);

    suite("multiplication", [
        'a b c',
        'a*b c',    // mix of explicit and implicit multiplication
        'a b * b * b c',
        'a*b*c',
        '(a)(b)(c)',
        '(a)b(c)',  // a times function b evaluated at c
    ]);

    suite("division", [
        'a/b/c',
        'a*b/c/d',
        'a*b/(c*d)',
    ]);

    suite("functions", [
        // 'f()',
        'f(a,b)',
        'f(a+b)',
        'f(f(a))',
    ]);
});
