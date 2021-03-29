import { LightningElement, api } from 'lwc';
import { generateUniqueId } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const VARIANTS = ['horizontal', 'vertical'];

// QUESTIONS:
// Should nodes with no children close the tree on click?
// Option to hide empty groups?

// TODO:
// Accessibility (add a hidden button for clickable items?)

export default class RelationshipGraph extends LightningElement {
    @api label;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api selectedItemName;
    @api shrinkIconName;
    @api expandIconName;

    selectedItem;
    wrapperClass;
    currentLevelClass;
    _variant;
    _groups;
    _selectedGroups;
    _isRoot = true;

    connectedCallback() {
        if (this.selectedItemName) {
            // If this is the root, go through the tree to mark the selected groups/items
            if (this.isRoot)
                this.selectItem(this.selectedItemName, this.groups);

            const selectedGroup = this.groups.find((group) => group.selected);
            if (selectedGroup && selectedGroup.items) {
                const selectedItem = selectedGroup.items.find(
                    (item) => item.selected
                );
                if (selectedItem.groups)
                    this._selectedGroups = selectedItem.groups;
            }
        }
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

        if (this._variant === 'vertical') {
            this.currentLevelClass = 'slds-grid';
        } else {
            this.wrapperClass = 'slds-grid';
        }
    }

    @api
    get groups() {
        return this._groups;
    }
    set groups(proxy) {
        this._groups = JSON.parse(JSON.stringify(proxy));
    }

    @api
    get isRoot() {
        return this._isRoot;
    }
    set isRoot(boolean) {
        this._isRoot = boolean !== 'false';
    }

    @api
    get selectedGroups() {
        return this._selectedGroups;
    }
    set selectedGroups(value) {
        this._selectedGroups = value;
    }

    get rootHasAvatar() {
        return this.avatarSrc || this.avatarFallbackIconName;
    }

    get generateKey() {
        return generateUniqueId();
    }

    selectItem(name, groups) {
        let i = 0;

        while (!this.selectedItem && i < groups.length) {
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

                    this.selectedItem = currentItem;
                    break;
                }

                let j = 0;
                while (!this.selectedItem && j < items.length) {
                    if (items[j].groups) this.selectItem(name, items[j].groups);

                    // If a child item has been selected, select the current parent item
                    if (this.selectedItem) items[j].selected = true;
                    j += 1;
                }
            }

            // If a child group has been selected, select the current parent group
            if (this.selectedItem) groups[i].selected = true;
            i += 1;
        }
    }

    // If the item was clicked in a child relationship graph,
    // the parent will directly dispatch the event received.
    dispatchSelectEvent(event) {
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: event.detail.name
                }
            })
        );
    }

    handleSelect(event) {
        const name = event.currentTarget.dataset.name;

        // If we open a higher level node than what was already open,
        // make sure the previous deeper children nodes are hidden.
        const child = this.template.querySelector('c-relationship-graph');
        if (child) child.selectedGroups = undefined;

        this.selectedItem = undefined;
        this.selectItem(name, this.groups);

        const selectedGroups = this.selectedItem.groups;
        if (selectedGroups) this._selectedGroups = selectedGroups;

        const selectEvent = new CustomEvent('select', {
            detail: {
                name: name
            }
        });
        this.dispatchSelectEvent(selectEvent);
    }
}
