import Component from '../../storybookWrappers/tree/tree';

customElements.define('avonni-tree', Component.CustomElementConstructor);

export const Tree = ({
    actions,
    actionsWhenDisabled,
    allowInlineEdit,
    editFields,
    header,
    isLoading,
    items,
    loadingStateAlternativeText,
    isMultiSelect,
    selectedItem,
    sortable
}) => {
    const element = document.createElement('avonni-tree');
    element.actions = actions;
    element.actionsWhenDisabled = actionsWhenDisabled;
    element.allowInlineEdit = allowInlineEdit;
    element.editFields = editFields;
    element.header = header;
    element.isLoading = isLoading;
    element.items = items;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.isMultiSelect = isMultiSelect;
    element.selectedItem = selectedItem;
    element.sortable = sortable;
    return element;
};
