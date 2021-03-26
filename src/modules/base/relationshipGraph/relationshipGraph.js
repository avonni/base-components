import { LightningElement, api } from 'lwc';
import { generateUniqueId } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const VARIANTS = ['horizontal', 'vertical'];

// QUESTIONS:
// Option to hide empty groups?

export default class RelationshipGraph extends LightningElement {
    @api label;
    @api groups;
    @api shrinkIconName;
    @api expandIconName;

    selectedGroups;
    wrapperClass = 'slds-grid';
    currentLevelClass = 'slds-col';
    selectedLevelClass = 'slds-col slds-grid';
    _isRoot = true;
    _variant;

    connectedCallback() {
        if (this.variant === 'vertical') {
            this.wrapperClass = undefined;
            this.currentLevelClass = 'slds-grid';
            this.selectedLevelClass = 'slds-grid';
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
    }

    @api
    get isRoot() {
        return this._isRoot;
    }
    set isRoot(boolean) {
        this._isRoot = boolean !== 'false';
    }

    get generateKey() {
        return generateUniqueId();
    }

    findItem(name) {
        let selectedItem;
        let i = 0;

        while (!selectedItem && i < this.groups.length) {
            const items = this.groups[i].items;

            if (items) {
                const item = items.find(
                    (currentItem) => currentItem.name === name
                );

                if (item) selectedItem = item;
            }
            i += 1;
        }

        return selectedItem;
    }

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
        this.selectedGroups = this.findItem(name).groups;

        const selectEvent = new CustomEvent('select', {
            detail: {
                name: name
            }
        });

        this.dispatchSelectEvent(selectEvent);
    }
}
