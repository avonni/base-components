import { LightningElement, api } from 'lwc';
import { normalizeArray, normalizeBoolean } from 'c/utilsPrivate';

// QUESTIONS:
// Use of filterMenuGroup/filterMenu or filterMenu/primitiveFilterMenu?
// Should some attributes be the same for all menus? variant, iconSize and nubbin, maybe?
// Should the value be given by the user in the items object (current choice) or through one attribute?
// Are values given by the user only checked (current choice) or should they appear in selected items?
// Is there only one pill container for all the menus (current choice), or was there supposed to be one per menu? If so, how to manage the width?

export default class FilterMenuGroup extends LightningElement {
    _items = [];
    _hideSelectedItems = false;

    _selectedItems = [];
    selectedPills = [];

    @api
    get items() {
        return this._items;
    }
    set items(value) {
        const array = normalizeArray(value);
        this._items = JSON.parse(JSON.stringify(array));

        this.initSelectedItems();
    }

    @api
    get hideSelectedItems() {
        return this._hideSelectedItems;
    }
    set hideSelectedItems(bool) {
        this._hideSelectedItems = normalizeBoolean(bool);
    }

    get showSelectedItems() {
        return !this.hideSelectedItems && this.selectedPills.length > 0;
    }

    initSelectedItems() {
        const selectedItems = [];
        this.items.forEach((item) => {
            selectedItems.push({
                menuName: item.name,
                menuValue: []
            });
        });
        this._selectedItems = selectedItems;
    }

    computeSelectedPills() {
        const pills = [];
        this._selectedItems.forEach((item) => {
            item.menuValue.forEach((value) => {
                pills.push({
                    label: value.label,
                    name: `${item.menuName},${value.name}`
                });
            });
        });
        this.selectedPills = pills;
    }

    handlePrivateApply(event) {
        const menuName = event.target.dataset.name;
        const menuValue = event.detail.value;

        const index = this._selectedItems.findIndex(
            (menu) => menu.menuName === menuName
        );
        this._selectedItems[index].menuValue = menuValue;
        this.computeSelectedPills();

        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    value: event.detail.value
                }
            })
        );
    }

    handleSelectedItemRemove(event) {
        // Split the pill name
        const pillName = event.detail.item.name.match(/^(.+),(.+)$/);
        const menuName = pillName[1];
        const valueName = pillName[2];

        // Find the menu containing the value that was removed
        const menuIndex = this._selectedItems.findIndex(
            (item) => item.menuName === menuName
        );

        // Find the value
        const valueIndex = this._selectedItems[menuIndex].menuValue.findIndex(
            (value) => value.name === valueName
        );

        // Remove this value from the selected items
        this._selectedItems[menuIndex].menuValue.splice(valueIndex, 1);

        this.computeSelectedPills();

        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    value: event.detail.value
                }
            })
        );
    }
}
