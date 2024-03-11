import { LightningElement, api } from 'lwc';

export default class Datatable extends LightningElement {
    @api columnWidthsMode;
    @api columns;
    @api defaultSortDirection;
    @api draftValues;
    @api enableInfiniteLoading;
    @api errors;
    @api hideCheckboxColumn;
    @api hideTableHeader;
    @api isLoading;
    @api keyField;
    @api loadMoreOffset;
    @api maxColumnWidth;
    @api maxRowSelection = 10;
    @api minColumnWidth;
    @api records;
    @api renderConfig;
    @api resizeColumnDisabled;
    @api resizeStep;
    @api rowNumberOffset;
    @api selectedRows = [];
    @api showRowNumberColumn;
    @api sortedBy;
    @api sortedDirection;
    @api suppressBottomBar;
    @api wrapTableHeader;
    @api wrapTextMaxLines;
}
