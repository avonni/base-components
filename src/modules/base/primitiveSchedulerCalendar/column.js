import { SchedulerCellGroup } from 'c/schedulerUtils';
import { dateTimeObjectFrom } from 'c/luxonDateTimeUtils';
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
        this._setStartAndEnd();
    }

    /**
     * Initialize the cells array.
     */
    initCells() {
        super.initCells();
        this._setStartAndEnd();

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

    _setStartAndEnd() {
        const firstCell = this.cells[0];
        if (!firstCell) {
            return;
        }
        const start = dateTimeObjectFrom(firstCell.start, {
            zone: this.timezone
        });
        const end = dateTimeObjectFrom(firstCell.end, {
            zone: this.timezone
        });

        this.start = start.startOf('day');
        this.end = end.endOf('day');
        this.weekday = this.start.weekday === 7 ? 0 : this.start.weekday;
    }
}
