import { LightningElement } from 'lwc';

export default class Monthly extends LightningElement {
    disabledDateTimes = [
        new Date('2021-03-16T13:00:00.00Z'),
        new Date('2021-03-16T13:10:00.00Z'),
        'Wed',
        13
    ];
}
