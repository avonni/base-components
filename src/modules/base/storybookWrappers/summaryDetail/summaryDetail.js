import { LightningElement, api } from 'lwc';

export default class SummaryDetail extends LightningElement {
    @api title;
    @api fullWidth;
    @api removeBodyIndentation;
    @api shrinkIconName;
    @api expandIconName;
    @api closed;
}
