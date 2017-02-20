const Parser = module.exports.Parser;

const input = document.querySelector('#input');
const output = document.querySelector('#output');

const params = new URLSearchParams(location.search);

if (params.has('math')) {
    input.value = params.get('math');
}

const parser = new Parser();

const update = () => {
    try {
        const ast = parser.parse(input.value);
        output.textContent = JSON.stringify(ast, null, 4);
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
