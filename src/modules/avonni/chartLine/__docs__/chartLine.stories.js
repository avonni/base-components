import { chartLine } from '../__examples__/chartLine';
import { html } from 'lit-html';

export default {
    title: 'Example/Chart Line',
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
                options: ['top', 'left', 'bottom', 'right']
            },
            defaultValue: 'right',
            table: {
                defaultValue: { summary: 'right' }
            }
        },
        showValues: {
            control: {
                type: 'boolean'
            }
        },
        cumulative: {
            control: {
                type: 'boolean'
            }
        },
        hideLegend: {
            control: {
                type: 'boolean'
            }
        },
        yAxisRangeMin: {
            control: {
                type: 'text'
            }
        },
        yAxisRangeMax: {
            control: {
                type: 'text'
            }
        },
        chartDatasets: {
            control: {
                type: 'object'
            }
        },
        axisLabels: {
            control: {
                type: 'object'
            }
        }
    }
};

const chartDatasets = [
    {
        label: 'Dataset 1',
        data: [65255, 39255, 12550, 78255, 36255, 55255, 42255]
    },
    {
        label: 'Dataset 2',
        data: [25255, 42255, 22550, 41255, 72255, 35255, 82550]
    },
    {
        label: 'Dataset 3',
        data: [85255, 28255, 44255, 81255, 36255, 55255, 54255]
    },
    {
        label: 'Dataset 4',
        data: [19255, 59255, 21255, 81255, 56255, 15255, 42550]
    },
    {
        label: 'Dataset 5',
        data: [65255, 42255, 44255, 41255, 36255, 35255, 42255]
    },
    {
        label: 'Dataset 6',
        data: [39255, 25255, 28255, 22550, 81255, 72255, 10255]
    }
];

const axisLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
];

const Template = (args) => {
    return html`
        <div style="max-width: 50rem">
            ${chartLine(args)}
        </div>
    `
};

export const Base = Template.bind({});
Base.args = {
    chartDatasets: chartDatasets,
    axisLabels: axisLabels
};
