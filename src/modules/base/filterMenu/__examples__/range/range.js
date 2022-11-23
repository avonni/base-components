import { LightningElement } from 'lwc';

export default class FilterMenuRange extends LightningElement {
    typeAttributes = {
        max: 30,
        min: 6,
        showPin: true,
        step: 2,
        tickMarkStyle: 'dot',
        showTickMarks: true,
        unit: 'currency',
        unitAttributes: {
            currencyCode: 'EUR'
        }
    };
}
