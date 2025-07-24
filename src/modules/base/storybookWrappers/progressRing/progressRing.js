import { LightningElement, api } from 'lwc';

export default class ProgressRing extends LightningElement {
    @api alternativeText;
    @api direction;
    @api hideIcon;
    @api size;
    @api value;
    @api variant;
}
