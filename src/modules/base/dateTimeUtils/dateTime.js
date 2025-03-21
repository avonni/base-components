import { DEFAULT_LANGUAGE, NUMERIC } from './constants';
import { pad } from './utils';

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

    get dateParts() {
        const parts = new Intl.DateTimeFormat('en-US', {
            day: NUMERIC,
            timeZone: this.timeZone,
            year: NUMERIC,
            month: NUMERIC,
            hour: NUMERIC,
            minute: NUMERIC,
            second: NUMERIC,
            hour12: false
        }).formatToParts(this._originalDate);
        const y = Number(parts[4].value);
        const mo = Number(parts[0].value);
        const d = Number(parts[2].value);
        const h = Number(parts[6].value) === 24 ? 0 : Number(parts[6].value);
        const min = Number(parts[8].value);
        const sec = Number(parts[10].value);
        const ms = this._originalDate.getMilliseconds();
        return { y, mo, d, h, min, sec, ms };
    }

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
        return 1 + Math.ceil((firstThursday - target) / 604800000);
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
        return y + (isWeek53 && d.getTime() < startOfYear.getTime() ? -1 : 0);
    }

    get minute() {
        return Number(this.getUnit('minute'));
    }

    get month() {
        return Number(this.getUnit('month'));
    }

    get ordinal() {
        const oneDay = 86400000;
        const januaryFirst = new Date(this.year, 0, 1, 0, 0, 0);
        const ordinal = Math.ceil((this.tzDate - januaryFirst) / oneDay);
        if (ordinal === 0) {
            return 1;
        }
        return ordinal;
    }

    get quarter() {
        return Math.ceil(this.month / 3);
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
        const { y, mo, d, h, min, sec, ms } = this.dateParts;
        return new Date(y, mo - 1, d, h, min, sec, ms);
    }

    /**
     * Time zone offset, in the format '+HH:MM' or '-HH:MM'.
     *
     * @type {string}
     */
    get tzOffset() {
        // Date if we were in the given time zone
        const tzDate = this.tzDate;

        // Time of the original date in the UTC time zone
        const referenceTime =
            this._originalDate.getTime() +
            this._originalDate.getTimezoneOffset() * 60 * 1000;

        // Calculate the offset between the given time zone and UTC
        const offsetMs = tzDate.getTime() - referenceTime;
        const offsetHours = Math.floor(offsetMs / (1000 * 60 * 60));
        const offsetMinutes = Math.abs(offsetMs / (1000 * 60)) % 60;
        const sign = offsetHours >= 0 ? '+' : '-';

        const offsetHoursString = pad(Math.abs(offsetHours), 2);
        const offsetMinutesString = pad(Math.abs(offsetMinutes), 2);
        return `${sign}${offsetHoursString}:${offsetMinutesString}`;
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
        const { y, mo, d, h, min, sec, ms } = this.dateParts;
        const date = `${y}-${pad(mo, 2)}-${pad(d, 2)}`;
        const time = `${pad(h, 2)}:${pad(min, 2)}:${pad(sec, 2)}.${pad(ms, 3)}`;
        const offset = this.tzOffset === '+00:00' ? 'Z' : this.tzOffset;
        return `${date}T${time}${offset}`;
    }
}
