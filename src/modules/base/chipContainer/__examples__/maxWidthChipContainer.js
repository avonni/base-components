import Component from '../../storybookWrappers/chipContainer/maxWidthChipContainer';

customElements.define(
    'ac-max-width-chip-container',
    Component.CustomElementConstructor
);

export const MaxWidthChipContainer = ({
    alternativeText,
    isCollapsible,
    isExpanded,
    items,
    showMoreButtonAlternativeText,
    singleLine,
    sortable
}) => {
    const element = document.createElement('ac-max-width-chip-container');
    element.alternativeText = alternativeText;
    element.isCollapsible = isCollapsible;
    element.isExpanded = isExpanded;
    element.items = items;
    element.showMoreButtonAlternativeText = showMoreButtonAlternativeText;
    element.singleLine = singleLine;
    element.sortable = sortable;
    return element;
};
