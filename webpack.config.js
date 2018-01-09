

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
        path: __dirname,
        publicPath: '/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './'
    }
};
