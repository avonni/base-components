import { LightningElement } from 'lwc';

export default class SliderCustomLabelDot extends LightningElement {
    get unitAttributes() {
        return {
            customLabels: [
                {
                    label: 'Very Sad',
                    value: 0
                },
                {
                    label: 'Sad',
                    value: 10
                },
                {
                    label: 'Average',
                    value: 20
                },
                {
                    label: 'Happy',
                    value: 30
                },
                {
                    label: 'Very Happy',
                    value: 40
                }
            ]
        };
    }
}
