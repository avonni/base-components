import { LightningElement } from 'lwc';

export default class ProgressBarMultipleReferenceLines extends LightningElement {
    multipleReferenceLines = [
        {
            label: '1st',
            value: 10,
            variant: 'inverse',
            borderStyle: 'dashed'
        },
        {
            label: '2nd',
            value: 15,
            variant: 'lightest',
            borderStyle: 'dotted'
        },
        {
            label: '3rd',
            value: 53,
            variant: 'warning',
            borderStyle: 'solid'
        },
        {
            label: '4th',
            value: 87,
            variant: 'success',
            borderStyle: 'none'
        }
    ];
}
