import { LightningElement } from 'lwc';

export default class CustomProgressRange extends LightningElement {
    unitAttributes = {
        customLabels: [
            {
                label: '0h00',
                value: 0
            },
            {
                label: '0h10',
                value: 10
            },
            {
                label: '0h20',
                value: 20
            },
            {
                label: '0h30',
                value: 30
            },
            {
                label: '0h40',
                value: 40
            },
            {
                label: '0h50',
                value: 50
            },
            {
                label: '1h00',
                value: 60
            }
        ]
    };
}
