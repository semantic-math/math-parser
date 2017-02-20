const Parser = module.exports.Parser;
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

const parser = new Parser();

const update = () => {
    try {
        let ast = parser.parse(input.value);
        if (asttype === 'mathsteps') {
            ast = transformMathJS(ast);
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
