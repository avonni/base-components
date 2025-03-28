import { classSet, normalizeArray } from 'c/utils';

export default class FilterMenuItem {
    constructor(props) {
        Object.assign(this, props);
        this.initTreeProperties();
    }

    get colorStyle() {
        return this.color ? `color: ${this.color}` : null;
    }

    get wrapperClass() {
        return classSet('slds-dropdown__item slds-truncate')
            .add({
                'slds-is-selected': this.checked
            })
            .toString();
    }

    initTreeProperties() {
        if (this.prefixIconName) {
            this.avatar = {
                fallbackIconName: this.prefixIconName,
                size: 'x-small'
            };
        }
        this.items = normalizeArray(this.items).map((i) => {
            return new FilterMenuItem(i);
        });
        this.name = this.value;
    }
}
