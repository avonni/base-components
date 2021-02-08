/* eslint-disable no-undef */
import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    getChartColors,
    generateColors
} from 'avonni/utilsPrivate';
import 'chart.js';

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

                    positionX = position.x;
                    positionY = position.y + fontSize / 2 + padding;

                    if (chart.data.state.showValues) {
                        chartCtx.fillText(dataString, positionX, positionY);
                    }
                });
            }
        });
    }
};

const afterDatasetsDrawPlugin = {
    afterDatasetsDraw: function(chart) {
        if (chart.tooltip._active && chart.tooltip._active.length) {
            let activePoint = chart.tooltip._active[0];
            let ctx = chart.ctx;
            let y_axis = chart.scales['y-axis-0'];
            let x = activePoint.tooltipPosition().x;
            let y = activePoint.tooltipPosition().y;
            let topY = y;
            let bottomY = y_axis.bottom;

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.restore();
        }
    }
};

export default class ChartLine extends LightningElement {
    @track _chartDatasets = [];
    @track _axisLabels;
    @track _yAxisRangeMin;
    @track _yAxisRangeMax;
    @track _palette = 'aurora';
    @track _decimalPlaces = 'auto';
    @track _legendPosition = 'right';
    @track _showValues = false;
    @track _hideLegend = false;
    @track _cumulative = false;
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

    @api get cumulative() {
        return this._cumulative;
    }

    set cumulative(value) {
        this._cumulative = normalizeBoolean(value);

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    get colors() {
        return getChartColors(this.palette);
    }

    get config() {
        let chartDatasets = [];

        this.chartDatasets.forEach((dataset, index) => {
            let chartData = JSON.parse(JSON.stringify(dataset));
            let amount = 0;
            let data = [];
            let color = this.colors[index];
            let colors = generateColors(color);

            chartData.pointBackgroundColor = color;
            chartData.pointBorderColor = color;

            chartData.pointRadius = 1.5;
            chartData.pointHoverRadius = 5;

            if (this.cumulative) {
                chartData.data.forEach(value => {
                    amount = amount + value;
                    data.push(amount);
                });
                chartData.data = data;
            }

            chartData.backgroundColor = `rgba(${colors.R},${colors.G},${colors.B},0.5)`;
            chartData.borderColor = color;
            chartDatasets.push(chartData);
        });

        return {
            type: 'line',
            data: {
                datasets: chartDatasets,
                labels: this.axisLabels,
                state: this
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: this.yAxisRangeMin,
                                max: this.yAxisRangeMax,
                                beginAtZero: true,
                                callback: function(value) {
                                    return value;
                                }
                            }
                        }
                    ]
                },
                legend: {
                    display: !this.hideLegend,
                    position: this.legendPosition,
                    labels: {
                        usePointStyle: true
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(tooltipItem) {
                            return this.transformValue(tooltipItem.yLabel);
                        }.bind(this)
                    }
                }
            },
            plugins: [afterDrawPlugin, afterDatasetsDrawPlugin]
        };
    }

    drawChart() {
        let ctx = this.template.querySelector('canvas.chart').getContext('2d');
    
        if (ctx) {
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

        return value.toFixed(this.decimalPlaces);
    }
}
