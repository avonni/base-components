import { LightningElement, api } from 'lwc';

export default class Chip extends LightningElement {
    @api label;
    @api variant = 'base';
    @api outline = false;
}
