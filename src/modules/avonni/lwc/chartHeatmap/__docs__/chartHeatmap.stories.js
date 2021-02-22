import { ChartHeatmap } from '../__examples__/chartHeatmap';
import { html } from 'lit-html';

export default {
    title: 'Example/Chart Heatmap',
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
        showValues: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        showPercentages: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        showTotal: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        hideLegend: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        chartDatasets: {
            control: {
                type: 'object'
            }
        },
        xLabels: {
            control: {
                type: 'object'
            }
        },
        yLabels: {
            control: {
                type: 'object'
            }
        }
    }
};

const xLabels = ['2014', '2015', '2016', '2017'];
const yLabels = ['Strength', 'Intelligence', 'Stamina', 'Spirit'];

const chartDatasets = [
    {
        y: 0, // index of 'Strength'
        x: 0, // index of '2014'
        v: 500 // value
    },
    {
        y: 2, // index of 'Stamina'
        x: 0, // index of '2014'
        v: 250 // value
    },
    {
        y: 1, // index of 'Intelligence'
        x: 3, // index of '2017'
        v: 1000 // value
    }
];

const Template = (args) => {
    return html`
        <div style="max-width: 50rem">
            ${ChartHeatmap(args)}
        </div>
    `
};

export const Base = Template.bind({});
Base.args = {
    chartDatasets: chartDatasets,
    xLabels: xLabels,
    yLabels: yLabels
};
