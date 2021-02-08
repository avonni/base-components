import { chartPie } from '../__examples__/chartPie';

export default {
    title: 'Example/Chart Pie',
    argTypes: {
        variant: {
            control: {
                type: 'select',
                options: ['base', 'doughnut']
            },
            defaultValue: 'doughnut',
            table: {
                defaultValue: { summary: 'doughnut' }
            }
        },
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
        },
        axisLabels: {
            control: {
                type: 'object'
            }
        }
    }
};

const chartDatasets = [{ data: [300025, 50070, 100180, 230295, 90025, 30080] }];
const axisLabels = ['January', 'February', 'March', 'April', 'May', 'June'];

const Template = (args) => chartPie(args);

export const Base = Template.bind({});
Base.args = {
    chartDatasets: chartDatasets,
    axisLabels: axisLabels
};
