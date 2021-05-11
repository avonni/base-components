import Component from 'c/sortableMenu';

customElements.define(
    'ac-base-sortable-menu',
    Component.CustomElementConstructor
);

export const SortableMenu = ({
    label,
    alternativeText,
    disabled,
    items,
    iconName,
    iconPosition
}) => {
    const element = document.createElement('ac-base-sortable-menu');
    element.label = label;
    element.alternativeText = alternativeText;
    element.disabled = disabled;
    element.items = items;
    element.iconName = iconName;
    element.iconPosition = iconPosition;
    return element;
};
