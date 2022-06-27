import { LightningElement, api } from 'lwc';

export default class PrimitivePill extends LightningElement {
    @api actions;
    @api avatar;
    @api href;
    @api label;
    @api name;

    @api focusLink() {}
}
