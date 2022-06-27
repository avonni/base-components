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
import { normalizeObject, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const AVATAR_POSITIONS = {
    default: 'left',
    valid: ['top', 'bottom', 'left', 'right']
};

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

export default class Metrics extends LightningElement {
    @api currencyCode;
    @api description;
    @api label;
    @api prefix;
    @api secondaryCurrencyCode;
    @api secondaryPrefix;
    @api secondarySuffix;
    @api suffix;
    @api tooltip;

    _avatar;
    _currencyDisplayAs = CURRENCY_DISPLAYS.default;
    _formatStyle = FORMAT_STYLES.default;
    _maximumFractionDigits;
    _maximumSignificantDigits;
    _minimumFractionDigits;
    _minimumIntegerDigits;
    _minimumSignificantDigits;
    _secondaryCurrencyDisplayAs = CURRENCY_DISPLAYS.default;
    _secondaryFormatStyle;
    _secondaryMaximumFractionDigits;
    _secondaryMaximumSignificantDigits;
    _secondaryMinimumFractionDigits;
    _secondaryMinimumIntegerDigits;
    _secondaryMinimumSignificantDigits;
    _secondaryTrendColorBreakpointValue;
    _secondaryValue;
    _secondaryValueSign = VALUE_SIGNS.default;
    _trendColorBreakpointValue;
    _value = DEFAULT_VALUE;
    _valueSign = VALUE_SIGNS.default;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        const normalizedAvatar = normalizeObject(value);
        this._avatar = Object.keys(normalizedAvatar).length
            ? normalizedAvatar
            : undefined;
    }

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

    @api
    get trendColorBreakpointValue() {
        return this._trendColorBreakpointValue;
    }
    set trendColorBreakpointValue(value) {
        const normalizedNumber = Number(value);
        this._trendColorBreakpointValue = isNaN(normalizedNumber)
            ? undefined
            : normalizedNumber;
    }

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

    @api
    get secondaryCurrencyDisplayAs() {
        return this._secondaryCurrencyDisplayAs;
    }
    set secondaryCurrencyDisplayAs(value) {
        this._secondaryCurrencyDisplayAs = normalizeString(value, {
            fallbackValue: CURRENCY_DISPLAYS.default,
            validValues: CURRENCY_DISPLAYS.valid
        });
    }

    @api
    get secondaryFormatStyle() {
        return this._secondaryFormatStyle;
    }
    set secondaryFormatStyle(value) {
        this._secondaryFormatStyle = normalizeString(value, {
            fallbackValue: FORMAT_STYLES.default,
            validValues: FORMAT_STYLES.valid
        });
    }

    @api
    get secondaryMaximumFractionDigits() {
        return this._secondaryMaximumFractionDigits;
    }
    set secondaryMaximumFractionDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        this._secondaryMaximumFractionDigits = isNaN(normalizedNumber)
            ? undefined
            : normalizedNumber;
    }

    @api
    get secondaryMaximumSignificantDigits() {
        return this._secondaryMaximumSignificantDigits;
    }
    set secondaryMaximumSignificantDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        const isValid =
            !isNaN(normalizedNumber) &&
            normalizedNumber >= 1 &&
            normalizedNumber <= 21;
        this._secondaryMaximumSignificantDigits = isValid
            ? normalizedNumber
            : undefined;
    }

    @api
    get secondaryMinimumFractionDigits() {
        return this._secondaryMinimumFractionDigits;
    }
    set secondaryMinimumFractionDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        this._secondaryMinimumFractionDigits = isNaN(normalizedNumber)
            ? undefined
            : normalizedNumber;
    }

    @api
    get secondaryMinimumIntegerDigits() {
        return this._secondaryMinimumIntegerDigits;
    }
    set secondaryMinimumIntegerDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        const isValid =
            !isNaN(normalizedNumber) &&
            normalizedNumber >= 1 &&
            normalizedNumber <= 21;
        this._secondaryMinimumIntegerDigits = isValid
            ? normalizedNumber
            : undefined;
    }

    @api
    get secondaryMinimumSignificantDigits() {
        return this._secondaryMinimumSignificantDigits;
    }
    set secondaryMinimumSignificantDigits(value) {
        const normalizedNumber = parseInt(value, 10);
        const isValid =
            !isNaN(normalizedNumber) &&
            normalizedNumber >= 1 &&
            normalizedNumber <= 21;
        this._secondaryMinimumSignificantDigits = isValid
            ? normalizedNumber
            : undefined;
    }

    @api
    get secondaryTrendColorBreakpointValue() {
        return this._secondaryTrendColorBreakpointValue;
    }
    set secondaryTrendColorBreakpointValue(value) {
        const normalizedNumber = Number(value);
        this._secondaryTrendColorBreakpointValue = isNaN(normalizedNumber)
            ? undefined
            : normalizedNumber;
    }

    @api
    get secondaryValue() {
        return this._secondaryValue;
    }
    set secondaryValue(value) {
        const normalizedNumber = Number(value);
        this._secondaryValue = isFinite(normalizedNumber)
            ? normalizedNumber
            : undefined;
    }

    @api
    get secondaryValueSign() {
        return this._secondaryValueSign;
    }
    set secondaryValueSign(value) {
        this._secondaryValueSign = normalizeString(value, {
            fallbackValue: VALUE_SIGNS.default,
            validValues: VALUE_SIGNS.valid
        });
    }

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

    get avatarClass() {
        const position = normalizeString(this.avatar.position, {
            fallbackValue: AVATAR_POSITIONS.default,
            validValues: AVATAR_POSITIONS.valid
        });

        return classSet({
            'slds-m-right_x-small': position === 'left',
            'avonni-metrics__avatar_after-text slds-m-left_x-small':
                position === 'right',
            'slds-m-bottom_x-small slds-size_1-of-1': position === 'top',
            'slds-m-top_x-small avonni-metrics__avatar_after-text slds-size_1-of-1':
                position === 'bottom'
        }).toString();
    }

    get positiveSecondaryValue() {
        return Math.abs(this.secondaryValue);
    }

    get positiveValue() {
        return Math.abs(this.value);
    }

    get secondaryDynamicIconOption() {
        if (this.secondaryValue === 0) {
            return 'neutral';
        }
        return this.secondaryValue > 0 ? 'up' : 'down';
    }

    get secondaryDynamicIconClass() {
        return classSet('slds-align-middle')
            .add({
                'slds-m-right_xx-small': this.secondaryValue > 0,
                'slds-m-left_xx-small': this.secondaryValue < 0
            })
            .toString();
    }

    get secondaryIconName() {
        if (this.secondaryValueSign === 'arrow') {
            return this.secondaryValue > 0
                ? 'utility:arrowup'
                : 'utility:arrowdown';
        }
        return this.secondaryValue > 0 ? 'utility:up' : 'utility:down';
    }

    get secondaryMathSign() {
        const displayMinusAndPlus =
            this.secondaryValueSign === 'minus-and-plus';
        const displayMinus = this.secondaryValueSign === 'auto';
        const displayIcon = !displayMinusAndPlus && !displayMinus;
        const neutralValue = this.secondaryValue === 0;

        if (
            displayIcon ||
            neutralValue ||
            (displayMinus && this.secondaryValue > 0)
        ) {
            return null;
        }
        return this.secondaryValue > 0 ? '+' : '-';
    }

    get secondaryValueSignAlternativeText() {
        if (this.secondaryValue === 0) {
            return null;
        }
        return this.secondaryValue > 0 ? 'up' : 'down';
    }

    get secondaryWrapperClass() {
        const showTrendColor = !isNaN(this.secondaryTrendColorBreakpointValue);
        const isPositive =
            this.secondaryValue > this.secondaryTrendColorBreakpointValue;
        const isNegative =
            this.secondaryValue < this.secondaryTrendColorBreakpointValue;

        return classSet(
            'slds-grid slds-grid_vertical-align-center slds-m-left_xx-small avonni-metrics__secondary-value'
        )
            .add({
                'slds-p-around_xx-small': showTrendColor,
                'avonni-metrics__secondary_neutral-trend':
                    showTrendColor && !isPositive && !isNegative,
                'avonni-metrics__secondary_positive-trend':
                    showTrendColor && isPositive,
                'avonni-metrics__secondary_negative-trend':
                    showTrendColor && isNegative
            })
            .toString();
    }

    get showSecondaryDynamicIcon() {
        return this.secondaryValueSign === 'dynamic-icon';
    }

    get showSecondaryIcon() {
        return (
            this.secondaryValue !== 0 &&
            (this.secondaryValueSign === 'arrow' ||
                this.secondaryValueSign === 'caret')
        );
    }

    get showSecondaryValue() {
        return isFinite(this.secondaryValue);
    }
}
