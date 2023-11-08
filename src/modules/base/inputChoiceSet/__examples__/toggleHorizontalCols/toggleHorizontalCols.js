import { LightningElement } from 'lwc';

export default class InputChoiceSetToggleHorizontalCols extends LightningElement {
    optionsWithoutIcon = [
        { label: 'Mon', value: 'mon' },
        { label: 'Tue', value: 'tue' },
        { label: 'Wed', value: 'wed' },
        { label: 'Thu', value: 'thu' },
        { label: 'Fri', value: 'fri' }
    ];
    orientationAttributes = {
        cols: 2,
        multipleRows: true
    };
    dayValue = ['fri'];
}
