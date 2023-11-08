import { LightningElement, api } from 'lwc';

export default class Blockquote extends LightningElement {
    @api title;
    @api iconName;
    @api variant;
    @api iconPosition;
    @api iconSize;
}
