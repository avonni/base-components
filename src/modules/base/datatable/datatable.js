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
    count,
    countUnique,
    sum,
    average,
    median,
    max,
    min,
    mode
} from './summarizeFunctions';
import { normalizeArray } from 'c/utilsPrivate';

const SUMMARIZATIONS = [
    'count',
    'countUnique',
    'sum',
    'average',
    'median',
    'min',
    'max',
    'mode'
];

export default class PrimitiveDatatable extends LightningElement {
    @api columnWidthsMode;
    _columns;
    // eslint-disable-next-line @lwc/lwc/valid-api
    @api data;
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

    showStatusBar = false;
    rendered = false;

    _columnsWidth = [];
    _columnsEditable = [];

    _currencyArray = [];
    _numberArray = [];
    _percentArray = [];

    _countArray = [];
    _sumArray = [];
    _countUniqueArray = [];
    _averageArray = [];
    _medianArray = [];
    _maxArray = [];
    _minArray = [];
    _modeArray = [];

    @api
    get columns() {
        return this._columns;
    }

    set columns(value) {
        this._columns = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    connectedCallback() {
        this.addEventListener('cellchange', () => {
            this.showStatusBar = true;
        });

        this.addEventListener('resize', (event) => {
            this._columnsWidth = event.detail.columnWidths;
            this.updateColumnStyleResize();
            this.updateTableWidth();
            this.updateBottomBarWidth();
        });
    }

    renderedCallback() {
        this._data = JSON.parse(JSON.stringify(normalizeArray(this.data)));
        this.tableInitialization();

        if (!this.rendered) {
            this.computeSummarizationCurrency();
            this.computeSummarizationNumber();
            this.computeSummarizationPercent();
        }
        this.rendered = true;
    }

    get primitiveDatatable() {
        return this.template.querySelector('c-primitive-datatable');
    }

    get columnsTD() {
        return this.template.querySelectorAll('td');
    }

    tableInitialization() {
        this.getDatatableEditable();
        this.getDatatableColumnsWidth();
        this.updateColumnStyle();
        this.updateTableWidth();
        this.updateBottomBarWidth();
    }

    getDatatableColumnsWidth() {
        this._columnsWidth = JSON.parse(
            JSON.stringify(this.primitiveDatatable.columnsWidth())
        );
    }

    getDatatableEditable() {
        this._columnsEditable = this.primitiveDatatable.columnsEditable();
    }

    updateColumnStyle() {
        this.columnsTD.forEach((column, index) => {
            column.style.width = `${this._columnsWidth[index]}px`;
            if (this._columnsEditable[index - 1]) {
                column.style.paddingRight = '35px';
            }
        });
    }

    updateColumnStyleResize() {
        // on resize, it doesn't take in consideration the first column which is always 52 px.
        this._columnsWidth.unshift(52);
        this.columnsTD.forEach((column, index) => {
            column.style.width = `${this._columnsWidth[index]}px`;
            // if column is editable, there is a button-icon which is 35 px but not on the first column.
            if (this._columnsEditable[index - 1]) {
                column.style.paddingRight = '35px';
            }
        });
    }

    updateTableWidth() {
        this._tableWidth = JSON.parse(
            JSON.stringify(this.primitiveDatatable.tableWidth())
        );
        const table = this.template.querySelector('table');
        if (table) {
            table.style.width = `${this._tableWidth}px`;
        }
    }

    updateBottomBarWidth() {
        if (this.showStatusBar) {
            const bottomBar = this.template.querySelector(
                '.avonni-datatable-bottom-bar'
            );
            const container = this.template.querySelector(
                '.avonni-datatable-container'
            );
            const containerWidth = container.offsetWidth;

            if (this._tableWidth < containerWidth) {
                bottomBar.style.width = `${this._tableWidth}px`;
            } else if (this._tableWidth > containerWidth) {
                bottomBar.style.width = `${containerWidth}px`;
            }
        }
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
        this.showStatusBar = false;
        this.primitiveDatatable.cancel(event);
    }

    handleSave(event) {
        this.primitiveDatatable.save(event);
    }

    computeSummarization(type, array) {
        if (this.columns && this._data) {
            this.columns.forEach((column) => {
                const summarizeType = column.summarizeTypes;
                const fieldName = column.fieldName;
                if (
                    type.includes(column.type) &&
                    SUMMARIZATIONS.some((i) => summarizeType.includes(i))
                ) {
                    this._data.forEach((row) => {
                        const value = row[fieldName];
                        row[fieldName] = {
                            value: value
                        };
                        array.push(value);
                    });
                    this.summarizations(array, summarizeType, fieldName);
                }
            });
        }
    }

    computeSummarizationCurrency() {
        this.computeSummarization('currency', this._currencyArray);
    }

    computeSummarizationNumber() {
        this.computeSummarization('number', this._numberArray);
    }

    computeSummarizationPercent() {
        this.computeSummarization('percent', this._percentArray);
    }

    summarizations(array, summarizeType, fieldName) {
        if (summarizeType.includes('count')) {
            this._countArray.push({ [fieldName]: count(array) });
        }
        if (summarizeType.includes('countUnique')) {
            this._countUniqueArray.push({
                [fieldName]: countUnique(array, count(array))
            });
        }
        if (summarizeType.includes('sum')) {
            this._sumArray.push({ [fieldName]: sum(array) });
        }
        if (summarizeType.includes('average')) {
            this._averageArray.push({ [fieldName]: average(array) });
        }
        if (summarizeType.includes('median')) {
            this._medianArray.push({ [fieldName]: median(array) });
        }
        if (summarizeType.includes('max')) {
            this._maxArray.push({ [fieldName]: max(array) });
        }
        if (summarizeType.includes('min')) {
            this._minArray.push({ [fieldName]: min(array) });
        }
        if (summarizeType.includes('mode')) {
            this._modeArray.push({ [fieldName]: mode(array) });
        }
    }
}
