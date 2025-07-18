import { LightningElement, api } from 'lwc';

export default class Card extends LightningElement {
    @api iconName;
    @api mediaAlternativeText;
    @api mediaSrc;
    @api mediaPosition;
    @api title;
}
