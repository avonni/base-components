

import { nextAllowedDay } from './dateComputations';

/**
 * Occurrence of a scheduler event.
 *
 * @class
 * @param {number[]} availableDaysOfTheWeek Array of available days of the week. If the occurrence spans on multiple days, some of them may be unavailable.
 * @param {number[]} availableMonths Array of available months. If the occurrence spans on multiple months, some of them may be unavailable.
 * @param {number} eventKey Unique key of the event this occurrence belongs to.
 * @param {DateTime} from Start date of the occurrence.
 * @param {string} key Unique key of the occurrence.
 * @param {number} level Level of the occurrence in its cell group.
 * @param {number} numberOfEventsInThisTimeFrame Number of events in the same time frame than the occurrence.
 * @param {number} offsetSide Offset of the occurrence in the schedule, used to prevent it from overlapping another occurrence.
 * @param {boolean} overflowsCell Used only by the calendar display. If true, the occurrence overflows the cell it is in.
 * @param {string} resourceName Name of the resource this occurrence belongs to.
 * @param {string[]} resourceNames Names of the resources the occurrence's event belongs to.
 * @param {boolean} endsInLaterCell Used only by the calendar and agenda displays. If true, the occurrence ends in a later schedule cell.
 * @param {boolean} startsInPreviousCell Used only by the calendar and agenda displays. If true, the occurrence starts in a previous schedule cell.
 * @param {string} title Title of the occurrence.
 * @param {DateTime} to End date of the occurrence.
 * @param {DateTime} weekStart Used only by the calendar display. If the occurrence is a placeholder for a multi-week occurrence, this is the start date of the placeholder's week.
 */
export class SchedulerEventOccurrence {
    constructor(props) {
        this.offsetSide = 0;
        Object.assign(this, props);
    }

    /**
     * End of the day, of the end date of the occurrence.
     *
     * @type {DateTime}
     */
    get endOfTo() {
        return this.to.endOf('day');
    }

    /**
     * Start of the day, of the start date of the occurrence.
     *
     * @type {DateTime}
     */
    get startOfFrom() {
        return this.from.startOf('day');
    }

    /**
     * If the occurrence spans on multiple days, and some weekdays/months are unavailable, this is the first available date.
     *
     * @type {DateTime}
     */
    get firstAllowedDate() {
        const { availableMonths, availableDaysOfTheWeek } = this;
        if (!availableMonths || !availableDaysOfTheWeek) {
            return this.from;
        }
        const start = this.weekStart || this.from;
        return nextAllowedDay(start, availableMonths, availableDaysOfTheWeek);
    }

    /**
     * Weekday number of the first allowed date.
     *
     * @type {number}
     */
    get firstAllowedWeekday() {
        const weekday = this.firstAllowedDate.weekday;
        return weekday === 7 ? 0 : weekday;
    }
}
