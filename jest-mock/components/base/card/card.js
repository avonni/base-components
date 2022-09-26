import { LightningElement, api } from 'lwc';

export default class Card extends LightningElement {
    @api title;
    @api mediaSrc;
    @api mediaPosition;
    @api iconName;
}
