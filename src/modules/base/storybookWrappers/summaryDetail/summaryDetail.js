import { LightningElement, api } from 'lwc';

export default class SummaryDetail extends LightningElement {
    @api closed;
    @api expandIconName;
    @api fullWidth;
    @api hideIcon;
    @api removeBodyIndentation;
    @api shrinkIconName;
    @api title;
}
