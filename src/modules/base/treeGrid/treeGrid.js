import { LightningElement, api } from 'lwc';
import { normalizeColumns, normalizeRecords } from './normalizer';
import { arraysEqual } from 'c/utilsPrivate';
import {
    normalizeAriaAttribute,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';

const DEFAULT_MAX_WIDTH = 1000;
const DEFAULT_MIN_WIDTH = 50;
const DEFAULT_ROW_NUMBER_OFFSET = 0;
const COLUMN_WIDTHS_MODES = { valid: ['fixed', 'auto'], default: 'fixed' };

/**
 * @description Displays a hierarchical view of data in a table.
 *
 * @class
 * @descriptor avonni-tree-grid
 * @storyId example-tree-grid--base
 * @public
 */
export default class TreeGrid extends LightningElement {
    _ariaLabel;
    _columns;
    _columnWidthsMode = COLUMN_WIDTHS_MODES.default;
    _expandedRows = [];
    _hideCheckboxColumn = false;
    _hideTableHeader = false;
    _isLoading = false;
    _keyField;
    _maxColumnWidth = DEFAULT_MAX_WIDTH;
    _maxRowSelection;
    _minColumnWidth = DEFAULT_MIN_WIDTH;
    _records;
    _resizeColumnDisabled = false;
    _resizeStep = 10;
    _rowNumberOffset = DEFAULT_ROW_NUMBER_OFFSET;
    _selectedRows = [];
    _showRowNumberColumn = false;
    _wrapTextMaxLines;

    _publicExpandedRows = [];
    _rawColumns;
    _rawRecords;
    _toggleAllRecursionCounter = 1;

    constructor() {
        super();
        this.template.addEventListener(
            'privatetogglecell',
            this.handleToggle.bind(this)
        ); // event received by the tree cell type
        this.template.addEventListener(
            'toggleallheader',
            this.handleToggleAll.bind(this)
        ); // event received by the tree column header
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Pass through for aria-label on datatable.
     * @type {string}
     * @public
     */
    @api
    get ariaLabel() {
        return this._ariaLabel;
    }
    set ariaLabel(value) {
        this._ariaLabel = normalizeAriaAttribute(value);
    }

    /**
     * Array of the columns object that's used to define the data types.
     * Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'.
     * See the Documentation tab for more information.
     * @public
     * @type {object[]}
     */
    @api
    get columns() {
        return this._rawColumns;
    }
    set columns(value) {
        this._rawColumns = value;
        this._columns = normalizeColumns(value);
    }

    /**
     * Specifies how column widths are calculated. Set to 'fixed' for columns with equal widths.
     * Set to 'auto' for column widths that are based on the width of the column content and the table width. The default is 'fixed'.
     * @public
     * @type {string}
     * @default fixed
     */
    @api
    get columnWidthsMode() {
        return this._columnWidthsMode;
    }
    set columnWidthsMode(value) {
        this._columnWidthsMode = normalizeString(value, {
            fallbackValue: COLUMN_WIDTHS_MODES.default,
            validValues: COLUMN_WIDTHS_MODES.valid
        });
    }

    /**
     * The array of unique row IDs for rows that are expanded.
     * @public
     * @type {string[]}
     */
    @api
    get expandedRows() {
        // if we have changes then update the public value
        if (!arraysEqual(this._expandedRows, this._publicExpandedRows)) {
            this._publicExpandedRows = Object.assign([], this._expandedRows);
        }

        // otherwise simply return the current public value
        return this._publicExpandedRows;
    }
    set expandedRows(value) {
        this._publicExpandedRows = Object.assign([], value);
        this._expandedRows = Object.assign([], value);
        this.flattenData();
    }

    /**
     * If present, the checkbox column for row selection is hidden.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideCheckboxColumn() {
        return this._hideCheckboxColumn;
    }
    set hideCheckboxColumn(value) {
        this._hideCheckboxColumn = normalizeBoolean(value);
    }

    /**
     * If present, the table header is hidden.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideTableHeader() {
        return this._hideTableHeader;
    }
    set hideTableHeader(value) {
        this._hideTableHeader = normalizeBoolean(value);
    }

    /**
     * If present, a spinner is displayed to indicate that more data is being loaded.
     * @public
     * @type {boolean}
     * @default false
     *
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * Required for better performance. Associates each row with a unique ID.
     * @public
     * @type {string}
     */
    @api
    get keyField() {
        return this._keyField;
    }
    set keyField(value) {
        this._keyField = value;
        this.flattenData();
    }

    /**
     * The maximum width for all columns. The default is 1000px.
     * @public
     * @type {number}
     * @default 1000
     */
    @api
    get maxColumnWidth() {
        return this._maxColumnWidth;
    }
    set maxColumnWidth(value) {
        const number = isNaN(parseInt(value, 10)) ? DEFAULT_MAX_WIDTH : value;
        this._maxColumnWidth = number;
    }

    /**
     * The maximum number of rows that can be selected.
     * Checkboxes are used for selection by default, and radio buttons are used when maxRowSelection is 1.
     * @public
     * @type {number}
     */
    @api
    get maxRowSelection() {
        return this._maxRowSelection;
    }
    set maxRowSelection(value) {
        if (value === undefined) return;
        this._maxRowSelection = value;
    }

    /**
     * The minimum width for all columns. The default is 50px.
     * @public
     * @type {number}
     * @default 50
     */
    @api
    get minColumnWidth() {
        return this._minColumnWidth;
    }
    set minColumnWidth(value) {
        const number = isNaN(parseInt(value, 10)) ? DEFAULT_MIN_WIDTH : value;
        this._minColumnWidth = number;
    }

    /**
     * Widths of the columns.
     * @public
     * @type {object}
     */
    @api
    get primitiveWidthsData() {
        return this.datatable.widthsData;
    }

    /**
     * The array of records to be displayed.
     * @public
     * @type {object[]}
     */
    @api
    get records() {
        return this._rawRecords;
    }
    set records(value) {
        this._rawRecords = value;
        this.flattenData();
    }

    /**
     * If present, column resizing is disabled.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get resizeColumnDisabled() {
        return this._resizeColumnDisabled;
    }
    set resizeColumnDisabled(value) {
        this._resizeColumnDisabled = normalizeBoolean(value);
    }

    /**
     * The width to resize the column when a user presses left or right arrow.
     * @public
     * @type {number}
     * @default 10px
     */
    @api
    get resizeStep() {
        return this._resizeStep;
    }
    set resizeStep(value) {
        if (value === undefined) return;
        this._resizeStep = value;
    }

    /**
     * Determines where to start counting the row number. The default is 0.
     * @public
     * @type {number}
     * @default 0
     */
    @api
    get rowNumberOffset() {
        return this._rowNumberOffset;
    }
    set rowNumberOffset(value) {
        const number = isNaN(parseInt(value, 10))
            ? DEFAULT_ROW_NUMBER_OFFSET
            : value;
        this._rowNumberOffset = number;
    }

    /**
     * Make scrollable x container accessible.
     * @public
     * @type {Element}
     */
    @api
    get scrollerX() {
        return this.datatable.scrollerX;
    }

    /**
     * The array of unique row IDs that are selected.
     * @public
     * @type {string[]}
     */
    @api
    get selectedRows() {
        return this._selectedRows;
    }
    set selectedRows(value) {
        this._selectedRows = normalizeArray(value);
    }

    /**
     * If present, the row number column are shown in the first column.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get showRowNumberColumn() {
        return this._showRowNumberColumn;
    }
    set showRowNumberColumn(value) {
        this._showRowNumberColumn = normalizeBoolean(value);
    }

    /**
     * This value specifies the number of lines after which the content will be cut off and hidden. It must be at least 1 or more.
     * The text in the last line is truncated and shown with an ellipsis.
     * @public
     * @type {integer}
     */
    @api
    get wrapTextMaxLines() {
        return this._wrapTextMaxLines;
    }
    set wrapTextMaxLines(value) {
        if (value === undefined) return;
        this._wrapTextMaxLines = value;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The datatable element.
     * @type {HTMLElement}
     */
    get datatable() {
        return this.template.querySelector(
            '[data-element-id="avonni-datatable"]'
        );
    }

    /**
     * The normalized columns.
     * @type {object[]}
     */
    get normalizedColumns() {
        return this._columns;
    }

    /**
     * The normalized records.
     * @type {object[]}
     */
    get normalizedRecords() {
        return this._records;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Collapse all rows
     *
     * @public
     */
    @api
    collapseAll() {
        this.toggleAllRows(this.records, false);
    }

    /**
     * Expand all rows with children content
     *
     * @public
     */
    @api
    expandAll() {
        this.toggleAllRows(this.records, true);
    }

    /**
     * Returns an array of rows that are expanded.
     * @returns {array} The IDs for all rows that are marked as expanded
     *
     * @public
     */
    @api
    getCurrentExpandedRows() {
        return this.expandedRows;
    }

    /**
     * Returns data in each selected row.
     * @returns {array} An array of data in each selected row.
     *
     * @public
     */
    @api
    getSelectedRows() {
        return this.datatable.getSelectedRows();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Flatten the data
     */
    flattenData() {
        // only flatten data if we have a key field defined
        if (this.keyField) {
            this._records = normalizeRecords(
                this.records,
                this.expandedRows,
                this.keyField
            );
        }
    }

    /**
     * Check if a row has children content
     * @param {object} row - the row to check
     * @returns {boolean} true if the row has children content, false otherwise
     */
    hasChildrenContent(row) {
        let hasChildrenContent = false;
        if (
            // eslint-disable-next-line no-prototype-builtins
            row.hasOwnProperty('_children') &&
            Array.isArray(row._children) &&
            row._children.length > 0
        ) {
            hasChildrenContent = true;
        }

        return hasChildrenContent;
    }

    /**
     * Toggle all rows, update flattened data, and dispatch the `toggleall` event
     * @param {object[]} data - tree-grid data
     * @param {boolean} isExpanded - boolean value specifying whether to expand (true) or collapse (false)
     * @param {array} rowsToToggle - array of row unique IDs that will be toggled
     */
    toggleAllRows(data, isExpanded, rowsToToggle = []) {
        // if expanding all rows generate list of valid row IDs
        // :: otherwise simply pass the empty array to collapse all
        if (isExpanded) {
            // step through the array using recursion until we find the correct row to update
            data.forEach((row) => {
                const hasChildrenContent = this.hasChildrenContent(row);

                // if row has children content then expand it
                if (hasChildrenContent) {
                    rowsToToggle.push(row[this.keyField]);

                    // continue deeper into the tree if we have valid children content
                    this._toggleAllRecursionCounter++;
                    this.toggleAllRows(row._children, isExpanded, rowsToToggle);
                }
            });
        }

        if (--this._toggleAllRecursionCounter === 0) {
            this._toggleAllRecursionCounter = 1;
            // update the expandedRows value with all valid values
            this._expandedRows = rowsToToggle;

            // dispatch the toggleAllChange event
            this.dispatchToggleAllChange(isExpanded);

            // update the data
            this.flattenData();
        }
    }

    /**
     * Toggle a single row, update flattened data, and dispatch the `toggle` event
     * @param {object[]} data - tree-grid data
     * @param {string} name - the unique ID of the row to toggle
     * @param {boolean} isExpanded - boolean value specifying whether to expand (true) or collapse (false)
     */
    toggleRow(data, name, isExpanded) {
        // step through the array using recursion until we find the correct row to update
        data.forEach((row) => {
            const hasChildrenContent = this.hasChildrenContent(row);

            // if we find the matching row apply the changes and trigger the collapseChange event
            if (row[this.keyField] === name) {
                this.updateExpandedRows(name, isExpanded);

                // dispatch the collapseChange event
                this.dispatchRowToggleChange(
                    name,
                    isExpanded,
                    hasChildrenContent,
                    row
                );
                // if we didn't find the matching node and this node has children then continue deeper into the tree
            } else if (hasChildrenContent) {
                this.toggleRow(row._children, name, isExpanded);
            }
        });

        // update the data
        this.flattenData();
    }

    /**
     * Update the expandedRows value for a single row
     */
    updateExpandedRows(name, isExpanded) {
        // check if the ID isn't already in the array
        const itemPosition = this._expandedRows.indexOf(name);

        // :: if it is and isExpanded is false, remove it
        if (itemPosition > -1 && isExpanded === false) {
            this._expandedRows.splice(itemPosition, 1);
            // :: if it is not and isExpanded is true, add it
        } else if (itemPosition === -1 && isExpanded) {
            this._expandedRows.push(name);
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the header action event
     * @param {Event} event - the event object
     */
    handleHeaderAction(event) {
        event.stopPropagation();
        // pass the event through
        this.dispatchHeaderAction(event.detail);
    }

    /**
     * Handle the row action event
     * @param {Event} event - the event object
     */
    handleRowAction(event) {
        event.stopPropagation();
        // pass the event through
        this.dispatchRowAction(event.detail);
    }

    /**
     * Handle the row selection event
     * @param {Event} event - the event object
     */
    handleRowSelection(event) {
        event.stopPropagation();
        // pass the event through
        this.dispatchSelectedRowsChange(event.detail);
    }

    /**
     * Handle the toggle event
     * @param {Event} event - the event object
     */
    handleToggle(event) {
        event.stopPropagation();
        const { name, nextState } = event.detail;
        // toggle row in user provided data
        this.toggleRow(this.records, name, nextState);
    }

    /**
     * Handle the toggle all event
     * @param {Event} event - the event object
     */
    handleToggleAll(event) {
        event.stopPropagation();
        const { nextState } = event.detail;
        // toggle all rows in user provided data
        this.toggleAllRows(this.records, nextState);
    }

    /**
     * Dispatch the row toggle change event
     * @param {string} name - the name of the row
     * @param {boolean} isExpanded - whether the row is expanded
     * @param {boolean} hasChildrenContent - whether the row has children content
     * @param {object} row - the row data
     */
    dispatchRowToggleChange(name, isExpanded, hasChildrenContent, row) {
        /**
         * The event dispatched when a row is expanded or collapsed.
         *
         * @event
         * @name toggle
         * @param {string} name The unique ID for the row that's toggled.
         * @param {boolean} isExpanded Specifies whether the row is expanded or not.
         * @param {boolean} hasChildrenContent Specifies whether any data is available for the nested items of this row. When value is false, _children is null, undefined, or an empty array. When value is true, _children has a non-empty array.
         * @param {object} row The toggled row data.
         * @public
         */
        const event = new CustomEvent('toggle', {
            detail: { name, isExpanded, hasChildrenContent, row }
        });
        this.dispatchEvent(event);
    }

    /**
     * Dispatch the toggle all change event
     * @param {boolean} isExpanded - whether the row is expanded
     */
    dispatchToggleAllChange(isExpanded) {
        /**
         * The event dispatched when all rows are expanded or collapsed.
         *
         * @event
         * @name toggleall
         * @param {boolean} isExpanded Specifies whether the row is expanded or not.
         * @public
         */
        const event = new CustomEvent('toggleall', {
            detail: { isExpanded }
        });
        this.dispatchEvent(event);
    }

    /**
     * Dispatch the selected rows change event
     * @param {object} eventDetails - the event details
     */
    dispatchSelectedRowsChange(eventDetails) {
        /**
         * The event dispatched when a row is selected.
         *
         * @event
         * @name rowselection
         * @public
         */
        const event = new CustomEvent('rowselection', {
            detail: eventDetails
        });

        this.dispatchEvent(event);
    }

    /**
     * Dispatch the header action event
     * @param {object} eventDetails - the event details
     */
    dispatchHeaderAction(eventDetails) {
        /**
         * The event dispatched when a header-level action is run.
         *
         * @event
         * @name headeraction
         * @public
         */
        const event = new CustomEvent('headeraction', {
            detail: eventDetails
        });

        this.dispatchEvent(event);
    }

    /**
     * Dispatch the row action event
     * @param {object} eventDetails - the event details
     */
    dispatchRowAction(eventDetails) {
        /**
         * The event dispatched when a row-level action is run.
         *
         * @event
         * @name rowaction
         * @public
         */
        const event = new CustomEvent('rowaction', {
            detail: eventDetails
        });

        this.dispatchEvent(event);
    }
}
