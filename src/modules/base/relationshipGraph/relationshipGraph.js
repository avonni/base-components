import { LightningElement, api } from 'lwc';
import {
    normalizeString,
    normalizeArray,
    normalizeBoolean
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const VARIANTS = ['horizontal', 'vertical'];
const THEMES = ['default', 'shade', 'inverse'];
const POSITIONS = ['top', 'bottom'];

// QUESTIONS:
// Code duplication in group HTML because of display switch depending on presence of items.
// => Other option would be to add a disable option to summary? Option would show a gray icon? Remove icon?

// TODO:
// Vertical variant
// Accessibility (add a hidden button for clickable items?).

export default class RelationshipGraph extends LightningElement {
    @api label;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api actions;
    @api groups;
    @api shrinkIconName;
    @api expandIconName;

    processedGroups;
    selectedItemPosition;

    _variant;
    _selectedItemName;
    _selectedItem;
    _groupActions;
    _groupTheme;
    _itemActions;
    _itemTheme;
    _hideItemsCount;

    connectedCallback() {
        this.updateSelection();
    }

    renderedCallback() {
        this.updateVerticalLine();
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

    @api
    get groupActions() {
        return this._groupActions;
    }
    set groupActions(value) {
        this._groupActions = normalizeArray(value);
    }

    @api
    get groupActionsPosition() {
        return this._groupActionsPosition;
    }
    set groupActionsPosition(value) {
        this._groupActionsPosition = normalizeString(value, {
            fallbackValue: 'top',
            validValues: POSITIONS
        });
    }

    @api
    get groupTheme() {
        return this._groupTheme;
    }
    set groupTheme(value) {
        this._groupTheme = normalizeString(value, {
            fallbackValue: 'default',
            validValues: THEMES
        });
    }

    @api
    get itemActions() {
        return this._itemActions;
    }
    set itemActions(value) {
        this._itemActions = normalizeArray(value);
    }

    @api
    get itemTheme() {
        return this._itemTheme;
    }
    set itemTheme(value) {
        this._itemTheme = normalizeString(value, {
            fallbackValue: 'default',
            validValues: THEMES
        });
    }

    @api
    get hideItemsCount() {
        return this._hideItemsCount;
    }
    set hideItemsCount(boolean) {
        this._hideItemsCount = normalizeBoolean(boolean);
    }

    get hasAvatar() {
        return this.avatarSrc || this.avatarFallbackIconName;
    }

    get wrapperClass() {
        return classSet('slds-m-left_medium').add({
            'slds-grid': this._variant === 'horizontal'
        });
    }

    get childLevel() {
        return this.template.querySelector(
            'c-primitive-relationship-graph-level'
        );
    }

    updateVerticalLine() {
        const line = this.template.querySelector(
            '.avonni-relationship-graph__line'
        );
        const currentLevel = this.childLevel;
        const height = currentLevel.currentLevelHeight;

        line.setAttribute('style', `height: calc(${height}px + 1.5rem);`);
    }

    updateSelection() {
        if (!this.groups) return;

        // Reset the selection and go through the tree with the new selection
        this._selectedItem = undefined;
        this.processedGroups = JSON.parse(JSON.stringify(this.groups));

        if (this.selectedItemName)
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

    dispatchActionClickEvent(event) {
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: event.detail
            })
        );
    }

    handleActionClick(event) {
        const name = event.currentTarget.value;

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: name,
                    targetName: 'root'
                }
            })
        );
    }

    handleLevelHeightChange() {
        this.updateVerticalLine();
    }
}
