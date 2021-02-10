import Component from 'avonni/chartHeatmap';

customElements.define('ac-avonni-chart-heatmap', Component.CustomElementConstructor);

export const ChartHeatmap = ({
    palette,
    chartDatasets,
    xLabels,
    yLabels,
    displayUnits,
    showValues,
    showPercentages,
    showTotal,
    decimalPlaces,
    hideLegend
}) => {
    const element = document.createElement('ac-avonni-chart-heatmap');
    element.palette = palette;
    element.chartDatasets = chartDatasets;
    element.xLabels = xLabels;
    element.yLabels = yLabels;
    element.displayUnits = displayUnits;
    element.showValues = showValues;
    element.showPercentages = showPercentages;
    element.showTotal = showTotal;
    element.decimalPlaces = decimalPlaces;
    element.hideLegend = hideLegend;
    return element;
};