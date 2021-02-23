const LWCWebpackPlugin = require('lwc-webpack-plugin');

module.exports = {
    stories: [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    webpackFinal: (config) => {
        config.plugins.push(new LWCWebpackPlugin());

        config.module.rules = config.module.rules.filter(
            (f) => f.test.toString() !== '/\\.css$/'
        );

        return config;
    }
};
