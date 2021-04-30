import Component from 'avonni/filterMenuGroup';

customElements.define(
    'ac-base-filter-menu-group',
    Component.CustomElementConstructor
);

export const FilterMenuGroup = ({ items }) => {
    const element = document.createElement('ac-base-filter-menu-group');
    element.items = items;
    return element;
};
