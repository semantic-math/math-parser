import replace from './replace'

const isAdd = node => node && node.type === 'Operation' && node.op === 'add'

export const removeUnnecesaryParens = (ast) => {
    return replace(ast, {
        leave(node) {
            if (isAdd(node)) {
                let i = 0
                while (i < node.args.length) {
                    const arg = node.args[i]
                    if (isAdd(arg)) {
                        node.args.splice(i, 1, ...arg.args)
                        i += arg.args.length
                    }
                    i++
                }
            }
        }
    })
}
