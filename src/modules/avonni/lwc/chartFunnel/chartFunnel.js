import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    getChartColors
} from 'c/utilsPrivate';
import "d3";
import D3Funnel from 'd3-funnel';

const validPalettes = [
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
];

const validDisplayUnits = [
    'shortened-number',
    'full-number',
    'hundreds',
    'thousands',
    'millions',
    'billions',
    'trillions'
];

const validDecimalPlaces = ['auto', '0', '1', '2', '3', '4', '5'];

export default class ChartFunnel extends LightningElement {
    @track _combineMax = 1;
    @track _chartDataset = [];
    @track _palette = 'aurora';
    @track _displayUnits = 'full-number';
    @track _decimalPlaces = 'auto';
    @track _showValues = false;
    @track _showPercentages = false;
    @track _combineSmallGroups = false;
    @track _tooltipHidden = false;

    d3Initialized = false;

    connectedCallback() {
        this.onResize = this.redrawChart.bind(this);
        window.addEventListener('resize', this.onResize);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.onResize);
    }

    renderedCallback() {
        if (this.d3Initialized) {
            return;
        }

        this.d3Initialized = true;
        
        if (this.chartDataset.length > 0) {
            const chart = new D3Funnel(this.template.querySelector('.d3'));
            chart.draw(this.data, this.options);
        }
    }

    @api
    get combineMax() {
        return this._combineMax;
    }

    set combineMax(value) {
        this._combineMax = value;

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api
    get chartDataset() {
        return this._chartDataset;
    }

    set chartDataset(value) {
        this._chartDataset = value;

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api get palette() {
        return this._palette;
    }

    set palette(value) {
        this._palette = normalizeString(value, {
            fallbackValue: 'aurora',
            validValues: validPalettes
        });

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api get displayUnits() {
        return this._displayUnits;
    }

    set displayUnits(value) {
        this._displayUnits = normalizeString(value, {
            fallbackValue: 'full-number',
            validValues: validDisplayUnits
        });

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api get decimalPlaces() {
        return this._decimalPlaces;
    }

    set decimalPlaces(value) {
        this._decimalPlaces = normalizeString(value, {
            fallbackValue: 'auto',
            validValues: validDecimalPlaces
        });

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api get showValues() {
        return this._showValues;
    }

    set showValues(value) {
        this._showValues = normalizeBoolean(value);

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api get showPercentages() {
        return this._showPercentages;
    }

    set showPercentages(value) {
        this._showPercentages = normalizeBoolean(value);

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api get combineSmallGroups() {
        return this._combineSmallGroups;
    }

    set combineSmallGroups(value) {
        this._combineSmallGroups = normalizeBoolean(value);

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api get tooltipHidden() {
        return this._tooltipHidden;
    }

    set tooltipHidden(value) {
        this._tooltipHidden = normalizeBoolean(value);

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    get data() {
        let dataset = JSON.parse(JSON.stringify(this.chartDataset));
        let total = dataset.reduce((a, b) => a + b.value, 0);
        let result = [];
        let tooltip = '';
        let groupedValue = 0;

        dataset.forEach(data => {
            let item = {};
            let percentage = (data.value / total) * 100;
            let index = result.length;

            if (this.combineSmallGroups && percentage < this.combineMax) {
                groupedValue += data.value;
                tooltip +=
                    this.generateValue(
                        {
                            labelValue: data.label,
                            value: data.value,
                            percentage: ((data.value / total) * 100).toFixed(0)
                        },
                        false
                    ) + '\n';
            } else {
                item.labelValue = data.label;
                item.label = index;
                item.value = data.value;
                item.percentage = percentage.toFixed(0);
                item.backgroundColor = this.colors[index];
                item.tooltip = this.generateValue(item, false);
                result.push(item);
            }
        });

        if (groupedValue > 0) {
            let item = {};
            item.labelValue = 'Others';
            item.label = result.length;
            item.value = groupedValue;
            item.percentage = ((groupedValue / total) * 100).toFixed(0);
            item.backgroundColor = this.colors[result.length];
            item.tooltip = tooltip;
            result.push(item);
        }

        return result;  
    }

    get colors() {
        return getChartColors(this.palette);
    }

    get options() {
        return {
            chart: {
                bottomWidth: 0.5
            },
            block: {
                dynamicHeight: true,
                minHeight: 35
            },
            tooltip: {
                enabled: !this.tooltipHidden,
                format: function(label) {
                    return this.data[label].tooltip;
                }.bind(this)
            },
            label: {
                format: function(label) {
                    return this.generateValue(this.data[label], true);
                }.bind(this)
            }
        };
    }

    generateValue(item, isLabel) {
        let result = item.labelValue;
        let transformedValue = this.transformValue(item.value);

        if (this.showValues || this.showPercentages || !isLabel) {
            if (isLabel) {
                result += '\n';
            } else {
                result += ': ';
            }

            if (this.showValues || !isLabel) {
                result += transformedValue;

                if (this.showPercentages) {
                    result += ' (' + item.percentage + '%)';
                }
            } else if (this.showPercentages) {
                result += item.percentage + '%';
            }
        }
        return result;
    }

    redrawChart() {
        // eslint-disable-next-line no-undef
        const chart = new D3Funnel(this.template.querySelector('.d3'));
        if (this.chartDataset.length > 0) {
            chart.draw(this.data, this.options);
        }
    }

    transformValue(value) {
        if (typeof value !== 'number') {
            return value;
        }

        if (this.displayUnits === 'shortened-number') {
            return this.commarize(value);
        }

        if (this.displayUnits === 'hundreds') {
            let num = value / 100;
            if (this.decimalPlaces !== 'auto') {
                num = num.toFixed(this.decimalPlaces);
            }
            return num + 'h';
        }

        if (this.displayUnits === 'thousands') {
            let num = value / 1000;
            if (this.decimalPlaces !== 'auto') {
                num = num.toFixed(this.decimalPlaces);
            }
            return num + 'k';
        }

        if (this.displayUnits === 'millions') {
            let num = value / 1000 ** 2;
            if (this.decimalPlaces !== 'auto') {
                num = num.toFixed(this.decimalPlaces);
            }
            return num + 'M';
        }

        if (this.displayUnits === 'billions') {
            let num = value / 1000 ** 3;
            if (this.decimalPlaces !== 'auto') {
                num = num.toFixed(this.decimalPlaces);
            }
            return num + 'B';
        }

        if (this.displayUnits === 'trillions') {
            let num = value / 1000 ** 4;
            if (this.decimalPlaces !== 'auto') {
                num = num.toFixed(this.decimalPlaces);
            }
            return num + 'T';
        }

        return value;
    }

    commarize(value) {
        if (value >= 1000) {
            let units = ['k', 'M', 'B', 'T'];
            let order = Math.floor(Math.log(value) / Math.log(1000));
            order = order > 4 ? 4 : order;
            let unitname = units[order - 1];
            let num = value / 1000 ** order;

            if (this.decimalPlaces !== 'auto') {
                num = num.toFixed(this.decimalPlaces);
            }

            return num + unitname;
        }

        if (this.decimalPlaces !== 'auto') {
            value = value.toFixed(this.decimalPlaces);
        }

        return value.toLocaleString();
    }
}
