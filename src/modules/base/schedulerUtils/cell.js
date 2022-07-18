import { dateTimeObjectFrom, normalizeArray } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

export default class SchedulerCell {
    constructor(props) {
        this.currentMonth = props.currentMonth;
        this.start = props.start;
        this.end = props.end;
        this.events = normalizeArray(props.events);
        this._startDate = dateTimeObjectFrom(this.start);
    }

    get day() {
        return this._startDate.day;
    }

    get computedClass() {
        const startMonth = this._startDate.month;
        return classSet(
            'avonni-scheduler__calendar-cell slds-border_right slds-border_bottom slds-p-around_none'
        ).add({
            'slds-text-align_center': this.currentMonth,
            'avonni-scheduler__calendar-cell_outside-of-current-month':
                this.currentMonth !== startMonth
        });
    }
}
