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

export default class DateTimePicker extends LightningElement {
    @api label;
    @api name;

    @api disabled;
    @api fieldLevelHelp;
    @api messageWhenValueMissing;
    @api readOnly;
    @api required;
    @api disabledDateTimes;

    _max;
    _min;
    _value;
    _startTime;
    _endTime;
    _timeSlotDuration;
    _timeSlots;
    _visibility;
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

        if (this.today < this.min && this.visibility === 'day') {
            this.firstWeekDay = this.min;
        } else if (this.visibility === 'day') {
            this.firstWeekDay = this.today;
        } else if (this.today < this.min) {
            this._setFirstWeekDay(this.min);
        } else {
            this._setFirstWeekDay(this.today);
        }
        this._generateTable();
    }

    @api
    get max() {
        return this._max;
    }
    set max(value) {
        const date = new Date(value);
        if (date) {
            this._max = date;
        } else {
            this._max = new Date(2099, 11, 31);
        }
    }

    @api
    get min() {
        return this._min;
    }
    set min(value) {
        const date = new Date(value);
        if (date) {
            this._min = date;
        } else {
            this._min = new Date(1900, 0, 1);
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
        const firstWeekDayNumber = givenDate.getDate() - givenDate.getDay();
        const firstWeekDayInMilliseconds = new Date(givenDate).setDate(
            firstWeekDayNumber
        );
        this.firstWeekDay = new Date(firstWeekDayInMilliseconds);
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
        const dayIsToday = day.dayObject - this.today === 0;
        const dayIsSelected = this._selectedDayTime
            ? day.dayObject.toLocaleDateString() ===
              this._selectedDayTime.day.toLocaleDateString()
            : false;

        this._timeSlots.forEach((time) => {
            const timeIsSelected =
                this._selectedDayTime && time === this._selectedDayTime.time;
            const currentHour = parseInt(time.slice(0, 2), 10);
            const currentMinutes = parseInt(time.slice(3, 5), 10);
            const currentSeconds = parseInt(time.slice(6, 8), 10);
            const dayTimeObject = day.dayObject;
            dayTimeObject.setHours(
                currentHour,
                currentMinutes,
                currentSeconds,
                0
            );

            // Check if the time slot is today but in the past
            let timeIsPast = false;
            if (
                dayIsToday &&
                (currentHour < this.today.getHours() ||
                    (currentHour === this.today.getHours() &&
                        currentMinutes < this.today.getMinutes()))
            ) {
                timeIsPast = true;
            }

            day.times.push({
                dayTimeISO: dayTimeObject.toISOString(),
                disabled:
                    this.disabled ||
                    this._isDisabled(dayTimeObject) ||
                    timeIsPast,
                selected: dayIsSelected && timeIsSelected
            });
        });
    }

    _isDisabled(day) {
        const outsideOfAllowedDates = day < this.min || day > this.max;
        const past = day - this.today < 0;

        const time = day.getTime();
        const weekDay = day.getDay();
        const monthDay = day.getDate();

        return (
            outsideOfAllowedDates ||
            past ||
            this.disabledFullDateTimes.indexOf(time) > -1 ||
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
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const firstDay = this.firstWeekDay.toLocaleString('default', options);
        const lastDay = this.lastWeekDay.toLocaleString('default', options);

        return this.visibility === 'day'
            ? firstDay
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

    get prevButtonIsDisabled() {
        return this.firstWeekDay <= this.min || this.firstWeekDay <= this.today;
    }

    get nextButtonIsDisabled() {
        return this.lastWeekDay >= this.max;
    }

    handleTodayClick() {
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
    }

    handleNextClick() {
        const dayRange = this.visibility === 'day' ? 1 : 7;
        this.firstWeekDay = new Date(
            new Date(this.firstWeekDay).setDate(
                this.firstWeekDay.getDate() + dayRange
            )
        );
        this._generateTable();
    }

    handleDatePickerChange(event) {
        this.datePickerValue = event.currentTarget.value;
        this._setFirstWeekDay(new Date(this.datePickerValue));
        this._generateTable();
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
                    value: this.value
                }
            })
        );
    }

    handleTimeZoneChange(event) {
        this.selectedTimeZone = event.detail.value;
    }
}
