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
import { normalizeArray } from 'c/utilsPrivate';
import { generateUUID } from 'c/utils';

export default class ProgressGroupByItem extends LightningElement {
    @api hideCollapsibleIcon;
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
    @api groupBy;

    @api
    get records() {
        return this._records;
    }
    set records(value) {
        this._records = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    guid = generateUUID();
    _records = [];

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

    connectedCallback() {
        const itemregister = new CustomEvent('privateitemregister', {
            bubbles: true,
            detail: {
                callbacks: {
                    registerDisconnectCallback: this.registerDisconnectCallback,
                    selectAll: this.selectAll.bind(this),
                    deselectAll: this.deselectAll.bind(this),
                    resizeAll: this.resizeAll.bind(this),
                    saveAll: this.saveAll.bind(this),
                    cancelAll: this.cancelAll.bind(this)
                },
                guid: this.guid
            }
        });

        this.dispatchEvent(itemregister);
    }

    // Store the parent's callback so we can invoke later
    registerDisconnectCallback(callback) {
        this.disconnectFromParent = callback;
    }

    @api
    primitiveGroupedDatatables() {
        return this.template.querySelectorAll(
            'c-primitive-datatable[data-role="grouped"]'
        );
    }

    get groupByRecords() {
        return this.records;
    }

    get primitiveItems() {
        return this.template.querySelectorAll('c-primitive-group-by-item');
    }

    get primitiveGroupByDatatables() {
        return this.template.querySelectorAll(
            'c-primitive-datatable[data-role="grouped"]'
        );
    }

    @api
    selectAll(event) {
        if (this.primitiveGroupByDatatables.length > 0) {
            this.primitiveGroupByDatatables.forEach((datatable) => {
                datatable.handleSelectionCellClick(event);
            });
        }
        if (this.primitiveItems) {
            this.primitiveItems.forEach((primitiveItem) => {
                primitiveItem.selectAll(event);
            });
        }
    }

    @api
    deselectAll(event) {
        if (this.primitiveGroupByDatatables.length > 0) {
            this.primitiveGroupByDatatables.forEach((datatable) => {
                datatable.handleSelectionCellClick(event);
            });
        }
        if (this.primitiveItems) {
            this.primitiveItems.forEach((primitiveItem) => {
                primitiveItem.deselectAll(event);
            });
        }
    }

    @api
    resizeAll(event) {
        if (this.primitiveGroupByDatatables.length > 0) {
            this.primitiveGroupByDatatables.forEach((datatable) => {
                datatable.handleResizeColumn(event);
            });
        }
        if (this.primitiveItems) {
            this.primitiveItems.forEach((primitiveItem) => {
                primitiveItem.resizeAll(event);
            });
        }
    }

    @api
    saveAll(event) {
        if (this.primitiveGroupByDatatables.length > 0) {
            this.primitiveGroupByDatatables.forEach((datatable) => {
                datatable.save(event);
            });
        }
        if (this.primitiveItems) {
            this.primitiveItems.forEach((primitiveItem) => {
                primitiveItem.saveAll(event);
            });
        }
    }

    @api
    cancelAll(event) {
        if (this.primitiveGroupByDatatables.length > 0) {
            this.primitiveGroupByDatatables.forEach((datatable) => {
                datatable.cancel(event);
            });
        }
        if (this.primitiveItems) {
            this.primitiveItems.forEach((primitiveItem) => {
                primitiveItem.cancelAll(event);
            });
        }
    }
}
