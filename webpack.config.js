'use strict';

const path = require('path');

module.exports = {
    entry: [
        path.join(__dirname, 'examples/svg-renderer/app.js')
    ],
    output: {
        path: path.join(__dirname, 'examples/svg-renderer'),
        publicPath: '/svg-renderer/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'env']
                }
            }
        ]
    },
    devServer: {
        contentBase: './examples/'
    }
};
