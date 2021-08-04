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

export default class PrimitiveDatatable extends LightningElement {
    @api columnWidthsMode;
    // eslint-disable-next-line @lwc/lwc/valid-api
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

    _columns;
    _data;
    _showStatusBar = false;

    _columnsWidth = [];
    _columnsEditable = [];
    _isDatatableEditable;

    _filteredDataValues = [];
    _computedSummarizeArray = [];

    @api
    get columns() {
        return this._columns;
    }

    set columns(value) {
        this._columns = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    /* eslint-disable */
    @api
    get data() {
        return this._data;
    }

    set data(value) {
        this._data = JSON.parse(JSON.stringify(normalizeArray(value)));
        this.computeFilteredDataValues();
        this.summarizeInitialization();
    }
    /* eslint-enable */

    connectedCallback() {
        this.addEventListener('cellchange', () => {
            this._showStatusBar = true;
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

    get columnsExample() {
        return this._computedSummarizeArray;
    }

    get primitiveDatatable() {
        return this.template.querySelector('c-primitive-datatable');
    }

    get isDatatableEditable() {
        return (
            this._isDatatableEditable ||
            (!this._isDatatableEditable && this.showRowNumberColumn)
        );
    }

    get isSummarizePresent() {
        const summarized = this._columns.map((column) => {
            return column.summarizeTypes ? true : false;
        });
        return summarized.includes(true);
    }

    get showStatusBar() {
        return this._showStatusBar && !this.suppressBottomBar;
    }

    bottomTableInitialization() {
        this.datatableColumnsWidth();
        this.updateColumnStyle();
        this.updateTableWidth();
    }

    tableResize() {
        this.updateColumnStyleResize();
        this.updateTableWidth();
    }

    datatableColumnsWidth() {
        this._columnsWidth = !this.hideTableHeader
            ? this.primitiveDatatable.columnsWidth()
            : this.primitiveDatatable.columnsWidthWithoutHeader();
    }

    datatableEditable() {
        this._columnsEditable = this.primitiveDatatable.columnsEditable();
        this._isDatatableEditable = this.primitiveDatatable.isDatatableEditable();
    }

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

    updateTableWidth() {
        this._tableWidth = this.primitiveDatatable.tableWidth();
        const table = this.template.querySelector('table');
        if (table) {
            table.style.width = `${this._tableWidth}px`;
        }
    }

    computeFilteredDataValues() {
        this._filteredDataValues = this._columns.map((column) => {
            const fieldName = column.fieldName;
            this._values = this._data.map((row) => {
                return row[fieldName];
            });
            return this._values.map(Number).filter(Number);
        });
    }

    summarizeInitialization() {
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
