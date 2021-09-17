const { jestConfig } = require('lwc-services/lib/config/jestConfig');

module.exports = {
    ...jestConfig,
    preset: '@lwc/jest-preset',
    moduleNameMapper: {
        '^lightning/(.+)$': '<rootDir>/jest-mock/components/lightning/$1/$1',
        '^c/(confetti)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(primitiveDatatable)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(inputDateRange)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(inputRichText)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(primitiveSchedulerHeaderGroup)$':
            '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(verticalProgressIndicator)$':
            '<rootDir>/jest-mock/components/base/$1/$1'
    }
};
