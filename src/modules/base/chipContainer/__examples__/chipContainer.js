import Component from '../chipContainer';

customElements.define('ac-chip-container', Component.CustomElementConstructor);

export const ChipContainer = ({
    items,
    alternativeText,
    isCollapsible,
    isExpanded,
    singleLine,
    sortable
}) => {
    const element = document.createElement('ac-chip-container');
    element.items = items;
    element.alternativeText = alternativeText;
    element.isCollapsible = isCollapsible;
    element.isExpanded = isExpanded;
    element.singleLine = singleLine;
    element.sortable = sortable;
    return element;
};
