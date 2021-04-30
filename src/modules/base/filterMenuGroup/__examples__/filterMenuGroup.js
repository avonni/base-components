import Component from 'avonni/filterMenuGroup';

customElements.define(
    'ac-base-filter-menu-group',
    Component.CustomElementConstructor
);

export const FilterMenuGroup = ({ items, hideSelectedItems, variant }) => {
    const element = document.createElement('ac-base-filter-menu-group');
    element.items = items;
    element.hideSelectedItems = hideSelectedItems;
    element.variant = variant;
    return element;
};
