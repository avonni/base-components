import { LightningElement } from 'lwc';

export default class CalendarMarkedDates extends LightningElement {
    disabledDates = [20, 'Sat'];
    markedDates = [
        { date: new Date(2021, 4, 9), color: '#ffffff' },
        { date: new Date(2021, 4, 26), color: '#ffffff' },
        { date: 14, color: '#ffffff' },
        { date: 20, color: '#ffffff' },
        { date: 'Wed', color: '#ffffff' }
    ];
}
