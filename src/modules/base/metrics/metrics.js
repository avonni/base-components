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
import { Tooltip } from 'c/tooltipLibrary';

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

/**
 * @class
 * @descriptor avonni-metrics
 * @storyId example-metrics--secondary-trend-up
 * @public
 */
export default class Metrics extends LightningElement {
    /**
     * Only used if `format-style="currency"`, this attribute determines which currency is displayed. Possible values are the ISO 4217 currency codes, such as `USD` for the US dollar.
     *
     * @type {string}
     * @public
     */
    @api currencyCode;

    /**
     * Additional text to display below the label.
     *
     * @type {string}
     * @public
     */
    @api description;

    /**
     * Label of the metrics. If present, it will be displayed on top of the data.
     *
     * @type {string}
     * @public
     */
    @api label;

    /**
     * Text to display before the primary value
     *
     * @type {string}
     * @public
     */
    @api prefix;

    /**
     * Only used if `secondary-format-style="currency"`, this attribute determines which currency is displayed. Possible values are the ISO 4217 currency codes, such as `USD` for the US dollar.
     *
     * @type {string}
     * @public
     */
    @api secondaryCurrencyCode;

    /**
     * Text to display before the secondary value.
     *
     * @type {string}
     * @public
     */
    @api secondaryPrefix;

    /**
     * Text to display after the secondary value.
     *
     * @type {string}
     * @public
     */
    @api secondarySuffix;

    /**
     * Text to display after the primary value.
     *
     * @type {string}
     * @public
     */
    @api suffix;

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
    _tooltip;
    _trendColorBreakpointValue;
    _value = DEFAULT_VALUE;
    _valueSign = VALUE_SIGNS.default;

    renderedCallback() {
        this.initTooltip();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Avatar object.
     *
     * @type {object}
     * @public
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
     * Determines how currency is displayed. Possible values are symbol, code, and name. This value defaults to symbol.
     *
     * @type {string}
     * @default symbol
     * @public
     */
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

    /**
     * The formatting style to use for the secondary value. Possible values are decimal, currency, percent, and percent-fixed.
     *
     * @type {string}
     * @default decimal
     * @public
     */
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

    /**
     * The maximum number of fraction digits that are allowed.
     *
     * @type {number}
     * @public
     */
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

    /**
     * The maximum number of significant digits that are allowed. Possible values are from 1 to 21.
     *
     * @type {number}
     * @public
     */
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

    /**
     * The minimum number of fraction digits that are required.
     *
     * @type {number}
     * @public
     */
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

    /**
     * The minimum number of integer digits that are required. Possible values are from 1 to 21.
     *
     * @type {number}
     * @public
     */
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

    /**
     * The minimum number of significant digits that are required. Possible values are from 1 to 21.
     *
     * @type {number}
     * @public
     */
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

    /**
     * Number at which the secondary value will be considered neutral.
     * * If the value is equal to the breakpoint, it will be displayed with a neutral color.
     * * If the value is greater than the breakpoint, it will be displayed with a positive color.
     * * If the value is lesser than the breakpoint, it will be displayed with a negative color.
     *
     * @type {number}
     * @public
     */
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

    /**
     * If present, a secondary number will be displayed to the right of the primary one.
     *
     * @type {number}
     * @public
     */
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

    /**
     * Determine which sign to display before the secondary value, to indicate if it is positive or negative.
     * Valid values include arrow, auto, caret, dynamic-icon and minus-and-plus.
     *
     * @type {string}
     * @default auto
     * @public
     */
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

    /**
     * Text to display when the user mouses over the value.
     *
     * @type {string}
     * @public
     */
    @api
    get tooltip() {
        return this._tooltip ? this._tooltip.value : undefined;
    }
    // remove-next-line-for-c-namespace
    set tooltip(value) {
        if (this._tooltip) {
            this._tooltip.value = value;
        } else if (value) {
            this._tooltip = new Tooltip(value, {
                root: this,
                target: () =>
                    this.template.querySelector(
                        '[data-element-id="avonni-primitive-metric-primary"]'
                    )
            });
            this._tooltip.initialize();
        }
    }

    /**
     * Number at which the value will be considered neutral.
     * * If the value is equal to the breakpoint, it will be displayed with a neutral color.
     * * If the value is greater than the breakpoint, it will be displayed with a positive color.
     * * If the value is lesser than the breakpoint, it will be displayed with a negative color.
     *
     * @type {number}
     * @public
     */
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
     * Computed CSS classes for the avatar.
     *
     * @type {string}
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

    /**
     * Absolute secondary value.
     *
     * @type {number}
     */
    get positiveSecondaryValue() {
        return Math.abs(this.secondaryValue);
    }

    /**
     * Computed CSS classes for the primary metric.
     *
     * @type {string}
     */
    get primaryClass() {
        const showTrendColor = !isNaN(this.trendColorBreakpointValue);
        const isPositive = this.value > this.trendColorBreakpointValue;
        const isNegative = this.value < this.trendColorBreakpointValue;

        return classSet('avonni-metrics__primary')
            .add({
                'avonni-metrics__primary_neutral-trend':
                    showTrendColor && !isPositive && !isNegative,
                'avonni-metrics__primary_positive-trend':
                    showTrendColor && isPositive,
                'avonni-metrics__primary_negative-trend':
                    showTrendColor && isNegative
            })
            .toString();
    }

    /**
     * Computed CSS classes for the secondary metric.
     *
     * @type {string}
     */
    get secondaryClass() {
        const showTrendColor = !isNaN(this.secondaryTrendColorBreakpointValue);
        const isPositive =
            this.secondaryValue > this.secondaryTrendColorBreakpointValue;
        const isNegative =
            this.secondaryValue < this.secondaryTrendColorBreakpointValue;

        return classSet('slds-m-left_x-small avonni-metrics__secondary')
            .add({
                'avonni-metrics__secondary_neutral-trend':
                    showTrendColor && !isPositive && !isNegative,
                'avonni-metrics__secondary_positive-trend':
                    showTrendColor && isPositive,
                'avonni-metrics__secondary_negative-trend':
                    showTrendColor && isNegative
            })
            .toString();
    }

    /**
     * True if the secondary metric should be visible.
     *
     * @type {boolean}
     */
    get showSecondaryMetric() {
        return isFinite(this.secondaryValue);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Initialize the tooltip.
     */
    initTooltip() {
        if (this._tooltip && !this._tooltip.initialized) {
            this._tooltip.initialize();
        }
    }
}
