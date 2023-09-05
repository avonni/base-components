import Component from '../../storybookWrappers/kanban/kanban';

customElements.define('ac-kanban', Component.CustomElementConstructor);

export const Kanban = ({
    actions,
    cardAttributes,
    disableColumnDragAndDrop,
    disableItemDragAndDrop,
    groupFieldName,
    groupValues,
    hideHeader,
    isLoading,
    keyField,
    records,
    subGroupFieldName,
    summarizeAttributes,
    variant
}) => {
    const element = document.createElement('ac-kanban');
    element.actions = actions;
    element.cardAttributes = cardAttributes;
    element.disableColumnDragAndDrop = disableColumnDragAndDrop;
    element.disableItemDragAndDrop = disableItemDragAndDrop;
    element.groupFieldName = groupFieldName;
    element.groupValues = groupValues;
    element.hideHeader = hideHeader;
    element.isLoading = isLoading;
    element.keyField = keyField;
    element.records = records;
    element.subGroupFieldName = subGroupFieldName;
    element.summarizeAttributes = summarizeAttributes;
    element.variant = variant;
    return element;
};
