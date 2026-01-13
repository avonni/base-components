import { LightningElement, api } from 'lwc';

export default class Calendar extends LightningElement {
    @api dateLabels;
    @api disabled;
    @api disabledDates;
    @api hideNavigation;
    @api markedDates;
    @api max;
    @api min;
    @api nextMonthCount;
    @api selectionMode;
    @api timezone;
    @api value;
    @api weekNumber;
    @api weekStartDay;

    @api focusDate() {}
    @api focus() {}
    @api goToDate() {}
    @api nextMonth() {}
    @api previousMonth() {}
}
