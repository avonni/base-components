import { classSet, normalizeArray } from 'c/utils';

export default class FilterMenuItem {
    constructor(props) {
        Object.assign(this, props);
        this.checked = this.filterValue.includes(this.value);
        this.initTreeProperties();
    }

    get colorStyle() {
        return this.color ? `color: ${this.color}` : null;
    }

    get hasSelectedChildren() {
        return this.items.some((i) => {
            return i.checked || i.indeterminate;
        });
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
        this.name = this.value;
        this.items = normalizeArray(this.items).map((i) => {
            return new FilterMenuItem({ ...i, filterValue: this.filterValue });
        });
        this.indeterminate = !this.checked && this.hasSelectedChildren;
    }
}
