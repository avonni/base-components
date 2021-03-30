import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';

const VARIANTS = ['horizontal', 'vertical'];

// TODO:
// Dispatch event when summaryDetail is closed/opened
// Show triangle indicator only when child groups have items.
// Add selected border on click on an item with no children.
// Accessibility (add a hidden button for clickable items?).

export default class RelationshipGraph extends LightningElement {
    @api label;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api groups;
    @api shrinkIconName;
    @api expandIconName;

    processedGroups;
    selectedItemPosition;

    _variant;
    _selectedItemName;
    _selectedItem;

    connectedCallback() {
        this.updateSelection();
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: 'horizontal',
            validValues: VARIANTS
        });
    }

    @api
    get selectedItemName() {
        return this._selectedItemName;
    }
    set selectedItemName(name) {
        this._selectedItemName = name;
    }

    get hasAvatar() {
        return this.avatarSrc || this.avatarFallbackIconName;
    }

    get wrapperClass() {
        return this._variant === 'horizontal' && 'slds-grid';
    }

    updateSelection() {
        if (!this.selectedItemName || !this.groups) return;

        // Reset the selection and go through the tree with the new selection
        this._selectedItem = undefined;
        this.processedGroups = JSON.parse(JSON.stringify(this.groups));
        this.selectItem(this.selectedItemName, this.processedGroups);
    }

    selectItem(name, groups) {
        let i = 0;

        while (!this._selectedItem && i < groups.length) {
            const items = groups[i].items;

            if (items) {
                const itemIndex = items.findIndex(
                    (currentItem) => currentItem.name === name
                );

                if (itemIndex > -1) {
                    // Mark current group and item as selected
                    const currentGroup = groups[i];
                    const currentItem = currentGroup.items[itemIndex];
                    currentGroup.selected = true;
                    currentItem.selected = true;
                    currentItem.activeSelection = true;

                    this._selectedItem = currentItem;
                    break;
                }

                let j = 0;
                while (!this._selectedItem && j < items.length) {
                    if (items[j].groups) this.selectItem(name, items[j].groups);

                    // If a child item has been selected, select the current parent item
                    if (this._selectedItem) items[j].selected = true;
                    j += 1;
                }
            }

            // If a child group has been selected, select the current parent group
            if (this._selectedItem) groups[i].selected = true;
            i += 1;
        }
    }

    dispatchSelectEvent(event) {
        const name = event.detail.name;
        this._selectedItemName = name;
        this.updateSelection();

        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: name
                }
            })
        );
    }
}
