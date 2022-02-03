import { LightningElement, api } from 'lwc';

export default class Tree extends LightningElement {
    @api header;
    @api items;
    @api readOnly;
    @api selectedItem;

    handleSelect(event) {
        event.preventDefault();
    }
}
