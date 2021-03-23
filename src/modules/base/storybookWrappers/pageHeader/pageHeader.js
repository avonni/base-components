import { LightningElement, api } from 'lwc';

export default class PageHeader extends LightningElement {
    @api iconName;
    @api label;
    @api title;
    @api info;
    @api variant = 'base';
    @api items = [];
}
