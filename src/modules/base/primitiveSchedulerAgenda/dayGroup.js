import { classSet } from 'c/utils';

/**
 * One day of the agenda.
 *
 * @class
 * @param {DateTime} date Date of the day.
 * @param {object[]} events Array of event objects happening on this day.
 * @param {boolean} isFirstDayOfMonth If true, the day is the first day to be visible in its month.
 * @param {boolean} isToday If true, the day is today.
 */
export default class SchedulerAgendaDayGroup {
    constructor(props) {
        Object.assign(this, props);
    }

    /**
     * Computed CSS classes of the day group.
     *
     * @type {string}
     */
    get dayClass() {
        return classSet('slds-grid')
            .add({
                'avonni-scheduler__agenda-day_today': this.isToday,
                'avonni-scheduler__agenda-day slds-grid_vertical-align-center slds-grid_align-center slds-m-right_small':
                    !this.isMobileView,
                'avonni-scheduler__agenda-day_small': this.isMobileView
            })
            .toString();
    }

    /**
     * Day number in the month.
     *
     * @type {number}
     */
    get day() {
        return this.date.day;
    }

    /**
     * End of the day.
     *
     * @type {DateTime}
     */
    get end() {
        return this.date.endOf('day');
    }

    /**
     * Full formatted month name.
     *
     * @type {string}
     */
    get fullMonth() {
        return this.date.toFormat('LLLL');
    }

    /**
     * Formatted month in its shorten version.
     *
     * @type {string}
     */
    get month() {
        return this.date.toFormat('LLL');
    }

    /**
     * Start of the day.
     *
     * @type {DateTime}
     */
    get start() {
        return this.date.startOf('day');
    }

    /**
     * Formatted week day.
     *
     * @type {string}
     */
    get weekday() {
        return this.isMobileView
            ? this.date.toFormat('ccc')
            : this.date.toFormat('cccc');
    }

    /**
     * Formatted year.
     *
     * @type {string}
     */
    get year() {
        return this.date.toFormat('yyyy');
    }
}
