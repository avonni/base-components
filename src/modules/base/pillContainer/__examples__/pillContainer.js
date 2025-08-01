import Component from '../pillContainer';

customElements.define(
    'ac-base-pill-container',
    Component.CustomElementConstructor
);

export const PillContainer = ({
    actions,
    alternativeText,
    isCollapsible,
    isExpanded,
    items,
    showMoreButtonLabel,
    singleLine,
    sortable
}) => {
    const element = document.createElement('ac-base-pill-container');
    element.actions = actions;
    element.alternativeText = alternativeText;
    element.isCollapsible = isCollapsible;
    element.isExpanded = isExpanded;
    element.items = items;
    element.showMoreButtonLabel = showMoreButtonLabel;
    element.singleLine = singleLine;
    element.sortable = sortable;
    return element;
};
