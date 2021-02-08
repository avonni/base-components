/* eslint-disable no-undef */
import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    getChartColors
} from 'avonni/utilsPrivate';
import 'chart.js';

const validVariants = ['base', 'doughnut'];
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

const beforeDrawPlugin = {
    beforeDraw: function(chart) {
        let width = chart.chart.width;
        let height = chart.chart.height;
        let chartCtx = chart.chart.ctx;
        let showTotal = chart.data.state.showTotal;

        if (showTotal) {
            chartCtx.restore();
            let fontSize = (height / 114).toFixed(2);
            chartCtx.font = fontSize + 'em sans-serif';
            chartCtx.textBaseline = 'middle';

            let text = chart.config.data.state.transformValue(
                chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0)
            );

            let textX = Math.round(
                (width - chartCtx.measureText(text).width) / 2
            );
            let textY = height / 2;

            let position = chart.legend.options.position;

            if (position === 'top') {
                textY = textY + chart.legend.height / 2;
            }

            if (position === 'bottom') {
                textY = textY - chart.legend.height / 2;
            }

            if (position === 'left') {
                textX = textX + chart.legend.width / 2;
            }

            if (position === 'right') {
                textX = textX - chart.legend.width / 2;
            }

            if (chart.config.type === 'doughnut') {
                chartCtx.fillText(text, textX, textY);
                chartCtx.save();
            }
        }
    }
};

const afterDatasetsDrawPlugin = {
    afterDatasetsDraw: function(chart) {
        let ctx = chart.ctx;

        let fontSize = Chart.defaults.global.defaultFontSize;
        let fontStyle = Chart.defaults.global.defaultFontStyle;
        let fontFamily = Chart.defaults.global.defaultFontFamily;

        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        chart.data.datasets.forEach(function(dataset) {
            for (let i = 0; i < dataset.data.length; i++) {
                let model =
                        dataset._meta[Object.keys(dataset._meta)[0]].data[i]
                            ._model,
                    total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                    mid_radius =
                        model.innerRadius +
                        (model.outerRadius - model.innerRadius) / 2,
                    start_angle = model.startAngle,
                    end_angle = model.endAngle,
                    mid_angle = start_angle + (end_angle - start_angle) / 2;

                let x = mid_radius * Math.cos(mid_angle);
                let y = mid_radius * Math.sin(mid_angle);

                ctx.fillStyle = '#000000';

                let percent =
                    String(Math.round((dataset.data[i] / total) * 100)) + '%';

                let hidden =
                    dataset._meta[Object.keys(dataset._meta)[0]].data[i].hidden;

                if (!hidden && chart.data.state.showValues) {
                    let value = chart.data.state.transformValue(
                        dataset.data[i]
                    );
                    ctx.fillText(value, model.x + x, model.y + y);
                }

                if (!hidden && chart.data.state.showPercentages) {
                    ctx.fillText(percent, model.x + x, model.y + y + 15);
                }
            }
        });
    }
};

export default class ChartPie extends LightningElement {
    @track _chartDatasets = [];
    @track _axisLabels;
    @track _combineMax = 1;
    @track _variant = 'doughnut';
    @track _palette = 'aurora';
    @track _displayUnits = 'full-number';
    @track _decimalPlaces = 'auto';
    @track _legendPosition = 'right';
    @track _showValues = false;
    @track _showPercentages = false;
    @track _showTotal = false;
    @track _combineSmallGroups = false;
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
        }, 1);
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
        this.initialLabels = value;

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api
    get combineMax() {
        return this._combineMax;
    }

    set combineMax(value) {
        this._combineMax = value;

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api get variant() {
        return this._variant;
    }

    set variant(value) {
        let variant = normalizeString(value, {
            fallbackValue: 'doughnut',
            validValues: validVariants
        });

        this._variant = variant === 'base' ? 'pie' : variant;

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

    @api get showPercentages() {
        return this._showPercentages;
    }

    set showPercentages(value) {
        this._showPercentages = normalizeBoolean(value);

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api get showTotal() {
        return this._showTotal;
    }

    set showTotal(value) {
        this._showTotal = normalizeBoolean(value);

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    @api get combineSmallGroups() {
        return this._combineSmallGroups;
    }

    set combineSmallGroups(value) {
        this._combineSmallGroups = normalizeBoolean(value);

        if (this.isChartJsInitialized) {
            this.drawChart();
        }
    }

    get colors() {
        return getChartColors(this.palette);
    }

    get config() {
        let chartDatasets = [];

        this.chartDatasets.forEach(dataset => {
            let chartData = JSON.parse(JSON.stringify(dataset));

            let total = chartData.data.reduce((a, b) => a + b, 0);
            let data = [];
            let labels = [];
            let tooltip = [];
            let grouped = 0;

            if (this.combineSmallGroups) {
                chartData.data.forEach((value, index) => {
                    if ((value / total) * 100 < this.combineMax) {
                        grouped = grouped + value;
                        tooltip.push(
                            this.initialLabels[index] +
                                ': ' +
                                this.transformValue(value)
                        );
                    } else {
                        data.push(value);
                        labels.push(this.initialLabels[index]);
                    }
                });

                if (grouped > 0) {
                    data.push(grouped);
                    labels.push('Others');
                }

                chartData.data = data;
                this._axisLabels = labels;
            }

            chartData.tooltip = tooltip;
            chartData.backgroundColor = this.colors;
            chartData.borderColor = this.colors;
            chartDatasets.push(chartData);
        });

        return {
            type: this.variant,
            data: {
                datasets: chartDatasets,
                labels: this.axisLabels,
                state: this
            },
            options: {
                elements: {
                    arc: {
                        borderWidth: 0
                    }
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            let dataLabel = data.labels[tooltipItem.index];

                            if (dataLabel === 'Others') {
                                return data.datasets[tooltipItem.datasetIndex]
                                    .tooltip;
                            }

                            let value =
                                ': ' +
                                this.transformValue(
                                    data.datasets[tooltipItem.datasetIndex]
                                        .data[tooltipItem.index]
                                );

                            dataLabel += value;
                            return dataLabel;
                        }.bind(this)
                    }
                },
                legend: {
                    display: !this.hideLegend,
                    position: this.legendPosition,
                    labels: {
                        usePointStyle: true
                    }
                },
                animation: {
                    duration: 500,
                    easing: 'easeOutQuart'
                }
            },
            plugins: [beforeDrawPlugin, afterDatasetsDrawPlugin]
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
