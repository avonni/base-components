import { LightningElement, api } from 'lwc';

export default class Image extends LightningElement {
    @api items;

    get itemList() {
        let result = [];

        this.items.forEach((item, index) => {
            let cloneItem = Object.assign({}, item);
            cloneItem.key = `image-key-${index}`;
            result.push(cloneItem);
        });

        return result;
    }
}

