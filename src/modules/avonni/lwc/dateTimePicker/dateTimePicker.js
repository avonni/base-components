import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import TIME_ZONES from './timeZones.js';

const TIME_SLOTS = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '14:00',
    '14:30',
    '18:00'
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const VISIBILITY = ['day', 'week'];

export default class DateTimePicker extends LightningElement {
    // TODO:
    // Add startTime, endTime, timeSlotDuration
    // Handle whole day or time disabled
    // Disable previous/next buttons for date ranges out of the dates allowed

    @api disabledDateTimes;

    _max;
    _min;
    _value;
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

    connectedCallback() {
        this.selectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.today = new Date();

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

    @api
    get value() {
        return this._value;
    }
    set value(datetime) {
        this._value = datetime;
        const date = new Date(datetime);
        this._selectedDayTime = {
            day: date,
            time: date.toLocaleTimeString('default', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            })
        };
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
        const dayIsSelected = this._selectedDayTime.day
            ? day.dayObject.toLocaleDateString() ===
              this._selectedDayTime.day.toLocaleDateString()
            : false;

        TIME_SLOTS.forEach((time) => {
            const currentHour = this._getHourFromTimeString(time);
            const currentMinutes = this._getMinutesFromTimeString(time);
            const dayTimeObject = day.dayObject;
            dayTimeObject.setHours(currentHour, currentMinutes, 0, 0);

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
                label: time,
                dayTimeISO: dayTimeObject.toISOString(),
                disabled: this._isDisabled(dayTimeObject) || timeIsPast,
                selected: dayIsSelected && time === this._selectedDayTime.time
            });
        });
    }

    _getHourFromTimeString(time) {
        return parseInt(time.slice(0, 2), 10);
    }
    _getMinutesFromTimeString(time) {
        return parseInt(time.slice(3, 5), 10);
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
        const date = new Date(event.currentTarget.value);
        this._setFirstWeekDay(date);
        this._generateTable();
    }

    handleTimeSlotClick(event) {
        const dateTimeISO = event.currentTarget.firstChild.value;
        const date = new Date(dateTimeISO);
        const time = event.currentTarget.dataset.label;

        this._value = dateTimeISO;
        this._selectedDayTime = {
            day: date,
            time: time
        };
        // Refresh table to show selected time slot
        this._generateTable();

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: dateTimeISO
                }
            })
        );
    }

    handleTimeZoneChange(event) {
        this.selectedTimeZone = event.detail.value;
    }
}
