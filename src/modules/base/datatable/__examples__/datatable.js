import Component from '../../storybookWrappers/datatable/datatable';

customElements.define('ac-base-datatable', Component.CustomElementConstructor);

export const Datatable = ({
    columnWidthsMode,
    columns,
    data,
    defaultSortDirection,
    draftValues,
    enableInfiniteLoading,
    errors,
    hideCheckboxColumn,
    hideTableHeader,
    isLoading,
    keyField,
    loadMoreOffset,
    maxColumnWidth,
    maxRowSelection,
    minColumnWidth,
    renderConfig,
    resizeColumnDisabled,
    resizeStep,
    rowNumberOffset,
    selectedRows,
    showRowNumberColumn,
    sortedBy,
    sortedDirection,
    suppressBottomBar,
    wrapTextMaxLines
}) => {
    const element = document.createElement('ac-base-datatable');
    element.columnWidthsMode = columnWidthsMode;
    element.columns = columns;
    element.data = data;
    element.defaultSortDirection = defaultSortDirection;
    element.draftValues = draftValues;
    element.enableInfiniteLoading = enableInfiniteLoading;
    element.errors = errors;
    element.hideCheckboxColumn = hideCheckboxColumn;
    element.hideTableHeader = hideTableHeader;
    element.isLoading = isLoading;
    element.keyField = keyField;
    element.loadMoreOffset = loadMoreOffset;
    element.maxColumnWidth = maxColumnWidth;
    element.maxRowSelection = maxRowSelection;
    element.minColumnWidth = minColumnWidth;
    element.renderConfig = renderConfig;
    element.resizeColumnDisabled = resizeColumnDisabled;
    element.resizeStep = resizeStep;
    element.rowNumberOffset = rowNumberOffset;
    element.selectedRows = selectedRows;
    element.showRowNumberColumn = showRowNumberColumn;
    element.sortedBy = sortedBy;
    element.sortedDirection = sortedDirection;
    element.suppressBottomBar = suppressBottomBar;
    element.wrapTextMaxLines = wrapTextMaxLines;
    return element;
};
