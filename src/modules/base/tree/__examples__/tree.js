import Component from '../../storybookWrappers/tree/tree';

customElements.define('avonni-tree', Component.CustomElementConstructor);

export const Tree = ({
    actions,
    editFields,
    header,
    isLoading,
    items,
    loadingStateAlternativeText,
    selectedItem,
    sortable
}) => {
    const element = document.createElement('avonni-tree');
    element.actions = actions;
    element.editFields = editFields;
    element.header = header;
    element.isLoading = isLoading;
    element.items = items;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.selectedItem = selectedItem;
    element.sortable = sortable;
    return element;
};
