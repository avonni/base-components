import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/chartLine';

buildAndRegisterCustomElement('avonni-chart-line', Component);

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
    const element = document.createElement('avonni-chart-line');
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