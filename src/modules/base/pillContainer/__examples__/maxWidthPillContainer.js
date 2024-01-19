import Component from '../../storybookWrappers/pillContainer/maxWidthPillContainer';

customElements.define(
    'ac-max-width-pill-container',
    Component.CustomElementConstructor
);

export const MaxWidthPillContainer = ({
    actions,
    alternativeText,
    isCollapsible,
    isExpanded,
    items,
    singleLine,
    sortable
}) => {
    const element = document.createElement('ac-max-width-pill-container');
    element.actions = actions;
    element.alternativeText = alternativeText;
    element.isCollapsible = isCollapsible;
    element.isExpanded = isExpanded;
    element.items = items;
    element.singleLine = singleLine;
    element.sortable = sortable;
    return element;
};
