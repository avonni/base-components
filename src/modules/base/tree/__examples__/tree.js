import Component from '../../storybookWrappers/tree/tree';

customElements.define('avonni-tree', Component.CustomElementConstructor);

export const Tree = ({
    actions,
    header,
    isLoading,
    items,
    loadingStateAlternativeText,
    selectedItem
}) => {
    const element = document.createElement('avonni-tree');
    element.actions = actions;
    element.header = header;
    element.isLoading = isLoading;
    element.items = items;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.selectedItem = selectedItem;
    return element;
};
