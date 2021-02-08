import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/chartFunnel';

buildAndRegisterCustomElement('avonni-chart-funnel', Component);

export const ChartFunnel = ({
    palette,
    chartDataset,
    tooltipHidden,
    displayUnits,
    showValues,
    showPercentages,
    combineSmallGroups,
    combineMax,
    decimalPlaces
}) => {
    const element = document.createElement('avonni-chart-funnel');
    element.palette = palette;
    element.chartDataset = chartDataset;
    element.tooltipHidden = tooltipHidden;
    element.displayUnits = displayUnits;
    element.showValues = showValues;
    element.showPercentages = showPercentages;
    element.combineSmallGroups = combineSmallGroups;
    element.combineMax = combineMax;
    element.decimalPlaces = decimalPlaces;
    return element;
};