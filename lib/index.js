import evaluate from './evaluate'
import evaluateMathJS from './mathjs-evaluate'
import * as nodes from './nodes'
import parse from './parse'
import print from './print'
import replace from './replace'
import replaceMathJS from './mathjs-replace'
import transformMathJS from './mathjs-transform'
import traverse from './traverse'
import toTex from './toTex.js';

import {
    matchNode, match, rewrite,                              // private
    defineRule, canApplyRule, applyRule, populatePattern,   // public
} from './matcher'  // TODO: move this into its own repo
import {removeUnnecessaryParens} from './transforms'

export {
    evaluate,
    evaluateMathJS,
    nodes,
    parse,
    print,
    toTex,
    replace,
    replaceMathJS,
    transformMathJS,
    traverse,
    removeUnnecessaryParens,

    matchNode, match, rewrite,
    defineRule, canApplyRule, applyRule, populatePattern,
};
