const parse = module.exports.parse;
const traverse = module.exports.traverse;

const input = document.querySelector('#input');
const output = document.querySelector('#output');

const params = new URLSearchParams(location.search);

if (params.has('math')) {
    input.value = params.get('math');
}

const update = () => {
    try {
        let ast = parse(input.value);

        traverse(ast, {
            enter() { },
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
    window.location = `?math=${math}`;
});
