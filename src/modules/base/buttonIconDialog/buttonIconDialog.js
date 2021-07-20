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
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

const BUTTON_SIZES = {
    validBare: ['x-small', 'small', 'medium', 'large'],
    validNonBare: ['xx-small', 'x-small', 'small', 'medium'],
    default: 'medium'
};

const BUTTON_VARIANTS = {
    valid: [
        'bare',
        'container',
        'brand',
        'border',
        'border-filled',
        'bare-inverse',
        'border-inverse'
    ],
    default: 'border'
};

/**
 * @class
 * @descriptor avonni-button-icon-dialog
 * @description The button icon dialog component displays a lightning button icon. On click, open the modal box.
 * @example story/example-button-icon-dialog--border
 * @public
 */
export default class ButtonIconDialog extends LightningElement {
    /**
     * The keyboard shortcut for the button.
     * 
     * @public
     * @type {string}
     */
    @api accessKey;
    /**
     * The assistive text for the button.
     * 
     * @public
     * @type {string}
     */
    @api alternativeText;
    /**
     * Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.
     * 
     * @public
     * @type {string}
     */
    @api tooltip;
    /**
     * The class to be applied to the contained icon element ( e.g. "slds-icon-text-success").
     * 
     * @public
     * @type {string}
     */
    @api iconClass;
    /**
     * The name of the icon to be used in the format 'utility:down'.
     * 
     * @public
     * @type {string}
     */
    @api iconName;

    _disabled = false;
    _size = BUTTON_SIZES.default;
    _variant = BUTTON_VARIANTS.default;
    _dialogSlot;

    renderedCallback() {
        this._dialogSlot = this.template.querySelector('slot');
    }

    /**
     * The size of the buttonIcon. For the bare variant, options include x-small, small, medium, and large. For non-bare variants, options include xx-small, x-small, small, and medium.
     * 
     * @public
     * @type {string}
     * @default "medium"
     */
    @api
    get size() {
        return this._size;
    }

    set size(size) {
        if (this._variant === 'bare' || this._variant === 'bare-inverse') {
            this._size = normalizeString(size, {
                fallbackValue: BUTTON_SIZES.default,
                validValues: BUTTON_SIZES.validBare
            });
        } else {
            this._size = normalizeString(size, {
                fallbackValue: BUTTON_SIZES.default,
                validValues: BUTTON_SIZES.validNonBare
            });
        }
    }

    /**
     * The variant changes the appearance of buttonIcon. Accepted variants include bare, container, brand, border, border-filled, bare-inverse, and border-inverse.
     * 
     * @public
     * @type {string}
     * @default "border"
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /**
     * If present, the popover can be opened by users.
     * 
     * @public
     * @type {boolean}
     */
    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * Open modal box.
     */
    @api
    show() {
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].show();
        }
        /**
         * @event
         * @name show
         * @public
         */
        this.dispatchEvent(new CustomEvent('show'));
    }

    /**
     * Close the modal box.
     * 
     */
    @api
    hide() {
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].hide();
        }
        /**
         * @event
         * @name hide
         * @public
         */
        this.dispatchEvent(new CustomEvent('hide'));
    }

    /**
     * Clicks the button.
     */
    @api
    click() {
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].show();
        }
        /**
         * @event
         * @name click
         * @public
         */
        this.dispatchEvent(new CustomEvent('click'));
    }

    /**
     * Sets focus on the button.
     */
    @api
    focus() {
        this.template.querySelector('lightning-button-icon').focus();
        /**
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
