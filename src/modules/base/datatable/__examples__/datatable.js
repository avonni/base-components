import Component from '../../storybookWrappers/datatable/datatable';

customElements.define('ac-base-datatable', Component.CustomElementConstructor);

export const Datatable = ({
    columns,
    columnWidthsMode,
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
    records,
    renderConfig,
    resizeColumnDisabled,
    resizeStep,
    rowNumberOffset,
    selectedRows,
    showRowNumberColumn,
    sortedBy,
    sortedDirection,
    suppressBottomBar,
    wrapTableHeader,
    wrapTextMaxLines
}) => {
    const element = document.createElement('ac-base-datatable');
    element.columns = columns;
    element.columnWidthsMode = columnWidthsMode;
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
    element.records = records;
    element.renderConfig = renderConfig;
    element.resizeColumnDisabled = resizeColumnDisabled;
    element.resizeStep = resizeStep;
    element.rowNumberOffset = rowNumberOffset;
    element.selectedRows = selectedRows;
    element.showRowNumberColumn = showRowNumberColumn;
    element.sortedBy = sortedBy;
    element.sortedDirection = sortedDirection;
    element.suppressBottomBar = suppressBottomBar;
    element.wrapTableHeader = wrapTableHeader;
    element.wrapTextMaxLines = wrapTextMaxLines;
    return element;
};
