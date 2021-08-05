/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { api, LightningElement } from 'lwc';
import { normalizeArray } from 'c/utilsPrivate';

import { computeSummarizeObject } from './summarizeFunctions';

/**
 * Lightning datatable with custom cell types and extended functionalities.
 *
 * @class
 * @descriptor avonni-datatable
 * @storyId example-datatable--data-types-from-a-to-b
 * @public
 */
export default class Datatable extends LightningElement {
    /**
     * Specifies how column widths are calculated. Set to 'fixed' for columns with equal widths.
     * Set to 'auto' for column widths that are based on the width of the column content and the table width. The default is 'fixed'.
     * @public
     * @type {string}
     * @default fixed
     */
    @api columnWidthsMode;

    /**
     * Specifies the default sorting direction on an unsorted column.
     * Valid options include 'asc' and 'desc'.
     * The default is 'asc' for sorting in ascending order.
     * @public
     * @type {string}
     * @default asc
     */
    // eslint-disable-next-line @lwc/lwc/valid-api
    @api defaultSortDirection;

    /**
     * The current values per row that are provided during inline edit.
     * @public
     * @type {string[]}
     */
    @api draftValues;

    /**
     * If present, you can load a subset of data and then display more
     * when users scroll to the end of the table.
     * Use with the onloadmore event handler to retrieve more data.
     * @public
     * @type {boolean}
     * @default false
     */
    @api enableInfiniteLoading;

    /**
     * Specifies an object containing information about cell level, row level, and table level errors.
     * When it's set, error messages are displayed on the table accordingly.
     * @public
     * @type {object}
     */
    @api errors;

    /**
     * If present, the checkbox column for row selection is hidden.
     * @public
     * @type {boolean}
     * @default false
     */
    @api hideCheckboxColumn;

    /**
     * If present, the table header is hidden.
     * @public
     * @type {boolean}
     * @default false
     */
    @api hideTableHeader;

    /**
     * If present, a spinner is shown to indicate that more data is loading.
     * @public
     * @type {boolean}
     * @default false
     */
    @api isLoading;

    /**
     * Associates each row with a unique ID.
     * @public
     * @type {string}
     * @required
     */
    @api keyField;

    /**
     * Determines when to trigger infinite loading based on
     * how many pixels the table's scroll position is from the bottom of the table.
     * @public
     * @type {number}
     * @default 20
     */
    @api loadMoreOffset;

    /**
     * The maximum width for all columns.
     * @public
     * @type {number}
     * @default 1000px
     */
    @api maxColumnWidth;

    /**
     * The maximum number of rows that can be selected.
     * Checkboxes are used for selection by default,
     * and radio buttons are used when maxRowSelection is 1.
     * @public
     * @type {number}
     */
    @api maxRowSelection;

    /**
     * The minimum width for all columns.
     * @public
     * @type {number}
     * @default 50px
     */
    @api minColumnWidth;

    /**
     * Reserved for internal use.
     * Enables and configures advanced rendering modes.
     * @public
     * @type {RenderManagerConfig} value - config object for datatable rendering
     */
    @api renderConfig;

    /**
     * If present, column resizing is disabled.
     * @public
     * @type {boolean}
     * @default false
     */
    @api resizeColumnDisabled;

    /**
     * The width to resize the column when a user presses left or right arrow.
     * @public
     * @type {number}
     * @default 10px
     */
    @api resizeStep;

    /**
     * Determines where to start counting the row number.
     * @public
     * @type {number}
     * @default 0
     */
    @api rowNumberOffset;

    /**
     * Enables programmatic row selection with a list of key-field values.
     * @public
     * @type {string[]}
     */
    @api selectedRows;

    /**
     * If present, the row numbers are shown in the first column.
     * If a column is editable, the row number column will be automatically displayed.
     * @public
     * @type {boolean}
     * @default false
     */
    @api showRowNumberColumn;

    /**
     * The column fieldName that controls the sorting order.
     * Sort the data using the onsort event handler.
     * @public
     * @type {string}
     */
    @api sortedBy;

    /**
     * Specifies the sorting direction.
     * Sort the data using the onsort event handler.
     * Valid options include 'asc' and 'desc'.
     * @public
     * @type {string}
     */
    @api sortedDirection;

    /**
     * If present, the footer that displays the Save and Cancel buttons is hidden during inline editing.
     * @public
     * @type {boolean}
     * @default false
     */
    @api suppressBottomBar;

    /**
     * This value specifies the number of lines after which the
     * content will be cut off and hidden. It must be at least 1 or more.
     * The text in the last line is truncated and shown with an ellipsis.
     * @public
     * @type {integer}
     */
    @api wrapTextMaxLines;

    _columns;
    _data;
    _showStatusBar = false;
    _hasDraftValues = false;

    _columnsWidth = [];
    _columnsEditable = [];
    _isDatatableEditable;

    _filteredDataValues = [];
    _computedSummarizeArray = [];

    /**
     * Array of the columns object that's used to define the data types.
     * Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'.
     * See the Documentation tab for more information.
     * @public
     * @type {array}
     */
    @api
    get columns() {
        return this._columns;
    }

    set columns(value) {
        this._columns = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    /**
     * The array of data to be displayed. The objects keys depend on the columns fieldNames.
     * @public
     * @type {array}
     */
    /* eslint-disable */
    @api
    get data() {
        return this._data;
    }

    set data(value) {
        this._data = JSON.parse(JSON.stringify(normalizeArray(value)));
        this.computeFilteredDataValues();
        this.computeSummarizeArray();
    }
    /* eslint-enable */

    connectedCallback() {
        this.addEventListener('cellchange', () => {
            this._showStatusBar = true;
            this.updateData();
        });

        this.addEventListener('resize', (event) => {
            this._columnsWidth = event.detail.columnWidths;
            this.tableResize();
        });
    }

    renderedCallback() {
        this.bottomTableInitialization();
        this.datatableEditable();
    }

    /**
     * Returns the primitive datatable.
     *
     * @type {element}
     */
    get primitiveDatatable() {
        return this.template.querySelector('c-primitive-datatable');
    }

    /**
     * Returns the computed summarize array.
     *
     * @type {object}
     */
    get computedSummarizeArray() {
        return this._computedSummarizeArray;
    }

    /**
     * Checks if one of the columns is editable or if none but showRowNumberColumn is true.
     *
     * @type {boolean}
     */
    get isDatatableEditable() {
        return (
            this._isDatatableEditable ||
            (!this._isDatatableEditable && this.showRowNumberColumn)
        );
    }

    /**
     * Checks if one of the columns has a summarizeType.
     *
     * @type {boolean}
     */
    get isSummarizePresent() {
        const summarized = this._columns.map((column) => {
            return column.summarizeTypes ? true : false;
        });
        return summarized.includes(true);
    }

    /**
     * Checks we need to show the status bar. If there is draft values and suppressBottomBar is false.
     *
     * @type {boolean}
     */
    get showStatusBar() {
        return (
            this._showStatusBar &&
            this._hasDraftValues &&
            !this.suppressBottomBar
        );
    }

    /**
     * Gets the draft values from the primitive datatable.
     *
     * @type {object}
     */
    get primitiveDatatableDraftValues() {
        return this.primitiveDatatable.primitiveDatatableDraftValues();
    }

    updateData() {
        this.primitiveDatatableDraftValues.forEach((value) => {
            let draftId = value.id;
            let fieldName = Object.keys(value)[0];
            let draftValue = Object.values(value)[0];
            const changedRow = this._data.find(
                (row) => row.id === parseInt(draftId, 10)
            );
            changedRow[fieldName] = draftValue;
        });
    }

    /**
     * Initialization of the bottom datatable used for for summarize.
     */
    bottomTableInitialization() {
        this.datatableColumnsWidth();
        this.updateColumnStyle();
        this.updateTableWidth();
        this.primitiveDraftValues();
    }

    /**
     * Resize of the bottom datatable when the primitive-datatable is resized.
     */
    tableResize() {
        this.updateColumnStyleResize();
        this.updateTableWidth();
    }

    /**
     * Gets the columns width of the primitive datatable depending on if there is a header or not.
     */
    datatableColumnsWidth() {
        this._columnsWidth = !this.hideTableHeader
            ? this.primitiveDatatable.columnsWidth()
            : this.primitiveDatatable.columnsWidthWithoutHeader();
    }

    /**
     * Gets the columns the information about if they are editable or not.
     */
    datatableEditable() {
        this._columnsEditable = this.primitiveDatatable.columnsEditable();
        this._isDatatableEditable = this.primitiveDatatable.isDatatableEditable();
    }

    /**
     * Verify if there is draft values.
     */
    primitiveDraftValues() {
        this._hasDraftValues = this.primitiveDatatableDraftValues.length;
        this._showStatusBar = this._hasDraftValues ? true : false;
    }

    /**
     * Updates the column size and padding depending on the columns width of the primitive datatable and depending on if
     * the columns are editable.
     */
    updateColumnStyle() {
        const rows = Array.from(this.template.querySelectorAll('tr'));
        rows.forEach((row) => {
            const dataCell = Array.from(row.querySelectorAll('td'));
            dataCell.forEach((cell, index) => {
                // if column is editable, there is a button-icon which is 35 px but not on the first column.
                cell.style.minWidth = `${this._columnsWidth[index]}px`;
                cell.style.maxWidth = `${this._columnsWidth[index]}px`;
                if (!this.hideCheckboxColumn) {
                    if (this._columnsEditable[index - 2]) {
                        cell.style.paddingRight = '35px';
                    }
                } else {
                    if (this._columnsEditable[index - 1]) {
                        cell.style.paddingRight = '35px';
                    }
                }
            });
        });
    }

    /**
     * Calls the updateColumnStyle method on resize.
     */
    updateColumnStyleResize() {
        // on resize, it doesn't take in consideration the first column which is always 52 px.
        // and 32 px for the checkbox column
        if (this.isDatatableEditable) {
            if (!this.hideCheckboxColumn) {
                this._columnsWidth.unshift(52, 32);
            } else this._columnsWidth.unshift(52);
        } else {
            if (!this.hideCheckboxColumn && !this.hideTableHeader) {
                this._columnsWidth.unshift(32);
            }
        }
        this.updateColumnStyle();
    }

    /**
     * Updates the table width base on the width of the primitive datatable on initialization and on resize.
     */
    updateTableWidth() {
        this._tableWidth = this.primitiveDatatable.tableWidth();
        const table = this.template.querySelector('table');
        if (table) {
            table.style.width = `${this._tableWidth}px`;
        }
    }

    /**
     * Updates the table width base on the width of the primitive datatable on initialization and on resize.
     */
    computeFilteredDataValues() {
        this._filteredDataValues = this._columns.map((column) => {
            const fieldName = column.fieldName;
            this._values = this._data.map((row) => {
                return row[fieldName];
            });
            return this._values.map(Number).filter(Number);
        });
    }

    /**
     * Computes the summarizeArray to create the object used to display the summarize types.
     */
    computeSummarizeArray() {
        this._computedSummarizeArray = computeSummarizeObject(
            this._columns,
            this._filteredDataValues
        );
    }

    handleDispatchEvents(event) {
        event.stopPropagation();
        this.dispatchEvent(
            new CustomEvent(`${event.type}`, {
                detail: event.detail,
                bubbles: event.bubbles,
                composed: event.composed,
                cancelable: event.cancelable
            })
        );
    }

    handleCancel(event) {
        this._showStatusBar = false;
        this.primitiveDatatable.cancel(event);
    }

    handleSave(event) {
        this.primitiveDatatable.save(event);
    }
}
