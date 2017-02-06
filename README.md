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

## Examples

`1 + 2 - 3 + -4 - -5` produces:

```
{
    "type": "Operation",
    "op": "+",
    "args": [
        {
            "type": "Number",
            "value": "1"
        },
        {
            "type": "Number",
            "value": "2"
        },
        {
            "type": "Negation",
            "content": {
                "type": "Number",
                "value": "3"
            }
        },
        {
            "type": "Number",
            "value": -4
        },
        {
            "type": "Negation",
            "content": {
                "type": "Number",
                "value": -5
            }
        }
    ]
}
```

`2x + 5 = 10` produces:

```
{
    "type": "Equation",
    "op": "=",
    "left": {
        "type": "Operation",
        "op": "+",
        "args": [
            {
                "type": "Operation",
                "op": "*",
                "args": [
                    {
                        "type": "Number",
                        "value": "2"
                    },
                    {
                        "type": "Symbol",
                        "name": "x"
                    }
                ]
            },
            {
                "type": "Number",
                "value": "5"
            }
        ]
    },
    "right": {
        "type": "Number",
        "value": "10"
    }
}
```

`a 2.5atan2(3-f(x-1))` produces:

```
{
    "type": "Operation",
    "op": "*",
    "args": [
        {
            "type": "Symbol",
            "name": "a"
        },
        {
            "type": "Number",
            "value": "2.5"
        },
        {
            "type": "Function",
            "fn": "atan2",
            "args": [
                {
                    "type": "Operation",
                    "op": "+",
                    "args": [
                        {
                            "type": "Number",
                            "value": "3"
                        },
                        {
                            "type": "Negation",
                            "content": {
                                "type": "Function",
                                "fn": "f",
                                "args": [
                                    {
                                        "type": "Operation",
                                        "op": "+",
                                        "args": [
                                            {
                                                "type": "Symbol",
                                                "name": "x"
                                            },
                                            {
                                                "type": "Negation",
                                                "content": {
                                                    "type": "Number",
                                                    "value": "1"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
```

## TODO

- [ ] write tests
- [ ] evaluating expressions with fraction.js
- [ ] ...
