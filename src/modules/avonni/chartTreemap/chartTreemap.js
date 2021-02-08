import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    getChartColors
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

const validLegendPositions = ['top', 'bottom'];

export default class ChartTreemap extends LightningElement {
    @track _chartDatasets = [];
    @track _combineMax = 1;
    @track _palette = 'aurora';
    @track _displayUnits = 'full-number';
    @track _decimalPlaces = 'auto';
    @track _legendPosition = 'bottom';
    @track _combineSmallGroups = false;
    @track _showValues = false;
    @track _showPercentages = false;
    @track _showTotal = false;
    @track _hideLegend = false;

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
            this.generateTreemap();
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
    get combineMax() {
        return this._combineMax;
    }

    set combineMax(value) {
        this._combineMax = Number(value);

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

    @api get legendPosition() {
        return this._legendPosition;
    }

    set legendPosition(value) {
        this._legendPosition = normalizeString(value, {
            fallbackValue: 'bottom',
            validValues: validLegendPositions
        });

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

    @api get showTotal() {
        return this._showTotal;
    }

    set showTotal(value) {
        this._showTotal = normalizeBoolean(value);

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

    get colors() {
        return getChartColors(this.palette);
    }

    get data() {
        let data = JSON.parse(JSON.stringify(this.chartDatasets));
        let dataResult = [{ name: 'main', parent: '', value: '' }];
        let others = {
            name: 'Others',
            parent: 'main',
            value: 0,
            percentage: 0,
            tooltip: ''
        };

        data.forEach(element => {
            let item = {};
            let transformedValue = this.transformValue(element.value);
            item.name = element.label;
            item.parent = 'main';
            item.value = element.value;
            item.percentage = Number(
                ((item.value / this.total) * 100).toFixed(0)
            );
            item.tooltip = `${item.name}: ${transformedValue}`;

            if (this.showPercentages) {
                item.tooltip = `${item.name}: ${transformedValue} (${item.percentage}%)`;
            }

            if (this.combineSmallGroups && item.percentage < this.combineMax) {
                others.value += item.value;
                others.percentage += item.percentage;

                if (this.showPercentages) {
                    others.tooltip += `${item.name}: ${transformedValue} (${item.percentage}%)<br>`;
                } else {
                    others.tooltip += `${item.name}: ${transformedValue}<br>`;
                }
            } else {
                let color = this.colors[dataResult.length - 1];
                item.color = color ? color : '#808080';
                dataResult.push(item);
            }
        });

        if (others.value > 0) {
            let color = this.colors[dataResult.length - 1];
            others.color = color ? color : '#808080';

            dataResult.push(others);
        }

        return dataResult;
    }

    get total() {
        let total = 0;
        this.chartDatasets.forEach(element => {
            total += element.value;
        });

        return total;
    }

    generateTreemap() {
        /* eslint-disable no-undef */
        let container = this.template.querySelector('.d3');
        let margin = { top: 0, right: 0, bottom: 0, left: 0 };
        let width = container.offsetWidth - margin.left - margin.right;
        let height = container.offsetWidth / 2 - margin.top - margin.bottom;

        if (this.showTotal) {
            d3.select(container)
                .append('div')
                .attr('width', container.offsetWidth)
                .attr('height', 24)
                .text(`TOTAL: ${this.transformValue(this.total)}`)
                .style('padding-bottom', '1rem')
                .style('font-family', 'arial')
                .style('font-size', '22px')
                .style('text-align', 'center');
        }

        if (!this.hideLegend && this.legendPosition === 'top') {
            this.createLegend(container);
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

        let root = d3
            .stratify()
            .id(function(d) {
                return d.name;
            })
            .parentId(function(d) {
                return d.parent;
            })(this.data);

        root.sum(function(d) {
            return +d.value;
        });

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
                .html(d.data.tooltip)
                .style('left', xy[0] + 20 + 'px')
                .style('top', xy[1] + 'px');
        };

        let mouseleave = function() {
            tooltip.style('opacity', 0);
        };

        d3
            .treemap()
            .size([width, height])
            .padding(1)(root);

        svg.selectAll('rect')
            .data(root.leaves())
            .enter()
            .append('rect')
            .attr('x', function(d) {
                return d.x0;
            })
            .attr('y', function(d) {
                return d.y0;
            })
            .attr('width', function(d) {
                return d.x1 - d.x0;
            })
            .attr('height', function(d) {
                return d.y1 - d.y0;
            })
            .style('fill', function(d) {
                return d.data.color;
            })
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave);

        svg.selectAll('text')
            .data(root.leaves())
            .enter()
            .append('text')
            .attr('x', function(d) {
                return (d.x1 - d.x0) / 2 + d.x0;
            })
            .attr('y', function(d) {
                return (d.y1 - d.y0) / 2 + d.y0;
            })
            .text(
                function(d) {
                    if (this.showValues && this.showPercentages) {
                        return `${this.transformValue(d.data.value)} (${
                            d.data.percentage
                        }%)`;
                    } else if (this.showValues) {
                        return this.transformValue(d.data.value);
                    } else if (this.showPercentages) {
                        return `${d.data.percentage}%`;
                    }
                    return '';
                }.bind(this)
            )
            .attr('dominant-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .attr('font-size', '15px')
            .attr('fill', 'white')
            .style('cursor', 'default')
            .on('mouseover', mouseover)
            .on('mousemove', mousemove)
            .on('mouseleave', mouseleave);

        if (!this.hideLegend && this.legendPosition === 'bottom') {
            this.createLegend(container);
        }
    }

    createLegend(container) {
        let legendVals = d3
            .set(
                this.data.map(function(d) {
                    return d.name;
                })
            )
            .values();

        legendVals = legendVals.slice(1, legendVals.length);

        let legend = d3
            .select(container)
            .append('div')
            .attr('class', `legend-${this.legendPosition}`)
            .selectAll('legend')
            .data(legendVals);

        let divElement = legend
            .enter()
            .append('div')
            .attr('class', 'legend-item');

        divElement
            .append('div')
            .attr('class', 'legend-color')
            .style('cursor', 'default')
            .style(
                'background',
                function(d, i) {
                    return this.data[i + 1].color;
                }.bind(this)
            );

        divElement
            .append('div')
            .attr('class', 'legend-text')
            .style('cursor', 'default')
            .text(function(d) {
                return d;
            });
    }

    redrawChart() {
        let container = this.template.querySelector('.d3');

        while (container.firstChild) {
            container.removeChild(container.lastChild);
        }

        this.generateTreemap();
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
