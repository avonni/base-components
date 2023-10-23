import { LightningElement } from 'lwc';

export default class DateTimePickerWeekly extends LightningElement {
    disabledDateTimes = [
        'Wed',
        '2021-03-15',
        new Date('2021-03-16T13:50:00.00Z')
    ];
}
