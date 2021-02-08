import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    getChartColors,
    generateColors
} from 'avonni/utilsPrivate';
import * as d3 from "d3";

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

export default class ChartHeatmap extends LightningElement {
    @track _chartDatasets = [];
    @track _xLabels = [];
    @track _yLabels = [];
    @track _palette = 'aurora';
    @track _displayUnits = 'full-number';
    @track _decimalPlaces = 'auto';
    @track _showValues = false;
    @track _showPercentages = false;
    @track _hideLegend = false;
    @track _showTotal = false;

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

        if (this.chartDatasets.length > 0) {
            this.generateHeatmap();
        }
    }

    @api
    get chartDatasets() {
        return this._chartDatasets;
    }

    set chartDatasets(value) {
        this._chartDatasets = value;

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api
    get xLabels() {
        return this._xLabels;
    }

    set xLabels(value) {
        this._xLabels = value;

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api
    get yLabels() {
        return this._yLabels;
    }

    set yLabels(value) {
        this._yLabels = value;

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

    @api get hideLegend() {
        return this._hideLegend;
    }

    set hideLegend(value) {
        this._hideLegend = normalizeBoolean(value);

        if (this.d3Initialized) {
            this.redrawChart(); 
        }
    }

    @api get showTotal() {
        return this._showTotal;
    }

    set showTotal(value) {
        this._showTotal = normalizeBoolean(value);

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

    get data() {
        let data = JSON.parse(JSON.stringify(this.chartDatasets));
        let total = 0;
        let initialData = [];
        let existItems = [];

        data.forEach(item => {
            existItems.push(`${item.x}-${item.y}`);
        });

        for (let i = 0; i < this.xLabels.length; i++) {
            for (let a = 0; a < this.yLabels.length; a++) {
                if (existItems.indexOf(`${i}-${a}`) === -1) {
                    initialData.push({ x: i, y: a, v: 0 });
                }
            }
        }

        data = initialData.concat(data);

        data.forEach(item => {
            let transformValue = this.transformValue(item.v);
            item.x = this.xLabels[item.x];
            item.y = this.yLabels[item.y];
            item.label = transformValue;
            item.tooltip = transformValue;
            total += item.v;
        });

        if (this.showPercentages) {
            data.forEach(item => {
                let percentage = ((item.v / total) * 100).toFixed(0);
                item.percentage = percentage + '%';
                item.tooltip = `${item.tooltip} (${percentage}%)`;
            });
        }

        return data;
    }

    get maxValue() {
        let data = JSON.parse(JSON.stringify(this.chartDatasets));
        let maxValue = 0;

        data.forEach(item => {
            if (item.v > maxValue) {
                maxValue = item.v;
            }
        });

        return maxValue;
    }

    get total() {
        let data = JSON.parse(JSON.stringify(this.chartDatasets));
        let total = 0;

        data.forEach(item => {
            total += item.v;
        });

        return this.transformValue(total);
    }

    get colors() {
        return getChartColors(this.palette);
    }

    get topPadding() {
        let topPadding = 0;

        this.xLabels.forEach(value => {
            let width = this.getTextWidth(value);

            if (width > topPadding) {
                topPadding = width;
            }
        });

        return topPadding;
    }

    get leftPadding() {
        let leftPadding = 0;

        this.yLabels.forEach(value => {
            let width = this.getTextWidth(value);

            if (width > leftPadding) {
                leftPadding = width;
            }
        });

        return leftPadding;
    }

    generateHeatmap() {
        if (this.chartDatasets.length > 0 && this.xLabels.length > 0 && this.yLabels.length > 0) {
            /* eslint-disable no-undef */
            let container = this.template.querySelector('.d3');
            let leftPadding = this.leftPadding;
            let topPadding = this.topPadding;

            let margin = {
                top: topPadding + 10,
                right: 10,
                bottom: 10,
                left: leftPadding + 10
            };

            let legendWidth = this.hideLegend
                ? 0
                : 30 + this.getTextWidth(this.transformValue(this.maxValue));
            let width =
                container.offsetWidth - margin.left - margin.right - legendWidth;
            let height = (width / this.xLabels.length) * this.yLabels.length;

            if (this.showTotal) {
                d3.select(container)
                    .append('div')
                    .attr('width', container.offsetWidth)
                    .attr('height', 24)
                    .text(`TOTAL: ${this.total}`)
                    .style('padding-bottom', '1rem')
                    .style('font-family', 'arial')
                    .style('font-size', '22px')
                    .style('text-align', 'center');
            }

            let svg = d3
                .select(container)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr(
                    'transform',
                    'translate(' + margin.left + ',' + margin.top + ')'
                );

            let x = d3
                .scaleBand()
                .range([0, width])
                .domain(this.xLabels)
                .padding(0.01);

            svg.append('g')
                .attr('transform', 'translate(0,' + 0 + ')')
                .call(d3.axisTop(x).tickSize(0))
                .call(g => g.select('.domain').remove())
                .selectAll('text')
                .attr(
                    'transform',
                    'translate(10,' + (-topPadding / 2 - 10) + ')rotate(-90)'
                )
                .style('cursor', 'default')
                .style('font-family', 'arial')
                .style('font-size', '15px');

            let y = d3
                .scaleBand()
                .range([height, 0])
                .domain(this.yLabels)
                .padding(0.01);

            svg.append('g')
                .call(d3.axisLeft(y).tickSize(0))
                .call(g => g.select('.domain').remove())
                .selectAll('text')
                .attr('transform', 'translate(-10,0)')
                .style('cursor', 'default')
                .style('font-family', 'arial')
                .style('font-size', '15px');

            let colors = generateColors(this.colors[0]);

            let myColor = d3
                .scaleLinear()
                .range([
                    `rgba(${colors.R}, ${colors.G}, ${colors.B}, 0.1)`,
                    this.colors[0]
                ])
                .domain([0, this.maxValue]);

            let tooltip = d3
                .select(container)
                .append('div')
                .style('opacity', 0)
                .attr('class', 'tooltip')
                .style('background-color', 'white')
                .style('border', 'solid')
                .style('border-width', '2px')
                .style('border-radius', '4px')
                .style('padding', '5px');

            let mouseover = function() {
                tooltip.style('opacity', 1);
            };

            let mousemove = function(d) {
                let xy = d3.mouse(this);
                tooltip
                    .html(d.tooltip)
                    .style('left', xy[0] + leftPadding + 20 + 'px')
                    .style('top', xy[1] + topPadding / 2 + 'px');
            };

            let mouseleave = function() {
                tooltip.style('opacity', 0);
            };

            svg.selectAll()
                .data(this.data, function(d) {
                    return d.x + ':' + d.y;
                })
                .enter()
                .append('rect')
                .attr('x', function(d) {
                    return x(d.x);
                })
                .attr('y', function(d) {
                    return y(d.y);
                })
                .attr('width', x.bandwidth())
                .attr('height', y.bandwidth())
                .style('fill', function(d) {
                    return myColor(d.v);
                })
                .on('mouseover', mouseover)
                .on('mousemove', mousemove)
                .on('mouseleave', mouseleave);

            if (this.showValues || this.showPercentages) {
                svg.selectAll()
                    .data(this.data, function(d) {
                        return d.x + ':' + d.y;
                    })
                    .enter()
                    .append('text')
                    .attr('class', 'legendText')
                    .attr('text-anchor', 'end')
                    .attr(
                        'x',
                        function(d) {
                            let textWidth;

                            if (this.showValues && this.showPercentages) {
                                textWidth = this.getTextWidth(
                                    d.label + ' (' + d.percentage + ')'
                                );
                            } else if (this.showValues) {
                                textWidth = this.getTextWidth(d.label);
                            } else if (this.showPercentages) {
                                textWidth = this.getTextWidth(d.percentage);
                            }

                            return x(d.x) + (x.bandwidth() + textWidth) / 2 - 2;
                        }.bind(this)
                    )
                    .attr('y', function(d) {
                        return y(d.y) + x.bandwidth() / 2 + 6;
                    })
                    .text(
                        function(d) {
                            if (this.showValues && this.showPercentages) {
                                return d.label + ' (' + d.percentage + ')';
                            }
                            if (this.showValues) {
                                return d.label;
                            }
                            return d.percentage;
                        }.bind(this)
                    )
                    .on('mouseover', mouseover)
                    .on('mousemove', mousemove)
                    .on('mouseleave', mouseleave)
                    .style('cursor', 'default')
                    .style('font-family', 'arial')
                    .style('font-size', '16px');
            }

            if (!this.hideLegend) {
                let legend = d3
                    .select(container)
                    .append('svg:svg')
                    .attr('width', legendWidth - 5)
                    .attr('height', height)
                    .style('margin-top', margin.top - margin.bottom + 'px')
                    .append('g')
                    .attr('transform', 'translate(5,0)');

                legend
                    .append('text')
                    .attr('class', 'legendText')
                    .attr('y', 16)
                    .attr('x', 20 + this.getTextWidth('0'))
                    .text(0)
                    .style('cursor', 'default')
                    .style('font-family', 'arial')
                    .style('font-size', '15px');

                legend
                    .append('text')
                    .attr('class', 'legendText')
                    .attr('text-anchor', 'end')
                    .attr('y', height)
                    .attr(
                        'x',
                        20 + this.getTextWidth(this.transformValue(this.maxValue))
                    )
                    .text(this.transformValue(this.maxValue))
                    .style('cursor', 'default')
                    .style('font-family', 'arial')
                    .style('font-size', '15px');

                let gradientID = 'd3-gradient-' + this.colors[0].replace('#', '');
                let gradient = svg
                    .append('svg:defs')
                    .append('svg:linearGradient')
                    .attr('id', gradientID)
                    .attr('x1', '0%')
                    .attr('y1', '0%')
                    .attr('x2', '0%')
                    .attr('y2', '100%')
                    .attr('spreadMethod', 'pad');

                gradient
                    .append('svg:stop')
                    .attr('offset', '0%')
                    .attr('stop-color', this.colors[0])
                    .attr('stop-opacity', 0.1);

                gradient
                    .append('svg:stop')
                    .attr('offset', '100%')
                    .attr('stop-color', this.colors[0])
                    .attr('stop-opacity', 1);

                legend
                    .append('svg:rect')
                    .attr('width', 20)
                    .attr('height', height)
                    .style('fill', 'url(#' + gradientID + ')');
            }
        }
    }

    redrawChart() {
        let container = this.template.querySelector('.d3');

        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }

        this.generateHeatmap();
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

    getTextWidth(value) {
        let text = document.createElement('span');
        document.body.appendChild(text);

        text.style.font = 'arial';
        text.style.fontSize = '16px';
        text.style.height = 'auto';
        text.style.width = 'auto';
        text.style.position = 'absolute';
        text.style.whiteSpace = 'no-wrap';
        // eslint-disable-next-line @lwc/lwc/no-inner-html
        text.innerHTML = value;
        let result = Math.ceil(text.clientWidth);
        document.body.removeChild(text);

        return result;
    }
}
