import Component from 'avonni/treeGrid';

customElements.define('ac-base-tree-grid', Component.CustomElementConstructor);

export const TreeGrid = ({
    ariaLabel,
    columns,
    columnWidthsMode,
    expandedRows,
    hideCheckboxColumn,
    hideTableHeader,
    isLoading,
    keyField,
    maxColumnWidth,
    maxRowSelection,
    minColumnWidth,
    records,
    resizeColumnDisabled,
    resizeStep,
    rowNumberOffset,
    selectedRows,
    showRowNumberColumn,
    wrapTextMaxLines
}) => {
    const element = document.createElement('ac-base-tree-grid');
    element.ariaLabel = ariaLabel;
    element.columns = columns;
    element.columnWidthsMode = columnWidthsMode;
    element.expandedRows = expandedRows;
    element.hideCheckboxColumn = hideCheckboxColumn;
    element.hideTableHeader = hideTableHeader;
    element.isLoading = isLoading;
    element.keyField = keyField;
    element.maxColumnWidth = maxColumnWidth;
    element.maxRowSelection = maxRowSelection;
    element.minColumnWidth = minColumnWidth;
    element.records = records;
    element.resizeColumnDisabled = resizeColumnDisabled;
    element.resizeStep = resizeStep;
    element.rowNumberOffset = rowNumberOffset;
    element.selectedRows = selectedRows;
    element.showRowNumberColumn = showRowNumberColumn;
    element.wrapTextMaxLines = wrapTextMaxLines;
    return element;
};
