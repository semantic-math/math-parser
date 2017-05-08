import assert from 'assert'

import evaluate from '../lib/evaluate'
import parse from '../lib/parse'

const evaluateString = (input) => evaluate(parse(input))

describe('evaluate', () => {
    const tests = [
        ['1 + 2 + 3', '6'],
        ['8 - 5', '3'],
        ['2^2', '4'],
        ['2^2^2', '16'],
        ['-2^2', '-4'],
        ['(-2)^2', '4'],
        ['1/2', '0.5'],
        ['1/3', 1/3],
    ]

    tests.forEach(t => {
        it(`${t[0]} = ${t[1]}`, () => {
            assert.equal(evaluateString(t[0]), t[1])
        })
    })

    // TODO: test failing cases

    // TODO: add a function that tests whether a node can be evaluated
})