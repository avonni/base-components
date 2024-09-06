import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeObject
} from 'c/utils';
import { DateTime } from 'c/dateTimeUtils';
import Label from './dateLabel';

export default class CalendarDate {
    constructor(props) {
        this.adjacentMonth = props.adjacentMonth;
        this.date = props.date;
        this.disabled = normalizeBoolean(props.disabled);
        this.isPartOfInterval = normalizeBoolean(props.isPartOfInterval);
        this.isToday = normalizeBoolean(props.isToday);
        this.isWeekNumber = normalizeBoolean(props.isWeekNumber);
        this.chip = new Label(normalizeObject(props.chip));
        this.markers = normalizeArray(props.markers);
        this.selected = normalizeBoolean(props.selected);

        // We don't include the time zone because the given date
        // has already been converted to the correct time zone.
        this._dateTime = new DateTime(this.date);
    }

    get appearsSelected() {
        return this.selected || this.isPartOfInterval;
    }

    get ariaCurrent() {
        return this.isToday ? 'date' : null;
    }

    get hasChip() {
        return this.chip.iconName || this.chip.label;
    }

    get label() {
        if (this.isWeekNumber) {
            return this._dateTime.isoWeek;
        }
        return this.date.getDate();
    }

    get labelClass() {
        return classSet({
            'slds-day': !this.isWeekNumber,
            'avonni-calendar__disabled-cell': this.disabled
        }).toString();
    }

    get ts() {
        return this.date.getTime();
    }

    get wrapperClass() {
        return classSet({
            'avonni-calendar__date-cell': !this.isWeekNumber,
            'avonni-calendar__week-cell': this.isWeekNumber,
            'slds-day_adjacent-month': this.adjacentMonth,
            'slds-is-today': this.isToday,
            'slds-is-selected': this.appearsSelected,
            'slds-is-selected-multi': this.isPartOfInterval
        }).toString();
    }
}
