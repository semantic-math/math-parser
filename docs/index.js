window.addEventListener('load', function() {

    const parse = module.exports.parse

    const params = new URLSearchParams(location.search)

    const input = document.getElementById('input')
    const output = document.getElementById('output')
    const permalink = document.getElementById('permalink')

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

    permalink.addEventListener('click', function() {
        const math = encodeURI(input.value).replace(/\+/g, '%2B')
        window.location = `?math=${math}`
    })
})
