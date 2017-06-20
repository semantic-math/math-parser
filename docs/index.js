const parse = module.exports.parse

const input = document.querySelector('#input')
const output = document.querySelector('#output')

const params = new URLSearchParams(location.search)

if (params.has('math')) {
    input.value = params.get('math')
}

const update = function() {
    try {
        const ast = parse(input.value)
        output.textContent = JSON.stringify(ast, null, 2)
    } catch (e) {
        output.textContent = e.message
    }
}

update()

input.addEventListener('input', update)

const permalink = document.querySelector('#permalink')

permalink.addEventListener('click', function() {
    const math = encodeURI(input.value).replace(/\+/g, '%2B')
    window.location = `?math=${math}`
})
