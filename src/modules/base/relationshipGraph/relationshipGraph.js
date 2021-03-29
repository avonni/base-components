import { LightningElement, api } from 'lwc';
import { generateUniqueId } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const VARIANTS = ['horizontal', 'vertical'];

// QUESTIONS:
// Dispatch event when summaryDetail is closed/opened
// Should nodes with no children close the tree on click?
// Option to hide empty groups?

// TODO:
// Accessibility (add a hidden button for clickable items?)

export default class RelationshipGraph extends LightningElement {
    @api label;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api shrinkIconName;
    @api expandIconName;

    processedGroups;
    selectedItemPosition;
    wrapperClass;
    currentLevelClass =
        'avonni-relationship-graph__current-level-col slds-m-left_x-large';
    _variant;
    _selectedItemName;
    _groups;
    _selectedItem;
    _selectedGroups;
    _isRoot = true;

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

        if (this._variant === 'vertical') {
            this.currentLevelClass += ' slds-grid';
        } else {
            this.wrapperClass = 'slds-grid';
        }
    }

    @api
    get selectedItemName() {
        return this._selectedItemName;
    }
    set selectedItemName(name) {
        this._selectedItemName = name;
    }

    @api
    get groups() {
        return this._groups;
    }
    set groups(proxy) {
        this._groups = proxy;
        this.processedGroups = JSON.parse(JSON.stringify(proxy));
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

    @api
    get maxHeightForCurrentColumnVerticalLine() {
        const currentCol = this.template.querySelector(
            '.avonni-relationship-graph__current-level-col'
        );
        const currentColHeight = currentCol.offsetHeight;
        const lastGroup = currentCol.querySelector(
            '.avonni-relationship-graph__group:last-child'
        );
        const lastGroupHeight = lastGroup.offsetHeight;
        return currentColHeight - lastGroupHeight;
    }

    updateVerticalLine() {
        // Root vertical line
        if (this.isRoot) {
            const firstLine = this.template.querySelector(
                '.avonni-relationship-graph__first-line'
            );
            const height = this.maxHeightForCurrentColumnVerticalLine;
            firstLine.setAttribute('style', `height: ${height}px`);
        }

        // Vertical line between selected item and its children
        const line = this.template.querySelector(
            '.avonni-relationship-graph__line'
        );
        const selectedItem = this.template.querySelector(
            '[data-selected="true"]'
        );
        const child = this.template.querySelector('c-relationship-graph');
        if (!line || !selectedItem || !child) return;

        const currentCol = this.template.querySelector(
            '.avonni-relationship-graph__current-level-col'
        );
        const currentColTop =
            currentCol.getBoundingClientRect().top + window.scrollY;
        const scroll = window.pageYOffset;
        const itemPosition = selectedItem.getBoundingClientRect();

        const itemHeight =
            itemPosition.top + itemPosition.height / 2 + scroll - currentColTop;
        const childHeight = child.maxHeightForCurrentColumnVerticalLine;

        const height =
            itemHeight > childHeight
                ? `calc(${itemHeight}px - 1.5rem)`
                : `${childHeight}px`;
        line.setAttribute('style', `height: ${height};`);
    }

    updateSelection() {
        if (!this.selectedItemName || !this.groups) return;

        // Reset the selection and go through the tree with the new selection
        this.processedGroups = JSON.parse(JSON.stringify(this.groups));
        this.selectItem(this.selectedItemName, this.processedGroups);

        const selectedGroup = this.processedGroups.find(
            (group) => group.selected
        );
        if (selectedGroup && selectedGroup.items) {
            const selectedItem = selectedGroup.items.find(
                (item) => item.selected
            );
            if (selectedItem.groups) this._selectedGroups = selectedItem.groups;
        }
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
        // Reset selection
        this._selectedGroups = undefined;
        this._selectedItem = undefined;
        this._selectedItemName = undefined;

        // If we open a higher level node than the one currently opened,
        // make sure the previous deeper children nodes are hidden.
        const child = this.template.querySelector('c-relationship-graph');
        if (child) child.selectedGroups = undefined;

        const name = event.currentTarget.dataset.name;
        this._selectedItemName = name;
        this.updateSelection();
        this.updateVerticalLine();

        const selectEvent = new CustomEvent('select', {
            detail: {
                name: name
            }
        });
        this.dispatchSelectEvent(selectEvent);
    }
}
