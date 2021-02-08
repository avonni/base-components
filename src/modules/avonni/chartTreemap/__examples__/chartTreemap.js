import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/chartTreemap';

buildAndRegisterCustomElement('avonni-chart-treemap', Component);

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
    const element = document.createElement('avonni-chart-treemap');
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