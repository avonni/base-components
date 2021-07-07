import { LightningElement } from 'lwc';

export default class ButtonsWithMultiSelect extends LightningElement {
    options = [
        { label: 'Mon', value: 'mon' },
        { label: 'Tue', value: 'tue' },
        { label: 'Wed', value: 'wed' },
        { label: 'Thu', value: 'thu' },
        { label: 'Fri', value: 'fri' }
    ];

    value = ['thu', 'fri'];
}
