import { LightningElement, api } from 'lwc';

export default class SplitterPane extends LightningElement {
    @api collapsed;
    @api collapsedSize;
    @api collapsible;
    @api max;
    @api min;
    @api resizable;
    @api scrollable;
    @api size;
}
