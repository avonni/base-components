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
    @api columns;
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
    _columnWidth;

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

    connectedCallback() {
        this.addEventListener('cellchange', () => {
            this.showStatusBar = true;
        });

        this.addEventListener('resize', (event) => {
            console.log(event.detail.columnWidths);
        });

        console.log('Currency', this._currencyArray);
        console.log('Number', this._numberArray);
        console.log('Percent', this._percentArray);
        console.log('Count', this._countArray);
        console.log('Count Unique', this._countUniqueArray);
        console.log('Sum', this._sumArray);
        console.log('Average', this._averageArray);
        console.log('Median', this._medianArray);
        console.log('Max', this._maxArray);
        console.log('Min', this._minArray);
        console.log('Mode', this._modeArray);
    }

    renderedCallback() {
        this._data = JSON.parse(JSON.stringify(normalizeArray(this.data)));

        if (!this.rendered) {
            this.computeSummarizationCurrency();
            this.computeSummarizationNumber();
            this.computeSummarizationPercent();
        }
        this.rendered = true;
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
        console.log(
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
        this.template.querySelector('c-primitive-datatable').cancel(event);
    }

    handleSave(event) {
        this.template.querySelector('c-primitive-datatable').save(event);
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
