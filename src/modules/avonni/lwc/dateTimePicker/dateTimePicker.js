import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { FieldConstraintApi } from 'c/inputUtils';
import TIME_ZONES from './timeZones.js';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const VISIBILITY = ['day', 'week'];

const INTL_OPTIONS = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
};

const VARIANTS = ['standard', 'label-hidden'];

export default class DateTimePicker extends LightningElement {
    @api disabled;
    @api fieldLevelHelp;
    @api label;
    @api messageWhenValueMissing;
    @api name;
    @api readOnly;
    @api required;
    @api disabledDateTimes;

    _variant;
    _max;
    _min;
    _value;
    _startTime;
    _endTime;
    _timeSlotDuration;
    _timeSlots;
    _visibility;
    // _multiple;
    _showTimeZone;
    _hideNavigation;
    _hideDatePicker;

    table;
    today;
    firstWeekDay;
    lastWeekDay;
    selectedDayTime = {};
    timeZones = TIME_ZONES;
    selectedTimeZone;
    helpMessage = null;
    datePickerValue;

    connectedCallback() {
        this.selectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this._initTimeSlots();
        const now = new Date();
        this.today = now;
        this.datePickerValue = now.toISOString();

        // eslint-disable-next-line no-unused-expressions
        this.today < this.min
            ? this._setFirstWeekDay(this.min)
            : this._setFirstWeekDay(this.today);
        this._generateTable();
    }

    renderedCallback() {
        // TODO:
        // Show disabled dates in date picker
        this.template.querySelector('lightning-input').reportValidity();
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: 'standard',
            validValues: VARIANTS
        });
    }

    @api
    get max() {
        return this._max;
    }
    set max(value) {
        const date = new Date(value);
        if (date) {
            this._max = new Date(date.setHours(0, 0, 0, 0));
        } else {
            this._max = new Date(new Date(2099, 11, 31).setHours(0, 0, 0, 0));
        }
    }

    @api
    get min() {
        return this._min;
    }
    set min(value) {
        const date = new Date(value);
        if (date) {
            this._min = new Date(date.setHours(0, 0, 0, 0));
        } else {
            this._min = new Date(new Date(1900, 0, 1).setHours(0, 0, 0, 0));
        }
    }

    @api get validity() {
        return this._constraint.validity;
    }

    @api
    get value() {
        return this._value;
    }
    set value(datetime) {
        let date = null;
        if (datetime instanceof Date) date = datetime;
        if (!isNaN(new Date(datetime).getTime())) date = new Date(datetime);

        if (date) {
            this._selectedDayTime = {
                day: date,
                time: date.toLocaleTimeString('default', INTL_OPTIONS)
            };
            this._value = date.toISOString();
        }
    }

    @api
    get startTime() {
        return this._startTime;
    }
    set startTime(value) {
        const start = new Date(`1970-01-01T${value}`);
        // Return start time in ms. Default value is 08:00.
        this._startTime = isNaN(start.getTime()) ? 46800000 : start.getTime();
    }

    @api
    get endTime() {
        return this._endTime;
    }
    set endTime(value) {
        const end = new Date(`1970-01-01T${value}`);
        // Return end time in ms. Default value is 18:00.
        this._endTime = isNaN(end.getTime()) ? 82800000 : end.getTime();
    }

    @api
    get timeSlotDuration() {
        return this._timeSlotDuration;
    }
    set timeSlotDuration(value) {
        const duration = value.match(/(\d{2}):(\d{2}):?(\d{2})?/);
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
            durationMilliseconds > 0 ? durationMilliseconds : 1800000;
    }

    @api
    get visibility() {
        return this._visibility;
    }
    set visibility(value) {
        this._visibility = normalizeString(value, {
            fallbackValue: 'day',
            validValues: VISIBILITY
        });
    }

    // TODO:
    // Add support for multiple selection

    // @api
    // get multiple() {
    //     return this._multiple;
    // }
    // set multiple(value) {
    //     this._multiple = normalizeBoolean(value);
    // }

    @api
    get showTimeZone() {
        return this._showTimeZone;
    }
    set showTimeZone(value) {
        this._showTimeZone = normalizeBoolean(value);
    }

    @api
    get hideNavigation() {
        return this._hideNavigation;
    }
    set hideNavigation(value) {
        this._hideNavigation = normalizeBoolean(value);
    }

    @api
    get hideDatePicker() {
        return this._hideDatePicker;
    }
    set hideDatePicker(value) {
        this._hideDatePicker = normalizeBoolean(value);
    }

    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled && this.required && !this.value
            });
        }
        return this._constraintApi;
    }

    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this.helpMessage = this.messageWhenValueMissing || message;
        });
    }

    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    _initTimeSlots() {
        const timeSlots = [];
        let currentTime = this.startTime;

        while (currentTime < this.endTime) {
            timeSlots.push(
                new Date(currentTime).toLocaleTimeString(
                    'default',
                    INTL_OPTIONS
                )
            );
            currentTime = currentTime + this.timeSlotDuration;
        }
        this._timeSlots = timeSlots;
    }

    _setFirstWeekDay(givenDate) {
        if (this.visibility === 'day') {
            this.firstWeekDay = givenDate;
        } else {
            const dateDay = givenDate.getDate() - givenDate.getDay();
            const dateTime = new Date(givenDate).setDate(dateDay);
            this.firstWeekDay = new Date(dateTime);
        }
    }

    _generateTable() {
        const processedTable = [];

        const daysDisplayed = this.visibility === 'day' ? 1 : 7;

        for (let day = 0; day < daysDisplayed; day++) {
            const currentDay = new Date(
                new Date(this.firstWeekDay).setDate(
                    this.firstWeekDay.getDate() + day
                )
            );

            // Create day object
            const currentDayTime = {
                key: day,
                dayObject: currentDay,
                times: []
            };

            // Add a label to the day only if visibility is 'week'
            if (this.visibility === 'week') {
                const labelWeekday = currentDay.toLocaleString('default', {
                    weekday: 'short'
                });
                const labelDay = currentDay.toLocaleString('default', {
                    day: '2-digit'
                });
                currentDayTime.label = `${labelWeekday} ${labelDay}`;
            }

            this._createTimeSlots(currentDayTime);
            processedTable.push(currentDayTime);
        }

        this.lastWeekDay = processedTable[processedTable.length - 1].dayObject;
        this.table = processedTable;
    }

    _createTimeSlots(day) {
        const dayIsSelected = this._selectedDayTime
            ? day.dayObject.toLocaleDateString() ===
              this._selectedDayTime.day.toLocaleDateString()
            : false;

        const dayIsDisabled = this._isDisabled(day.dayObject);

        this._timeSlots.forEach((time) => {
            const timeIsSelected =
                this._selectedDayTime && time === this._selectedDayTime.time;

            const hour = parseInt(time.slice(0, 2), 10);
            const minutes = parseInt(time.slice(3, 5), 10);
            const seconds = parseInt(time.slice(6, 8), 10);
            const dayTimeObject = day.dayObject;
            dayTimeObject.setHours(hour, minutes, seconds, 0);

            // Check if time is disabled
            const dayTime = dayTimeObject.getTime();
            const timeIsDisabled =
                this.disabledFullDateTimes.indexOf(dayTime) > -1;

            day.times.push({
                dayTimeISO: dayTimeObject.toISOString(),
                disabled: this.disabled || dayIsDisabled || timeIsDisabled,
                selected: dayIsSelected && timeIsSelected
            });
        });
    }

    _isDisabled(dayObject) {
        // TODO:
        // Disable whole day from date without time
        //   * Maybe use an object to disable specific times, instead of passing a date with the right time?
        //   {
        //       date: Date Object,
        //       time: ISO time string
        //   }

        // Remove time from the date object
        const day = new Date(new Date(dayObject).setHours(0, 0, 0, 0));

        const outsideOfAllowedDates = day < this.min || day > this.max;
        const weekDay = day.getDay();
        const monthDay = day.getDate();

        return (
            outsideOfAllowedDates ||
            this.disabledWeekDays.indexOf(weekDay) > -1 ||
            this.disabledMonthDays.indexOf(monthDay) > -1
        );
    }

    get disabledFullDateTimes() {
        let dateTimes = [];

        this.disabledDateTimes.forEach((dateTime) => {
            if (typeof dateTime === 'object') {
                dateTimes.push(dateTime.getTime());
            }
        });

        return dateTimes;
    }

    get disabledWeekDays() {
        let dates = [];

        this.disabledDateTimes.forEach((date) => {
            if (typeof date === 'string') {
                dates.push(DAYS.indexOf(date));
            }
        });

        return dates;
    }

    get disabledMonthDays() {
        let dates = [];

        this.disabledDateTimes.forEach((date) => {
            if (typeof date === 'number') {
                dates.push(date);
            }
        });

        return dates;
    }

    get currentDateRangeString() {
        const firstWeekDay = this.firstWeekDay.toLocaleString('default', {
            weekday: 'long'
        });
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const firstDay = this.firstWeekDay.toLocaleString('default', options);
        const lastDay = this.lastWeekDay.toLocaleString('default', options);

        return this.visibility === 'day'
            ? `${firstWeekDay}, ${firstDay}`
            : `${firstDay} - ${lastDay}`;
    }

    get firstWeekDayToString() {
        return this.firstWeekDay.toISOString();
    }

    get minToString() {
        return this.min.toISOString();
    }

    get maxToString() {
        return this.max.toISOString();
    }

    get labelHidden() {
        return this.variant === 'label-hidden';
    }

    get prevButtonIsDisabled() {
        return this.firstWeekDay <= this.min;
    }

    get nextButtonIsDisabled() {
        return this.lastWeekDay >= this.max;
    }

    handleTodayClick() {
        this.datePickerValue = this.today.toISOString();
        this._setFirstWeekDay(this.today);
        this._generateTable();
    }

    handlePreviousClick() {
        const dayRange = this.visibility === 'day' ? 1 : 7;
        this.firstWeekDay = new Date(
            new Date(this.firstWeekDay).setDate(
                this.firstWeekDay.getDate() - dayRange
            )
        );
        this._generateTable();
        this.datePickerValue = this.firstWeekDay.toISOString();
    }

    handleNextClick() {
        const dayRange = this.visibility === 'day' ? 1 : 7;
        this.firstWeekDay = new Date(
            new Date(this.firstWeekDay).setDate(
                this.firstWeekDay.getDate() + dayRange
            )
        );
        this._generateTable();
        this.datePickerValue = this.firstWeekDay.toISOString();
    }

    handleDatePickerChange(event) {
        const dateString = event.currentTarget.value;
        if (dateString) {
            this.datePickerValue = dateString;

            // Cut date string into pieces to make sure new date is created with current time zone
            const year = parseInt(dateString.slice(0, 4), 10);
            const month = parseInt(dateString.slice(5, 7), 10) - 1;
            const day = parseInt(dateString.slice(8, 10), 10);
            const date = new Date(year, month, day);
            this._setFirstWeekDay(date);
            this._generateTable();
        }
    }

    handleTimeSlotClick(event) {
        if (this.readOnly) return;

        const dateTimeISO = event.currentTarget.firstChild.value;
        const date = new Date(dateTimeISO);

        this._value = dateTimeISO;
        this._selectedDayTime = {
            day: date,
            time: date.toLocaleTimeString('default', INTL_OPTIONS)
        };
        // Refresh table to show selected time slot
        this._generateTable();

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: this.value,
                    name: this.name
                }
            })
        );
    }

    handleTimeZoneChange(event) {
        this.selectedTimeZone = event.detail.value;
    }
}
