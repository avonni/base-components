import { LightningElement } from 'lwc';

export default class OutputDataPercent extends LightningElement {
    typeAttributes = {
        maximumFractionDigits: 1
    };

    value = 0.4567;
}
