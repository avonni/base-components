import { LightningElement, api } from 'lwc';
import { normalizeArray } from 'c/utilsPrivate';
import { generateUniqueId } from 'c/utils';

export default class FilterMenuGroup extends LightningElement {
    _items = [];

    @api
    get items() {
        return this._items;
    }
    set items(value) {
        const array = normalizeArray(value);
        this._items = JSON.parse(JSON.stringify(array));
    }

    get generateKey() {
        return generateUniqueId();
    }
}
