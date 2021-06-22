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
import { Direction, AutoPosition } from 'c/positionLibrary';
import { normalizeBoolean } from 'c/utilsPrivate';

const i18n = {
    a11yTriggerText: 'Choose a color. Current color: '
};

export default class PrimitiveColorpickerButton extends LightningElement {
    static delegatesFocus = true;

    _isColorPickerPanelOpen = false;
    _value = '';
    _disabled = false;

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    /**
     * If present, the input field is disabled and users cannot interact with it.
     * @type {boolean}
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    focus() {
        const button = this.template.querySelector('button');
        return button && button.focus();
    }

    @api
    blur() {
        const button = this.template.querySelector('button');
        return button && button.blur();
    }

    get colorInputStyle() {
        return `background: ${this.value || '#5679C0'};`;
    }

    handleColorPickerToggleClick(event) {
        event.preventDefault();
        this._isColorPickerPanelOpen = !this._isColorPickerPanelOpen;

        if (this._isColorPickerPanelOpen) {
            this.startColorPickerPositioning();
        } else {
            this.stopColorPickerPositioning();
        }
    }

    startColorPickerPositioning() {
        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition.start({
            target: () =>
                this.template.querySelector(
                    'button.slds-color-picker__summary-button'
                ),
            element: () =>
                this.template
                    .querySelector('c-color-picker-panel')
                    .shadowRoot.querySelector('section'),
            align: {
                horizontal: Direction.Left,
                vertical: Direction.Top
            },
            targetAlign: {
                horizontal: Direction.Left,
                vertical: Direction.Bottom
            },
            autoFlip: true
        });
    }

    stopColorPickerPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }

    handleUpdateColorEvent(event) {
        event.stopPropagation();
        const detail = event.detail;
        this._isColorPickerPanelOpen = false;
        this.stopColorPickerPositioning();
        this.dispatchEvent(
            new CustomEvent('change', {
                detail
            })
        );
    }

    get i18n() {
        return i18n;
    }
}
