const { jestConfig } = require('lwc-services/lib/config/jestConfig');

module.exports = {
    ...jestConfig,
    preset: "@lwc/jest-preset",
    moduleNameMapper: {
        '^lightning/(.+)$': '<rootDir>/jest-mock/components/lightning/$1/$1'
    }
};
