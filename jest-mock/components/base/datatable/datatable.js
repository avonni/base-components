import { LightningElement, api } from 'lwc';

export default class Datatable extends LightningElement {
    @api columnWidthsMode;
    @api columns;
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
    @api records;
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
    getRowHeight() {
        return 0;
    }

    @api
    setRowHeight() {
        return true;
    }
}
