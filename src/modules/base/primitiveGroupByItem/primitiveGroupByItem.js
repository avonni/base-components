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

import { LightningElement, api } from 'lwc';
import { normalizeArray, normalizeBoolean } from 'c/utilsPrivate';
// import { computeSummarizeArray } from '../datatable/summarizeFunctions';

export default class ProgressGroupByItem extends LightningElement {
    @api columns;
    @api keyField;
    @api defaultSortDirection;
    @api draftValues;
    @api enableInfiniteLoading;
    @api errors;
    @api hideCheckboxColumn;
    @api hideTableHeader;
    @api isLoading;
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
    @api wrapTextMaxLines;

    @api
    get groupBy() {
        return this._groupBy;
    }
    set groupBy(value) {
        this._groupBy = JSON.parse(JSON.stringify(normalizeArray(value)));
        this.multiLevelGroupByRecords(this.records, this.groupBy);
    }

    @api
    get records() {
        return this._records;
    }
    set records(value) {
        this._records = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    @api
    get hideUndefinedGroup() {
        return this._hideUndefinedGroup;
    }
    set hideUndefinedGroup(value) {
        this._hideUndefinedGroup = normalizeBoolean(value);
    }

    _records = [];
    _groupBy = [];

    _groupedByRecords = [];
    formattedGroupedRecords = [];
    formattedResult = [];

    @api
    primitiveGroupedDatatables() {
        return this.template.querySelectorAll(
            'c-primitive-datatable[data-role="grouped"]'
        );
    }

    @api
    primitiveGroupedDatatable() {
        return this.template.querySelector(
            'c-primitive-datatable[data-role="grouped"]'
        );
    }

    groupByRecords(array, fieldName) {
        this._groupedByRecords = array.reduce((previous, currentItem) => {
            const group = currentItem[fieldName];
            if (!previous[group]) previous[group] = [];
            previous[group].push(currentItem);
            return previous;
        }, []);
        Object.keys(this._groupedByRecords).forEach((key) => {
            this.formattedGroupedRecords.push({
                label: key,
                records: this._groupedByRecords[key],
                size: this._groupedByRecords[key].length
            });
        });
    }

    multiLevelGroupByRecords(records, fieldNames) {
        // if there is only one groupBy and as a string, we convert it to an array.
        if (typeof fieldNames === 'string') {
            fieldNames = fieldNames.split();
        }
        const groupBy = fieldNames.length > 1;
        const multiLevelGroupBy = fieldNames.length > 2;
        const level = 0;
        const result = [];
        const temp = { _: result };
        records.forEach((a) => {
            fieldNames
                .reduce((r, k) => {
                    if (!r[a[k]]) {
                        r[a[k]] = { _: [] };
                        r._.push({ [a[k]]: { [a[k]]: r[a[k]]._ } });
                    }
                    return r[a[k]];
                }, temp)
                ._.push(a);
        });
        result.forEach((res) => {
            Object.keys(res).forEach((key) => {
                this.formattedResult.push({
                    label: key,
                    level: level,
                    data: Object.values(res[key]).flat(),
                    size: Object.values(res[key]).flat().length,
                    multiLevelGroupBy: groupBy,
                    group: this.result(
                        Object.values(res[key]).flat(),
                        level,
                        multiLevelGroupBy
                    )
                });
            });
        });
        console.log(this.formattedResult);
        return this.formattedResult;
    }

    result(results, level, multiLevelGroupBy) {
        const formattedResult = [];
        results.forEach((res) => {
            Object.keys(res).forEach((key) => {
                if (!multiLevelGroupBy) {
                    formattedResult.push({
                        label: key,
                        level: level + 1,
                        data: Object.values(res[key]).flat(),
                        size: Object.values(res[key]).flat().length,
                        multiLevelGroupBy: multiLevelGroupBy
                    });
                } else if (multiLevelGroupBy) {
                    formattedResult.push({
                        label: key,
                        level: level + 1,
                        data: Object.values(res[key]).flat(),
                        size: Object.values(res[key]).flat().length,
                        group: this.thirdLevel(
                            Object.values(res[key]).flat(),
                            level + 1
                        ),
                        multiLevelGroupBy: multiLevelGroupBy
                    });
                }
            });
        });
        return formattedResult;
    }

    thirdLevel(results, level) {
        const formattedResult = [];
        results.forEach((res) => {
            Object.keys(res).forEach((key) => {
                formattedResult.push({
                    label: key,
                    level: level + 1,
                    data: Object.values(res[key]).flat(),
                    size: Object.values(res[key]).flat().length
                });
            });
        });
        return formattedResult;
    }

    handleDispatchEvents(event) {
        this.dispatchEvent(
            new CustomEvent(`${event.type}`, {
                detail: event.detail,
                bubbles: event.bubbles,
                composed: event.composed,
                cancelable: event.cancelable
            })
        );
    }

    get hardData() {
        return this.formattedResult;
    }
}
