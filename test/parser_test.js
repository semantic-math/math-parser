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

const {Parser} = require('../build/bundle.js');

const parser = new Parser();

const testCases = [
    'a + b + c',
    'a - b - c',
    'a + -b - c',
];

describe("parser", () => {
    testCases.forEach((testCase) => {
        it(testCase, () => {
            const ast = parser.parse(testCase);
            snapshotMatches(testCase, ast);
        });
    });
});
