import { LightningElement } from 'lwc';

export default class CalendarDisabled extends LightningElement {
    
    disabledDates = [];
    min = new Date('04/15/2021');
    max = new Date('06/10/2021');
}
