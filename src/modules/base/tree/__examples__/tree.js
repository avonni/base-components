

import Component from '../../storybookWrappers/tree/tree';

customElements.define('avonni-tree', Component.CustomElementConstructor);

export const Tree = ({
    actions,
    actionsWhenDisabled,
    allowInlineEdit,
    editableFields,
    header,
    independentMultiSelect,
    isLoading,
    items,
    loadingStateAlternativeText,
    isMultiSelect,
    selectedItems,
    sortable
}) => {
    const element = document.createElement('avonni-tree');
    element.actions = actions;
    element.actionsWhenDisabled = actionsWhenDisabled;
    element.allowInlineEdit = allowInlineEdit;
    element.editableFields = editableFields;
    element.header = header;
    element.independentMultiSelect = independentMultiSelect;
    element.isLoading = isLoading;
    element.items = items;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.isMultiSelect = isMultiSelect;
    element.selectedItems = selectedItems;
    element.sortable = sortable;
    return element;
};
