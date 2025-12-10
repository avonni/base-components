import { LightningElement, api } from 'lwc';
import {
    generateUUID,
    classSet,
    normalizeArray,
    normalizeString
} from 'c/utils';

const DEFAULT_ACTIONS_MENU_ALTERNATIVE_TEXT = 'Show menu';
const RELATIONSHIP_GRAPH_GROUP_VARIANTS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

export default class PrimitiveRelationshipGraphItem extends LightningElement {
    @api actionsMenuAlternativeText = DEFAULT_ACTIONS_MENU_ALTERNATIVE_TEXT;
    @api avatarFallbackIconName;
    @api avatarSrc;
    @api contentData;
    @api hideDefaultActions = false;
    @api href;
    @api label;
    @api name;

    _activeSelection = false;
    _customActions = [];
    _defaultActions = [];
    _disabled = false;
    _groups = [];
    _selected = false;
    _variant = RELATIONSHIP_GRAPH_GROUP_VARIANTS.default;

    computedWrapperClass;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.updateClasses();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get activeSelection() {
        return this._activeSelection;
    }
    set activeSelection(value) {
        this._activeSelection = value;
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
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = value;
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

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
        if (!this.groups.length) {
            return undefined;
        }
        return this.selected;
    }

    get displayAsLink() {
        return this.href && !this.disabled;
    }

    get generateKey() {
        return generateUUID();
    }

    get hasAvatar() {
        return this.avatarFallbackIconName || this.avatarSrc;
    }

    get hasChildren() {
        if (this.groups.length === 0) return false;

        return this.groups.some(
            (group) => Array.isArray(group.items) && group.items.length
        );
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Update the classes of the component.
     */
    updateClasses() {
        this.computedWrapperClass = classSet(
            'slds-box slds-box_small slds-m-bottom_small slds-is-relative item'
        ).add({
            'item_has-groups': this.groups.length > 0,
            'item_has-children': this.hasChildren,
            'item_is-selected': this.selected,
            'item_is-active': this.activeSelection,
            'item_is-disabled': this.disabled,
            item_horizontal: this.variant === 'horizontal'
        });
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the action click event.
     *
     * @param {Event} event
     */
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

    /**
     * Prevent anchor tag from navigating when href leads to nothing.
     *
     * @param {Event} event
     */
    handleAnchorTagClick(event) {
        event.stopPropagation();
        const href = event.currentTarget.href;
        if (
            // eslint-disable-next-line no-script-url
            ['#', 'javascript:void(0)', 'javascript:void(0);'].includes(href)
        ) {
            event.preventDefault();
        }
    }

    /**
     * Handle the click event.
     *
     * @param {Event} event
     */
    handleClick(event) {
        // Stop event if click was on action menu button or if pressed key is not Enter of Space bar
        const target = event.target.tagName;
        if (
            this.disabled ||
            target === 'LIGHTNING-BUTTON-MENU' ||
            target === 'LIGHTNING-MENU-ITEM' ||
            (event.type === 'keyup' &&
                !['Enter', ' ', 'Spacebar'].includes(event.key))
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
}
