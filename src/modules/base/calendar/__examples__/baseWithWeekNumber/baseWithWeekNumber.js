import { LightningElement } from 'lwc';

export default class CalendarBaseWithWeekNumber extends LightningElement {
    
    disabledDates = [
        new Date(2021, 4, 9),
        new Date(2021, 4, 26),
        13,
        14,
        20,
        21,
        'Wed',
        'Thu'
    ];

    min = new Date('04/15/2021');
    max = new Date('06/10/2021');
}
