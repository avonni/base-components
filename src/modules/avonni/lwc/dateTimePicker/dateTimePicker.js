import { LightningElement, api } from 'lwc';

const TIME_SLOTS = [
    '08:00 AM',
    '08:30 AM',
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM'
];

// QUESTIONS
// Add a disabledDaysHours to be applied at all time?
// Add the possibility to pick the duration of a time slot?

export default class DateTimePicker extends LightningElement {
    @api disabledDateTimes;

    table;
    today;
    firstWeekDay;

    connectedCallback() {
        this.today = new Date();
        this._setFirstWeekDay(this.today);
        this._generateTable();

        // TODO:
        // The table is re-computed each time the date is changed by the user.
        //   * If the user goes to next/previous week, firstWeekDay = firstWeekDay +/- 7 days
        //   * If the user picks a specific date with the date picker, calculate the new firstWeekDay
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
        // Past hours are automatically disabled.
        // Handle time zone
        // Handle visibility=day

        const processedTable = [];

        for (let day = 0; day < 7; day++) {
            const currentDay = new Date(
                new Date(this.firstWeekDay).setDate(
                    this.firstWeekDay.getDate() + day
                )
            );

            const dayIsPast = currentDay - this.today < 0;

            const currentDayTime = {
                dayObject: currentDay,
                label: `${currentDay
                    .toString()
                    .slice(0, 3)} ${currentDay.toString().slice(8, 10)}`,
                times: []
            };

            TIME_SLOTS.forEach((time) => {
                currentDayTime.times.push({
                    label: time,
                    disabled: dayIsPast // || timeIsPast
                });
            });
            processedTable.push(currentDayTime);
        }

        // Disable the dates and times provided by the user
        this._disableDateTimes(processedTable);
        this.table = processedTable;
    }

    _disableDateTimes(table) {
        // TODO:
        // If a day is given, but no time is given, disable the whole day

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
                }
            });
        });
    }
}
