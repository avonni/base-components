import { LightningElement, api } from 'lwc';

export default class Confetti extends LightningElement {
    @api colors;
    @api originX;
    @api originY;
    @api zIndex;
    @api variant;
    @api name;

    @api
    fire() {
        return true;
    }
}
