import { FieldConstraintApi, InteractingState } from 'c/inputUtils';
import { DateTime } from 'c/luxon';
import {
    dateTimeObjectFrom,
    getStartOfWeek,
    getWeekday,
    intervalFrom,
    isInTimeFrame
} from 'c/luxonDateTimeUtils';
import { AvonniResizeObserver } from 'c/resizeObserver';
import { TIME_ZONES } from 'c/timeZones';
import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { equal } from 'c/utilsPrivate';
import { LightningElement, api } from 'lwc';

const DATE_PICKER_MOUSE_MOVE_OFFSET = 25;
const DATE_PICKER_VARIANTS = {
    valid: ['input', 'inline'],
    default: 'input'
};
const DATE_TIME_FORMATS = {
    valid: ['numeric', '2-digit'],
    dayDefault: 'numeric',
    hourDefault: 'numeric',
    minuteDefault: '2-digit'
};
const DATE_TIME_TYPES = {
    valid: ['radio', 'checkbox'],
    default: 'radio'
};
const DATE_TIME_VARIANTS = {
    valid: ['daily', 'weekly', 'inline', 'timeline', 'monthly'],
    default: 'daily'
};
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DEFAULT_END_TIME = '18:00';
const DEFAULT_INLINE_DATE_PICKER_VISIBLE_DAYS = 7;
const DEFAULT_MAX = '2099-12-31';
const DEFAULT_MIN = '1900-01-01';
const DEFAULT_NEXT_DATES_BUTTON_ALTERNATIVE_TEXT = 'Next dates';
const DEFAULT_NEXT_WEEK_BUTTON_ALTERNATIVE_TEXT = 'Next week';
const DEFAULT_NO_RESULTS_MESSAGE = 'No available time slots for this period.';
const DEFAULT_PREVIOUS_DATES_BUTTON_ALTERNATIVE_TEXT = 'Previous dates';
const DEFAULT_PREVIOUS_WEEK_BUTTON_ALTERNATIVE_TEXT = 'Previous week';
const DEFAULT_REQUIRED_ALTERNATIVE_TEXT = 'Required';
const DEFAULT_START_TIME = '08:00';
const DEFAULT_TIME_SLOT_DURATION = 1800000;
const DEFAULT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
const DEFAULT_TIME_ZONE_LABEL = 'Time Zone:';
const DEFAULT_TIME_ZONE_PLACEHOLDER = 'Select time zone';
const DEFAULT_TODAY_BUTTON_LABEL = 'Today';
const DEFAULT_WEEK_START_DAY = 0;
const MIN_INLINE_DATE_PICKER_DATE_WIDTH = 60;
const MONTH_FORMATS = {
    valid: ['2-digit', 'numeric', 'narrow', 'short', 'long'],
    default: 'long'
};
const TIME_DATE = '1970-01-02';
const WEEKDAY_FORMATS = {
    valid: ['narrow', 'short', 'long'],
    default: 'short'
};

/**
 * @class
 * @public
 * @storyId example-date-time-picker--daily
 * @descriptor avonni-date-time-picker
 */
export default class DateTimePicker extends LightningElement {
    /**
     * Help text detailing the purpose and function of the input.
     *
     * @type {string}
     * @public
     */
    @api fieldLevelHelp;
    /**
     * Text label for the input.
     *
     * @type {string}
     * @required
     * @public
     */
    @api label;
    /**
     * Error message to be displayed when the value is missing.
     * The valueMissing error can be returned when you specify the required attribute for any input type.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;
    /**
     * Specifies the name of an input element.
     *
     * @type {string}
     * @public
     */
    @api name;
    /**
     * Alternative text for the next dates button.
     *
     * @type {string}
     * @public
     * @default Next dates
     */
    @api nextDatesButtonAlternativeText =
        DEFAULT_NEXT_DATES_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the next week button.
     *
     * @type {string}
     * @public
     * @default Next week
     */
    @api nextWeekButtonAlternativeText =
        DEFAULT_NEXT_WEEK_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Message to be displayed when there are no available time slots for the selected period.
     *
     * @type {string}
     * @public
     * @default No available time slots for this period.
     */
    @api noResultsMessage = DEFAULT_NO_RESULTS_MESSAGE;
    /**
     * Alternative text for the previous dates button.
     *
     * @type {string}
     * @public
     * @default Previous dates
     */
    @api previousDatesButtonAlternativeText =
        DEFAULT_PREVIOUS_DATES_BUTTON_ALTERNATIVE_TEXT;
    /**
     * Alternative text for the previous week button.
     *
     * @type {string}
     * @public
     * @default Previous week
     */
    @api previousWeekButtonAlternativeText =
        DEFAULT_PREVIOUS_WEEK_BUTTON_ALTERNATIVE_TEXT;
    /**
     * The assistive text when the required attribute is set to true.
     *
     * @type {string}
     * @public
     * @default Required
     */
    @api requiredAlternativeText = DEFAULT_REQUIRED_ALTERNATIVE_TEXT;
    /**
     * The label for the time zone.
     *
     * @type {string}
     * @public
     * @default Time Zone:
     */
    @api timezoneLabel = DEFAULT_TIME_ZONE_LABEL;
    /**
     * The placeholder for the time zone combobox.
     *
     * @type {string}
     * @public
     * @default Select time zone
     */
    @api timezonePlaceholder = DEFAULT_TIME_ZONE_PLACEHOLDER;
    /**
     * The label for the today button.
     *
     * @type {string}
     * @public
     * @default Today
     */
    @api todayButtonLabel = DEFAULT_TODAY_BUTTON_LABEL;

    _avatar = {};
    _dateFormatDay = DATE_TIME_FORMATS.dayDefault;
    _dateFormatMonth = MONTH_FORMATS.default;
    _dateFormatWeekday = WEEKDAY_FORMATS.default;
    _dateFormatYear;
    _datePickerVariant = DATE_PICKER_VARIANTS.default;
    _disabled = false;
    _disabledDateTimes = [];
    _displayNextButton = false;
    _endTime = DEFAULT_END_TIME;
    _hideDateLabel = false;
    _hideDatePicker = false;
    _hideLabel;
    _hideNavigation = false;
    _max = DEFAULT_MAX;
    _min = DEFAULT_MIN;
    _readOnly = false;
    _required = false;
    _startTime = DEFAULT_START_TIME;
    _timeSlotDuration = DEFAULT_TIME_SLOT_DURATION;
    _timeSlots;
    _timeFormatHour;
    _timeFormatHour12;
    _timeFormatMinute;
    _timeFormatSecond;
    _timezone = DEFAULT_TIME_ZONE;
    _showEndTime;
    _showDisabledDates;
    _type = DATE_TIME_TYPES.default;
    _showTimeZone = false;
    _value;
    _variant = DATE_TIME_VARIANTS.default;
    _weekStartDay = DEFAULT_WEEK_START_DAY;

    computedMax;
    computedMin;
    datePickerValue;
    datePickerWeekdays = [];
    firstWeekDay;
    helpMessage;
    lastWeekDay;
    markedDates = [];
    showActionsSlot = true;
    table;
    timezones = TIME_ZONES;

    _computedEndTime;
    _computedStartTime;
    _computedValue = [];
    _connected = false;
    _containerWidthWhenLastResized = 0;
    _dayLabelBorderPosition = 0;
    _goToDate;
    _inlineDatePickerFirstDay;
    _inlineDatePickerMaxVisibleDays = DEFAULT_INLINE_DATE_PICKER_VISIBLE_DAYS;
    _resizeIsHandledByParent = false;
    _resizeObserver;
    _selectedDayTime = [];
    _today;
    _timeSlotMinHeight = 0;
    _timeSlotMinWidth = 0;
    _valid = true;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._initDates();
        this._setFirstWeekDay();

        // If no time format is provided, defaults to hour:minutes (0:00)
        // The default is set here so it is possible to have only the hour, minutes:seconds, etc.
        this._initTimeFormat();

        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this._connected = true;

        /**
         * The event fired when the date time picker is inserted in the DOM.
         *
         * @event
         * @name privatedatetimepickerconnected
         * @param {object} callbacks Object with two keys:
         * * `renderDateTimePicker`: When called, the date time picker is render again.
         * * `setIsResizedByParent`: If called with `true`, the resizing of the date time picker is handled by its parent.
         * @bubbles
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('privatedatetimepickerconnected', {
                detail: {
                    callbacks: {
                        renderDateTimePicker:
                            this.renderDateTimePicker.bind(this),
                        setIsResizedByParent:
                            this.setIsResizedByParent.bind(this)
                    }
                },
                composed: true,
                bubbles: true
            })
        );
    }

    renderedCallback() {
        if (!this._resizeObserver && !this._resizeIsHandledByParent) {
            this._initResizeObserver();
        } else if (this._resizeObserver && this._resizeIsHandledByParent) {
            this._removeResizeObserver();
        }

        if (this._goToDate) {
            const monthlyCalendar = this.template.querySelector(
                '[data-element-id="avonni-calendar"]'
            );
            if (monthlyCalendar) {
                monthlyCalendar.goToDate(this._goToDate);
            }
            this._goToDate = undefined;
        }

        if (this.actionSlot) {
            this.showActionsSlot =
                this.actionSlot.assignedElements().length !== 0;
        }
    }

    disconnectedCallback() {
        this._removeResizeObserver();

        /**
         * The event fired when the layout is removed from the DOM.
         *
         * @event
         * @name privatedatetimepickerdisconnected
         * @bubbles
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('privatedatetimepickerdisconnected', {
                composed: true,
                bubbles: true
            })
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Avatar object. The avatar will be displayed in the header, to the left of the label.
     *
     * @type {object}
     * @public
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = normalizeObject(value);
    }

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @default numeric
     * @public
     */
    @api
    get dateFormatDay() {
        return this._dateFormatDay;
    }
    set dateFormatDay(value) {
        this._dateFormatDay = normalizeString(value, {
            fallbackValue: DATE_TIME_FORMATS.dayDefault,
            validValues: DATE_TIME_FORMATS.valid
        });

        if (this._connected && this.variant === 'weekly') {
            this._generateTable();

            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * Valid values are numeric, 2-digit, long, short or narrow.
     *
     * @type {string}
     * @default long
     * @public
     */
    @api
    get dateFormatMonth() {
        return this._dateFormatMonth;
    }
    set dateFormatMonth(value) {
        this._dateFormatMonth = normalizeString(value, {
            fallbackValue: MONTH_FORMATS.default,
            validValues: MONTH_FORMATS.valid
        });
    }

    /**
     * Specifies how to display the day of the week. Valid values are narrow, short, or long.
     *
     * @type {string}
     * @default short
     * @public
     */
    @api
    get dateFormatWeekday() {
        return this._dateFormatWeekday;
    }
    set dateFormatWeekday(value) {
        this._dateFormatWeekday = normalizeString(value, {
            fallbackValue: WEEKDAY_FORMATS.default,
            validValues: WEEKDAY_FORMATS.valid
        });

        if (this._connected && this.variant === 'weekly') {
            this._generateTable();
        }
    }

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get dateFormatYear() {
        return this._dateFormatYear;
    }
    set dateFormatYear(value) {
        this._dateFormatYear = normalizeString(value, {
            validValues: DATE_TIME_FORMATS.valid
        });
    }

    /**
     * Variant of the date picker displayed in the header. Valid values include input and inline.
     *
     * @type {string}
     * @default input
     * @public
     */
    @api
    get datePickerVariant() {
        return this._datePickerVariant;
    }
    set datePickerVariant(value) {
        this._datePickerVariant = normalizeString(value, {
            fallbackValue: DATE_PICKER_VARIANTS.default,
            validValues: DATE_PICKER_VARIANTS.valid
        });

        if (this._connected && this.showInlineDatePicker) {
            this._setInlineDatePickerFirstDay();
            this._createDatePickerWeekdays();
        }
    }

    /**
     * If present, the date time picker is disabled and users cannot interact with it.
     *
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

        if (this._connected) {
            this._initTimeFormat();
            this._processValue();
            this._generateTable();
        }
    }

    /**
     * Array of disabled dates. The dates must be Date objects or valid ISO8601 strings.
     *
     * @type {object[]}
     * @public
     */
    @api
    get disabledDateTimes() {
        return this._disabledDateTimes;
    }
    set disabledDateTimes(value) {
        this._disabledDateTimes = normalizeArray(value);

        if (this._connected) {
            this._processValue();
            this._generateTable();

            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * If present, display a next button after selecting a time slot.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get displayNextButton() {
        return this._displayNextButton;
    }
    set displayNextButton(value) {
        this._displayNextButton = normalizeBoolean(value);
    }

    /**
     * End of the time slots. Must be an ISO8601 formatted time string.
     *
     * @type {string}
     * @default 18:00
     * @public
     */
    @api
    get endTime() {
        return this._endTime;
    }
    set endTime(value) {
        const isValid = value && this._processDate(`${TIME_DATE}T${value}`);
        this._endTime = isValid ? value : DEFAULT_END_TIME;

        if (this._connected) {
            this._computedEndTime = this._processDate(
                `${TIME_DATE}T${this.endTime}`
            );
            this._initTimeSlots();
            this._processValue();
            this._generateTable();

            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * If present, hide the currently visible date or date range.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideDateLabel() {
        return this._hideDateLabel;
    }
    set hideDateLabel(value) {
        this._hideDateLabel = normalizeBoolean(value);
    }

    /**
     * If present, hide the date picker button.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideDatePicker() {
        return this._hideDatePicker;
    }
    set hideDatePicker(value) {
        this._hideDatePicker = normalizeBoolean(value);
    }

    /**
     * If present, hides the label.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideLabel() {
        return this._hideLabel;
    }
    set hideLabel(boolean) {
        this._hideLabel = normalizeBoolean(boolean);
    }

    /**
     * If present, hide next, previous and today buttons.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideNavigation() {
        return this._hideNavigation;
    }
    set hideNavigation(value) {
        this._hideNavigation = normalizeBoolean(value);
    }

    /**
     * Maximum date the calendar can show. The value should be a Date object, a timestamp, or an ISO8601 formatted string.
     *
     * @type {object|string}
     * @default 2099-12-31
     * @public
     */
    @api
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = this._processDate(value) ? value : DEFAULT_MAX;

        if (this._connected) {
            this.computedMax = this._processDate(this.max).endOf('day');
            this._setFirstWeekDay();
            this._processValue();
        }
    }

    /**
     * Minimum date the calendar can show. The value should be a Date object, a timestamp, or an ISO8601 formatted string.
     *
     * @type {object|string}
     * @default 1900-01-01
     * @public
     */
    @api
    get min() {
        return this._min;
    }
    set min(value) {
        this._min = this._processDate(value) ? value : DEFAULT_MIN;

        if (this._connected) {
            this.computedMin = this._processDate(this.min).startOf('day');
            const firstDay =
                this._today < this.computedMin ? this.computedMin : this._today;
            this._setFirstWeekDay(firstDay);
            this._processValue();
            this._generateTable();
        }
    }

    /**
     * If present, the input field is read-only and cannot be edited by users.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(boolean) {
        this._readOnly = normalizeBoolean(boolean);
    }

    /**
     * If present, the input field must be filled out before the form is submitted.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get required() {
        return this._required;
    }
    set required(boolean) {
        this._required = normalizeBoolean(boolean);
    }

    /**
     * If present, show the disabled dates in the date time picker.
     * Ex: 1:00 PM - 1:30 PM.
     *
     * @type {boolean}
     * @public
     */
    @api
    get showDisabledDates() {
        return this._showDisabledDates;
    }
    set showDisabledDates(boolean) {
        this._showDisabledDates = normalizeBoolean(boolean);

        if (this._connected) {
            this._generateTable();

            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * If present, show the end time in each slots.
     * Ex: 1:00 PM - 1:30 PM.
     *
     * @type {boolean}
     * @public
     */
    @api
    get showEndTime() {
        return this._showEndTime;
    }
    set showEndTime(boolean) {
        this._showEndTime = normalizeBoolean(boolean);

        if (this._connected) {
            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * If present, show the time zone.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get showTimeZone() {
        return this._showTimeZone;
    }
    set showTimeZone(value) {
        this._showTimeZone = normalizeBoolean(value);
    }

    /**
     * Start of the time slots. Must be an ISO8601 formatted time string.
     *
     * @type {string}
     * @default 08:00
     * @public
     */
    @api
    get startTime() {
        return this._startTime;
    }
    set startTime(value) {
        const isValid = value && this._processDate(`${TIME_DATE}T${value}`);
        this._startTime = isValid ? value : DEFAULT_START_TIME;

        if (this._connected) {
            this._computedStartTime = this._processDate(
                `${TIME_DATE}T${this.startTime}`
            );
            this._initTimeSlots();
            this._processValue();
            this._generateTable();

            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @default numeric
     * @public
     */
    @api
    get timeFormatHour() {
        return this._timeFormatHour || undefined;
    }
    set timeFormatHour(value) {
        this._timeFormatHour = normalizeString(value, {
            validValues: DATE_TIME_FORMATS.valid
        });

        if (this._connected) {
            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * Determines whether time is displayed as 12-hour.
     * If false, time displays as 24-hour. The default setting is determined by the user's locale.
     *
     * @type {boolean}
     * @public
     */
    @api
    get timeFormatHour12() {
        return this._timeFormatHour12;
    }
    set timeFormatHour12(boolean) {
        if (boolean !== undefined) {
            this._timeFormatHour12 = normalizeBoolean(boolean);
        }

        if (this._connected) {
            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @default 2-digit
     * @public
     */
    @api
    get timeFormatMinute() {
        return this._timeFormatMinute || undefined;
    }
    set timeFormatMinute(value) {
        this._timeFormatMinute = normalizeString(value, {
            validValues: DATE_TIME_FORMATS.valid
        });

        if (this._connected) {
            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * Valid values include numeric and 2-digit.
     *
     * @type {string}
     * @public
     */
    @api
    get timeFormatSecond() {
        return this._timeFormatSecond || undefined;
    }
    set timeFormatSecond(value) {
        this._timeFormatSecond = normalizeString(value, {
            validValues: DATE_TIME_FORMATS.valid
        });

        if (this._connected) {
            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * Duration of each time slot. Must be an ISO8601 formatted time string.
     *
     * @type {string}
     * @default 00:30
     * @public
     */
    @api
    get timeSlotDuration() {
        return this._timeSlotDuration;
    }
    set timeSlotDuration(value) {
        const duration =
            typeof value === 'string' &&
            value.match(/(\d{2}):(\d{2}):?(\d{2})?/);
        let durationMilliseconds = 0;
        if (duration) {
            const durationHours = parseInt(duration[1], 10);
            const durationMinutes = parseInt(duration[2], 10);
            const durationSeconds = parseInt(duration[3], 10) || 0;
            durationMilliseconds =
                durationHours * 3600000 +
                durationMinutes * 60000 +
                durationSeconds * 1000;
        }

        // Return duration in ms. Default value is 00:30.
        this._timeSlotDuration =
            durationMilliseconds > 0
                ? durationMilliseconds
                : DEFAULT_TIME_SLOT_DURATION;

        if (this._connected) {
            this._initTimeSlots();
            this._processValue();
            this._generateTable();

            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * Time zone used, in a valid IANA format. If empty, the browser's time zone is used.
     *
     * @type {string}
     * @public
     */
    @api
    get timezone() {
        return this._timezone;
    }
    set timezone(value) {
        this._timezone = value || DEFAULT_TIME_ZONE;

        if (this._connected) {
            this._initDates();
            const firstDay =
                this._today < this.computedMin ? this.computedMin : this._today;
            this._setFirstWeekDay(firstDay);
            this._generateTable();

            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * Valid values include radio and checkbox.
     *
     * @type {string}
     * @default radio
     * @public
     */
    @api
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: DATE_TIME_TYPES.default,
            validValues: DATE_TIME_TYPES.valid
        });
        if (this._connected) {
            this._processValue();
            this._generateTable();
        }
    }

    /**
     * Represents the validity states that an element can be in, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api
    get validity() {
        return this._constraint.validity;
    }

    /**
     * The value of the date selected, which can be a Date object, timestamp, or an ISO8601 formatted string.
     *
     * @type {string}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        const normalizedCurrentValue =
            this.value && !Array.isArray(this.value)
                ? [this.value]
                : normalizeArray(this.value);
        const normalizedNewValue =
            value && !Array.isArray(value) ? [value] : normalizeArray(value);
        if (equal(normalizedCurrentValue, normalizedNewValue)) {
            return;
        }
        this._value = value;

        if (this._connected) {
            this._processValue();
            this._setFirstWeekDay();
        }
    }

    /**
     * The variant changes the appearance of the time picker.
     * Accepted variants include daily, weekly, monthly, inline and timeline.
     *
     * @type {string}
     * @default daily
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: DATE_TIME_VARIANTS.default,
            validValues: DATE_TIME_VARIANTS.valid
        });

        if (this._connected) {
            this._setFirstWeekDay();

            if (this.isMonthly) {
                this._initMarkedDates();
            }

            requestAnimationFrame(() => {
                this._queueRecompute();
            });
        }
    }

    /**
     * Day displayed as the first day of the week. The value has to be a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get weekStartDay() {
        return this._weekStartDay;
    }
    set weekStartDay(value) {
        const number = parseInt(value, 10);
        this._weekStartDay =
            isNaN(number) || number < 0 || number > 6
                ? DEFAULT_WEEK_START_DAY
                : number;

        if (this._connected) {
            this.firstWeekDay =
                this.variant === 'weekly'
                    ? getStartOfWeek(this.firstWeekDay, this.weekStartDay)
                    : this.firstWeekDay;
            this._generateTable();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Get actions slot DOM element.
     *
     * @type {Element}
     */
    get actionSlot() {
        return this.template.querySelector('slot[name=actions]');
    }

    /**
     * Computed CSS style of the day label border.
     *
     * @type {string}
     */
    get computedDayLabelBorderStyle() {
        if (!this.isWeekly) {
            return '';
        }
        let style =
            this._dayLabelBorderPosition > 0
                ? `top: ${this._dayLabelBorderPosition}px`
                : 'display: none';
        return `${style}`;
    }

    /**
     * Computed CSS classes of the hour table.
     *
     * @type {string}
     */
    get computedTableClass() {
        return classSet(
            `slds-show slds-scrollable_x avonni-date-time-picker__hour-table avonni-date-time-picker__hour-table-${this.variant}`
        );
    }

    /**
     * Computed CSS style of the time slots.
     *
     * @type {string}
     */
    get computedTimeSlotStyle() {
        if (this.isMonthly || this.isDaily) {
            return '';
        }
        let widthStyle =
            this._timeSlotMinWidth > 0
                ? `min-width: ${this._timeSlotMinWidth}px`
                : 'width: fit-content';
        let heightStyle =
            this._timeSlotMinHeight > 0
                ? `min-height: ${this._timeSlotMinHeight}px`
                : 'height: fit-content';
        return `${widthStyle}; ${heightStyle}`;
    }

    /**
     * Retrieve constraint API for validation.
     *
     * @type {object}
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled &&
                    this.required &&
                    !this._computedValue.length
            });
        }
        return this._constraintApi;
    }

    /**
     * Returns a string with the date range depending on if variant is weekly or not.
     *
     * @type {string}
     */
    get currentDateRangeString() {
        const options = {
            month: this.dateFormatMonth,
            day: this.dateFormatDay
        };

        if (this.dateFormatYear) options.year = this.dateFormatYear;

        const firstWeekDay = this.firstWeekDay.toLocaleString({
            weekday: this.dateFormatWeekday
        });
        const firstDay = this.firstWeekDay.toLocaleString(options);
        const lastDay = this.lastWeekDay.toLocaleString(options);

        return this.variant === 'weekly'
            ? `${firstDay} - ${lastDay}`
            : `${firstWeekDay}, ${firstDay}`;
    }

    /**
     * Size of the date picker column, depending on its variant.
     *
     * @type {string}
     */
    get datePickerColumnSize() {
        return this.showInlineDatePicker ? '12' : 'auto';
    }

    /**
     * Returns an array of all the disabled weekdays.
     *
     * @type {array}
     */
    get _disabledWeekDays() {
        let dates = [];

        this.disabledDateTimes.forEach((date) => {
            if (typeof date === 'string') {
                dates.push(DAYS.indexOf(date));
            }
        });

        return dates;
    }

    /**
     * Returns an array of all the disabled monthdays.
     *
     * @type {array}
     */
    get _disabledMonthDays() {
        let dates = [];

        this.disabledDateTimes.forEach((date) => {
            if (typeof date === 'number') {
                dates.push(date);
            }
        });

        return dates;
    }

    /**
     * Returns true if every day is disabled. It disables the entire period.
     *
     * @type {boolean}
     */
    get entirePeriodIsDisabled() {
        return this.table.every((day) => day.disabled);
    }

    /**
     * Returns first weekday in an ISO8601 string format.
     *
     * @type {string}
     */
    get firstWeekDayToString() {
        return this.firstWeekDay.toISO();
    }

    /**
     * Returns true if variant is daily.
     *
     * @type {boolean}
     */
    get isDaily() {
        return this.variant === 'daily';
    }

    /**
     * Returns true if the variant is inline.
     *
     * @type {boolean}
     */
    get isInline() {
        return this.variant === 'inline';
    }

    /**
     * Returns true if variant is monthly.
     *
     * @type {boolean}
     */
    get isMonthly() {
        return this.variant === 'monthly';
    }

    /**
     * Returns true if variant is timeline.
     *
     * @type {boolean}
     */
    get isTimeline() {
        return this.variant === 'timeline';
    }

    /**
     * Returns true if variant is weekly.
     *
     * @type {boolean}
     */
    get isWeekly() {
        return this.variant === 'weekly';
    }

    /**
     * Returns max in an ISO8601 string format.
     *
     * @type {string}
     */
    get maxToString() {
        return this.computedMax.toISO();
    }

    /**
     * Returns min in an ISO8601 string format.
     *
     * @type {string}
     */
    get minToString() {
        return this.computedMin.toISO();
    }

    /**
     * Returns true if the last weekday is bigger than min. It disables the next button.
     *
     * @type {boolean}
     */
    get nextButtonIsDisabled() {
        return this.lastWeekDay >= this.computedMax;
    }

    /**
     * Returns true if the first weekday is smaller than min. It disables the prev button.
     *
     * @type {boolean}
     */
    get prevButtonIsDisabled() {
        return this.firstWeekDay <= this.computedMin;
    }

    /**
     * True if the avatar should be shown.
     *
     * @type {boolean}
     */
    get showAvatar() {
        return !!(
            this.avatar.src ||
            this.avatar.fallbackIconName ||
            this.avatar.initials
        );
    }

    /**
     * True if the date picker variant is inline.
     *
     * @type {boolean}
     */
    get showInlineDatePicker() {
        return this.datePickerVariant === 'inline';
    }

    /**
     * Returns the direction of the picker depending on the variant.
     *
     * @type {string}
     */
    get tableDirection() {
        return this.isInline ? 'row' : 'column';
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Checks if the input is valid.
     *
     * @returns {boolean} True if the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    /**
     * Set the focus on the date time picker.
     *
     * @public
     */
    @api
    focus() {
        const focusableElement =
            this.template.querySelector('[data-focusable]');
        if (focusableElement) {
            focusableElement.focus();
        }
    }

    /**
     * Return the position of the date range label.
     *
     * @returns {DOMRect} Position of the date range label.
     * @public
     */
    @api
    getDateRangeBounds() {
        const dateRange = this.template.querySelector(
            '[data-element-id="p-date-label"]'
        );
        return dateRange ? dateRange.getBoundingClientRect() : {};
    }

    /**
     * Move the position of the picker so the specified date is visible.
     *
     * @param {(string | number | Date)} date Date the picker should be positioned on.
     * @param {boolean} disableRender If present, the picker is rendered again.
     * @public
     */
    @api
    goToDate(date, disableRender) {
        const normalizedDate = this._processDate(date);
        if (!normalizedDate) {
            console.error(
                `Invalid date passed to the goToDate() method: ${date} \nThe date must be a valid date string, timestamp, or Date object.`
            );
            return;
        }
        this.firstWeekDay =
            this.variant === 'weekly'
                ? getStartOfWeek(normalizedDate, this.weekStartDay)
                : normalizedDate;
        this.datePickerValue =
            this.datePickerVariant === 'inline'
                ? normalizedDate.toISO()
                : this.firstWeekDayToString;
        this._generateTable();
        this._goToDate = normalizedDate;

        if (this._connected) {
            if (!disableRender) {
                requestAnimationFrame(() => {
                    this._queueRecompute();
                });
            }
            this._dispatchNavigate();
        }
    }

    /**
     * Displays the error messages. If the input is valid, <code>reportValidity()</code> clears displayed error messages.
     *
     * @returns {boolean} False if invalid, true if valid.
     * @public
     */
    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this.helpMessage = message;
        });
    }

    /**
     * Sets a custom error message to be displayed when a form is submitted.
     *
     * @param {string} message The string that describes the error. If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    setIsResizedByParent(value) {
        this._resizeIsHandledByParent = normalizeBoolean(value);
    }

    /**
     * Displays error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when <code>checkValidity()</code> is called.
     *
     * @public
     */
    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();

        // Show errors on date picker
        const datePicker = this.template.querySelector(
            '[data-element-id="lightning-input"]'
        );
        if (datePicker) datePicker.reportValidity();
    }

    /**
     * Update the number of visible dates in the inline date picker.
     */
    updateInlineDatePickerMaxVisibleDays() {
        const datePickerWrapper = this.template.querySelector(
            '[data-element-id="div-inline-date-picker-wrapper"]'
        );
        if (!datePickerWrapper) {
            return;
        }
        const width = datePickerWrapper.offsetWidth;
        let maxVisibleDates = Math.floor(
            width / MIN_INLINE_DATE_PICKER_DATE_WIDTH
        );
        maxVisibleDates =
            this._normalizeInlineDatePickerNumberOfVisibleDates(
                maxVisibleDates
            );

        if (this._inlineDatePickerMaxVisibleDays !== maxVisibleDates) {
            this._inlineDatePickerMaxVisibleDays = maxVisibleDates;
            this._setInlineDatePickerFirstDay();
            this._createDatePickerWeekdays();
        }
    }

    /**
     * Render the date time picker.
     */
    renderDateTimePicker() {
        const container = this.template.querySelector(
            '[data-element-id="avonni-date-time-picker"]'
        );
        const containerWidth = container.getBoundingClientRect().width;
        if (
            !this._connected ||
            this._containerWidthWhenLastResized === containerWidth
        ) {
            return;
        }
        this._containerWidthWhenLastResized = containerWidth;
        this.updateInlineDatePickerMaxVisibleDays();
        this._queueRecompute();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Create a luxon DateTime object from an ISO date that has no time.
     *
     * @param {string} date Date string to transform.
     * @returns {DateTime|boolean} Returns a DateTime object or false if the string is not an ISO date with no time.
     */
    _createDateTimeFromDateString(date) {
        const isDateWithoutTime =
            typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/);
        if (!isDateWithoutTime) {
            return false;
        }
        const dateParts = date.split('-');
        const year = Number(dateParts[0]);
        const month = Number(dateParts[1]);
        const day = Number(dateParts[2]);
        return this._processDate(new Date())
            .set({ year, month, day })
            .startOf('day');
    }

    /**
     * Compute the position of the border under the day label for weekly variant.
     */
    _computeDayLabelBorderPosition() {
        const labels = this.template.querySelectorAll(
            '[data-element-id="div-day-label"]'
        );
        let maxHeight = 0;
        labels.forEach((label) => {
            const labelRect = label.getBoundingClientRect();
            if (labelRect.height > maxHeight) {
                maxHeight = labelRect.height;
            }
        });
        this._dayLabelBorderPosition = maxHeight;
    }

    /**
     * Compute the min size for the time slot button.
     */
    _computeTimeSlotMinSize() {
        const timeSlotButtons = this.isTimeline
            ? this.template.querySelectorAll(
                  '[data-element-id="avonni-layout-item-time-timeline"]'
              )
            : this.template.querySelectorAll(
                  '[data-element-id="avonni-layout-item-time"]'
              );
        let minWidth = 0;
        let minHeight = 0;
        timeSlotButtons.forEach((timeSlotButton) => {
            const buttonRect = timeSlotButton.getBoundingClientRect();
            if (buttonRect.width > minWidth) {
                minWidth = buttonRect.width;
            }
            if (buttonRect.height > minHeight) {
                minHeight = buttonRect.height;
            }
        });
        this._timeSlotMinWidth = minWidth;
        this._timeSlotMinHeight = minHeight;
    }

    /**
     * Transform the given value into a Date object, or return null.
     *
     * @param {string} value The value of the date selected.
     * @returns {Date|boolean} Returns a date object or false.
     */
    _processDate(value) {
        return dateTimeObjectFrom(value, { zone: this.timezone });
    }

    /**
     * Processes the values to make sure it's an ISOstring.
     */
    _processValue() {
        this._computedValue = [];
        this._selectedDayTime = [];
        const normalizedValue =
            this.value && !Array.isArray(this.value)
                ? [this.value]
                : normalizeArray(this.value);

        if (this.type === 'checkbox') {
            normalizedValue.forEach((val) => {
                const date = this._validDate(val);
                if (date) {
                    this._selectedDayTime.push(date.ts);
                    this._computedValue.push(date.toISO());
                }
            });
        } else {
            const date = this._validDate(normalizedValue[0]);
            if (date) {
                this._selectedDayTime = [date.ts];
                this._computedValue = [date.toISO()];
            }
        }

        if (this.isMonthly) {
            this._initMarkedDates();
        }

        if (normalizedValue.length !== this._computedValue.length) {
            this._value =
                this.type === 'radio'
                    ? this._computedValue[0] || null
                    : [...this._computedValue];
            this._dispatchChange();
        }
    }

    _initDates() {
        this.computedMax = this._processDate(this.max).endOf('day');
        this.computedMin = this._processDate(this.min).startOf('day');
        this._computedEndTime = this._processDate(
            `${TIME_DATE}T${this.endTime}`
        );
        this._computedStartTime = this._processDate(
            `${TIME_DATE}T${this.startTime}`
        );
        this._today = this._processDate(new Date());
        this.datePickerValue = this._today.toISO();
        this._initTimeSlots();
        this._processValue();
    }

    _initMarkedDates() {
        const existingDates = new Set();
        this.markedDates = [];
        this._computedValue.forEach((value) => {
            const date = value.split('T')[0];
            if (!existingDates.has(date)) {
                existingDates.add(date);
                this.markedDates.push({ date: value });
            }
        });
    }

    _initResizeObserver() {
        const container = this.template.querySelector(
            '[data-element-id="avonni-date-time-picker"]'
        );
        if (!container) {
            return;
        }

        this._resizeObserver = new AvonniResizeObserver(container, () => {
            if (this._resizeIsHandledByParent) {
                return;
            }
            this.renderDateTimePicker();
        });
    }

    /**
     * Time slots initialization.
     */
    _initTimeSlots() {
        const timeSlots = [];
        let currentTime = this._computedStartTime;

        while (currentTime < this._computedEndTime) {
            timeSlots.push(
                new Date(currentTime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                })
            );
            currentTime = currentTime + this.timeSlotDuration;
        }
        this._timeSlots = timeSlots;
    }

    /**
     * Time format initialization.
     */
    _initTimeFormat() {
        if (
            !this.timeFormatHour &&
            !this.timeFormatMinute &&
            !this.timeFormatSecond
        ) {
            this._timeFormatHour = DATE_TIME_FORMATS.hourDefault;
            this._timeFormatMinute = DATE_TIME_FORMATS.minuteDefault;
        }
    }

    /**
     * Create the weekday items used by the date picker, when its variant is inline.
     *
     * @param {DateTime} firstVisibleDay The first day of the week to be displayed.
     */
    _createDatePickerWeekdays() {
        this.datePickerWeekdays = [];

        let selectedDay;
        if (this.datePickerValue) {
            const normalizedDate = this._processDate(this.datePickerValue);

            if (normalizedDate) {
                selectedDay = normalizedDate.startOf('day').ts;
            }
        }

        for (let i = 0; i < this._inlineDatePickerMaxVisibleDays; i++) {
            const date = this._inlineDatePickerFirstDay.plus({ days: i });
            const weekday = {
                date,
                monthLabel: date.toLocaleString({
                    month: this.dateFormatMonth
                }),
                weekdayLabel: date.toLocaleString({
                    weekday: this.dateFormatWeekday
                }),
                size: `calc(100% / ${this._inlineDatePickerMaxVisibleDays})`
            };
            if (date.startOf('day').ts === selectedDay) {
                weekday.isSelected = true;
            }
            this.datePickerWeekdays.push(weekday);
        }
    }

    /**
     * Center the picker on the right date.
     */
    _setFirstWeekDay() {
        let date = this._computedValue.length
            ? this._processDate(this._computedValue[0])
            : this._today;

        if (date < this.min) {
            date = this._processDate(this.min);
        } else if (date > this.max) {
            date = this._processDate(this.max);
        }
        this.goToDate(date, true);
    }

    _setInlineDatePickerFirstDay() {
        if (this._inlineDatePickerMaxVisibleDays === 7) {
            // Show the current week, starting on Sunday
            this._inlineDatePickerFirstDay = getStartOfWeek(
                this.firstWeekDay,
                this.weekStartDay
            );
        } else {
            // Show the selected day in the center of the date picker
            this._inlineDatePickerFirstDay = this.firstWeekDay.minus({
                days: Math.floor(this._inlineDatePickerMaxVisibleDays / 2)
            });
        }
    }

    /**
     * Generates table depending on the variant.
     */
    _generateTable() {
        const processedTable = [];
        const daysDisplayed = this.variant === 'weekly' ? 7 : 1;

        for (let i = 0; i < daysDisplayed; i++) {
            const day = this.firstWeekDay.plus({ days: i });

            // Create dayTime object
            const dayTime = {
                key: i,
                day,
                disabled: this.disabled || this._isDisabledDay(day),
                isToday:
                    this._today.startOf('day').ts === day.startOf('day').ts,
                times: []
            };

            // Add a label to the day only if variant is 'week'
            if (this.variant === 'weekly') {
                const labelWeekday = day.toLocaleString({
                    weekday: this.dateFormatWeekday
                });
                const labelDay = day.toLocaleString({
                    day: this.dateFormatDay
                });
                dayTime.label = `${labelWeekday} ${labelDay}`;
            }

            // Create the time slots
            this._createTimeSlots(dayTime);

            if (!dayTime.disabled) {
                // Update the disable state of the day,
                // in case all of its time slots are disabled
                dayTime.disabled = dayTime.times.every((time) => time.disabled);
            }
            dayTime.show = !dayTime.disabled || this.showDisabledDates;

            // Add the day to the table
            processedTable.push(dayTime);
        }

        this.lastWeekDay = processedTable[processedTable.length - 1].day;
        this.table = processedTable;

        if (this.showInlineDatePicker) {
            this._setInlineDatePickerFirstDay();
            this._createDatePickerWeekdays();
        }
    }

    //  /!\ Changes the dayTime object passed as argument.
    _createTimeSlots(dayTime) {
        this._timeSlots.forEach((timeSlot) => {
            // Add time to day
            const hours = parseInt(timeSlot.slice(0, 2), 10);
            const minutes = parseInt(timeSlot.slice(3, 5), 10);
            const seconds = parseInt(timeSlot.slice(6, 8), 10);
            const day = dayTime.day.set({
                hours,
                minutes,
                seconds,
                milliseconds: 0
            });

            const timestamp = day.ts;
            const endTime = this._processDate(
                new Date(timestamp + this.timeSlotDuration)
            );
            const disabled =
                dayTime.disabled || this._isDisabledTime(day, endTime);

            const selected = !disabled && this._isSelected(timestamp);
            if (selected) {
                dayTime.selected = true;
            }
            const displayNextButton = this.displayNextButton && selected;
            const startTimeLabel = day.toLocaleString({
                hour: this.timeFormatHour,
                minute: this.timeFormatMinute,
                second: this.timeFormatSecond,
                hour12: this.timeFormatHour12
            });
            let timeLabel = startTimeLabel;
            if (this.showEndTime) {
                const endTimeLabel = endTime.toLocaleString({
                    hour: this.timeFormatHour,
                    minute: this.timeFormatMinute,
                    second: this.timeFormatSecond,
                    hour12: this.timeFormatHour12
                });
                timeLabel += ' - ' + endTimeLabel;
            }
            const dateLabel = day.toLocaleString({
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            const time = {
                startTimeISO: day.toISO(),
                endTimeISO: endTime.toISO(),
                disabled,
                selected: selected || undefined,
                show: !disabled || this.showDisabledDates,
                computedAriaLabel: `${timeLabel}, ${dateLabel}`,
                displayNextButton,
                buttonClass: classSet('slds-theme_default').add({
                    'avonni-date-time-picker__time-button': !displayNextButton,
                    'avonni-date-time-picker__selected-time-button-with-next':
                        displayNextButton,
                    'slds-p-around_medium': this.isTimeline,
                    'slds-p-around_small': !this.isTimeline
                })
            };

            // If the variant is 'timeline', pushes a two-level deep object into dayTime.times
            // {
            //     hour: ISO datetime,
            //     times: [ time objects ]
            // }
            if (this.isTimeline) {
                const timelineHour = this._processDate(day)
                    .startOf('day')
                    .set({ hours })
                    .toISO();

                const index = dayTime.times.findIndex(
                    (timeObject) => timeObject.hour === timelineHour
                );

                if (index < 0) {
                    dayTime.times.push({
                        hour: timelineHour,
                        times: [time]
                    });
                } else {
                    dayTime.times[index].times.push(time);
                }
                // For other variants, pushes the time object directly into dayTime.times
            } else {
                dayTime.times.push(time);
            }
        });
    }

    /**
     * Check if the given time is selected.
     *
     * @param {object} time timestamp
     * @returns {boolean} returns false if selection === time.
     */
    _isSelected(time) {
        return this._selectedDayTime.indexOf(time) > -1;
    }

    /**
     * Check if the given day is disabled.
     *
     * @param {DateTime} date
     * @returns {boolean} true if disabled, false if not.
     */
    _isDisabledDay(date) {
        // Remove time from the date object
        const day = date.startOf('day');
        const outsideOfAllowedDates =
            day < this.computedMin || day > this.computedMax;
        const weekDay = day.weekday === 7 ? 0 : day.weekday;
        const monthDay = getWeekday(day);

        return (
            outsideOfAllowedDates ||
            this._disabledWeekDays.indexOf(weekDay) > -1 ||
            this._disabledMonthDays.indexOf(monthDay) > -1
        );
    }

    _isDisabledTime(start, end) {
        const slotInterval = intervalFrom(start, end);
        const disabledDates = [];
        const startTime = this.startTime.slice(0, 5);
        const endTime = this.endTime.slice(0, 5);
        const timeFrame = `${startTime}-${endTime}`;

        this.disabledDateTimes.forEach((dateTime) => {
            const date = this._processDate(dateTime);
            const isDateWithoutTime =
                typeof dateTime === 'string' &&
                dateTime.match(/^\d{4}-\d{2}-\d{2}$/);

            if (isDateWithoutTime) {
                const normalizedDate =
                    this._createDateTimeFromDateString(dateTime);
                disabledDates.push({ allDay: true, date: normalizedDate });
            } else if (date && isInTimeFrame(date, timeFrame)) {
                disabledDates.push({ allDay: false, date });
            }
        });
        return disabledDates.find(({ allDay, date }) => {
            return (
                slotInterval.contains(date) ||
                (allDay &&
                    (date.hasSame(start, 'day') || date.hasSame(end, 'day')))
            );
        });
    }

    _normalizeInlineDatePickerNumberOfVisibleDates(maxVisibleDates) {
        if (maxVisibleDates < 1) {
            return 1;
        } else if (maxVisibleDates > 7) {
            return 7;
        } else if (maxVisibleDates % 2 === 0) {
            return maxVisibleDates - 1;
        }
        return maxVisibleDates;
    }

    _queueRecompute = () => {
        this._timeSlotMinHeight = 0;
        this._timeSlotMinWidth = 0;
        this._dayLabelBorderPosition = 0;

        requestAnimationFrame(() => {
            if (!this.isMonthly && !this.isDaily) {
                this._computeTimeSlotMinSize();
            }
            if (this.isWeekly) {
                this._computeDayLabelBorderPosition();
            }
        });
    };

    _removeResizeObserver() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
    }

    _validDate(value) {
        const date = this._processDate(value);
        if (!date || this.disabled || this._isDisabledDay(date)) {
            return null;
        }

        const startTime = date.toISOTime({
            suppressMilliseconds: true,
            includeOffset: false
        });
        const timeSlot = this._timeSlots.find((ts) => ts === startTime);
        if (!timeSlot) {
            // The date does not match the beginning of a time slot
            return null;
        }
        const endTime = this._processDate(
            new Date(date.ts + this.timeSlotDuration)
        );
        return this._isDisabledTime(date, endTime) ? null : date;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleBlur(event) {
        if (
            event.relatedTarget &&
            this.template.contains(event.relatedTarget)
        ) {
            return;
        }
        this._dispatchBlur();
    }

    /**
     * Redispatches the navigate event coming from the monthly variant calendar.
     *
     * @param {Event} event `navigate` event coming from the calendar.
     */
    handleCalendarNavigate(event) {
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: { date: event.detail.date }
            })
        );
    }

    handleFocus(event) {
        if (
            event.relatedTarget &&
            this.template.contains(event.relatedTarget)
        ) {
            return;
        }
        this._dispatchFocus();
    }

    /**
     * Handles the onchange event of the combobox to change the time zone.
     */
    handleTimeZoneChange(event) {
        event.stopPropagation();
        this._timezone = event.detail.value;

        this._initDates();
        const firstDay =
            this._today < this.computedMin ? this.computedMin : this._today;
        this._setFirstWeekDay(firstDay);
        this._generateTable();
    }

    /**
     * Handles the onclick event for the today button.
     */
    handleTodayClick() {
        this.datePickerValue = this._today.toISO();
        this.goToDate(this._today);
    }

    /**
     * Handles the onclick event for the next and previous button.
     */
    handlePrevNextClick(event) {
        const dayRange = this.variant === 'weekly' ? 7 : 1;
        const direction = event.currentTarget.dataset.direction;
        const dayRangeSign = direction === 'next' ? dayRange : -dayRange;
        this.firstWeekDay = this.firstWeekDay.plus({ day: dayRangeSign });
        this._generateTable();
        this.datePickerValue = this.firstWeekDay.toISO();
        requestAnimationFrame(() => {
            this._queueRecompute();
        });
        this._dispatchNavigate();
    }

    /**
     * Handles the onchange event of the lightning-input to change the date.
     */
    handleDateChange(event) {
        event.stopPropagation();
        const value = event.detail.value;
        if (!value || typeof value !== 'string') {
            // Prevent unselection of a date
            event.currentTarget.value = this.firstWeekDayToString;
            return;
        }
        const isInput =
            event.currentTarget.dataset.elementId === 'lightning-input';
        const date = isInput
            ? DateTime.fromFormat(value, 'yyyy-MM-dd', { zone: this.timezone })
            : this._processDate(value);
        this.goToDate(date);
        this.datePickerValue = date.toISO();
    }

    /**
     * Handle a click on the inline date picker.
     *
     * @param {Event} event click event.
     */
    handleInlineDatePickerClick(event) {
        if (event.button !== 0) {
            return;
        }
        const date = this._processDate(
            Number(event.currentTarget.dataset.date)
        );
        this.goToDate(date);
    }

    /**
     * Handle the dragging of the inline date picker.
     *
     * @param {Event} start touchstart or mousedown event.
     */
    handleInlineDatePickerDrag(start) {
        if (start.type === 'mousedown' && start.button !== 0) {
            return;
        }
        const startPosition = start.clientX || start.changedTouches[0].clientX;

        const handleMove = (move) => {
            const datePicker = this.template.querySelector(
                '[data-element-id="div-inline-date-picker"]'
            );
            const x = move.clientX || move.changedTouches[0].clientX;
            let offset = x - startPosition;
            if (Math.abs(offset) > DATE_PICKER_MOUSE_MOVE_OFFSET) {
                const factor = offset < 0 ? -1 : 1;
                offset = DATE_PICKER_MOUSE_MOVE_OFFSET * factor;
            }
            datePicker.style.transform = `translateX(${offset}px)`;
        };

        const handleEnd = (end) => {
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchend', handleEnd);
            window.removeEventListener('touchmove', handleMove);

            const endPosition = end.clientX || end.changedTouches[0].clientX;
            const move = endPosition - startPosition;
            const goToPreviousWeek = move >= DATE_PICKER_MOUSE_MOVE_OFFSET;
            const goToNextWeek = move <= -DATE_PICKER_MOUSE_MOVE_OFFSET;
            if (goToPreviousWeek) {
                this.handleInlineDatePickerPrevClick();
            } else if (goToNextWeek) {
                this.handleInlineDatePickerNextClick();
            }

            const datePicker = this.template.querySelector(
                '[data-element-id="div-inline-date-picker"]'
            );
            datePicker.style.transition = 'transform 0.2s ease-in-out';
            datePicker.style.transform = '';

            setTimeout(() => {
                if (datePicker) {
                    datePicker.style.transition = '';
                }
            }, 201);
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchend', handleEnd);
    }

    /**
     * Handle a click on the next button of the inline date picker.
     */
    handleInlineDatePickerNextClick() {
        this._inlineDatePickerFirstDay = this._inlineDatePickerFirstDay.plus({
            days: this._inlineDatePickerMaxVisibleDays
        });
        this._createDatePickerWeekdays();
    }

    /**
     * Handle a click on the previous button of the inline date picker.
     */
    handleInlineDatePickerPrevClick() {
        this._inlineDatePickerFirstDay = this._inlineDatePickerFirstDay.minus({
            days: this._inlineDatePickerMaxVisibleDays
        });
        this._createDatePickerWeekdays();
    }

    /**
     * Handles the onclick event of the next button of a selected time slot.
     */
    handleNextButtonClick() {
        this._dispatchNextButtonClick();
    }

    /**
     * Handles the onclick event of the button for time slots.
     */
    handleTimeSlotClick(event) {
        if (this.readOnly) return;

        const isoDate = event.currentTarget.firstChild.value;
        const date = this._validDate(isoDate);
        if (!date) {
            return;
        }

        // Select/unselect the date
        const timestamp = date.ts;
        if (this.type === 'checkbox') {
            const valueIndex = this._computedValue.indexOf(isoDate);
            if (valueIndex > -1) {
                this._computedValue.splice(valueIndex, 1);
            } else {
                this._computedValue.push(isoDate);
            }

            const selectIndex = this._selectedDayTime.indexOf(timestamp);
            if (selectIndex > -1) {
                this._selectedDayTime.splice(selectIndex, 1);
            } else {
                this._selectedDayTime.push(timestamp);
            }
        } else {
            this._computedValue =
                this._computedValue[0] === isoDate ? [] : [isoDate];
            this._selectedDayTime = this._isSelected(timestamp)
                ? []
                : [timestamp];
        }

        if (this.isMonthly) {
            this._initMarkedDates();
        }
        this._generateTable();
        this._value =
            this.type === 'radio'
                ? this._computedValue[0] || null
                : [...this._computedValue];

        this._dispatchChange();
    }

    /**
     * Triggers interactingState.leave() on blur.
     * Removes slds-has-error on the whole element if not valid.
     */
    handleValueBlur(event) {
        this._valid = !(this.required && !this._computedValue.length);
        this.interactingState.leave();
        if (!this._valid) {
            this.classList.remove('slds-has-error');
        }
        this.handleBlur(event);
    }

    /**
     * Triggers interactingState.enter() on focus.
     */
    handleValueFocus(event) {
        this.interactingState.enter();
        this.handleFocus(event);
    }

    /*
     * ------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    _dispatchBlur() {
        /**
         * The event fired when the focus is removed from the date time picker.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));
    }

    _dispatchChange() {
        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string|string[]} value Selected options' value. Returns an array of string if the type is checkbox. Returns a string otherwise.
         * @param {string} name Name of the picker.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: this.value,
                    name: this.name
                }
            })
        );
    }

    _dispatchFocus() {
        /**
         * The event fired when the focus is set on the date time picker.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * Dispatch the `navigate` event.
     */
    _dispatchNavigate() {
        /**
         * The event fired when the user navigates to another period of time.
         *
         * @event
         * @name navigate
         * @param {string} date First visible day, as an ISO8601 formatted string.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('navigate', {
                detail: {
                    date: this.firstWeekDay.toISO()
                }
            })
        );
    }

    _dispatchNextButtonClick() {
        /**
         * The event fired when the user clicks on the next button of a selected time slot.
         *
         * @event
         * @name nextbuttonclick
         * @public
         * @bubbles
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('nextbuttonclick', {
                bubbles: true,
                composed: true
            })
        );
    }
}
