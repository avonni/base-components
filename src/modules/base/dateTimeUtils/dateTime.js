import { pad } from './utils';
import { DEFAULT_LANGUAGE, DOUBLE_DIGIT, NUMERIC } from './constants';

export class DateTime {
    constructor(date, timeZone) {
        this._originalDate = new Date(date);
        this.timeZone = timeZone;
    }

    /*
     * -------------------------------------------------------------
     *  PROPERTIES
     * -------------------------------------------------------------
     */

    get day() {
        return Number(this.getUnit('day'));
    }

    get hour() {
        return Number(this.getUnit('hour'));
    }

    get hour12() {
        const hour = this.hour;
        return hour > 12 ? hour - 12 : hour;
    }

    get isoWeek() {
        const target = this.tzDate;
        const day = (target.getDay() + 6) % 7;
        target.setDate(target.getDate() - day + 3);
        const firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() !== 4) {
            target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
        }
        const isoWeek = 1 + Math.ceil((firstThursday - target) / 604800000);
        return isoWeek ? isoWeek.toString() : '';
    }

    get isoYear() {
        // Set to the Thursday of the current week
        const d = this.tzDate;
        d.setDate(d.getDate() + 4 - (d.getDay() || 7));

        // Calculate the ISO week year
        const y = d.getFullYear();
        const startOfYear = new Date(Date.UTC(y, 0, 1));
        const isWeek53 =
            startOfYear.getDay() === 4 ||
            new Date(
                Date.UTC(y, 0, 1 - ((startOfYear.getDay() + 6) % 7))
            ).getDay() === 4;
        const isoYear =
            y + (isWeek53 && d.getTime() < startOfYear.getTime() ? -1 : 0);
        return isoYear ? isoYear.toString() : '';
    }

    get minute() {
        return Number(this.getUnit('minute'));
    }

    get month() {
        return Number(this.getUnit('month'));
    }

    get offset() {
        // Date object representing the current time zone
        const tzDate = this.tzDate;

        // Remove the local timezone offset
        const referenceTime =
            this._originalDate.getTime() +
            this._originalDate.getTimezoneOffset() * 60 * 1000;

        const offsetMs = tzDate.getTime() - referenceTime;
        const offsetHours = Math.floor(offsetMs / (1000 * 60 * 60));
        const offsetMinutes = Math.abs(offsetMs / (1000 * 60)) % 60;
        const sign = offsetHours >= 0 ? '+' : '-';

        const offsetHoursString = pad(Math.abs(offsetHours), 2);
        const offsetMinutesString = pad(Math.abs(offsetMinutes), 2);
        return `${sign}${offsetHoursString}:${offsetMinutesString}`;
    }

    get ordinal() {
        const startOfYear = new Date(this._originalDate);
        startOfYear.setMonth(0, 1);
        const day = 1 + Math.ceil((this.tzDate - startOfYear) / 86400000);
        return day ? day.toString() : '';
    }

    get quarter() {
        const quarter = Math.ceil(this.month / 3);
        return quarter.toString();
    }

    get second() {
        return Number(this.getUnit('second'));
    }

    /**
     * Date object representing the given time zone.
     * Its date and time are the same as if the local time was in the given time zone.
     *
     * @type {Date}
     */
    get tzDate() {
        if (!this.timeZone) {
            return new Date(this._originalDate);
        }
        const parts = new Intl.DateTimeFormat('en-US', {
            day: DOUBLE_DIGIT,
            timeZone: this.timeZone,
            year: NUMERIC,
            month: DOUBLE_DIGIT,
            hour: DOUBLE_DIGIT,
            minute: DOUBLE_DIGIT,
            second: DOUBLE_DIGIT,
            hour12: false
        }).formatToParts(this._originalDate);
        const y = parts[4].value;
        const mo = parts[0].value;
        const d = parts[2].value;
        const h = parts[6].value;
        const min = parts[8].value;
        const sec = parts[10].value;
        const isoDate = `${y}-${mo}-${d}T${h}:${min}:${sec}`;
        return new Date(isoDate);
    }

    get weekday() {
        const number = this.tzDate.getDay();
        return number === 0 ? 7 : number;
    }

    get year() {
        return Number(this.getUnit('year'));
    }

    /*
     * -------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    getUnit(unit, unitValue = NUMERIC) {
        const parts = new Intl.DateTimeFormat(DEFAULT_LANGUAGE, {
            [unit]: unitValue,
            hour12: false,
            timeZone: this.timeZone
        }).formatToParts(this._originalDate);
        const value = parts.find((part) => part.type === unit).value;
        return value || '';
    }

    toISO() {
        if (!this.timeZone) {
            return this._originalDate.toISOString();
        }
        const iso = this.tzDate.toISOString();
        return iso.replace('Z', this.offset);
    }
}
