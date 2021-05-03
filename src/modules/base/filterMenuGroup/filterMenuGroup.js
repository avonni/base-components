import { LightningElement, api } from 'lwc';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';

// TODO:
// Use button row instead of regular button group
// Implement vertical variant in group
//   * The pill container is at the top
//   * The apply/reset buttons are at the bottom
// Update documentation
// Update tests and stories

// Note: Some attributes could be the same for all buttons (button variant, icon size and nubbin?).

const VARIANTS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

export default class FilterMenuGroup extends LightningElement {
    _items = [];
    _hideSelectedItems = false;
    _variant = VARIANTS.default;

    selectedPills = [];

    @api
    get items() {
        return this._items;
    }
    set items(value) {
        const array = normalizeArray(value);
        this._items = JSON.parse(JSON.stringify(array));

        this.computeSelectedPills();
    }

    @api
    get hideSelectedItems() {
        return this._hideSelectedItems;
    }
    set hideSelectedItems(bool) {
        this._hideSelectedItems = normalizeBoolean(bool);
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    get showSelectedItems() {
        return !this.hideSelectedItems && this.selectedPills.length > 0;
    }

    computeSelectedPills() {
        const pills = [];

        this.items.forEach((menu) => {
            const values = menu.value;
            const items = menu.items;

            if (values && items) {
                values.forEach((value) => {
                    const targetItem = items.find(
                        (item) => item.value === value
                    );
                    pills.push({
                        label: targetItem.label,
                        name: `${menu.name},${value}`
                    });
                });
            }
        });

        this.selectedPills = pills;
    }

    handleValueChange(event) {
        const name = event.target.dataset.name;
        const value = event.detail ? event.detail.value : [];

        const index = this.items.findIndex((item) => item.name === name);
        this.items[index].value = value;

        this.computeSelectedPills();
    }

    handleSelectedItemRemove(event) {
        // Split the pill name
        const pillName = event.detail.item.name.match(/^(.+),(.+)$/);
        const menuName = pillName[1];
        const valueName = pillName[2];

        // Find the menu containing the value that was removed
        const menuIndex = this.items.findIndex(
            (item) => item.name === menuName
        );

        // Find the value
        const valueIndex = this.items[menuIndex].value.findIndex(
            (name) => name === valueName
        );

        // Remove this value from the items
        this.items[menuIndex].value.splice(valueIndex, 1);

        // Update the pills
        this.computeSelectedPills();

        // Update the value in the filter menu
        const menuComponent = this.template.querySelector(
            `[data-name=${menuName}`
        );
        menuComponent.value = this.items[menuIndex].value;
    }
}
