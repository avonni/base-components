const path = require('path');
const webpack = require('webpack');
const LWCWebpackPlugin = require('lwc-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve('./_cslib/ts/_avonni/avonni-components')
    },
    mode: 'development',
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1
        }),
        new LWCWebpackPlugin()
    ]
};
