import { LightningElement } from 'lwc';

export default class RangeTimeRange extends LightningElement {
    unitAttributes = {
        customLabels: [
            {
                label: '8h00',
                value: 0
            },
            {
                label: '8h10',
                value: 10
            },
            {
                label: '8h20',
                value: 20
            },
            {
                label: '8h30',
                value: 30
            },
            {
                label: '8h40',
                value: 40
            },
            {
                label: '8h50',
                value: 50
            },
            {
                label: '9h00',
                value: 60
            }
        ]
    };
}
