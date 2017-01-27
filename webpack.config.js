'use strict';

const fs = require('fs');
const path = require('path');

const examples = fs.readdirSync(path.join(__dirname, 'examples'));
const entry = {};
for (const example of examples) {
    const key = `./examples/${example}/bundle`;
    const value = `./examples/${example}/app`;
    entry[key] = value;
}

module.exports = {
    entry: entry,
    output: {
        path: './',
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase: './'
    }
};
