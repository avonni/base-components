import { SchedulerCellGroup } from 'c/schedulerUtils';
import { dateTimeObjectFrom } from 'c/dateTimeUtils';
import { normalizeArray } from 'c/utils';

/**
 * Column of the calendar (day, week and month views), or multi-day event row (day and week views).
 *
 * @class
 * @extends SchedulerCellGroup
 * @param {SchedulerCell[]} cells Inherited. See SchedulerCellGroup.
 * @param {object[]} disabledEvents Array of disabled event objects that cross the column.
 * @param {object[]} multiDayPlaceholders Array of placeholder objects. The placeholders are used in the month view to keep track of the room a multi-day event is taking, and compute correctly the occurrences offset.
 * @param {object[]} events Inherited. See SchedulerCellGroup.
 * @param {object[]} referenceCells Inherited. See SchedulerCellGroup.
 */
export default class SchedulerCalendarColumn extends SchedulerCellGroup {
    constructor(props) {
        super(props);
        this.disabledEvents = normalizeArray(props.disabledEvents);
        this.multiDayPlaceholders = normalizeArray(props.multiDayPlaceholders);
    }

    /**
     * Start date of the column.
     *
     * @type {DateTime}
     */
    get start() {
        const start = dateTimeObjectFrom(this.cells[0].start, {
            zone: this.timezone
        });
        return start.startOf('day');
    }

    /**
     * End date of the column.
     *
     * @type {DateTime}
     */
    get end() {
        const end = dateTimeObjectFrom(this.cells[0].end, {
            zone: this.timezone
        });
        return end.endOf('day');
    }

    /**
     * Week day number of the start date.
     */
    get weekday() {
        return this.start.weekday === 7 ? 0 : this.start.weekday;
    }

    /**
     * Initialize the cells array.
     */
    initCells() {
        super.initCells();

        if (this.multiDayPlaceholders) {
            // Order the placeholders that are spanning on multiple weeks
            // from the latest to the earliest, so the last cells do not
            // use the first week's placeholder as their occurrence
            this.multiDayPlaceholders.sort((a, b) => {
                if (!a.weekStart) return 1;
                if (!b.weekStart) return -1;
                return b.weekStart - a.weekStart;
            });
            this.multiDayPlaceholders.forEach((placeholder) => {
                this.addEventToCells(placeholder, 'placeholders');
            });
        }
    }
}
