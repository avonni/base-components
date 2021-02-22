import { LightningElement, api, track } from 'lwc';
import { normalizeBoolean } from 'c/utilsPrivate';
import { generateUniqueId } from 'c/utils';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export default class Calendar extends LightningElement {

    @track _disabledDates = [];
    @track _value;
    @track _max = new Date(2099, 11, 31);
    @track _min = new Date(1900, 0, 1);
    @track _multiValue;
    @track _disabled = false;
    @track _weekNumber = false;
    @track year;
    @track month;
    @track day;
    @track date = new Date(new Date().setHours(0, 0, 0, 0));
    @track calendarData;

    months = MONTHS;

    connectedCallback() {
        this.updateDateParameters();
    }

    @api
    get disabledDates() {
        return this._disabledDates;
    }

    set disabledDates(value) {
        this._disabledDates = value;
        this.updateDateParameters();
    }

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        if (value) {
            this._value = new Date(value);
            this.date = new Date(value);
            this._value.setHours(0, 0, 0, 0);
            this.date.setHours(0, 0, 0, 0);
            this.updateDateParameters();
        }
    }

    @api
    get max() {
        return this._max;
    }

    set max(value) {
        this._max = new Date(value);
        this._max.setHours(0, 0, 0, 0);
        this.updateDateParameters();
    }

    @api
    get min() {
        return this._min;
    }

    set min(value) {
        this._min = new Date(value);
        this._min.setHours(0, 0, 0, 0);
        this.updateDateParameters();
    }

    @api
    get multiValue() {
        return this._multiValue;
    }

    set multiValue(value) {
        if (value) {
            this._multiValue = new Date(value);
            this._multiValue.setHours(0, 0, 0, 0);
            this.updateDateParameters();
        }
    }

    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
        this.updateDateParameters();
    }

    @api 
    get weekNumber() {
        return this._weekNumber;
    }

    set weekNumber(value) {
        this._weekNumber = normalizeBoolean(value);
        this.updateDateParameters();
    }

    get days() {
        let days = [];

        if (this.weekNumber) {
            days.push('');
        }

        return days.concat(DAYS);
    }

    get yearsList() {
        let startYear = this.min.getFullYear();
        let endYear = this.max.getFullYear();

        return [...Array(endYear - startYear + 1).keys()].map(x => {
            let year = x + startYear;
            return { label: year, value: year };
        });
    }

    get disabledPrevious() {
        let disabled = this.disabled;
        let previousDate = new Date(this.date);
        previousDate.setMonth(this.date.getMonth() - 1);
        previousDate.setDate(1);

        let minDate = new Date(this.min);
        minDate.setDate(1);

        if (previousDate < minDate) {
            disabled = true;
        }

        return disabled;
    }

    get disabledNext() {
        let disabled = this.disabled;
        let nextDate = new Date(this.date);
        nextDate.setMonth(this.date.getMonth() + 1);
        nextDate.setDate(1);

        let maxDate = new Date(this.max);
        maxDate.setDate(1);

        if (nextDate > maxDate) {
            disabled = true;
        }

        return disabled;
    }

    get generateKey() {
        return generateUniqueId();
    }

    get disabledFullDates() {
        let dates = [];

        this.disabledDates.forEach(date => {
            if (typeof date === 'object') {
                dates.push(date.setHours(0, 0, 0, 0));
            }
        });

        return dates;
    }

    get disabledWeekDays() {
        let dates = [];

        this.disabledDates.forEach(date => {
            if (typeof date === 'string') {
                dates.push(DAYS.indexOf(date));
            }
        });

        return dates;
    }

    get disabledMonthDays() {
        let dates = [];

        this.disabledDates.forEach(date => {
            if (typeof date === 'number') {
                dates.push(date);
            }
        });

        return dates;
    }

    updateDateParameters() {
        this.year = this.date.getFullYear();
        this.month = MONTHS[this.date.getMonth()];
        this.day = this.date.getDay();
        this.generateViewData();
    }

    generateViewData() {
        let calendarData = [];
        let today = new Date().setHours(0, 0, 0, 0);
        let currentMonth = this.date.getMonth();
        let date = new Date(this.date.getTime());
        let dateMonth = date.getMonth();
        date.setDate(1);

        if (date.getDay() > 0) {
            date.setDate(-date.getDay() + 1);
        }

        for (let i = 0; i < 6; i++) {
            let weekData = [];

            if (this.weekNumber) {
                let week = date.getWeek();

                if (dateMonth === 0 && week > 51) {
                    week = 1;
                }

                weekData.push({
                    label: week,
                    class: 'avonni-week-cell',
                    dayClass: '',
                    selected: false,
                    currentDate: false,
                    fullDate: ''
                });
            }

            for (let a = 0; a < 7; a++) {
                let currentDate = false;
                let selected = false;

                let dateClass = '';
                let dayClass = 'slds-day';
                let fullDate = '';
                let disabled = this.isDisabled(date);
                let time = date.getTime();
                let valueTime = this.value ? this.value.getTime() : '';

                if (date.getMonth() !== currentMonth || disabled) {
                    if (i > 3 && a === 0) {
                        weekData.splice(-1, 1);
                        break;
                    }

                    dateClass = 'slds-day_adjacent-month';
                    dayClass = 'avonni-disabled-cell';
                } else if (this.disabled) {
                    dateClass = 'slds-day_adjacent-month';
                    dayClass = 'avonni-disabled-cell';
                } else {
                    fullDate = time;
                }

                if (today === time) {
                    dateClass += ' slds-is-today';
                    currentDate = true;
                }

                if (
                    this.value &&
                    this.multiValue &&
                    ((this.multiValue.getTime() <= time && time <= valueTime) ||
                        (valueTime <= time &&
                            time <= this.multiValue.getTime()))
                ) {
                    dateClass += ' slds-is-selected slds-is-selected-multi';
                } else if (this.value && valueTime === time) {
                    dateClass += ' slds-is-selected';
                }

                let label = '';

                if (time >= this.min.getTime() && time <= this.max.getTime()) {
                    label = date.getDate();
                } else {
                    dayClass = 'avonni-disabled-cell';
                    fullDate = '';
                }

                weekData.push({
                    label: label,
                    class: dateClass,
                    dayClass: dayClass,
                    selected: selected,
                    currentDate: currentDate,
                    fullDate: fullDate
                });

                date.setDate(date.getDate() + 1);
            }

            calendarData.push(weekData);
        }

        this.calendarData = calendarData;
    }

    isDisabled(date) {
        let disabled = false;
        let time = date.getTime();
        let weekDay = date.getDay();
        let monthDay = date.getDate();

        if (
            this.disabledFullDates.indexOf(time) > -1 ||
            this.disabledWeekDays.indexOf(weekDay) > -1 ||
            this.disabledMonthDays.indexOf(monthDay) > -1
        ) {
            disabled = true;
        }

        return disabled;
    }

    handleYearChange(event) {
        this.date.setFullYear(event.detail.value);

        if (this.date.getTime() < this.min.getTime()) {
            this.date.setMonth(this.min.getMonth());
        }

        if (this.date.getTime() > this.max.getTime()) {
            this.date.setMonth(this.max.getMonth());
        }

        this.updateDateParameters();
        event.stopPropagation();
    }

    handlerPreviousMonth() {
        this.date.setMonth(this.date.getMonth() - 1);
        this.updateDateParameters();
    }

    handlerNextMonth() {
        this.date.setMonth(this.date.getMonth() + 1);
        this.updateDateParameters();
    }

    handlerSelectDate(event) {
        let date = event.target.dataset.day;

        if (date) {
            this.value = new Date(Number(date));
            this.date = new Date(Number(date));
            this.updateDateParameters();
            this.dispatchChange();
        }
    }

    dispatchChange() {
        let date = this.date.getDate();
        let month = this.date.getMonth() + 1;
        let year = this.date.getFullYear();
        let dateStr = month + '/' + date + '/' + year;

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: dateStr
                }
            })
        );
    }

    handleFocus() {
        this.dispatchEvent(
            new CustomEvent('privatefocus', {
                bubbles: true,
                cancelable: true
            })
        );
    }

    handleBlur() {
        this.dispatchEvent(
            new CustomEvent('privateblur', {
                composed: true,
                bubbles: true,
                cancelable: true
            })
        );
    }
}

// eslint-disable-next-line no-extend-native
Date.prototype.getWeek = function() {
    let startDate = new Date(this.getFullYear(), 0, 1);
    let millisecsInDay = 86400000;

    return Math.ceil(
        ((this - startDate) / millisecsInDay + startDate.getDay() + 1) / 7
    );
};
