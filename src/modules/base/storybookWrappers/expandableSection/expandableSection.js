import { LightningElement, api } from 'lwc';

export default class ExpandableSection extends LightningElement {
    @api title;
    @api closed;
    @api collapsable;
}
