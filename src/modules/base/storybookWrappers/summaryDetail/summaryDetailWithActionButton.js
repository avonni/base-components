import { LightningElement, api } from 'lwc';

export default class SummaryDetailWithActionButton extends LightningElement {
    @api title;
    @api fullWidthHeader;
    @api shrinkIconName;
    @api expandIconName;
    @api closed;
}
