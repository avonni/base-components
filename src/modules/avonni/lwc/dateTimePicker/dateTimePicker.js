import { LightningElement, api } from 'lwc';

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

// QUESTIONS
// Add a disabledDaysHours to be applied at all time?
// Add the possibility to pick the duration of a time slot?
// Add the possibility to pick the time format (AM/PM or not)?
// Disable previous/next buttons for date ranges out of the dates allowed?

export default class DateTimePicker extends LightningElement {
    @api disabledDateTimes;

    _max;
    _min;

    table;
    today;
    firstWeekDay;
    lastWeekDay;

    connectedCallback() {
        this.today = new Date();
        // eslint-disable-next-line no-unused-expressions
        this.today < this.min
            ? this._setFirstWeekDay(this.min)
            : this._setFirstWeekDay(this.today);
        this._generateTable();

        // TODO:
        // Handle time slot selection
        // The table is re-computed each time the date is changed by the user.
        //   * If the user picks a specific date with the date picker, calculate the new firstWeekDay
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
        // Handle visibility=day

        const processedTable = [];

        for (let day = 0; day < 7; day++) {
            const currentDay = new Date(
                new Date(this.firstWeekDay).setDate(
                    this.firstWeekDay.getDate() + day
                )
            );

            // Create day object
            const labelWeekday = currentDay.toLocaleString('default', {
                weekday: 'short'
            });
            const labelDay = currentDay.toLocaleString('default', {
                day: '2-digit'
            });
            const currentDayTime = {
                dayObject: currentDay,
                label: `${labelWeekday} ${labelDay}`,
                times: []
            };

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

        TIME_SLOTS.forEach((time) => {
            const currentHour = parseInt(time.slice(0, 2), 10);
            const currentMinutes = parseInt(time.slice(3, 5), 10);

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
                disabled: dayIsPast || dayIsOutsideOfAllowedDates || timeIsPast
            });
        });
    }

    _disableDateTimes(table) {
        // For each day of the table
        table.forEach((day) => {
            // For each disabled day provided
            this.disabledDateTimes.forEach((disabledDateTime) => {
                const disabledDayInMilliseconds = new Date(
                    disabledDateTime.date
                ).getTime();
                const dayObject = day.dayObject;
                const dayInMilliseconds = dayObject.setHours(0, 0, 0, 0);

                // If the disabled day matches the day
                if (disabledDayInMilliseconds === dayInMilliseconds) {
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
        return `${firstDay} - ${lastDay}`;
    }

    handleTodayClick() {
        this._setFirstWeekDay(this.today);
        this._generateTable();
    }

    handlePreviousClick() {
        this.firstWeekDay = new Date(
            this.firstWeekDay.setDate(this.firstWeekDay.getDate() - 7)
        );
        this._generateTable();
    }

    handleNextClick() {
        this.firstWeekDay = new Date(
            this.firstWeekDay.setDate(this.firstWeekDay.getDate() + 7)
        );
        this._generateTable();
    }
}
