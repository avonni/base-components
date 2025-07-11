import Component from '../chipContainer';

customElements.define('ac-chip-container', Component.CustomElementConstructor);

export const ChipContainer = ({
    alternativeText,
    isCollapsible,
    isExpanded,
    items,
    showMoreButtonAlternativeText,
    singleLine,
    sortable
}) => {
    const element = document.createElement('ac-chip-container');
    element.alternativeText = alternativeText;
    element.isCollapsible = isCollapsible;
    element.isExpanded = isExpanded;
    element.items = items;
    element.showMoreButtonAlternativeText = showMoreButtonAlternativeText;
    element.singleLine = singleLine;
    element.sortable = sortable;
    return element;
};
