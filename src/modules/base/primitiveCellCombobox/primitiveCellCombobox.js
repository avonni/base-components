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
import { normalizeBoolean } from 'c/utilsPrivate';

export default class PrimitiveCellCombobox extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownLength;
    @api isMultiSelect;
    @api label;
    @api options;
    @api placeholder;

    visible = false;
    editable = false;
    _value;
    _readOnly;

    connectedCallback() {
        this.template.addEventListener('changecomboboxfactory', (event) => {
            this.handleChange(event);
        });

        this.template.addEventListener('ieditfinishedcustom', () => {
            this.visible = false;
            this._readOnly = true;
        });

        this.dispatchEvent(
            new CustomEvent('getdatatablestateandrecord', {
                detail: {
                    callbacks: {
                        getState: this.getState.bind(this),
                        getColumns: this.getColumns.bind(this)
                    }
                },
                bubbles: true,
                composed: true
            })
        );
    }

    getState(state) {
        this.state = state;
    }

    getColumns(columns) {
        this.columns = columns;
        this.isEditable();
    }

    isEditable() {
        let combobox = {};
        combobox = this.columns.find((column) => column.type === 'combobox');
        this.editable = combobox.editable;
    }

    renderedCallback() {
        this.primitiveCellCombobox = this.template.querySelector(
            '[data-element-id^="primitive-cell-combobox-input"]'
        );
        if (this.primitiveCellCombobox) {
            this.primitiveCellCombobox.focus();
        }
    }

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        // When data is first set, the value is an object containing the editable state
        // When the cell is edited, only the value is sent back
        if (typeof value === 'object' && value.editable !== undefined) {
            this._readOnly = !value.editable;
            this._value = value.value;
        } else {
            this._value = value;
        }
    }

    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    handleChange(event) {
        const detail = {
            value: event.detail.value,
            colKeyValue: this.colKeyValue,
            rowKeyValue: this.rowKeyValue
        };

        this.dispatchEvent(
            new CustomEvent('privateeditcustomcell', {
                detail: detail,
                bubbles: true,
                composed: true
            })
        );

        this.dispatchEvent(
            new CustomEvent('ieditfinishedcustom', {
                detail,
                bubbles: true,
                composed: true
            })
        );
        this._readOnly = true;
        this.visible = false;
    }

    handleEditButtonClick() {
        this.dispatchEvent(
            new CustomEvent('getdatatablestateanddata', {
                detail: {
                    callbacks: {
                        getState: this.getState.bind(this),
                        getColumns: this.getColumns.bind(this)
                    }
                },
                bubbles: true,
                composed: true
            })
        );

        const { rowKeyValue, colKeyValue, state } = this;
        this.dispatchEvent(
            new CustomEvent('editbuttonclickcustom', {
                bubbles: true,
                composed: true,
                detail: {
                    rowKeyValue,
                    colKeyValue,
                    state
                }
            })
        );

        this._readOnly = false;
        this.visible = true;
    }

    handleInlineEditFinish() {
        this.visible = false;
        this._readOnly = true;
    }
}
