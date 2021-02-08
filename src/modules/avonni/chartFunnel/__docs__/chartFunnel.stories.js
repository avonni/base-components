import { ChartFunnel } from '../__examples__/chartFunnel';

export default {
    title: 'Example/Chart Funnel',
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
        tooltipHidden: {
            control: {
                type: 'boolean'
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
            defaultValue: 1
        }
    }
};

const chartDataset = [
    { label: 'Lead', value: 50000 },
    { label: 'Opportunity', value: 20000 },
    { label: 'Account', value: 70000 },
    { label: 'Contact', value: 10000 },
    { label: 'Person', value: 25000 }
];

const Template = (args) => ChartFunnel(args);

export const Base = Template.bind({});
Base.args = {
    chartDataset: chartDataset
};
