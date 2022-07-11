import { LightningElement } from 'lwc';

export default class SliderUnitCurrencyCAD extends LightningElement {
    get unitAttributes() {
        return {
            currencyCode: 'CAD'
        };
    }
}
