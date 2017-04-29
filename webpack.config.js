const path = require('path');

module.exports = {
    entry: "./index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "math-parser.js",
        libraryTarget: "commonjs2"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    }
}
