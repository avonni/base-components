/* eslint-disable no-undef */
import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    getChartColors
} from 'avonni/utilsPrivate';
import 'chart.js';

const validTypes = [
    'horizontal',
    'vertical',
    'horizontal-stacked',
    'vertical-stacked'
];
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

const validLegendPositions = ['top', 'left', 'bottom', 'right'];

const afterDrawPlugin = {
    afterDraw: function(chart) {
        let chartCtx = chart.ctx;

        chart.data.datasets.forEach(function(dataset, i) {
            let meta = chart.getDatasetMeta(i);

            if (!meta.hidden) {
                meta.data.forEach(function(element, index) {
                    chartCtx.fillStyle = 'rgb(0, 0, 0)';

                    let fontSize = Chart.defaults.global.defaultFontSize;
                    let fontStyle = Chart.defaults.global.defaultFontStyle;
                    let fontFamily = Chart.defaults.global.defaultFontFamily;

                    chartCtx.font = Chart.helpers.fontString(
                        fontSize,
                        fontStyle,
                        fontFamily
                    );

                    let dataString = chart.data.state.transformValue(
                        dataset.data[index]
                    );

                    chartCtx.textAlign = 'center';
                    chartCtx.textBaseline = 'middle';

                    let padding = 5;
                    let position = element.tooltipPosition();
                    let positionX;
                    let positionY;

                    if (chart.config.type === 'bar') {
                        positionX = position.x;
                        positionY = position.y + fontSize / 2 + padding;
                    } else {
                        positionX = position.x - fontSize * 1.5 - padding;
                        positionY = position.y;
                    }

                    if (chart.data.state.showValues) {
                        chartCtx.fillText(dataString, positionX, positionY);
                    }
                });
            }
        });
    }
};

export default class ChartBar extends LightningElement {
    @track _chartDatasets = [];
    @track _axisLabels;
    @track _xAxisRangeMin;
    @track _xAxisRangeMax;
    @track _yAxisRangeMin;
    @track _yAxisRangeMax;
    @track _type;
    @track _palette = 'aurora';
    @track _displayUnits = 'full-number';
    @track _decimalPlaces = 'auto';
    @track _legendPosition = 'right';
    @track _fullStack = false;
    @track _showValues = false;
    @track _hideLegend = false;
    @track isChartJsInitialized;

    chart;

    connectedCallback() {
        this.onResize = this.redrawChart.bind(this);
        window.addEventListener('resize', this.onResize);
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.onResize);
    }

    renderedCallback() {
        if (this.isChartJsInitialized) {
            return;
        }

        this.isChartJsInitialized = true;

        window.Chart.platform.disableCSSInjection = true;

        setTimeout(() => {
            this.drawChart();
        }, 1)
    }

    @api
    get chartDatasets() {
        return this._chartDatasets;
    }

    set chartDatasets(value) {
        this._chartDatasets = value;

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api
    get axisLabels() {
        return this._axisLabels;
    }

    set axisLabels(value) {
        this._axisLabels = value;

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api
    get xAxisRangeMin() {
        return this._xAxisRangeMin;
    }

    set xAxisRangeMin(value) {
        this._xAxisRangeMin = value;

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api
    get xAxisRangeMax() {
        return this._xAxisRangeMax;
    }

    set xAxisRangeMax(value) {
        this._xAxisRangeMax = value;

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api
    get yAxisRangeMin() {
        return this._yAxisRangeMin;
    }

    set yAxisRangeMin(value) {
        this._yAxisRangeMin = value;

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api
    get yAxisRangeMax() {
        return this._yAxisRangeMax;
    }

    set yAxisRangeMax(value) {
        this._yAxisRangeMax = value;

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api get type() {
        return this._type;
    }

    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: '',
            validValues: validTypes
        });

        if (this.isChartJsInitialized) {
            this.drawChart();
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

        if (this.isChartJsInitialized) {
            this.drawChart();
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

        if (this.isChartJsInitialized) {
            this.drawChart();
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

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api get legendPosition() {
        return this._legendPosition;
    }

    set legendPosition(value) {
        this._legendPosition = normalizeString(value, {
            fallbackValue: 'right',
            validValues: validLegendPositions
        });

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api get fullStack() {
        return this._fullStack;
    }

    set fullStack(value) {
        this._fullStack = normalizeBoolean(value);

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api get showValues() {
        return this._showValues;
    }

    set showValues(value) {
        this._showValues = normalizeBoolean(value);

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api get hideLegend() {
        return this._hideLegend;
    }

    set hideLegend(value) {
        this._hideLegend = normalizeBoolean(value);

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    get colors() {
        return getChartColors(this.palette);
    }

    get config() {
        let chartType;
        let chartDatasets = [];
        let isStacked = this.type && this.type.indexOf('stacked') > -1;
        let isVertical = false;

        if (this.type === 'vertical' || this.type === 'vertical-stacked') {
            isVertical = true;
            chartType = 'bar';
        }

        if (this.type === 'horizontal' || this.type === 'horizontal-stacked') {
            chartType = 'horizontalBar';
        }

        this.chartDatasets.forEach((dataset, index) => {
            let chartData = JSON.parse(JSON.stringify(dataset));
            chartData.backgroundColor = this.colors[index];

            if (this.fullStack && isStacked) {
                chartData.barPercentage = 1;
            }

            chartDatasets.push(chartData);
        });

        return {
            type: chartType,
            data: {
                datasets: chartDatasets,
                labels: this.axisLabels,
                state: this
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            stacked: isStacked,
                            gridLines: {
                                display: !isVertical
                            },
                            ticks: {
                                min: isVertical ? '' : this.xAxisRangeMin,
                                max: isVertical ? '' : this.xAxisRangeMax,
                                beginAtZero: true,
                                callback: function(value) {
                                    const result = isVertical
                                        ? value
                                        : this.transformValue(value);
                                    return result;
                                }.bind(this)
                            }
                        }
                    ],
                    yAxes: [
                        {
                            stacked: isStacked,
                            gridLines: {
                                display: isVertical
                            },
                            ticks: {
                                min: isVertical ? this.yAxisRangeMin : '',
                                max: isVertical ? this.yAxisRangeMax : '',
                                beginAtZero: true,
                                callback: function(value) {
                                    const result = isVertical
                                        ? this.transformValue(value)
                                        : value;
                                    return result;
                                }.bind(this)
                            }
                        }
                    ]
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem) {
                            let label =
                                this.type.indexOf('vertical') > -1
                                    ? tooltipItem.yLabel
                                    : tooltipItem.xLabel;

                            return this.transformValue(label);
                        }.bind(this)
                    }
                },
                legend: {
                    display: !this.hideLegend,
                    position: this.legendPosition,
                    labels: {
                        usePointStyle: true
                    }
                }
            },
            plugins: [afterDrawPlugin]
        };
    }

    drawChart() {
        let ctx = this.template.querySelector('canvas.chart').getContext('2d');
    
        if (ctx && this.type) {
            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new window.Chart(ctx, this.config);
        }
    }

    redrawChart() {
        this.chart.resize();
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

