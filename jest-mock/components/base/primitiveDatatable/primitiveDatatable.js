import { LightningElement, api } from 'lwc';

export default class PrimitiveDatatable extends LightningElement {
    @api columnWidthsMode;
    @api columns;
    @api data;
    @api defaultSortDirection;
    @api draftValues;
    @api draggable;
    @api draggableIconName;
    @api enableInfiniteLoading;
    @api erros;
    @api groupBy;
    @api hideCheckboxColumn;
    @api hideTableHeader;
    @api hideUndefinedGroup;
    @api isLoading;
    @api hideCollapsibleIcon;
    @api keyField;
    @api loadMoreOffset;
    @api maxColumnWidth;
    @api maxRowSelection;
    @api minColumnWidth;
    @api renderConfig;
    @api resizeColumnDisabled;
    @api resizeStep;
    @api rowNumberOffset;
    @api selectedRows;
    @api showRowNumberColumn;
    @api sortedBy;
    @api sortedDirection;
    @api suppressBottomBar;
    @api wrapTextMaxLines;

    @api
    columnsWidthCalculation() {
        return 0;
    }

    @api
    getRowHeight() {
        return 0;
    }

    @api
    isDatatableEditable() {
        return true;
    }

    @api
    primitiveDatatableDraftValues() {
        return {};
    }

    @api
    setRowHeight() {
        return true;
    }

    @api
    tableWidth() {
        return 0;
    }
}
