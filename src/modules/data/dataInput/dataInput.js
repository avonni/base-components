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

const VARIANTS = {
    valid: ['standard', 'label-inline', 'label-hidden', 'label-stacked'],
    default: 'standard'
};

export default class DataInputBasic extends LightningElement {
    @api label;
    @api name;
    @api placeholder;

    _disabled = false;
    _readOnly = false;
    _required = false;
    _type = DATA_TYPES.default;
    _variant = VARIANTS.default;

    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    @api
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

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

    get isNumber() {
        return (
            this.type === 'number' ||
            this.type === 'percent' ||
            this.type === 'currency'
        );
    }

    get isBoolean() {
        return this.type === 'boolean';
    }

    get isLocation() {
        return this.type === 'location';
    }

    get isPhone() {
        return this.type === 'phone';
    }

    get inputType() {
        if (this.isNumber) {
            return 'number';
        } else if (this.isBoolean) {
            return 'checkbox';
        }

        return this.type;
    }

    get inputFormat() {
        if (this.type === 'currency' || this.type === 'percent') {
            return this.type;
        }
        return 'decimal';
    }

    get isBaseInput() {
        return !this.isLocation && !this.isPhone;
    }

    handlePhoneInputMask(event) {
        const tel = event.target.value
            .replace(/\D+/g, '')
            .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        event.target.value = !tel[2]
            ? tel[1]
            : `${tel[1]}-${tel[2]}` + (tel[3] ? `-${tel[3]}` : '');
    }
}
