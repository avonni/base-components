import { LightningElement } from 'lwc';

export default class CustomProgressRange extends LightningElement {
    unitAttributes = {
        customLabels: [
            {
                label: 'Very Sad',
                value: 0
            },
            {
                label: 'Sad',
                value: 1
            },
            {
                label: 'Normal',
                value: 2
            },
            {
                label: 'Happy',
                value: 3
            },
            {
                label: 'Very Happy',
                value: 4
            }
        ]
    };
}
