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
    singleLine,
    sortable
}) => {
    const element = document.createElement('ac-max-width-chip-container');
    element.items = items;
    element.alternativeText = alternativeText;
    element.isCollapsible = isCollapsible;
    element.isExpanded = isExpanded;
    element.singleLine = singleLine;
    element.sortable = sortable;
    return element;
};
