import { LightningElement } from 'lwc';

export default class InputChoiceSetButtons extends LightningElement {
    optionsWithoutIcon = [
        { label: 'Mon', value: 'mon', tooltip: 'Monday' },
        { label: 'Tue', value: 'tue', tooltip: 'Tuesday' },
        { label: 'Wed', value: 'wed', tooltip: 'Wednesday' },
        { label: 'Thu', value: 'thu', tooltip: 'Thursday' },
        { label: 'Fri', value: 'fri', tooltip: 'Friday' }
    ];
    dayValue = ['fri'];
}
