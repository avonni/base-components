import { LightningElement } from 'lwc';

export default class SliderCustomLabel extends LightningElement {
    get unitAttributes() {
        return {
            customLabels: [
                {
                    label: 'Jan 1',
                    value: 0
                },
                {
                    label: 'Jan 3',
                    value: 2
                },
                {
                    label: 'Jan 6',
                    value: 5
                },
                {
                    label: 'Jan 11',
                    value: 10
                }
            ]
        };
    }
}
