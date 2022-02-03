import Component from '../../storybookWrappers/tree/tree';

customElements.define('avonni-tree', Component.CustomElementConstructor);

export const Tree = ({ header, items, readOnly, selectedItem }) => {
    const element = document.createElement('avonni-tree');
    element.header = header;
    element.items = items;
    element.readOnly = readOnly;
    element.selectedItem = selectedItem;
    return element;
};
