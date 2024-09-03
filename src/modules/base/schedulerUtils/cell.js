import { dateTimeObjectFrom, getWeekNumber } from 'c/utilsPrivate';
import { classSet, normalizeArray } from 'c/utils';

/**
 * Cell of the scheduler.
 *
 * @class
 * @param {number} currentMonth Used by the calendar display. Current visible month number.
 * @param {number} start Start timestamp of the cell.
 * @param {number} end End timestamp of the cell.
 * @param {object[]} events Array of event objects that cross this cell.
 * @param {object[]} placeholders Used by the calendar display. Array of event objects used as placeholders, that cross this cell.
 */
export default class SchedulerCell {
    constructor(props) {
        this.currentMonth = props.currentMonth;
        this.start = props.start;
        this.end = props.end;
        this.events = normalizeArray(props.events);
        this.placeholders = normalizeArray(props.placeholders);
        this.removedByTimeChange = false;
        this.timezone = props.timezone;
        this._startDate = dateTimeObjectFrom(this.start, {
            zone: this.timezone
        });
    }

    /**
     * Day of the start date.
     *
     * @type {number}
     */
    get day() {
        return this._startDate.day;
    }

    /**
     * Array of disabled events that cross this cell.
     *
     * @type {object[]}
     */
    get disabledEvents() {
        return this.events.filter((ev) => ev.disabled);
    }

    /**
     * Computed CSS classes for the cell.
     *
     * @type {string}
     */
    get computedClass() {
        return classSet(
            'avonni-scheduler__calendar-cell avonni-scheduler__border_right slds-border_bottom slds-p-around_none'
        ).add({
            'avonni-scheduler__calendar-cell_outside-of-current-month':
                this.currentMonth && this.currentMonth !== this.month,
            'avonni-scheduler__calendar-cell_today': this.isToday,
            'slds-theme_shade slds-theme_alert-texture':
                this.removedByTimeChange
        });
    }

    /**
     * True if the start date is today.
     *
     * @type {boolean}
     */
    get isToday() {
        const today = dateTimeObjectFrom(Date.now(), {
            zone: this.timezone
        });
        return (
            this._startDate.year === today.year &&
            this._startDate.month === today.month &&
            this._startDate.day === today.day
        );
    }

    /**
     * Unique key to use in the template iterations.
     *
     * @type {string|number}
     */
    get key() {
        return this.removedByTimeChange ? 'removed' : this.start;
    }

    /**
     * Month of the start date.
     *
     * @type {number}
     */
    get month() {
        return this._startDate.month;
    }

    /**
     * Used by the calendar display. Array of events that overflow the cell.
     *
     * @type {object[]}
     */
    get overflowingEvents() {
        const events = this.events.concat(this.placeholders);
        return events.filter((event) => event.overflowsCell);
    }

    /**
     * Label of the "show more" button, in the calendar month display.
     *
     * @type {string}
     */
    get showMoreLabel() {
        return `+${this.overflowingEvents.length} more`;
    }

    /**
     * Title of the cell, used in the calendar display.
     *
     * @type {string}
     */
    get title() {
        return this.removedByTimeChange
            ? 'This time slot does not exist due to the time change.'
            : undefined;
    }

    /**
     * Week number of the start date.
     *
     * @type {number}
     */
    get weekNumber() {
        return getWeekNumber(this._startDate);
    }
}
