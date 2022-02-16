import { LightningElement, api, track } from 'lwc';
import { normalizeColumns, normalizeData } from './normalizer';
import { arraysEqual } from 'c/utilsPrivate';

/**
 * Displays a hierarchical view of data in a table.
 */
export default class LightningTreeGrid extends LightningElement {
    // raw values passed in
    _rawColumns;
    _rawData;
    _keyField;

    _publicExpandedRows = [];
    _ariaLabel;

    /**
     * If present, the checkbox column for row selection is hidden.
     * @type {boolean}
     * @default false
     */
    @api hideCheckboxColumn = false;

    /**
     * If present, a spinner is displayed to indicate that more data is being loaded.
     * @type {boolean}
     * @default false
     */
    @api isLoading = false;

    /**
     * Required for better performance. Associates each row with a unique ID.
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
     * @type {number}
     * @default 1000
     */
    @api maxColumnWidth = 1000;

    /**
     * The minimum width for all columns. The default is 50px.
     * @type {number}
     * @default 50
     */
    @api minColumnWidth = 50;

    /**
     * If present, column resizing is disabled.
     * @type {boolean}
     * @default false
     */
    @api resizeColumnDisabled = false;

    /**
     * Determines where to start counting the row number. The default is 0.
     * @type {number}
     * @default 0
     */
    @api rowNumberOffset = 0;

    /**
     * The array of unique row IDs that are selected.
     * @type {array}
     */
    @api selectedRows = [];

    /**
     * If present, the row number column are shown in the first column.
     * @type {boolean}
     * @default false
     */
    @api showRowNumberColumn = false;

    @track _columns;
    @track _data;
    @track _expandedRows = [];

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

    set columns(value) {
        this._rawColumns = value;
        this._columns = normalizeColumns(value);
    }

    /**
     * Array of the columns object that's used to define the data types.
     * Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'.
     * See the Documentation tab for more information.
     * @type {array}
     */
    @api
    get columns() {
        return this._rawColumns;
    }

    set data(value) {
        this._rawData = value;
        this.flattenData();
    }

    /**
     * The array of data to be displayed.
     * @type {array}
     */
    @api
    // eslint-disable-next-line @lwc/lwc/valid-api
    get data() {
        return this._rawData;
    }

    /**
     * The array of unique row IDs for rows that are expanded.
     * @type {array}
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

    get normalizedColumns() {
        return this._columns;
    }

    get normalizedData() {
        return this._data;
    }

    // Methods

    /**
     * Returns data in each selected row.
     * @returns {array} An array of data in each selected row.
     */
    @api
    getSelectedRows() {
        return this.template
            .querySelector('lightning-datatable')
            .getSelectedRows();
    }

    /**
     * Returns an array of rows that are expanded.
     * @returns {array} The IDs for all rows that are marked as expanded
     */
    @api
    getCurrentExpandedRows() {
        return this.expandedRows;
    }

    /**
     * Expand all rows with children content
     */
    @api
    expandAll() {
        this.toggleAllRows(this.data, true);
    }

    /**
     * Collapse all rows
     */
    @api
    collapseAll() {
        this.toggleAllRows(this.data, false);
    }

    /**
     * Pass through for aria-label on lightning-datatable
     * @type {string}
     * @default ''
     */
    @api
    get ariaLabel() {
        return this._ariaLabel;
    }
    set ariaLabel(value) {
        this._ariaLabel = value;
    }

    // Event handlers

    handleToggle(event) {
        event.stopPropagation();
        const { name, nextState } = event.detail;
        // toggle row in user provided data
        this.toggleRow(this.data, name, nextState);
    }

    handleToggleAll(event) {
        event.stopPropagation();
        const { nextState } = event.detail;
        // toggle all rows in user provided data
        this.toggleAllRows(this.data, nextState);
    }

    handleRowSelection(event) {
        event.stopPropagation();
        // pass the event through
        this.fireSelectedRowsChange(event.detail);
    }

    handleHeaderAction(event) {
        event.stopPropagation();
        // pass the event through
        this.fireHeaderAction(event.detail);
    }

    handleRowAction(event) {
        event.stopPropagation();
        // pass the event through
        this.fireRowAction(event.detail);
    }

    // Events

    // fires when a row is toggled and its expanded state changes
    fireRowToggleChange(name, isExpanded, hasChildrenContent, row) {
        const event = new CustomEvent('toggle', {
            detail: { name, isExpanded, hasChildrenContent, row }
        });
        this.dispatchEvent(event);
    }

    // fires when all rows are toggled
    fireToggleAllChange(isExpanded) {
        const event = new CustomEvent('toggleall', {
            detail: { isExpanded }
        });
        this.dispatchEvent(event);
    }

    fireSelectedRowsChange(eventDetails) {
        const event = new CustomEvent('rowselection', {
            detail: eventDetails
        });

        this.dispatchEvent(event);
    }

    fireHeaderAction(eventDetails) {
        const event = new CustomEvent('headeraction', {
            detail: eventDetails
        });

        this.dispatchEvent(event);
    }

    fireRowAction(eventDetails) {
        const event = new CustomEvent('rowaction', {
            detail: eventDetails
        });

        this.dispatchEvent(event);
    }

    // Utility methods

    //
    flattenData() {
        // only flatten data if we have a key field defined
        if (this.keyField) {
            this._data = normalizeData(
                this.data,
                this.expandedRows,
                this.keyField
            );
        }
    }

    // update the expandedRows value for a single row
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

    // does the provided row have a properly formatted _children key with content?
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
     * Toggle a single row, update flattened data, and fire the `toggle` event
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

                // fire the collapseChange event
                this.fireRowToggleChange(
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

    // toggle all rows
    _toggleAllRecursionCounter = 1;

    /**
     * Toggle all rows, update flattened data, and fire the `toggleall` event
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

            // fire the toggleAllChange event
            this.fireToggleAllChange(isExpanded);

            // update the data
            this.flattenData();
        }
    }
}
