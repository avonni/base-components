import '@lwc/synthetic-shadow';
import Component from 'avonni/chartFunnel';

customElements.define('ac-avonni-chart-funnel', Component.CustomElementConstructor);

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
    const element = document.createElement('ac-avonni-chart-funnel');
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