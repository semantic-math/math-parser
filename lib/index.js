import evaluate from './evaluate'
import * as nodes from './nodes'
import parse from './parse'
import print from './print'

import {
    matchNode, match, rewrite,                              // private
    defineRule, canApplyRule, applyRule, populatePattern,   // public
} from './matcher'  // TODO: move this into its own repo
import {removeUnnecessaryParens} from './transforms'

export {
    evaluate,
    nodes,
    parse,
    print,
    removeUnnecessaryParens,

    matchNode, match, rewrite,
    defineRule, canApplyRule, applyRule, populatePattern,
};
