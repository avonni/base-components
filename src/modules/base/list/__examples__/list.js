import Component from 'c/list';

customElements.define('ac-base-list', Component.CustomElementConstructor);

export const List = ({
    label,
    alternativeText,
    sortable,
    items,
    actions,
    sortableIconName,
    sortableIconPosition,
    padding,
    divider
}) => {
    const element = document.createElement('ac-base-list');
    element.label = label;
    element.alternativeText = alternativeText;
    element.sortable = sortable;
    element.items = items;
    element.actions = actions;
    element.sortableIconName = sortableIconName;
    element.sortableIconPosition = sortableIconPosition;
    element.padding = padding;
    element.divider = divider;
    return element;
};
