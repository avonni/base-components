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
    @api isDatatableEditable;
    @api hideCheckboxColumn;
    @api computedSummarizeArray;
    @api hideTableHeader;
    @api hasGroupBy;

    _tableWidth;
    _columnsWidth;
    _columnsEditable;
    _noGroupByColumnsWidth;
    _headerColumnsWidth;

    connectedCallback() {
        window.addEventListener('resize', () => {
            this.updateTableWidth();
            this.updateColumnStyle();
        });
    }

    @api
    get tableWidth() {
        return this._tableWidth;
    }

    set tableWidth(value) {
        this._tableWidth = value;
    }

    @api
    get noGroupByColumnsWidth() {
        return this._noGroupByColumnsWidth;
    }

    set noGroupByColumnsWidth(value) {
        this._noGroupByColumnsWidth = JSON.parse(
            JSON.stringify(normalizeArray(value))
        );
    }

    @api
    get headerColumnsWidth() {
        return this._headerColumnsWidth;
    }

    set headerColumnsWidth(value) {
        this._headerColumnsWidth = JSON.parse(
            JSON.stringify(normalizeArray(value))
        );
    }

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
        this.updateColumnStyle();
        this.updateTableWidth();
    }

    get columnsWidth() {
        return this.hasGroupBy
            ? this._headerColumnsWidth
            : this._noGroupByColumnsWidth;
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
                cell.style.maxWidth = `${this.columnsWidth[index]}px`;
                cell.style.minWidth = `${this.columnsWidth[index]}px`;
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
