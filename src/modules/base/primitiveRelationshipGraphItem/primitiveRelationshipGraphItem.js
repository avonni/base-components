import { LightningElement, api } from 'lwc';
import { generateUUID, classSet } from 'c/utils';
import { normalizeArray, normalizeString } from 'c/utilsPrivate';

const RELATIONSHIP_GRAPH_GROUP_VARIANTS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

export default class PrimitiveRelationshipGraphItem extends LightningElement {
    @api label;
    @api name;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api contentData;
    @api hideDefaultActions = false;

    _activeSelection = false;
    _customActions = [];
    _defaultActions = [];
    _groups = [];
    _selected = false;
    _variant = RELATIONSHIP_GRAPH_GROUP_VARIANTS.default;
    wrapperClass;

    connectedCallback() {
        this.updateClasses();
    }

    @api
    get customActions() {
        return this._customActions;
    }
    set customActions(value) {
        this._customActions = normalizeArray(value);
    }

    @api
    get defaultActions() {
        return this._defaultActions;
    }
    set defaultActions(value) {
        this._defaultActions = normalizeArray(value);
    }

    @api
    get activeSelection() {
        return this._activeSelection;
    }
    set activeSelection(value) {
        this._activeSelection = value;
        this.updateClasses();
    }

    @api
    get groups() {
        return this._groups;
    }
    set groups(value) {
        this._groups = normalizeArray(value);
        this.updateClasses();
    }

    @api
    get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        this.updateClasses();
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            validValues: RELATIONSHIP_GRAPH_GROUP_VARIANTS.valid,
            fallbackValue: RELATIONSHIP_GRAPH_GROUP_VARIANTS.default
        });
        this.updateClasses();
    }

    updateClasses() {
        this.wrapperClass = classSet(
            'slds-box slds-box_small slds-m-bottom_small slds-is-relative item'
        ).add({
            'item_has-groups': this.groups.length > 0,
            'item_has-children': this.hasChildren,
            'item_is-selected': this.selected,
            'item_is-active': this.activeSelection,
            item_horizontal: this.variant === 'horizontal'
        });
    }

    get hasChildren() {
        if (this.groups.length === 0) return false;

        return this.groups.some((group) => group.items);
    }

    get generateKey() {
        return generateUUID();
    }

    get hasAvatar() {
        return this.avatarFallbackIconName || this.avatarSrc;
    }

    get actions() {
        const allActions = this.defaultActions.concat(this.customActions);

        if (this.hideDefaultActions && this.customActions.length > 0) {
            return this.customActions;
        } else if (!this.hideDefaultActions && allActions.length > 0) {
            return allActions;
        }

        return false;
    }

    get ariaExpanded() {
        if (this.groups.length > 0 && !this.selected) {
            return false;
        } else if (this.groups.length > 0 && this.selected) {
            return true;
        }
        return undefined;
    }

    /**
     * Prevent anchor tag from navigating when href leads to nothing.
     *
     * @param {Event} event
     */
    handleAnchorTagClick(event) {
        const href = event.currentTarget.href;
        if (
            // eslint-disable-next-line no-script-url
            ['#', 'javascript:void(0)', 'javascript:void(0);'].includes(href)
        ) {
            event.preventDefault();
        }
    }

    handleClick(event) {
        // Stop event if click was on action menu button
        const target = event.target.tagName;
        if (
            target === 'LIGHTNING-BUTTON-MENU' ||
            target === 'LIGHTNING-MENU-ITEM'
        )
            return;
        // Stop event if pressed key is not Enter of Space bar
        if (
            event.type === 'keyup' &&
            !['Enter', ' ', 'Spacebar'].includes(event.key)
        )
            return;

        this._selected = true;
        this._activeSelection = true;
        this.updateClasses();

        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: this.name
                }
            })
        );
    }

    handleActionClick(event) {
        const name = event.currentTarget.value;

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: name,
                    targetName: this.name,
                    itemData: this.contentData
                }
            })
        );
    }
}
