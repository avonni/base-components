const path = require('path');
const LWCWebpackPlugin = require('lwc-webpack-plugin');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    webpackFinal: (config) => {
        config.plugins.push(
            new LWCWebpackPlugin({
                modules: [
                    { dir: 'src/modules' },
                    { npm: 'lightning-base-components' }
                ]
            })
        );

        config.module.rules = config.module.rules.filter(
            (f) => f.test.toString() !== '/\\.css$/'
        );

        config.module.rules.push({
            test: /\.css$/,
            include: [path.resolve(__dirname, 'not_exist_path')],
            loader: 'style!css'
        });

        return config;
    }
};
