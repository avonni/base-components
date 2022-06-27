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
import { classSet } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const CURRENCY_DISPLAYS = {
    default: 'symbol',
    valid: ['symbol', 'code', 'name']
};

const DEFAULT_VALUE = 0;

const FORMAT_STYLES = {
    default: 'decimal',
    valid: ['currency', 'decimal', 'percent', 'percent-fixed']
};

const VALUE_SIGNS = {
    valid: ['auto', 'minus-and-plus', 'dynamic-icon', 'arrow', 'caret'],
    default: 'auto'
};

/**
 * @class
 * @descriptor c-primitive-metric
 */
export default class PrimitiveMetric extends LightningElement {
    /**
     * Only used if `format-style="currency"`, this attribute determines which currency is displayed. Possible values are the ISO 4217 currency codes, such as `USD` for the US dollar.
     *
     * @type {string}
     * @public
     */
    @api currencyCode;

    /**
     * Text to display before the primary value
     *
     * @type {string}
     * @public
     */
    @api prefix;

    /**
     * Text to display after the primary value.
     *
     * @type {string}
     * @public
     */
    @api suffix;

    _currencyDisplayAs = CURRENCY_DISPLAYS.default;
    _formatStyle = FORMAT_STYLES.default;
    _maximumFractionDigits;
    _maximumSignificantDigits;
    _minimumFractionDigits;
    _minimumIntegerDigits;
    _minimumSignificantDigits;
    _value = DEFAULT_VALUE;
    _valueSign = VALUE_SIGNS.default;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Determines how currency is displayed. Possible values are symbol, code, and name.
     *
     * @type {string}
     * @default symbol
     * @public
     */
    @api
    get currencyDisplayAs() {
        return this._currencyDisplayAs;
    }
    set currencyDisplayAs(value) {
        this._currencyDisplayAs = normalizeString(value, {
            fallbackValue: CURRENCY_DISPLAYS.default,
            validValues: CURRENCY_DISPLAYS.valid
        });
    }

    /**
     * The number formatting style to use. Possible values are decimal, currency, percent, and percent-fixed. This value defaults to decimal.
     *
     * @type {string}
     * @default decimal
     * @public
     */
    @api
    get formatStyle() {
        return this._formatStyle;
    }
    set formatStyle(value) {
        this._formatStyle = normalizeString(value, {
            fallbackValue: FORMAT_STYLES.default,
            validValues: FORMAT_STYLES.valid
        });
    }

    /**
     * The maximum number of fraction digits that are allowed.
     *
     * @type {number}
     * @public
     */
    @api
    get maximumFractionDigits() {
        return this._maximumFractionDigits;
    }
    set maximumFractionDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        this._maximumFractionDigits = isNaN(normalizedNumber)
            ? undefined
            : normalizedNumber;
    }

    /**
     * The maximum number of significant digits that are allowed. Possible values are from 1 to 21.
     *
     * @type {number}
     * @public
     */
    @api
    get maximumSignificantDigits() {
        return this._maximumSignificantDigits;
    }
    set maximumSignificantDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        const isValid =
            !isNaN(normalizedNumber) &&
            normalizedNumber >= 1 &&
            normalizedNumber <= 21;
        this._maximumSignificantDigits = isValid ? normalizedNumber : undefined;
    }

    /**
     * The minimum number of fraction digits that are required.
     *
     * @type {number}
     * @public
     */
    @api
    get minimumFractionDigits() {
        return this._minimumFractionDigits;
    }
    set minimumFractionDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        this._minimumFractionDigits = isNaN(normalizedNumber)
            ? undefined
            : normalizedNumber;
    }

    /**
     * The minimum number of integer digits that are required. Possible values are from 1 to 21.
     *
     * @type {number}
     * @public
     */
    @api
    get minimumIntegerDigits() {
        return this._minimumIntegerDigits;
    }
    set minimumIntegerDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        const isValid =
            !isNaN(normalizedNumber) &&
            normalizedNumber >= 1 &&
            normalizedNumber <= 21;
        this._minimumIntegerDigits = isValid ? normalizedNumber : undefined;
    }

    /**
     * The minimum number of significant digits that are required. Possible values are from 1 to 21.
     *
     * @type {number}
     * @public
     */
    @api
    get minimumSignificantDigits() {
        return this._minimumSignificantDigits;
    }
    set minimumSignificantDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        const isValid =
            !isNaN(normalizedNumber) &&
            normalizedNumber >= 1 &&
            normalizedNumber <= 21;
        this._minimumSignificantDigits = isValid ? normalizedNumber : undefined;
    }

    /**
     * Value of the metric.
     *
     * @type {number}
     * @required
     * @default 0
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        const normalizedNumber = Number(value);
        this._value = isFinite(normalizedNumber)
            ? normalizedNumber
            : DEFAULT_VALUE;
    }

    /**
     * Determine which sign to display before the value, to indicate if it is positive or negative.
     * Valid values include arrow, auto, caret, dynamic-icon and minus-and-plus.
     *
     * @type {string}
     * @default auto
     * @public
     */
    @api
    get valueSign() {
        return this._valueSign;
    }
    set valueSign(value) {
        this._valueSign = normalizeString(value, {
            fallbackValue: VALUE_SIGNS.default,
            validValues: VALUE_SIGNS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed CSS classes for the dynamic icon.
     *
     * @type {string}
     */
    get dynamicIconClass() {
        return classSet('slds-align-middle')
            .add({
                'slds-m-right_x-small': this.value > 0,
                'slds-m-left_xx-small': this.value < 0,
                'slds-m-right_xx-small': this.value <= 0
            })
            .toString();
    }

    /**
     * Option indicating the direction of the dynamic icon.
     *
     * @type {string}
     */
    get dynamicIconOption() {
        if (this.value === 0) {
            return 'neutral';
        }
        return this.value > 0 ? 'up' : 'down';
    }

    /**
     * Name of the icon used as a value sign.
     *
     * @type {string}
     */
    get iconName() {
        const arrowIcon = this.valueSign === 'arrow';
        const up = arrowIcon ? 'utility:arrowup' : 'utility:up';
        const down = arrowIcon ? 'utility:arrowdown' : 'utility:down';
        return this.value > 0 ? up : down;
    }

    /**
     * Computed math sign to display before the value.
     *
     * @type {string}
     */
    get mathSign() {
        const displayMinusAndPlus = this.valueSign === 'minus-and-plus';
        const displayMinus = this.valueSign === 'auto';
        const displayIcon = !displayMinusAndPlus && !displayMinus;
        const neutralValue = this.value === 0;

        if (displayIcon || neutralValue || (displayMinus && this.value > 0)) {
            return null;
        }
        return this.value > 0 ? '+' : '-';
    }

    /**
     * Absolute value.
     *
     * @type {number}
     */
    get positiveValue() {
        return Math.abs(this.value);
    }

    /**
     * True if the dynamic icon should be visible.
     *
     * @type {boolean}
     */
    get showDynamicIcon() {
        return this.valueSign === 'dynamic-icon';
    }

    /**
     * True if the sign icon should be visible.
     *
     * @type {boolean}
     */
    get showIcon() {
        return (
            this.value !== 0 &&
            (this.valueSign === 'arrow' || this.valueSign === 'caret')
        );
    }
}
