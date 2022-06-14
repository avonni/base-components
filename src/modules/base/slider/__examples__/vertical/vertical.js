import { LightningElement } from 'lwc';

export default class SliderVertical extends LightningElement {
    get secondSliderValues() {
        return [25, 75];
    }

    get unitAttributes() {
        return {
            customLabels: [
                {
                    label: 'Jan 1',
                    value: 0
                },
                {
                    label: 'Jan 28',
                    value: 27
                },
                {
                    label: 'Fev 9',
                    value: 60
                },
                {
                    label: 'Fev 31',
                    value: 100
                }
            ]
        };
    }
}
