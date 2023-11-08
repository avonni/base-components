import { LightningElement, api } from 'lwc';

export default class CardCenterBottom extends LightningElement {
    @api title;
    @api mediaSrc;
    @api mediaPosition;
    @api iconName;
}
