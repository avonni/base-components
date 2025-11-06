import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { LightningElement, api } from 'lwc';

const CURRENCY_DISPLAYS = {
    default: 'symbol',
    valid: ['symbol', 'code', 'name']
};
const DATE_STYLES = {
    valid: ['short', 'medium', 'long']
};
const DAY = {
    valid: ['numeric', '2-digit']
};
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const DEFAULT_TREND_BREAKPOINT_VALUE = 0;
const ERA = {
    valid: ['2-digit', 'numeric']
};
const FORMAT_STYLES = {
    default: 'decimal',
    valid: ['currency', 'date', 'decimal', 'percent', 'percent-fixed']
};
const HOUR = {
    valid: ['2-digit', 'numeric']
};
const MINUTE = {
    valid: ['2-digit', 'numeric']
};
const MONTH = {
    valid: ['2-digit', 'narrow', 'short', 'long', 'numeric']
};
const SECOND = {
    valid: ['2-digit', 'numeric']
};
const TIME_ZONE_NAME = {
    valid: ['short', 'long']
};
const TREND_ICONS = {
    valid: ['dynamic', 'arrow', 'caret'],
    default: undefined
};
const VALUE_SIGNS = {
    valid: ['negative', 'positive-and-negative', 'none'],
    default: 'negative'
};
const WEEKDAY = {
    valid: ['narrow', 'short', 'long']
};
const YEAR = {
    valid: ['2-digit', 'numeric']
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
     * Message to display when the metric is in a loading state.
     *
     * @type {string}
     * @public
     */
    @api loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
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
    /**
     * Time zone used, in a valid IANA format. If empty, the browser's time zone is used.
     *
     * @type {string}
     * @public
     */
    @api timeZone;

    _currencyDisplayAs = CURRENCY_DISPLAYS.default;
    _dateStyle;
    _day;
    _era;
    _formatStyle = FORMAT_STYLES.default;
    _hour;
    _hour12 = false;
    _isLoading = false;
    _maximumFractionDigits;
    _maximumSignificantDigits;
    _minimumFractionDigits;
    _minimumIntegerDigits;
    _minimumSignificantDigits;
    _minute;
    _month;
    _second;
    _timeZoneName;
    _trendBreakpointValue = DEFAULT_TREND_BREAKPOINT_VALUE;
    _trendIcon = TREND_ICONS.default;
    _value;
    _valueSign = VALUE_SIGNS.default;
    _weekday;
    _year;

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
     * The date formatting style to use.
     * The format of each style is specific to the locale.
     * Valid values include short, medium and long.
     *
     * @type {string}
     * @default medium
     * @public
     */
    @api
    get dateStyle() {
        return this._dateStyle;
    }
    set dateStyle(value) {
        this._dateStyle = normalizeString(value, {
            validValues: DATE_STYLES.valid
        });
    }

    /**
     * The day formatting style to use.
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @default numeric
     * @public
     */
    @api
    get day() {
        return this._day;
    }
    set day(value) {
        this._day = normalizeString(value, {
            validValues: DAY.valid
        });
    }

    /**
     * The era formatting style to use.
     * Valid values include 2-digit and numeric.
     *
     * @type {string}
     * @default numeric
     * @public
     */
    @api
    get era() {
        return this._era;
    }
    set era(value) {
        this._era = normalizeString(value, {
            validValues: ERA.valid
        });
    }

    /**
     * The number formatting style to use. Possible values are currency, date, decimal, percent, and percent-fixed. This value defaults to decimal.
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
     * The hour formatting style to use. Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @default numeric
     * @public
     */
    @api
    get hour() {
        return this._hour;
    }
    set hour(value) {
        this._hour = normalizeString(value, {
            validValues: HOUR.valid
        });
    }

    /**
     * Determines whether time is displayed as 12-hour. If false, time displays as 24-hour. The default setting is
     * determined by the user's locale. Set the value using a variable. If set to any string directly, the component
     * interprets its value as true.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hour12() {
        return this._hour12;
    }
    set hour12(value) {
        this._hour12 = normalizeBoolean(value);
    }

    /**
     * If present, the metric is in a loading state and shows a spinner.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
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
     * The minute formatting style to use.
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get minute() {
        return this._minute;
    }
    set minute(value) {
        this._minute = normalizeString(value, {
            validValues: MINUTE.valid
        });
    }

    /**
     * The month formatting style to use.
     * Valid values include 2-digit, narrow, short, long and numeric.
     *
     * @type {string}
     * @public
     */
    @api
    get month() {
        return this._month;
    }
    set month(value) {
        this._month = normalizeString(value, {
            validValues: MONTH.valid
        });
    }

    /**
     * The seconds formatting style to use.
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get second() {
        return this._second;
    }
    set second(value) {
        this._second = normalizeString(value, {
            validValues: SECOND.valid
        });
    }

    /**
     * The time zone name format to use.
     * Valid values include short and long.
     *
     * @type {string}
     * @public
     */
    @api
    get timeZoneName() {
        return this._timeZoneName;
    }
    set timeZoneName(value) {
        this._timeZoneName = normalizeString(value, {
            validValues: TIME_ZONE_NAME.valid
        });
    }

    /**
     * Number at which the value will be considered neutral. Works in association with `trend-icon` and `show-trend-color`.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get trendBreakpointValue() {
        return this._trendBreakpointValue;
    }
    set trendBreakpointValue(value) {
        const normalizedNumber = Number(value);
        this._trendBreakpointValue = isNaN(normalizedNumber)
            ? DEFAULT_TREND_BREAKPOINT_VALUE
            : normalizedNumber;
    }

    /**
     * Type of icon indicating the trend direction of the value. Valid values include dynamic, arrow and caret.
     *
     * @type {string}
     * @public
     */
    @api
    get trendIcon() {
        return this._trendIcon;
    }
    set trendIcon(value) {
        this._trendIcon = normalizeString(value, {
            fallbackValue: TREND_ICONS.default,
            validValues: TREND_ICONS.valid
        });
    }

    /**
     * Value of the metric.
     *
     * @type {number}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        const normalizedNumber = value === null ? undefined : Number(value);
        this._value = isFinite(normalizedNumber) ? normalizedNumber : undefined;
    }

    /**
     * Determine what signs are allowed to be displayed in front of the value, to indicate that it is positive or negative.
     * Valid values include negative, positive-and-negative or none.
     *
     * @type {string}
     * @default negative
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

    /**
     * The weekday formatting style to use.
     * Valid values include narrow, short and long.
     *
     * @type {string}
     * @public
     */
    @api
    get weekday() {
        return this._weekday;
    }
    set weekday(value) {
        this._weekday = normalizeString(value, {
            validValues: WEEKDAY.valid
        });
    }

    /**
     * The year formatting style to use.
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get year() {
        return this._year;
    }
    set year(value) {
        this._year = normalizeString(value, {
            fallbackValue: YEAR.default,
            validValues: YEAR.valid
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
    get computedDynamicIconClass() {
        return classSet('slds-align-middle')
            .add({
                'slds-m-right_x-small': this.value > this.trendBreakpointValue,
                'slds-m-left_xx-small': this.value < this.trendBreakpointValue,
                'slds-m-right_xx-small': this.value <= this.trendBreakpointValue
            })
            .toString();
    }

    /**
     * True if the value is a valid number.
     *
     * @type {boolean}
     */
    get hasValue() {
        return isFinite(this.value) && !this.isLoading;
    }

    /**
     * Name of the icon used as a value sign.
     *
     * @type {string}
     */
    get iconName() {
        const arrowIcon = this.trendIcon === 'arrow';
        const up = arrowIcon ? 'utility:arrowup' : 'utility:up';
        const down = arrowIcon ? 'utility:arrowdown' : 'utility:down';
        const neutral = arrowIcon ? 'utility:forward' : 'utility:right';
        if (this.value === this.trendBreakpointValue) {
            return neutral;
        }
        return this.value > this.trendBreakpointValue ? up : down;
    }

    /**
     * True if the format style is date.
     *
     * @type {boolean}
     */
    get isDateFormat() {
        return this.formatStyle === 'date';
    }

    /**
     * True if the value is a not a valid number.
     *
     * @type {boolean}
     */
    get isEmpty() {
        return !isFinite(this.value);
    }

    /**
     * Computed math sign to display before the value.
     *
     * @type {string}
     */
    get mathSign() {
        const displayMinus = this.valueSign === 'negative';
        const displayNoSign = this.valueSign === 'none';
        const neutralValue = this.value === 0;

        if (neutralValue || displayNoSign || (displayMinus && this.value > 0)) {
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
        return this.trendIcon === 'dynamic';
    }

    /**
     * True if the sign icon should be visible.
     *
     * @type {boolean}
     */
    get showIcon() {
        return this.trendIcon === 'arrow' || this.trendIcon === 'caret';
    }

    /**
     * Direction of the value trend.
     *
     * @type {string}
     */
    get trendDirection() {
        if (this.value === this.trendBreakpointValue) {
            return 'neutral';
        }
        return this.value > this.trendBreakpointValue ? 'up' : 'down';
    }
}
