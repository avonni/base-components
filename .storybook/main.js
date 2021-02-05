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
                    { npm: 'lightning-base-components' },
                    { npm: '@salesforce-ux/design-system' }
                ]
            })
        );

        config.module.rules = config.module.rules.filter(
            (f) => f.test.toString() !== '/\\.css$/'
        );

        config.module.rules.push({
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true
                    }
                }
            ],
            include: path.resolve(__dirname, '../src')
        });

        return config;
    }
};
