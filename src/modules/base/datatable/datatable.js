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
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';

import {
    hasValidSummarizeType,
    computeSummarizeArray
} from './summarizeFunctions';

import {
    recursiveGroupBy,
    recursiveGroupByNoUndefined
} from './groupByFunctions';

const WIDTHSMODE = {
    valid: ['fixed', 'auto'],
    default: 'fixed'
};

const SORTDIRECTION = {
    valid: ['asc', 'desc'],
    default: 'asc'
};

const DEFAULT_LOAD_MORE_OFFSET = 20;

const DEFAULT_MAX_COLUMN_WIDTH = 1000;

const DEFAULT_MIN_COLUMN_WIDTH = 50;

const DEFAULT_ROW_NUMBER_OFFSET = 0;

const DEFAULT_RESIZE_STEP = 10;
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
     * The current values per row that are provided during inline edit.
     * @public
     * @type {string[]}
     */
    @api draftValues;

    /**
     * Specifies an object containing information about cell level, row level, and table level errors.
     * When it's set, error messages are displayed on the table accordingly.
     * @public
     * @type {object}
     */
    @api errors;

    /**
     * Associates each row with a unique ID.
     * @public
     * @type {string}
     * @required
     */
    @api keyField;

    /**
     * The maximum number of rows that can be selected.
     * Checkboxes are used for selection by default,
     * and radio buttons are used when maxRowSelection is 1.
     * @public
     * @type {number}
     */
    @api maxRowSelection;

    /**
     * Reserved for internal use.
     * Enables and configures advanced rendering modes.
     * @public
     * @type {RenderManagerConfig}
     */
    @api renderConfig;

    /**
     * Enables programmatic row selection with a list of key-field values.
     * @public
     * @type {string[]}
     */
    @api selectedRows;

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
     * This value specifies the number of lines after which the
     * content will be cut off and hidden. It must be at least 1 or more.
     * The text in the last line is truncated and shown with an ellipsis.
     * @public
     * @type {integer}
     */
    @api wrapTextMaxLines;

    _columns;
    _columnWidthsMode;
    _defaultSortDirection;
    _enableInfiniteLoading = false;
    _records;
    _groupBy;
    _hideUndefinedGroup;
    _hideCollapsibleIcon;
    _hideCheckboxColumn = false;
    _hideTableHeader = false;
    _isLoading = false;
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _maxColumnWidth = DEFAULT_MAX_COLUMN_WIDTH;
    _minColumnWidth = DEFAULT_MIN_COLUMN_WIDTH;
    _resizeColumnDisabled = false;
    _resizeStep = DEFAULT_RESIZE_STEP;
    _rowNumberOffset = DEFAULT_ROW_NUMBER_OFFSET;
    _showRowNumberColumn = false;
    _suppressBottomBar = false;
    _showStatusBar = false;
    _hasDraftValues = false;

    columnsWidth = [];
    _isDatatableEditable;

    privateChildrenRecord = {};

    tableWidth;

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
            validValues: WIDTHSMODE.valid,
            fallbackValue: WIDTHSMODE.default
        });
    }

    /**
     * Specifies the default sorting direction on an unsorted column.
     * Valid options include 'asc' and 'desc'.
     * The default is 'asc' for sorting in ascending order.
     * @public
     * @type {string}
     * @default asc
     */
    @api
    get defaultSortDirection() {
        return this._defaultSortDirection;
    }

    set defaultSortDirection(value) {
        this._defaultSortDirection = normalizeString(value, {
            validValues: SORTDIRECTION.valid,
            fallbackValue: SORTDIRECTION.default
        });
    }

    /**
     * If present, you can load a subset of data and then display more
     * when users scroll to the end of the table.
     * Use with the onloadmore event handler to retrieve more data.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }

    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = normalizeBoolean(value);
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
     * If present, a spinner is shown to indicate that more data is loading.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * Determines when to trigger infinite loading based on
     * how many pixels the table's scroll position is from the bottom of the table.
     * @public
     * @type {number}
     * @default 20
     */
    @api
    get loadMoreOffset() {
        return this._loadMoreOffset;
    }

    set loadMoreOffset(value) {
        this._loadMoreOffset =
            typeof value === 'number' ? value : DEFAULT_LOAD_MORE_OFFSET;
    }
    /**
     * The maximum width for all columns.
     * @public
     * @type {number}
     * @default 1000
     */
    @api
    get maxColumnWidth() {
        return this._maxColumnWidth;
    }

    set maxColumnWidth(value) {
        this._maxColumnWidth =
            typeof value === 'number' ? value : DEFAULT_MAX_COLUMN_WIDTH;
    }

    /**
     * The minimum width for all columns.
     * @public
     * @type {number}
     * @default 50
     */
    @api
    get minColumnWidth() {
        return this._minColumnWidth;
    }

    set minColumnWidth(value) {
        this._minColumnWidth =
            typeof value === 'number' ? value : DEFAULT_MIN_COLUMN_WIDTH;
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
     * @default 10
     */
    @api
    get resizeStep() {
        return this._resizeStep;
    }

    set resizeStep(value) {
        this._resizeStep =
            typeof value === 'number' ? value : DEFAULT_RESIZE_STEP;
    }

    /**
     * Determines where to start counting the row number.
     * @public
     * @type {number}
     * @default 0
     */
    @api
    get rowNumberOffset() {
        return this._rowNumberOffset;
    }

    set rowNumberOffset(value) {
        this._rowNumberOffset =
            typeof value === 'number' ? value : DEFAULT_ROW_NUMBER_OFFSET;
    }

    /**
     * The array of data to be displayed. The objects keys depend on the columns fieldNames.
     * @public
     * @type {array}
     */
    @api
    get records() {
        return this._records;
    }

    set records(value) {
        this._records = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    /**
     * If present, the row numbers are shown in the first column.
     * If a column is editable, the row number column will be automatically displayed.
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
     * If present, the footer that displays the Save and Cancel buttons is hidden during inline editing.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get suppressBottomBar() {
        return this._suppressBottomBar;
    }

    set suppressBottomBar(value) {
        this._suppressBottomBar = normalizeBoolean(value);
    }

    /**
     * If present, the value will define how the data will be grouped.
     * @public
     * @type {string}
     */
    @api
    get groupBy() {
        return this._groupBy;
    }

    set groupBy(value) {
        this._groupBy = value;
        if (this._groupBy) {
            this.removeDefaultActions();
        }
    }

    /**
     * In case of group-by, if present, hides undefined groups.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideUndefinedGroup() {
        return this._hideUndefinedGroup;
    }
    set hideUndefinedGroup(value) {
        this._hideUndefinedGroup = normalizeBoolean(value);
    }

    /**
     * In case of group-by, if present, the section is not collapsible and the left icon is hidden.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideCollapsibleIcon() {
        return this._hideCollapsibleIcon;
    }
    set hideCollapsibleIcon(value) {
        this._hideCollapsibleIcon = normalizeBoolean(value);
    }

    connectedCallback() {
        this.addEventListener('cellchange', () => {
            this._showStatusBar = true;
            this._hasDraftValues = true;
        });

        this.addEventListener('resize', (event) => {
            this._columnsWidth = event.detail.columnWidths;
            this.updateTableWidth();
            this.datatableColumnsWidth();
        });

        window.addEventListener('resize', () => {
            if (this.allowSummarize) {
                this.updateTableWidth();
                this.datatableColumnsWidth();
            }
        });
    }

    renderedCallback() {
        this.primitiveDraftValues();
        this.updateTableWidth();
        if (!this.rendered) {
            this.datatableEditable();
        }
        this.rendered = true;
    }

    /**
     * Handle the event to notify the parent of the child component.
     * A globally unique Id is required for the parent component to work with its child components.
     *
     * @param {event} event
     */
    handleChildRegister(event) {
        const item = event.detail;

        const guid = item.guid;

        this.privateChildrenRecord[guid] = item;

        this.addEventListener('selectallrows', (selectEvent) => {
            this.privateChildrenRecord[guid].callbacks.selectAll(selectEvent);
        });

        this.addEventListener('deselectallrows', (deselectEvent) => {
            this.privateChildrenRecord[guid].callbacks.deselectAll(
                deselectEvent
            );
        });

        this.addEventListener('resizecol', (resizeEvent) => {
            this.privateChildrenRecord[guid].callbacks.resizeAll(resizeEvent);
        });

        this.addEventListener('statusbarcancel', (cancelEvent) => {
            this.privateChildrenRecord[guid].callbacks.cancelAll(cancelEvent);
        });

        this.addEventListener('statusbarsave', (saveEvent) => {
            this.privateChildrenRecord[guid].callbacks.saveAll(saveEvent);
        });

        // Add a callback that
        // notifies the parent when child is unregistered
        item.callbacks.registerDisconnectCallback(this.handleChildUnregister);
    }

    /**
     * Handle the event to notify the parent that the child is no longer available.
     *
     * @param {event} event
     */
    handleChildUnregister(event) {
        const item = event.detail;
        const guid = item.guid;

        this.privateChildrenRecord[guid] = undefined;
    }

    /**
     * Returns the primitive ungrouped datatable.
     *
     * @type {element}
     */
    get ungroupedDatatable() {
        return this.template.querySelector(
            'c-primitive-datatable[data-role="ungrouped"]'
        );
    }

    /**
     * Returns the primitive header datatable if there is a group-by.
     *
     * @type {element}
     */
    get headerDatatable() {
        return this.template.querySelector(
            'c-primitive-datatable[data-role="header"]'
        );
    }

    /**
     * Returns the columns width for the primitive summarization table.
     *
     * @type {array}
     */
    get primitiveColumnsWidth() {
        let columnsWidths = [];
        if (this.hasGroupBy) {
            if (this.headerDatatable) {
                columnsWidths = this.headerDatatable.columnsWidthCalculation();
            }
        } else {
            if (this.ungroupedDatatable) {
                columnsWidths = this.ungroupedDatatable.columnsWidthCalculation();
            }
        }
        return columnsWidths;
    }

    /**
     * Checks if there is a group-by.
     *
     * @type {boolean}
     */
    get hasGroupBy() {
        return (
            this.groupBy !== undefined &&
            this.groupBy !== null &&
            this.groupBy !== ''
        );
    }

    /**
     * Returns the computed summarize array use in the markup.
     *
     * @type {object}
     */
    get computedSummarizeArray() {
        return computeSummarizeArray(this._columns, this._records);
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
     * Checks if one of the columns has a valid summarizeType.
     *
     * @type {boolean}
     */
    get allowSummarize() {
        return hasValidSummarizeType(this.computedSummarizeArray);
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
    get ungroupedDatatableDraftValues() {
        return this.ungroupedDatatable.primitiveDatatableDraftValues();
    }

    /**
     * Returns an array of formatted objects for primitive-group-by-item.
     *
     * @type {object}
     */
    get groupByRecords() {
        return this._hideUndefinedGroup
            ? recursiveGroupByNoUndefined(
                  this._records,
                  this._groupBy,
                  0,
                  this.rowNumberOffset
              )
            : recursiveGroupBy(
                  this.records,
                  this._groupBy,
                  0,
                  this.rowNumberOffset
              );
    }

    /**
     * Gets the columns width of the primitive-datatable depending on if there is a header or not.
     */
    datatableColumnsWidth() {
        this._columnsWidth = !this.hasGroupBy
            ? this.ungroupedDatatable.columnsWidthCalculation()
            : this.headerDatatable.columnsWidthCalculation();
    }

    /**
     * Checks if there is a column editable in the datatable.
     */
    datatableEditable() {
        this._isDatatableEditable = this.hasGroupBy
            ? this.headerDatatable.isDatatableEditable()
            : this.ungroupedDatatable.isDatatableEditable();
    }

    /**
     * Verify if there is draft values (modified values).
     */
    primitiveDraftValues() {
        if (!this.hasGroupBy) {
            this._hasDraftValues = this.ungroupedDatatableDraftValues.length;
            this._showStatusBar = this._hasDraftValues ? true : false;
        }
    }

    /**
     * Updates the table width base on the width of the primitive datatable on initialization and on resize.
     */
    updateTableWidth() {
        this.tableWidth = !this.hasGroupBy
            ? this.ungroupedDatatable.tableWidth()
            : this.headerDatatable.tableWidth();
    }

    /**
     * Sets the wrapText to false and hideDefaultActions attributes to true when there is a group-by.
     */
    removeDefaultActions() {
        this.columns.forEach((column) => {
            column.wrapText = false;
            column.hideDefaultActions = true;
        });
    }

    /**
     * Dispatches events from the primitive-datatable.
     *
     * @param {event} event
     */
    handleDispatchEvents(event) {
        event.stopPropagation();
        /**
         * The event fired when a header action is selected, such as text wrapping, text clipping, or a custom header action.
         *
         * @event
         * @name headeraction
         * @param {object} action The action definition described in the “Actions” table.
         * @param {object} columnDefinition The column definition specified in the columns property,
         * for example, the key-value pairs for label, fieldName, type, typeAttributes, and wrapText.
         * @public
         */
        /**
         * The event fired when you scroll to the bottom of the table to load more data, until there are no more data to load.
         *
         * @event
         * @name loadmore
         * @param {boolean} enableInfiniteLoading Specifies whether infinite loading is available on the table.
         * @param {boolean} isLoading Specifies that data is loading and displays a spinner on the table.
         * @param {boolean} loadMoreOffset The number of pixels between the bottom of the table and the current scroll position,
         * used to trigger more data loading.
         * @public
         */
        /**
         * The event fired when the a table column is resized.
         *
         * @event
         * @name resize
         * @param {object} columnsWidth The width of all columns, in pixels. For example,
         * a table with 5 columns of 205px width each at initial render returns [205, 205, 205, 205, 205].
         * @param {boolean} isUserTriggered Specifies whether the column resize is caused by a user action.
         * @public
         */
        /**
         * The event fired when the row is selected.
         *
         * @event
         * @name rowselection
         * @param {object} selectedRows The data in the rows that are selected.
         * @public
         */
        /**
         * The event fired when a column is sorted.
         *
         * @event
         * @name sort
         * @param {string} fieldName The fieldName that controls the sorting.
         * @param {string} sortedDirection The sorting direction. Valid options include 'asc' and 'desc'.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent(`${event.type}`, {
                detail: event.detail,
                bubbles: event.bubbles,
                composed: event.composed,
                cancelable: event.cancelable
            })
        );
    }

    /**
     * Calls the cancel method of the primitive datatable.
     *
     * @param {event} event
     */
    handleCancel(event) {
        this._showStatusBar = false;
        /**
         * The event fired when data is saved during inline editing.
         *
         * @event
         * @name cancel
         * @public
         * @cancelable
         */
        if (!this.hasGroupBy) {
            this.ungroupedDatatable.cancel(event);
        }

        this.dispatchEvent(new CustomEvent('statusbarcancel'));
    }

    /**
     * Calls the save method of the primitive datatable.
     *
     * @param {event} event
     */
    handleSave(event) {
        /**
         * The event fired when data is saved during inline editing.
         *
         * @event
         * @name save
         * @param {object} draftValues The current value that's provided during inline editing.
         * @public
         */
        if (!this.hasGroupBy) {
            this.ungroupedDatatable.save(event);
        }

        this.dispatchEvent(new CustomEvent('statusbarsave'));
    }
}
