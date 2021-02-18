import { LightningElement, api } from 'lwc';

export default class ProgressRing extends LightningElement {
    @api direction;
    @api size;
    @api value;
    @api variant;
    @api hideIcon;
}
