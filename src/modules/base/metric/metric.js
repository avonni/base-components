import { Tooltip } from 'c/tooltipLibrary';
import {
    classSet,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { LightningElement, api } from 'lwc';

const AVATAR_POSITIONS = {
    default: 'left',
    valid: ['top', 'bottom', 'left', 'right']
};
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
const FORMAT_STYLES = {
    valid: ['currency', 'date', 'decimal', 'percent', 'percent-fixed']
};
const ERA = {
    valid: ['2-digit', 'numeric']
};
const HOUR = {
    valid: ['2-digit', 'numeric']
};
const LABEL_POSITIONS = {
    valid: ['top', 'bottom'],
    default: 'top'
};
const MINUTE = {
    valid: ['2-digit', 'numeric']
};
const MONTH = {
    valid: ['2-digit', 'narrow', 'short', 'long', 'numeric']
};
const POSITIONS = {
    valid: ['right', 'left', 'top', 'bottom'],
    default: 'right'
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
 * @descriptor avonni-metric
 * @storyId example-metric--secondary-trend-up
 * @public
 */
export default class Metric extends LightningElement {
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
     * Error message text to display next to the label.
     *
     * @type {string}
     * @public
     */
    @api errorMessage;
    /**
     * Label of the metric. If present, it will be displayed on top of the data.
     *
     * @type {string}
     * @public
     */
    @api label;
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
     * Time zone to use for the secondary value. If empty, the browser's time zone is used.
     *
     * @type {string}
     * @public
     */
    @api secondaryTimeZone;
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

    _avatar;
    _currencyDisplayAs = CURRENCY_DISPLAYS.default;
    _dateStyle;
    _day;
    _era;
    _formatStyle = FORMAT_STYLES.default;
    _hour;
    _hour12 = false;
    _labelPosition = LABEL_POSITIONS.default;
    _maximumFractionDigits;
    _maximumSignificantDigits;
    _minimumFractionDigits;
    _minimumIntegerDigits;
    _minimumSignificantDigits;
    _minute;
    _month;
    _second;
    _secondaryCurrencyDisplayAs = CURRENCY_DISPLAYS.default;
    _secondaryDateStyle;
    _secondaryDay;
    _secondaryEra;
    _secondaryFormatStyle = FORMAT_STYLES.default;
    _secondaryHour;
    _secondaryHour12 = false;
    _secondaryMaximumFractionDigits;
    _secondaryMaximumSignificantDigits;
    _secondaryMinimumFractionDigits;
    _secondaryMinimumIntegerDigits;
    _secondaryMinimumSignificantDigits;
    _secondaryMinute;
    _secondaryMonth;
    _secondaryPosition = POSITIONS.default;
    _secondarySecond;
    _secondaryShowTrendColor = false;
    _secondaryTimeZone;
    _secondaryTimeZoneName;
    _secondaryTrendBreakpointValue = DEFAULT_TREND_BREAKPOINT_VALUE;
    _secondaryTrendIcon;
    _secondaryValue;
    _secondaryValueIsLoading = false;
    _secondaryValueSign = VALUE_SIGNS.default;
    _secondaryWeekday;
    _secondaryYear;
    _showTrendColor = false;
    _timeZoneName;
    _tooltip;
    _trendBreakpointValue = DEFAULT_TREND_BREAKPOINT_VALUE;
    _trendIcon;
    _value;
    _valueIsLoading = false;
    _valueSign = VALUE_SIGNS.default;
    _weekday = WEEKDAY.default;
    _year = YEAR.default;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

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
            fallbackValue: DATE_STYLES.default,
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
            fallbackValue: DAY.default,
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
            fallbackValue: ERA.default,
            validValues: ERA.valid
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
            fallbackValue: HOUR.default,
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
     * Position of the label.
     *
     * @type {string}
     * @default top
     * @public
     */
    @api
    get labelPosition() {
        return this._labelPosition;
    }
    set labelPosition(value) {
        this._labelPosition = normalizeString(value, {
            fallbackValue: LABEL_POSITIONS.default,
            validValues: LABEL_POSITIONS.valid
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
            fallbackValue: MINUTE.default,
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
            fallbackValue: MONTH.default,
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
            fallbackValue: SECOND.default,
            validValues: SECOND.valid
        });
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
     * The date formatting style to use for the secondary value.
     * The format of each style is specific to the locale.
     * Valid values include short, medium and long.
     *
     * @type {string}
     * @public
     */
    @api
    get secondaryDateStyle() {
        return this._secondaryDateStyle;
    }
    set secondaryDateStyle(value) {
        this._secondaryDateStyle = normalizeString(value, {
            fallbackValue: DATE_STYLES.default,
            validValues: DATE_STYLES.valid
        });
    }

    /**
     * The day formatting style to use for the secondary value.
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get secondaryDay() {
        return this._secondaryDay;
    }
    set secondaryDay(value) {
        this._secondaryDay = normalizeString(value, {
            fallbackValue: DAY.default,
            validValues: DAY.valid
        });
    }

    /**
     * The era formatting style to use for the secondary value.
     * Valid values include 2-digit and numeric.
     *
     * @type {string}
     * @public
     */
    @api
    get secondaryEra() {
        return this._secondaryEra;
    }
    set secondaryEra(value) {
        this._secondaryEra = normalizeString(value, {
            fallbackValue: ERA.default,
            validValues: ERA.valid
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
     * The hour formatting style to use for the secondary value.
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get secondaryHour() {
        return this._secondaryHour;
    }
    set secondaryHour(value) {
        this._secondaryHour = normalizeString(value, {
            fallbackValue: HOUR.default,
            validValues: HOUR.valid
        });
    }

    /**
     * Determines whether time is displayed as 12-hour for the secondary value.
     *
     * @type {boolean}
     * @public
     */
    @api
    get secondaryHour12() {
        return this._secondaryHour12;
    }
    set secondaryHour12(value) {
        this._secondaryHour12 = normalizeBoolean(value);
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
     * The minute formatting style to use for the secondary value.
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get secondaryMinute() {
        return this._secondaryMinute;
    }
    set secondaryMinute(value) {
        this._secondaryMinute = normalizeString(value, {
            fallbackValue: MINUTE.default,
            validValues: MINUTE.valid
        });
    }

    /**
     * The month formatting style to use for the secondary value.
     * Valid values include 2-digit, narrow, short, long and numeric.
     *
     * @type {string}
     * @public
     */
    @api
    get secondaryMonth() {
        return this._secondaryMonth;
    }
    set secondaryMonth(value) {
        this._secondaryMonth = normalizeString(value, {
            fallbackValue: MONTH.default,
            validValues: MONTH.valid
        });
    }

    /**
     * Position of the secondary value, relative to the value.
     *
     * @type {string}
     * @default right
     * @public
     */
    @api
    get secondaryPosition() {
        return this._secondaryPosition;
    }
    set secondaryPosition(value) {
        this._secondaryPosition = normalizeString(value, {
            validValues: POSITIONS.valid,
            fallbackValue: POSITIONS.default
        });
    }

    /**
     * The seconds formatting style to use for the secondary value.
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get secondarySecond() {
        return this._secondarySecond;
    }
    set secondarySecond(value) {
        this._secondarySecond = normalizeString(value, {
            fallbackValue: SECOND.default,
            validValues: SECOND.valid
        });
    }

    /**
     * If present, the secondary value will change color and background depending on the trend direction.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get secondaryShowTrendColor() {
        return this._secondaryShowTrendColor;
    }
    set secondaryShowTrendColor(value) {
        this._secondaryShowTrendColor = normalizeBoolean(value);
    }

    /**
     * The time zone name format to use for the secondary value.
     * Valid values include short and long.
     *
     * @type {string}
     * @public
     */
    @api
    get secondaryTimeZoneName() {
        return this._secondaryTimeZoneName;
    }
    set secondaryTimeZoneName(value) {
        this._secondaryTimeZoneName = normalizeString(value, {
            fallbackValue: TIME_ZONE_NAME.default,
            validValues: TIME_ZONE_NAME.valid
        });
    }

    /**
     * Number at which the secondary value will be considered neutral. Works in association with `secondary-trend-icon` and `secondary-show-trend-color`.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get secondaryTrendBreakpointValue() {
        return this._secondaryTrendBreakpointValue;
    }
    set secondaryTrendBreakpointValue(value) {
        const normalizedNumber = Number(value);
        this._secondaryTrendBreakpointValue = isNaN(normalizedNumber)
            ? DEFAULT_TREND_BREAKPOINT_VALUE
            : normalizedNumber;
    }

    /**
     * Type of icon indicating the trend direction of the secondary value. Valid values include dynamic, arrow and caret.
     *
     * @type {string}
     * @public
     */
    @api
    get secondaryTrendIcon() {
        return this._secondaryTrendIcon;
    }
    set secondaryTrendIcon(value) {
        this._secondaryTrendIcon = normalizeString(value, {
            fallbackValue: TREND_ICONS.default,
            validValues: TREND_ICONS.valid
        });
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
        const normalizedNumber = value === null ? undefined : Number(value);
        this._secondaryValue = isFinite(normalizedNumber)
            ? normalizedNumber
            : undefined;
    }

    /**
     * If present, a spinner is displayed to indicate that the secondary value is loading.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get secondaryValueIsLoading() {
        return this._secondaryValueIsLoading;
    }
    set secondaryValueIsLoading(value) {
        this._secondaryValueIsLoading = normalizeBoolean(value);
    }

    /**
     * Determine what signs are allowed to be displayed in front of the secondary value, to indicate that it is positive or negative.
     * Valid values include negative, positive-and-negative or none.
     *
     * @type {string}
     * @default negative
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
     * If present, the value will change color depending on the trend direction.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get showTrendColor() {
        return this._showTrendColor;
    }
    set showTrendColor(value) {
        this._showTrendColor = normalizeBoolean(value);
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
            fallbackValue: TIME_ZONE_NAME.default,
            validValues: TIME_ZONE_NAME.valid
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
     * Value of the primary metric.
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
     * If present, a spinner is displayed to indicate that the value is loading.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get valueIsLoading() {
        return this._valueIsLoading;
    }
    set valueIsLoading(value) {
        this._valueIsLoading = normalizeBoolean(value);
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
     * @default narrow
     * @public
     */
    @api
    get weekday() {
        return this._weekday;
    }
    set weekday(value) {
        this._weekday = normalizeString(value, {
            fallbackValue: WEEKDAY.default,
            validValues: WEEKDAY.valid
        });
    }

    /**
     * The year formatting style to use.
     * Valid values include 2-digit and numeric.
     *
     * @type {string}
     * @default numeric
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
     * Computed CSS classes for the avatar.
     *
     * @type {string}
     */
    get computedAvatarClass() {
        const position = normalizeString(this.avatar.position, {
            fallbackValue: AVATAR_POSITIONS.default,
            validValues: AVATAR_POSITIONS.valid
        });

        return classSet('avonni-metric__avatar')
            .add({
                'slds-m-right_x-small': position === 'left',
                'avonni-metric__avatar_after-text slds-m-left_x-small':
                    position === 'right',
                'slds-m-bottom_x-small slds-size_1-of-1': position === 'top',
                'slds-m-top_x-small avonni-metric__avatar_after-text slds-size_1-of-1':
                    position === 'bottom'
            })
            .toString();
    }

    get computedMetricsClass() {
        const position = this.secondaryPosition;
        return classSet('avonni-metric__primary-and-secondary-wrapper')
            .add({
                'slds-grid slds-wrap': position !== 'bottom',
                'slds-grid_vertical-align-end':
                    position === 'left' || position === 'right',
                'slds-grid_reverse': position === 'left',
                'slds-grid_vertical-reverse': position === 'top'
            })
            .toString();
    }

    /**
     * Computed CSS classes for the primary metric.
     *
     * @type {string}
     */
    get computedPrimaryClass() {
        const position = this.secondaryPosition;
        const classes = classSet('avonni-metric__primary').add({
            'slds-show_inline-block':
                position === 'bottom' || position === 'top',
            'slds-m-right_x-small':
                isFinite(this.secondaryValue) && position === 'right',
            'slds-m-left_x-small':
                isFinite(this.secondaryValue) && position === 'left',
            'slds-show': position === 'left' || position === 'right'
        });

        if (this.showTrendColor) {
            const isPositive = this.value > this.trendBreakpointValue;
            const isNegative = this.value < this.trendBreakpointValue;
            classes.add({
                'avonni-metric__primary_neutral-trend':
                    !isPositive && !isNegative,
                'avonni-metric__primary_positive-trend': isPositive,
                'avonni-metric__primary_negative-trend': isNegative
            });
        }
        return classes.toString();
    }

    /**
     * Computed CSS classes for the secondary metric.
     *
     * @type {string}
     */
    get computedSecondaryClass() {
        const position = this.secondaryPosition;
        const classes = classSet('avonni-metric__secondary').add({
            'slds-show_inline-block':
                position === 'bottom' || position === 'top',
            'slds-show': position === 'left' || position === 'right'
        });

        if (this.secondaryShowTrendColor) {
            const isPositive =
                this.secondaryValue > this.secondaryTrendBreakpointValue;
            const isNegative =
                this.secondaryValue < this.secondaryTrendBreakpointValue;
            classes
                .add({
                    'avonni-metric__secondary_neutral-trend':
                        !isPositive && !isNegative,
                    'avonni-metric__secondary_positive-trend': isPositive,
                    'avonni-metric__secondary_negative-trend': isNegative
                })
                .toString();
        }
        return classes.toString();
    }

    /**
     * True if the secondary metric should be visible.
     *
     * @type {boolean}
     */
    get showSecondaryMetric() {
        return isFinite(this.secondaryValue);
    }

    /**
     * True if the label should be shown at the top.
     *
     * @type {boolean}
     */
    get showTopLabel() {
        return this.labelPosition === 'top';
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

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    handlePrimaryMetricClick() {
        /**
         * The event fired when the primary metric is clicked.
         *
         * @event
         * @name metricclick
         * @public
         * @bubbles
         */
        this.dispatchEvent(new CustomEvent('metricclick'));
    }

    handleSecondaryMetricClick() {
        /**
         * The event fired when the secondary metric is clicked.
         *
         * @event
         * @name secondarymetricclick
         * @public
         * @bubbles
         */
        this.dispatchEvent(new CustomEvent('secondarymetricclick'));
    }
}
