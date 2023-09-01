

import { LightningElement, api } from 'lwc';

export default class CardTopMedia extends LightningElement {
    @api title;
    @api mediaSrc;
    @api mediaPosition;
    @api iconName;
}
