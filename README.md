# math-parser

Parse math strings to an AST suitable for symbolic manipulation.

## Features

- flattened add/sub operations
- flattened mul/div operations
- equations and inequalities
- absolute value, e.g. `||x - y| - |y - z||`
- functions, e.g. `f(x, y, g(u, v))`
- multi-char identifiers, e.g. `atan2(dy, dx)`
- implicit multiplication, e.g. `(x)(y)`, `2x`, `a b`

## Demo

[demo](https://kevinbarabash.github.io/math-parser/)

## Getting Started

- `yarn install`
- `npm run build`
- `node demo.js`
