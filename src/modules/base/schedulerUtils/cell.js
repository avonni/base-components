import {
    dateTimeObjectFrom,
    getWeekNumber,
    normalizeArray
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';

export default class SchedulerCell {
    constructor(props) {
        this.currentMonth = props.currentMonth;
        this.start = props.start;
        this.end = props.end;
        this.events = normalizeArray(props.events);
        this.placeholders = normalizeArray(props.placeholders);
        this._startDate = dateTimeObjectFrom(this.start);
    }

    get day() {
        return this._startDate.day;
    }

    get disabledEvents() {
        return this.events.filter((ev) => ev.disabled);
    }

    get computedClass() {
        return classSet(
            'avonni-scheduler__calendar-cell slds-border_right slds-border_bottom slds-p-around_none'
        ).add({
            'avonni-scheduler__calendar-cell_outside-of-current-month':
                this.currentMonth && this.currentMonth !== this.month
        });
    }

    get month() {
        return this._startDate.month;
    }

    get overflowingEvents() {
        const events = this.events.concat(this.placeholders);
        return events.filter((event) => event.overflowsCell);
    }

    get showMoreLabel() {
        return `+${this.overflowingEvents.length} more`;
    }

    get weekNumber() {
        return getWeekNumber(this._startDate);
    }
}
