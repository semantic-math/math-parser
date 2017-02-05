# math-parser
Parse math strings to an AST suitable for symbolic manipulation.

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
