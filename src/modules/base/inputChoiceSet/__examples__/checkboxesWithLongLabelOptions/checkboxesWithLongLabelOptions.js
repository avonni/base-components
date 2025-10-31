import { LightningElement } from 'lwc';

export default class InputChoiceSetCheckboxesWithLongLabelOptions extends LightningElement {
    optionsWithLongLabel = [
        { label: 'A very long long long long long Monday', value: 'mon' },
        { label: 'A very long long long long long Tuesday', value: 'tue' },
        { label: 'A very long long long long long Wednesday', value: 'wed' },
        { label: 'A very long long long long long Thursday', value: 'thu' },
        { label: 'A very long long long long long Friday', value: 'fri' }
    ];
    dayValue = ['fri'];
}
