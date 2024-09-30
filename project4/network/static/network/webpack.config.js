const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,  // For .scss files
                use: [
                    'style-loader',   // Injects styles into DOM
                    'css-loader',     // Turns CSS into CommonJS
                    'sass-loader'     // Compiles Sass to CSS
                ],
            },
            {
                test: /\.js$/,    // For .js files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',  // For transpiling JavaScript using Babel
                },
            },
        ],
    },
};