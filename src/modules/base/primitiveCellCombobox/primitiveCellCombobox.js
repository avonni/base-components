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
import { InteractingState } from 'c/inputUtils';

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
    isMassEditEnabled = false;
    _selectedNumber = 0;
    _value;
    _readOnly;

    connectedCallback() {
        this.interactingState = new InteractingState({
            duration: 10,
            debounceInteraction: true
        });
        this.interactingState.onleave(() => this.handlePanelLoosedFocus());
    }

    getState(state) {
        this.state = state;
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
        this._readOnly = true;
        this.visible = false;
    }

    handleEditButtonClick() {
        this._readOnly = false;
        this.visible = true;
        this.dispatchEvent(
            new CustomEvent('comboboxadd', {
                detail: {
                    callbacks: {
                        updateList: this.getState.bind(this)
                    }
                },
                bubbles: true,
                composed: true
            })
        );

        this.countNumberSelected(this.state.selectedRowsKeys);
    }

    countNumberSelected(object) {
        let count = 0;
        Object.values(object).forEach((value) => {
            if (value) {
                count++;
            }
        });
        this._selectedNumber = count;
        this.isMassEditEnabled = count > 1;
    }

    handleComboboxBlur() {
        this._readOnly = true;
        this.visible = false;
    }

    get computedStyle() {
        const styleHash = {
            'z-index': 1000,
            'background-color': 'white',
            'margin-top': '1px',
            position: 'absolute',
            top: 0
        };

        styleHash.display = this.visible ? 'block' : 'none';

        return Object.keys(styleHash)
            .map((styleProp) => `${styleProp}:${styleHash[styleProp]}`)
            .join(';');
    }

    get massEditCheckboxLabel() {
        return `Update ${this._selectedNumber} selected items`;
    }

    handleMassCheckboxChange(event) {
        const customEvent = new CustomEvent('masscheckboxchange', {
            detail: {
                checked: event.detail.checked
            }
        });

        this.dispatchEvent(customEvent);
    }

    cancelEdition() {
        this.visible = false;
        this._readOnly = true;
    }

    handleFormStartFocus() {
        this.interactingState.enter();

        if (this.isMassEditEnabled) {
            // on mass edit the panel dont loses the focus with the keyboard.
            this.focusLastElement();
        } else {
            this.triggerEditFinished({
                reason: 'tab-pressed-prev'
            });
        }
    }

    handleFormEndsFocus() {
        this.interactingState.enter();

        if (this.isMassEditEnabled) {
            // on mass edit the panel dont loses the focus with the keyboard.
            this.focus();
        } else {
            this.triggerEditFinished({
                reason: 'tab-pressed-next'
            });
        }
    }

    triggerEditFinished(detail) {
        detail.rowKeyValue = detail.rowKeyValue || this.rowKeyValue;
        detail.colKeyValue = detail.colKeyValue || this.colKeyValue;

        const event = new CustomEvent('ieditfinished', {
            detail
        });
        this.dispatchEvent(event);
    }

    @api
    focus() {
        const elem = this.inputableElement;
        this.interactingState.enter();

        if (elem) {
            elem.focus();
        }
    }

    get inputableElement() {
        return this.template.querySelector(
            '[data-element-id^="primitive-cell-combobox-input"]'
        );
    }

    @api
    getPositionedElement() {
        return this.template.querySelector('section');
    }

    handleTypeElemBlur() {
        if (this.visible && !this.template.activeElement) {
            this.interactingState.leave();
        }
    }

    handleTypeElemFocus() {
        this.interactingState.enter();
    }

    handleEditFormSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.isMassEditEnabled) {
            this.processSubmission();
        }

        return false;
    }

    handleCellKeydown(event) {
        const { keyCode } = event;

        if (keyCode === 27) {
            // Esc key
            event.stopPropagation();
            this.cancelEdition();
        }
    }

    handlePanelLoosedFocus() {
        if (this.visible) {
            this.triggerEditFinished({
                reason: 'loosed-focus'
            });
        }
    }

    focusLastElement() {
        this.template.querySelector('[data-form-last-element="true"]').focus();
    }

    processSubmission() {
        if (this.validity.valid) {
            this.triggerEditFinished({ reason: 'submit-action' });
        } else {
            this.inputableElement.showHelpMessageIfInvalid();
        }
    }
}
