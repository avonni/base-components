import { LightningElement, api } from 'lwc';

export default class ExpandableSection extends LightningElement {
    @api closed;
    @api closedIconAlternativeText;
    @api collapsible;
    @api openedIconAlternativeText;
    @api title;
    @api variant;
}
