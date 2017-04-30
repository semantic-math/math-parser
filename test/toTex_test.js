import assert from 'assert'

import parse from '../lib/parse'
import toTex from '../lib/toTex.js'

describe("toTex", () => {
  it("handles wasMinus correctly", () => {
    assert.equal(toTex(parse('1 - 2')), '1 - 2');
    assert.equal(toTex(parse('1 - -2')), '1 - -2');
    assert.equal(toTex(parse('a - b')), 'a - b');
    assert.equal(toTex(parse('a + -b')), 'a + -b');
  });

  // TODO(kevinb) enable these tests after updating division parsing behavior
  it.skip("handles fractions correctly", () => {
    assert.equal(toTex(parse('1/2/3')), '1 / 2 / 3');
    assert.equal(parse('1*2/3'), '1 * (2 / 3)');
    // assert.equal(toTex(parser.parse('(1*2)/3')), '(1 * 2) / 3');
  });
});
