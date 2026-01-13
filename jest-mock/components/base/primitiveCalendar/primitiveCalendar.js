import { LightningElement, api } from 'lwc';

export default class PrimitiveCalendar extends LightningElement {
    @api calendarData = [];
    @api isLabeled = false;
    @api isMultiSelect = false;
    @api selectionMode;
    @api value;
    @api weekdays;
    @api weekStartDay;

    @api focusDate() {}
}
