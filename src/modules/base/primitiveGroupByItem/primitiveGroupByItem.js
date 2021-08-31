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
    @api columns;
    @api keyField;
    @api defaultSortDirection;
    @api draftValues;
    @api enableInfiniteLoading;
    @api errors;
    @api hideCheckboxColumn;
    @api hideCollapsibleIcon;
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
    @api showRowNumberColumn;
    @api sortedBy;
    @api sortedDirection;
    @api tableWidth;
    @api wrapTextMaxLines;

    _records;
    _selectedRows;

    @api
    get records() {
        return this._records;
    }
    set records(value) {
        this._records = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    @api
    get selectedRows() {
        return this._selectedRows;
    }
    set selectedRows(value) {
        this._selectedRows = JSON.parse(JSON.stringify(normalizeArray(value)));
    }

    guid = generateUUID();

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

        // Those two events makes sure the row selection and the changes on the table are saved whem we open and close the collapsible group.
        this.addEventListener('rowselection', () => {
            const selectedRowsArray = [];
            this.primitiveGroupByDatatables.forEach((datatable) => {
                selectedRowsArray.push(datatable.selectedRows);
            });
            this._selectedRows = selectedRowsArray.flat();
        });

        this.addEventListener('cellchange', (event) => {
            const draftValuesArray = [];
            draftValuesArray.push(event.detail.draftValues);

            this.primitiveGroupByDatatables.forEach((datatable) => {
                draftValuesArray.push(datatable.draftValues);
            });

            this.dispatchEvent(
                new CustomEvent('cellchangegroupby', {
                    detail: draftValuesArray.flat(),
                    bubbles: true,
                    composed: true
                })
            );
        });
    }

    // Store the parent's callback so we can invoke later
    registerDisconnectCallback(callback) {
        this.disconnectFromParent = callback;
    }

    /**
     * Returns the records attribute.
     *
     * @type {Array}
     */
    get groupByRecords() {
        return this.records;
    }

    /**
     * Returns all the primitive-group-by-item.
     *
     * @type {Element}
     */
    get primitiveItems() {
        return this.template.querySelectorAll('c-primitive-group-by-item');
    }

    /**
     * Returns all the primitive grouped datatables.
     *
     * @type {Array.<nodeList>}
     */
    get primitiveGroupByDatatables() {
        return this.template.querySelectorAll(
            'c-primitive-datatable[data-role="grouped"]'
        );
    }

    /**
     * Verifies if one of the column is editable or not.
     *
     * @type {boolean}
     */
    get columnsEditable() {
        let columnsEditable = [];
        columnsEditable = this.columns.map((column) => {
            return column.editable;
        });
        return columnsEditable.filter(Boolean).length > 0;
    }

    /**
     * Returns true if on column is editable or showRowNumberColumn is true.
     *
     * @type {boolean}
     */
    get showRowNumberColumnOrEditable() {
        return this.showRowNumberColumn || this.columnsEditable;
    }

    /**
     * Dispatches event from the lighnting-datatable.
     *
     * @param {event} event
     */
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

    /**
     * Select every rows of each primitive-grouped-datatables.
     *
     * @param {event} event
     */
    @api
    selectAll(event) {
        if (this.primitiveGroupByDatatables) {
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

    /**
     * Deselect every rows of each primitive-grouped-datatables.
     *
     * @param {event} event
     */
    @api
    deselectAll(event) {
        if (this.primitiveGroupByDatatables) {
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

    /**
     * Resize the resized column of each primitive-grouped-datatables.
     *
     * @param {event} event
     */
    @api
    resizeAll(event) {
        if (this.primitiveGroupByDatatables) {
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

    /**
     * Save the draft values of each primitive-grouped-datatables.
     *
     * @param {event} event
     */
    @api
    saveAll(event) {
        if (this.primitiveGroupByDatatables) {
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

    /**
     * Delete the draft values of each primitive-grouped-datatables.
     *
     * @param {event} event
     */
    @api
    cancelAll(event) {
        if (this.primitiveGroupByDatatables) {
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
