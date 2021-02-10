import Component from 'avonni/chartTreemap';

customElements.define('ac-avonni-chart-treemap', Component.CustomElementConstructor);

export const chartTreemap = ({
    palette,
    chartDatasets,
    displayUnits,
    showValues,
    showPercentages,
    showTotal,
    combineSmallGroups,
    combineMax,
    decimalPlaces,
    legendPosition,
    hideLegend
}) => {
    const element = document.createElement('ac-avonni-chart-treemap');
    element.palette = palette;
    element.chartDatasets = chartDatasets;
    element.displayUnits = displayUnits;
    element.showValues = showValues;
    element.showPercentages = showPercentages;
    element.showTotal = showTotal;
    element.combineSmallGroups = combineSmallGroups;
    element.combineMax = combineMax;
    element.decimalPlaces = decimalPlaces;
    element.legendPosition = legendPosition;
    element.hideLegend = hideLegend;
    return element;
};