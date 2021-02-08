import { chartTreemap } from '../__examples__/chartTreemap';

export default {
    title: 'Example/Chart Treemap',
    argTypes: {
        palette: {
            control: {
                type: 'select',
                options: [
                    'aurora',
                    'nightfall',
                    'wildflowers',
                    'sunrise',
                    'bluegrass',
                    'ocean',
                    'heat',
                    'dusk',
                    'pond',
                    'watermelon',
                    'fire',
                    'water',
                    'lake',
                    'mineral',
                    'extension'
                ]
            },
            defaultValue: 'aurora',
            table: {
                defaultValue: { summary: 'aurora' }
            }
        },
        displayUnits: {
            control: {
                type: 'select',
                options: [
                    'shortened-number',
                    'full-number',
                    'hundreds',
                    'thousands',
                    'millions',
                    'billions',
                    'trillions'
                ]
            },
            defaultValue: 'full-number',
            table: {
                defaultValue: { summary: 'full-number' }
            }
        },
        decimalPlaces: {
            control: {
                type: 'select',
                options: ['auto', '0', '1', '2', '3', '4', '5']
            },
            defaultValue: 'auto',
            table: {
                defaultValue: { summary: 'auto' }
            }
        },
        legendPosition: {
            control: {
                type: 'select',
                options: ['top', 'bottom']
            },
            defaultValue: 'bottom',
            table: {
                defaultValue: { summary: 'bottom' }
            }
        },
        showValues: {
            control: {
                type: 'boolean'
            }
        },
        showPercentages: {
            control: {
                type: 'boolean'
            }
        },
        showTotal: {
            control: {
                type: 'boolean'
            }
        },
        hideLegend: {
            control: {
                type: 'boolean'
            }
        },
        combineSmallGroups: {
            control: {
                type: 'boolean'
            }
        },
        combineMax: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 1,
            table: {
                defaultValue: { summary: 1 }
            }
        },
        chartDatasets: {
            control: {
                type: 'object'
            }
        }
    }
};

const chartDatasets = [
    { label: 'Lead', value: 5000 },
    { label: 'Opportunity', value: 2000 },
    { label: 'Account', value: 7000 },
    { label: 'Contact', value: 1000 },
    { label: 'Person', value: 2500 }
];

const Template = (args) => chartTreemap(args);

export const Base = Template.bind({});
Base.args = {
    chartDatasets: chartDatasets
};
