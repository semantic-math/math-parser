const parse = module.exports.parse;
const traverse = module.exports.traverse;
const transformMathJS = module.exports.transformMathJS;

function traverseMathJS(node, enter, leave) {
    switch (node.type) {
        case 'FunctionNode':
        case 'OperatorNode':
            enter(node);
            node.args.forEach((arg) => traverseMathJS(arg, enter, leave));
            leave(node);
            break;

        case 'ConstantNode':
        case 'SymbolNode':
            enter(node);
            leave(node);
            break;

        case 'ParenthesisNode':
            enter(node);
            traverseMathJS(node.content, enter, leave);
            leave(node);
            break;

        default:
            throw new Error(`Unrecognized node of type '${node.type}'`);
    }
}

const input = document.querySelector('#input');
const output = document.querySelector('#output');
const select = document.querySelector('#asttype');

select.addEventListener('change', () => {
    asttype = select.value;
    update();
})

const params = new URLSearchParams(location.search);

let asttype = 'mast-ast';

if (params.has('math')) {
    input.value = params.get('math');
}
if (params.has('ast')) {
    asttype = params.get('ast');
    select.value = asttype;
}

const update = () => {
    try {
        let ast = parse(input.value);
        if (asttype === 'flattened-mathjs') {
            ast = transformMathJS(ast);
        }
        // remove location data
        // TODO(kevinb) make this configurable
        if (asttype === 'flattened-mathjs') {
            traverseMathJS(ast, () => {}, (node) => delete node.loc);
        } else {
            traverse(ast, {
                enter() { },
                leave(node) {
                    delete node.loc;
                }
            });
        }

        output.textContent = JSON.stringify(ast, null, 2);
    } catch (e) {
        output.textContent = e.message;
    }
}

update();

input.addEventListener('input', update);

const permalink = document.querySelector('#permalink');
permalink.addEventListener('click', () => {
    const math = encodeURI(input.value).replace(/\+/g, '%2B');
    window.location = `?math=${math}&ast=${asttype}`;
});
