import Component from 'c/sortableMenu';

customElements.define(
    'ac-base-sortable-menu',
    Component.CustomElementConstructor
);

export const SortableMenu = ({ label, disabled, items }) => {
    const element = document.createElement('ac-base-sortable-menu');
    element.label = label;
    element.disabled = disabled;
    element.items = items;
    return element;
};
