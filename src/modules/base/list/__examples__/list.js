import Component from 'c/list';

customElements.define('ac-base-list', Component.CustomElementConstructor);

export const List = ({
    label,
    alternativeText,
    sortable,
    items,
    actions,
    isDynamicRowAction,
    sortableIconName,
    sortableIconPosition
}) => {
    const element = document.createElement('ac-base-list');
    element.label = label;
    element.alternativeText = alternativeText;
    element.sortable = sortable;
    element.items = items;
    element.actions = actions;
    element.sortableIconName = sortableIconName;
    element.sortableIconPosition = sortableIconPosition;
    element.isDynamicRowAction = isDynamicRowAction;
    return element;
};
