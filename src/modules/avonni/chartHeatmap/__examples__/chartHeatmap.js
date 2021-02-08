import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/chartHeatmap';

buildAndRegisterCustomElement('avonni-chart-heatmap', Component);

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
    const element = document.createElement('avonni-chart-heatmap');
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