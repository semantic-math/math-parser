window.addEventListener('load', function() {

    const parse = module.exports.parse

    const params = {}

    location.search.slice(1).split('&').forEach(part => {
        const [key, value] = part.split('=')
        params[key] = decodeURIComponent(value)
    })

    const input = document.getElementById('input')
    const output = document.getElementById('output')
    const permalink = document.getElementById('permalink')

    if ('math' in params) {
        input.value = params.math
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
        const math = encodeURIComponent(input.value)
        window.location = `?math=${math}`
    })
})
