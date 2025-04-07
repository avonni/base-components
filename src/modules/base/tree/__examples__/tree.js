import Component from '../../storybookWrappers/tree/tree';

customElements.define('avonni-tree', Component.CustomElementConstructor);

export const Tree = ({
    actions,
    actionsWhenDisabled,
    allowInlineEdit,
    collapseDisabled,
    editableFields,
    enableInfiniteLoading,
    header,
    independentMultiSelect,
    isLoading,
    isMultiSelect,
    items,
    loadingStateAlternativeText,
    placeholder,
    selectedItems,
    sortable
}) => {
    const element = document.createElement('avonni-tree');
    element.actions = actions;
    element.actionsWhenDisabled = actionsWhenDisabled;
    element.allowInlineEdit = allowInlineEdit;
    element.collapseDisabled = collapseDisabled;
    element.editableFields = editableFields;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.header = header;
    element.independentMultiSelect = independentMultiSelect;
    element.isLoading = isLoading;
    element.isMultiSelect = isMultiSelect;
    element.items = items;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.placeholder = placeholder;
    element.selectedItems = selectedItems;
    element.sortable = sortable;
    return element;
};
