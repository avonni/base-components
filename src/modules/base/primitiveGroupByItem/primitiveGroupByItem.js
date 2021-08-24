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
        this._groupBy = JSON.parse(JSON.stringify(value));
        this.recursiveGroupByNoUndefined(this.records, this._groupBy, 0);
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
    _hideUndefinedGroup = false;

    renderedCallback() {
        console.log(
            this.recursiveGroupByNoUndefined(this.records, this._groupBy, 0)
        );
    }

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

    countPerObject(records, key, value, undefinedGroup) {
        if (value === 'undefined') {
            return undefinedGroup;
        }
        return records.reduce((accumulator, currentVal) => {
            if (currentVal[key] === value) {
                accumulator += 1;
            }
            return accumulator;
        }, 0);
    }

    recursiveGroupBy(records, groupBy, level) {
        let field = groupBy[0];
        if (!field) return records;
        let recursiveData = Object.values(
            records.reduce((obj, current) => {
                if (!obj[current[field]])
                    obj[current[field]] = {
                        label: this.isUndefined(current[field]),
                        group: [],
                        multiLevelGroupBy: groupBy.length !== 1,
                        level: level
                    };
                obj[current[field]].group.push(current);
                return obj;
            }, {})
        );

        if (groupBy.length) {
            recursiveData.forEach((obj) => {
                obj.size = obj.group.length;
                obj.group = this.recursiveGroupBy(
                    obj.group,
                    groupBy.slice(1),
                    level + 1
                );
            });
        }
        return recursiveData;
    }

    recursiveGroupByNoUndefined(records, groupBy, level) {
        let field = groupBy[0];
        if (!field) return records;
        let recursiveData = Object.values(
            records.reduce((obj, current) => {
                if (!obj[current[field]])
                    obj[current[field]] = {
                        label: this.isUndefined(current[field]),
                        group: [],
                        multiLevelGroupBy: groupBy.length !== 1,
                        level: level
                    };
                obj[current[field]].group.push(current);
                return obj;
            }, {})
        );

        if (groupBy.length) {
            recursiveData.forEach((obj) => {
                obj.size = obj.group.length;
                obj.group = this.recursiveGroupByNoUndefined(
                    obj.group,
                    groupBy.slice(1),
                    level + 1
                );
            });
        }
        return this.removeUndefined(recursiveData);
    }

    isUndefined(value) {
        return value === undefined ? 'undefined' : value;
    }

    removeUndefinedRow(result) {
        if (result.label !== 'undefined') {
            return result;
        }
        return undefined;
    }

    removeUndefined(formattedResult) {
        const noUndefinedResult = [];
        formattedResult.forEach((result) => {
            if (result.label === 'undefined') {
                noUndefinedResult.push();
            } else {
                noUndefinedResult.push(result);
            }
        });
        return noUndefinedResult;
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
        return this._hideUndefinedGroup
            ? this.recursiveGroupByNoUndefined(this._records, this._groupBy, 0)
            : this.recursiveGroupBy(this.records, this._groupBy, 0);
    }
}
