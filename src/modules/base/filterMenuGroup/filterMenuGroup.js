import { LightningElement, api } from 'lwc';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';

// TODO:
// Update documentation
// Update tests and stories

// Note: Some attributes could be the same for all buttons (button variant, icon size and nubbin?).

const VARIANTS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

const DEFAULT_APPLY_BUTTON_LABEL = 'Apply';
const DEFAULT_RESET_BUTTON_LABEL = 'Reset';

export default class FilterMenuGroup extends LightningElement {
    _items = [];
    _hideSelectedItems = false;
    _variant = VARIANTS.default;
    _applyButtonLabel = DEFAULT_APPLY_BUTTON_LABEL;
    _resetButtonLabel = DEFAULT_RESET_BUTTON_LABEL;

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

    @api
    get applyButtonLabel() {
        return this._applyButtonLabel;
    }
    set applyButtonLabel(value) {
        this._applyButtonLabel =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_APPLY_BUTTON_LABEL;
    }

    @api
    get resetButtonLabel() {
        return this._resetButtonLabel;
    }
    set resetButtonLabel(value) {
        this._resetButtonLabel =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_RESET_BUTTON_LABEL;
    }

    get isVertical() {
        return this.variant === 'vertical';
    }

    get showSelectedItems() {
        return !this.hideSelectedItems && this.selectedPills.length > 0;
    }

    get filtersWrapperClass() {
        return classSet().add({
            'slds-button-group-row': !this.isVertical
        });
    }

    get filtersClass() {
        return classSet().add({
            'slds-button-group-item': !this.isVertical,
            'slds-m-bottom_medium': this.isVertical
        });
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

    computeValue(menuName, value) {
        const index = this.items.findIndex((item) => item.name === menuName);
        this.items[index].value = value;
    }

    handleValueChange(event) {
        const name = event.target.dataset.name;
        const value = event.detail ? event.detail.value : [];

        this.computeValue(name, value);
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

    handleApplyClick() {
        const menuComponents = this.template.querySelectorAll('c-filter-menu');
        menuComponents.forEach((menu) => {
            const value = menu.value;
            const name = menu.dataset.name;
            this.computeValue(name, value);
        });

        this.computeSelectedPills();
    }

    handleResetClick() {
        const menuComponents = this.template.querySelectorAll('c-filter-menu');
        menuComponents.forEach((menu) => {
            const value = [];
            const name = menu.dataset.name;
            this.computeValue(name, value);
        });

        this.computeSelectedPills();
    }
}
