const parse = module.exports.parse;
const traverse = module.exports.traverse;
const transformMathJS = module.exports.transformMathJS;

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
        traverse(ast, {
            enter() {},
            leave(node) {
                delete node.loc;
            }
        });
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
