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

export default class PrivateSummarizationTable extends LightningElement {
    /**
     * Checks if one of the columns is editable or if none but showRowNumberColumn is true.
     *
     * @type {boolean}
     */
    @api isDatatableEditable;

    /**
     * If present, the checkbox column for row selection is hidden.
     *
     * @type {boolean}
     */
    @api hideCheckboxColumn;

    /**
     * Computed summarize array with summarization for the table.
     *
     * @type {array}
     */
    @api computedSummarizeArray;

    /**
     * Returns table width of the main datatable to set the width of the summarization table.
     *
     * @type {number}
     */
    @api tableWidth;

    _columnsEditable;
    _primitiveColumnsWidth;

    /**
     * Returns the columns width of the main datatable from the primitive summarization table.
     *
     * @type {array}
     */
    @api
    get primitiveColumnsWidth() {
        return this._primitiveColumnsWidth;
    }

    set primitiveColumnsWidth(value) {
        this._primitiveColumnsWidth = JSON.parse(
            JSON.stringify(normalizeArray(value))
        );
    }

    /**
     * Returns the columns width of the main datatable from the primitive summarization table.
     *
     * @type {array}
     */
    @api
    get columnsEditable() {
        return this._columnsEditable;
    }

    set columnsEditable(value) {
        this._columnsEditable = JSON.parse(
            JSON.stringify(normalizeArray(value))
        );
    }

    renderedCallback() {
        this.updateColumnStyling();
        this.updateTableWidth();
    }

    /**
     * Updates the column size and padding depending on the columns width of the primitive datatable and depending on if
     * the columns are editable.
     */
    updateColumnStyling() {
        const rows = Array.from(this.template.querySelectorAll('tr'));
        rows.forEach((row) => {
            const dataCell = Array.from(row.querySelectorAll('td'));
            dataCell.forEach((cell, index) => {
                // if column is editable, there is a button-icon which is 35 px but not on the first column.
                cell.style.maxWidth = `${this._primitiveColumnsWidth[index]}px`;
                cell.style.minWidth = `${this._primitiveColumnsWidth[index]}px`;
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
     * Updates the table width base on the width of the primitive datatable on initialization and on resize.
     */
    updateTableWidth() {
        const table = this.template.querySelector('table');
        if (table) {
            table.style.width = `${this.tableWidth}px`;
        }
    }
}
