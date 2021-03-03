import { LightningElement, api } from 'lwc';

export default class GetAttributes extends LightningElement {
    @api
    get itemType() {
        return this._itemType;
    }

    set itemType(value) {
        this._itemType = value;
    }

    get typeAttributes() {
        const typeAttributes = this.types.getType(this.itemType).typeAttributes;
        if (Array.isArray(typeAttributes)) {
            return typeAttributes.reduce((seed, attrName, index) => {
                seed[attrName] = this[`typeAttribute${index}`];
                return seed;
            }, {});
        }
        return {};
    }
}
