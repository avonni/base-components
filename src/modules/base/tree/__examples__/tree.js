import Component from '../../storybookWrappers/tree/tree';

customElements.define('avonni-tree', Component.CustomElementConstructor);

export const Tree = ({
    actions,
    actionsWhenDisabled,
    addButtonLabel,
    allowInlineEdit,
    cancelButtonLabel,
    closeButtonAlternativeText,
    collapseDisabled,
    collapseButtonAlternativeText,
    disabled,
    doneButtonLabel,
    editableFields,
    enableInfiniteLoading,
    expandButtonAlternativeText,
    header,
    independentMultiSelect,
    isLoading,
    isMultiSelect,
    items,
    loadMoreButtonLabel,
    loadingStateAlternativeText,
    placeholder,
    saveButtonIconAlternativeText,
    selectedItems,
    sortable
}) => {
    const element = document.createElement('avonni-tree');
    element.actions = actions;
    element.actionsWhenDisabled = actionsWhenDisabled;
    element.addButtonLabel = addButtonLabel;
    element.allowInlineEdit = allowInlineEdit;
    element.cancelButtonLabel = cancelButtonLabel;
    element.closeButtonAlternativeText = closeButtonAlternativeText;
    element.collapseButtonAlternativeText = collapseButtonAlternativeText;
    element.collapseDisabled = collapseDisabled;
    element.disabled = disabled;
    element.doneButtonLabel = doneButtonLabel;
    element.editableFields = editableFields;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.expandButtonAlternativeText = expandButtonAlternativeText;
    element.header = header;
    element.independentMultiSelect = independentMultiSelect;
    element.isLoading = isLoading;
    element.isMultiSelect = isMultiSelect;
    element.items = items;
    element.loadMoreButtonLabel = loadMoreButtonLabel;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.placeholder = placeholder;
    element.saveButtonIconAlternativeText = saveButtonIconAlternativeText;
    element.selectedItems = selectedItems;
    element.sortable = sortable;
    return element;
};
