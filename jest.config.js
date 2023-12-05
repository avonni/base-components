const { jestConfig } = require('lwc-services/lib/config/jestConfig');

module.exports = {
    ...jestConfig,
    preset: '@lwc/jest-preset',
    moduleNameMapper: {
        d3: '<rootDir>/node_modules/d3/dist/d3.min.js',
        '^lightning/(.+)$': '<rootDir>/jest-mock/components/lightning/$1/$1',
        '^c/(buttonMenu)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(calendar)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(card)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(colorGradient)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(combobox)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(confetti)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(datatable)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(filterMenu)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(inputDateRange)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(inputRichText)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(layoutItem)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(outputData)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(positionLibrary)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(primitiveCombobox)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(primitivePill)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(primitiveSchedulerAgenda)$':
            '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(primitiveSchedulerCalendar)$':
            '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(primitiveSchedulerHeaderGroup)$':
            '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(primitiveSchedulerTimeline)$':
            '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(primitiveTreeItem)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(resizeObserver)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(slider)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(splitter)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(splitterPane)$': '<rootDir>/jest-mock/components/base/$1/$1',
        '^c/(verticalProgressIndicator)$':
            '<rootDir>/jest-mock/components/base/$1/$1'
    },
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/jest-mock/',
        '<rootDir>/src/modules/base/configProvider/',
        '<rootDir>/src/modules/base/internationalizationLibrary/',
        '<rootDir>/src/modules/base/inputUtils/',
        '<rootDir>/src/modules/base/iso8601Utils/',
        '<rootDir>/src/modules/base/luxon/',
        '<rootDir>/src/modules/base/messageDispatcher/',
        '<rootDir>/src/modules/base/positionLibrary/',
        '<rootDir>/src/modules/base/quillLib/',
        '<rootDir>/src/modules/base/resizeObserver/',
        '<rootDir>/src/modules/base/tooltipLibrary/',
        '<rootDir>/src/modules/base/utils/',
        '<rootDir>/src/modules/base/utilsPrivate/'
    ]
};
