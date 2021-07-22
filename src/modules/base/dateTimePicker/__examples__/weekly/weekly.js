import { LightningElement } from 'lwc';

export default class DateTimePickerWeekly extends LightningElement {
    disabledDateTimes = [
        'Wed',
        new Date('2021-03-16T12:00:00.00Z'),
        new Date('2021-03-16T13:00:00.00Z')
    ];
}
