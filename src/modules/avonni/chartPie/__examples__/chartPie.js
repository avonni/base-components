import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/chartPie';

buildAndRegisterCustomElement('avonni-chart-pie', Component);

export const chartPie = ({
    variant,
    palette,
    chartDatasets,
    axisLabels,
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
    const element = document.createElement('avonni-chart-pie');
    element.variant = variant;
    element.palette = palette;
    element.chartDatasets = chartDatasets;
    element.axisLabels = axisLabels;
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

