import { classSet, normalizeArray } from 'c/utils';
import { SELECT_ALL_ACTION, UNSELECT_ALL_ACTION } from './nestedItemsUtils';

export default class FilterMenuItem {
    constructor(props) {
        Object.assign(this, props);
        this.checked = this.filterValue.includes(this.value);

        if (this.hasNestedItems) {
            this.initTreeProperties();
        }
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
        this.name = this.value;
        this.items = normalizeArray(this.items).map((i) => {
            return new FilterMenuItem({
                ...i,
                filterValue: this.filterValue,
                hasNestedItems: this.hasNestedItems
            });
        });
        this.updateActions();
    }

    updateActions() {
        this.actions = [];
        if (this.items.length) {
            this.actions = this.checked
                ? [UNSELECT_ALL_ACTION]
                : [SELECT_ALL_ACTION];
        }
    }
}
