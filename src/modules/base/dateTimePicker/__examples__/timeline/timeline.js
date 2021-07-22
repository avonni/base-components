import { LightningElement } from 'lwc';

export default class DateTimePickerTimeline extends LightningElement {
    disabledDateTimes = [
        new Date(new Date().setHours(9, 35, 0, 0)),
        new Date(new Date().setHours(9, 30, 0, 0)),
        new Date(new Date().setHours(9, 10, 0, 0)),
        new Date(new Date().setHours(10, 15, 0, 0)),
        new Date(new Date().setHours(15, 0, 0, 0)),
        new Date(new Date().setHours(15, 10, 0, 0)),
        new Date(new Date().setHours(16, 45, 0, 0)),
        new Date(new Date().setHours(17, 20, 0, 0)),
        'Wed',
        13
    ];
}
