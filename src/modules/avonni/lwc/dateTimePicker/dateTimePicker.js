import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

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

const VISIBILITY = ['day', 'week'];

// QUESTIONS
// Use of a hidden input?
// Effect of the timezone change => only on the disabledDateTimes?
// Variant? horizontal/vertical?
// Provide an object with available days/timeslots? OR:
//   * Add a disabledDaysHours to be applied at all time?
//   * Add the possibility to pick the duration of a time slot?
//   * Add the possibility to pick the time format (AM/PM or not)?
// Disable previous/next buttons for date ranges out of the dates allowed?

export default class DateTimePicker extends LightningElement {
    @api disabledDateTimes;

    _max;
    _min;
    _value;
    _visibility;
    _hideNavigation;
    _hideDatePicker;

    table;
    today;
    firstWeekDay;
    lastWeekDay;
    selectedDayTime = {};

    connectedCallback() {
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
        const date = new Date(datetime);
        this._value = date;
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
        // TODO:
        // Handle time zone

        const processedTable = [];

        let daysDisplayed = 7;
        if (this.visibility === 'day') {
            daysDisplayed = 1;
        }

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

        // Disable the dates and times provided by the user
        this._disableDateTimes(processedTable);
        this.lastWeekDay = processedTable[processedTable.length - 1].dayObject;
        this.table = processedTable;
    }

    _createTimeSlots(day) {
        const dayIsPast = day.dayObject - this.today < 0;
        const dayIsOutsideOfAllowedDates =
            day.dayObject < this.min || day.dayObject > this.max;
        const dayIsToday = day.dayObject - this.today === 0;
        const dayIsSelected = this._selectedDayTime.day
            ? day.dayObject.toLocaleDateString() ===
              this._selectedDayTime.day.toLocaleDateString()
            : false;

        TIME_SLOTS.forEach((time) => {
            const currentHour = this._getHourFromTimeString(time);
            const currentMinutes = this._getMinutesFromTimeString(time);

            // Check if the time slot is in the past
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
                disabled: dayIsPast || dayIsOutsideOfAllowedDates || timeIsPast,
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

    _disableDateTimes(table) {
        // For each day of the table
        table.forEach((day) => {
            // For each disabled day provided
            this.disabledDateTimes.forEach((disabledDateTime) => {
                const disabledDayString = new Date(
                    disabledDateTime.date
                ).toLocaleDateString();
                const dayString = day.dayObject.toLocaleDateString();

                // If the disabled day matches the day
                if (disabledDayString === dayString) {
                    if (disabledDateTime.times) {
                        // For each disabled time
                        disabledDateTime.times.forEach((disabledTime) => {
                            const disabledTimeIndex = day.times.findIndex(
                                (time) => time.label === disabledTime
                            );
                            // If the time exists, disable it
                            if (disabledTimeIndex > -1) {
                                day.times[disabledTimeIndex].disabled = true;
                            }
                        });
                        // If no time is provided, disable the whole day
                    } else {
                        day.times.forEach((time) => {
                            time.disabled = true;
                        });
                    }
                }
            });
        });
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
        const buttonElement = event.currentTarget;
        const hour = this._getHourFromTimeString(buttonElement.textContent);
        const minutes = this._getMinutesFromTimeString(
            buttonElement.textContent
        );
        const selectedDate = new Date(buttonElement.dataset.day);
        selectedDate.setHours(hour, minutes, 0);

        this._value = selectedDate;
        this._selectedDayTime = {
            day: selectedDate,
            time: buttonElement.textContent
        };
        // Refresh table to show selected time slot
        this._generateTable();

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: selectedDate.toISOString()
                }
            })
        );
    }
}
