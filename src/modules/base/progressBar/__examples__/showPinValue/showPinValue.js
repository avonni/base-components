import { LightningElement } from 'lwc';

export default class ProgressBarShowPinValue extends LightningElement {
    oneReferenceLine = [
        {
            label: 'Avg',
            value: 90,
            variant: 'inverse',
            borderStyle: 'dashed'
        }
    ];
}
