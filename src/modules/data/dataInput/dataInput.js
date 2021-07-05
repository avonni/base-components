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

/**
 * @constant
 * @type {object}
 * @property {string[]} valid   - The valid data types.
 * @property {string}   default - The default data type.
 */
const DATA_TYPES = {
    valid: [
        'boolean',
        'currency',
        'date',
        'email',
        'location',
        'number',
        'percent',
        'phone',
        'text',
        'url'
    ],
    default: 'text'
};

/**
 * @constant
 * @type {object}
 * @property {string[]} valid   - The valid variants.
 * @property {string}   default - The default variant.
 */
const VARIANTS = {
    valid: ['standard', 'label-inline', 'label-hidden', 'label-stacked'],
    default: 'standard'
};

/**
 * @class
 * @classdesc The input data displays data depending on its type.
 * @name DataInput
 * @descriptor avonni-data-input
 * @example example-data-input--base
 * @public
 */
export default class DataInputBasic extends LightningElement {
    /**
     * Text label for the input.
     * @type {string}
     * @public
     */
    @api label;

    /**
     * Specifies the name of an input element.
     * @type {string}
     * @public
     */
    @api name;

    /**
     * Message to be displayed when input field is empty, to prompt the user for a valid entry.
     * @type {string}
     * @public
     */
    @api placeholder;

    _disabled = false;
    _readOnly = false;
    _required = false;
    _type = DATA_TYPES.default;
    _variant = VARIANTS.default;

    /**
     * If present, the input field is disabled and users cannot interact with it.
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * If present, the input field is read-only and cannot be edited by users.
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * If present, the input field must be filled out before the form is submitted.
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * Type of the input.
     * Accepted types include boolean, currency, date, email, location, number, percent, phone, url and text.
     * This value defaults to text.
     * @type {string}
     * @default text
     * @public
     */
    @api
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: DATA_TYPES.default,
            validValues: DATA_TYPES.valid
        });
    }

    /**
     * The variant changes the appearance of an input field.
     * Accepted variants include standard, label-inline, label-hidden, and label-stacked.
     * This value defaults to standard, which displays the label above the field.
     * Use label-hidden to hide the label but make it available to assistive technology.
     * Use label-inline to horizontally align the label and input field.
     * Use label-stacked to place the label above the input field.
     * @type {string}
     * @default standard
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    /**
     * Whether the data input type is a number.
     * Number, percent and currency types are considered as numbers.
     * @type {boolean}
     */
    get isNumber() {
        return (
            this.type === 'number' ||
            this.type === 'percent' ||
            this.type === 'currency'
        );
    }

    /**
     * Whether the data input type is a boolean.
     * @type {boolean}
     */
    get isBoolean() {
        return this.type === 'boolean';
    }

    /**
     * Whether the data input type is a location.
     * @type {boolean}
     */
    get isLocation() {
        return this.type === 'location';
    }

    /**
     * Whether the data input type is a phone number.
     * @type {boolean}
     */
    get isPhone() {
        return this.type === 'phone';
    }

    /**
     * Whether the data input type is different from a location and a phone number.
     * @type {boolean}
     */
    get isBaseInput() {
        return !this.isLocation && !this.isPhone;
    }

    /**
     * The Salesforce lightning-input type attribute equivalent for the data input type.
     * @type {string}
     */
    get inputType() {
        if (this.isNumber) {
            return 'number';
        } else if (this.isBoolean) {
            return 'checkbox';
        }

        return this.type;
    }

    /**
     * The Salesforce lightning-input formatter attribute depending on the number type.
     * @type {string}
     */
    get inputFormat() {
        if (this.type === 'currency' || this.type === 'percent') {
            return this.type;
        }
        return 'decimal';
    }

    /**
     * The label of the input.
     * The Salesforce lightning-input requires a label.
     * If there is no label, one will be given by default.
     * @type {string}
     */
    get inputLabel() {
        return this.label ? this.label : 'Data input';
    }

    /**
     * The variant of the input.
     * If there is no label, the variant will be changed to label-hidden.
     * @type {string}
     */
    get inputVariant() {
        return this.label ? this.variant : 'label-hidden';
    }

    /**
     * Handles a change in the input if its type is a phone number.
     * The phone number will be displayed in the format ###-###-####.
     * @param {Event} event
     */
    handlePhoneInputChange(event) {
        const tel = event.target.value
            .replace(/\D+/g, '')
            .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        event.target.value = !tel[2]
            ? tel[1]
            : `${tel[1]}-${tel[2]}` + (tel[3] ? `-${tel[3]}` : '');
    }
}
