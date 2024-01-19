import { LightningElement } from 'lwc';

export default class InputChoiceSetButtonsHorizontalStretchRow extends LightningElement {
    optionsWithoutIcon = [
        { label: 'Mon', value: 'mon' },
        { label: 'Tue', value: 'tue' },
        { label: 'Wed', value: 'wed' },
        { label: 'Thu', value: 'thu' },
        { label: 'Fri', value: 'fri' }
    ];
    orientationAttributes = {
        multipleRows: false
    };
    dayValue = ['fri'];
    typeAttributes = {
        displayAsRow: true,
        stretch: true
    };
}
