import { LightningElement, api } from 'lwc';

export default class PrimitiveCalendar extends LightningElement {
    @api dateLabels;
    @api disabledDates;
    @api disabled;
    @api displayDate;
    @api isMultiCalendars;
    @api markedDates;
    @api max;
    @api min;
    @api selectionMode;
    @api timezone;
    @api value;
    @api weekNumber;
    @api weekStartDay;

    @api focusDate() {}
}
