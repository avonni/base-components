import { LightningElement } from 'lwc';

export default class CalendarMarkedDates extends LightningElement {
    disabledDates = [20, 'Sat'];
    markedDates = [
        { date: new Date('05/09/2022'), color: 'red' },
        { date: new Date('05/26/2022'), color: 'brown' },
        { date: 14, color: 'blue' },
        { date: 25, color: 'yellow' },
        { date: 'Wed', color: 'black' }
    ];
}
