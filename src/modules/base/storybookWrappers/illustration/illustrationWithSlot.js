import { LightningElement, api } from 'lwc';

export default class Illustration extends LightningElement {
    @api title;
    @api size = 'small';
    @api variant = 'text-only';
}
