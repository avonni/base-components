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
import {
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const ALIGNMENTS = {
    default: 'left',
    valid: ['center', 'left', 'right']
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

const SIGN_DISPLAYS = {
    valid: ['auto', 'exceptZero', 'trendArrows'],
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

    _align = ALIGNMENTS.default;
    _avatar;
    _currencyDisplayAs = CURRENCY_DISPLAYS.default;
    _enableTrend = false;
    _formatStyle = FORMAT_STYLES.default;
    _maximumFractionDigits;
    _maximumSignificantDigits;
    _minimumFractionDigits;
    _minimumIntegerDigits;
    _minimumSignificantDigits;
    _positiveTrend = false;
    _secondaryCurrencyDisplayAs = CURRENCY_DISPLAYS.default;
    _secondaryEnableTrend;
    _secondaryFormatStyles;
    _secondaryMaximumFractionDigits;
    _secondaryMaximumSignificantDigits;
    _secondaryMinimumFractionDigits;
    _secondaryMinimumIntegerDigits;
    _secondaryMinimumSignificantDigits;
    _secondaryPositiveTrend = false;
    _secondarySignDisplay = SIGN_DISPLAYS.default;
    _secondaryValue;
    _signDisplay = SIGN_DISPLAYS.default;
    _value = DEFAULT_VALUE;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get align() {
        return this._align;
    }
    set align(value) {
        this._align = normalizeString(value, {
            fallbackValue: ALIGNMENTS.default,
            validValues: ALIGNMENTS.valid
        });
    }

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
    get enableTrend() {
        return this._enableTrend;
    }
    set enableTrend(value) {
        this._enableTrend = normalizeBoolean(value);
    }

    @api
    get formatStyles() {
        return this._formatStyles;
    }
    set formatStyles(value) {
        this._formatStyles = normalizeString(value, {
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
    get positiveTrend() {
        return this._positiveTrend;
    }
    set positiveTrend(value) {
        this._positiveTrend = normalizeBoolean(value);
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
    get secondaryEnableTrend() {
        return this._secondaryEnableTrend;
    }
    set secondaryEnableTrend(value) {
        this._secondaryEnableTrend = normalizeBoolean(value);
    }

    @api
    get secondaryFormatStyles() {
        return this._secondaryFormatStyles;
    }
    set secondaryFormatStyles(value) {
        this._secondaryFormatStyles = normalizeString(value, {
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
    get secondaryPositiveTrend() {
        return this._secondaryPositiveTrend;
    }
    set secondaryPositiveTrend(value) {
        this._secondaryPositiveTrend = normalizeBoolean(value);
    }

    @api
    get secondarySignDisplay() {
        return this._secondarySignDisplay;
    }
    set secondarySignDisplay(value) {
        this._secondarySignDisplay = normalizeString(value, {
            fallbackValue: SIGN_DISPLAYS.default,
            validValues: SIGN_DISPLAYS.valid
        });
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
    get signDisplay() {
        return this._signDisplay;
    }
    set signDisplay(value) {
        this._signDisplay = normalizeString(value, {
            fallbackValue: SIGN_DISPLAYS.default,
            validValues: SIGN_DISPLAYS.valid
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get secondaryTrendOption() {
        return this.secondaryPositiveTrend ? 'up' : 'down';
    }

    get secondaryTrendClass() {
        return classSet('slds-align-middle')
            .add({
                'slds-m-right_xx-small': this.secondaryPositiveTrend,
                'slds-m-left_xx-small': !this.secondaryPositiveTrend
            })
            .toString();
    }

    get secondaryWrapperClass() {
        return classSet('slds-grid slds-m-left_xx-small')
            .add({
                'slds-p-around_xx-small': this.secondaryEnableTrend,
                'avonni-metrics__secondary_positive-trend':
                    this.secondaryEnableTrend && this.secondaryPositiveTrend,
                'avonni-metrics__secondary_negative-trend':
                    this.secondaryEnableTrend && !this.secondaryPositiveTrend
            })
            .toString();
    }

    get showSecondaryValue() {
        return isFinite(this.secondaryValue);
    }
}
