import Component from '../../storybookWrappers/tree/tree';

customElements.define('avonni-tree', Component.CustomElementConstructor);

export const Tree = ({
    header,
    isLoading,
    items,
    loadingStateAlternativeText,
    readOnly,
    selectedItem
}) => {
    const element = document.createElement('avonni-tree');
    element.header = header;
    element.isLoading = isLoading;
    element.items = items;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.readOnly = readOnly;
    element.selectedItem = selectedItem;
    return element;
};
