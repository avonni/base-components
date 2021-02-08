import '@lwc/synthetic-shadow';
import Component from 'avonni/chartLine';

customElements.define('ac-avonni-chart-line', Component.CustomElementConstructor);

export const chartLine = ({
    palette,
    chartDatasets,
    axisLabels,
    showValues,
    cumulative,
    yAxisRangeMin,
    yAxisRangeMax,
    decimalPlaces,
    legendPosition,
    hideLegend
}) => {
    const element = document.createElement('ac-avonni-chart-line');
    element.palette = palette;
    element.chartDatasets = chartDatasets;
    element.axisLabels = axisLabels;
    element.showValues = showValues;
    element.cumulative = cumulative;
    element.yAxisRangeMin = yAxisRangeMin;
    element.yAxisRangeMax = yAxisRangeMax;
    element.decimalPlaces = decimalPlaces;
    element.legendPosition = legendPosition;
    element.hideLegend = hideLegend;
    return element;
};