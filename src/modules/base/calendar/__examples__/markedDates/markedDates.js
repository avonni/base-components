import { LightningElement } from 'lwc';

export default class CalendarMarkedDates extends LightningElement {
    
    disabledDates = [20, 'Sat'];
    markedDates = [
        new Date(2021, 4, 9), 
        new Date(2021, 4, 26), 
        14, 
        20, 
        'Wed'
    ];

    min = new Date('04/15/2021');
    max = new Date('06/10/2021');
}
