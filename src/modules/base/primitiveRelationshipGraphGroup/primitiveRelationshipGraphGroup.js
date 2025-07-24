import { LightningElement, api } from 'lwc';
import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';

const ACTIONS_POSITIONS = {
    valid: ['top', 'bottom'],
    default: 'top'
};

const DEFAULT_ACTIONS_MENU_ALTERNATIVE_TEXT = 'Show menu';
const DEFAULT_NO_RESULTS_MESSAGE = 'No items to display.';
const DEFAULT_EXPAND_ICON_NAME = 'utility:chevronright';
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const DEFAULT_SHRINK_ICON_NAME = 'utility:chevrondown';
const RELATIONSHIP_GRAPH_GROUP_VARIANTS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

export default class PrimitiveRelationshipGraphGroup extends LightningElement {
    @api actionsMenuAlternativeText = DEFAULT_ACTIONS_MENU_ALTERNATIVE_TEXT;
    @api activeChild = false;
    @api avatarFallbackIconName;
    @api avatarSrc;
    @api expandIconName = DEFAULT_EXPAND_ICON_NAME;
    @api hasRootHeader = false;
    @api hideDefaultActions = false;
    @api hideItemsCount = false;
    @api href;
    @api isFirstChild = false;
    @api isFirstLevel = false;
    @api itemActions;
    @api label;
    @api loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    @api noResultsMessage = DEFAULT_NO_RESULTS_MESSAGE;
    @api name;
    @api selected = false;
    @api shrinkIconName = DEFAULT_SHRINK_ICON_NAME;

    _actionsPosition = ACTIONS_POSITIONS.default;
    _customActions = [];
    _defaultActions = [];
    _expanded = true;
    _hasSelectedChildren;
    _isLoading = false;
    _items = [];
    _variant = RELATIONSHIP_GRAPH_GROUP_VARIANTS.default;

    closed = false;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.closed = this.expanded === false;
        this._isConnected = true;
    }

    renderedCallback() {
        // Accessibility: sets focus on the first group child of the active item
        if (this.activeChild && this.isFirstChild) {
            const group = this.template.querySelector(
                '.avonni-relationship-graph-group__header-title-button'
            );
            if (group) group.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get actionsPosition() {
        return this._actionsPosition;
    }
    set actionsPosition(value) {
        this._actionsPosition = normalizeString(value, {
            validValues: ACTIONS_POSITIONS.valid,
            fallbackValue: ACTIONS_POSITIONS.default
        });
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
    get expanded() {
        return this._expanded;
    }
    set expanded(value) {
        // Because the default is true, falsy values (undefined, null, etc.) are considered true
        this._expanded = value === false ? false : true;

        if (this._isConnected) {
            this.closed = this.expanded === false;
        }
    }

    @api
    get height() {
        const group = this.template.querySelector('.group');
        return group ? group.offsetHeight : 0;
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = normalizeArray(value);
    }

    @api
    get selectedItemComponent() {
        const items = this.template.querySelectorAll(
            '[data-element-id="avonni-primitive-relationship-graph-item"]'
        );

        let selectedItem;
        items.forEach((item) => {
            if (item.selected) selectedItem = item;
        });
        return selectedItem;
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            validValues: RELATIONSHIP_GRAPH_GROUP_VARIANTS.valid,
            fallbackValue: RELATIONSHIP_GRAPH_GROUP_VARIANTS.defaultActions
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get actions() {
        if (this.hideDefaultActions) return this.customActions;

        return this.defaultActions.concat(this.customActions);
    }

    get activeParent() {
        return this.items && this.items.find((item) => item.activeSelection);
    }

    get computedActionButtonClass() {
        return classSet('slds-button slds-button_neutral').add({
            'slds-button_stretch': this.actionsPosition === 'bottom'
        });
    }

    get computedAriaExpanded() {
        return String(!this.closed);
    }

    get computedGroupTitleClass() {
        return classSet(
            'avonni-relationship-graph-group__header-title slds-section__title'
        )
            .add({
                'slds-m-right_xx-small': this.topActions
            })
            .toString();
    }

    get computedWrapperClass() {
        return classSet(
            'avonni-relationship-graph-group slds-p-around_medium slds-m-bottom_medium group slds-box slds-theme_default slds-section'
        ).add({
            'group_active-child': this.activeChild,
            'group_active-parent': !this.closed && this.activeParent,
            group_selected: this.selected && this.hasSelectedChildren,
            'group_horizontal slds-is-relative': this.variant === 'horizontal',
            group_vertical: this.variant === 'vertical',
            'slds-m-right_medium': this.variant === 'vertical',
            'avonni-relationship-graph-group__parent-line': this.showParentLine,
            'slds-is-open': !this.closed
        });
    }

    get hasAvatar() {
        return this.avatarSrc || this.avatarFallbackIconName;
    }

    get hasCollapsibleIcon() {
        return this.shrinkIconName || this.expandIconName;
    }

    get hasMoreThanOneAction() {
        return this.actions.length > 1;
    }

    get hasSelectedChildren() {
        if (this._hasSelectedChildren !== undefined) {
            return this._hasSelectedChildren;
        }
        const selectedItem =
            this.items && this.items.find((item) => item.selected);
        return (
            selectedItem &&
            Array.isArray(selectedItem.groups) &&
            selectedItem.groups.length > 0
        );
    }
    set hasSelectedChildren(value) {
        this._hasSelectedChildren = value;
    }

    get title() {
        if (this.hideItemsCount) return this.label;

        const count = this.items ? this.items.length : 0;
        return `${this.label || ''} (${count})`;
    }

    get topActions() {
        return this.actions && this.actionsPosition === 'top';
    }

    get showNoResultsMessage() {
        return (
            !this.isLoading &&
            (!Array.isArray(this.items) || this.items.length === 0)
        );
    }

    get showParentLine() {
        return (this.hasRootHeader && this.isFirstLevel) || !this.isFirstLevel;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    asyncSetClosed = async (value) => {
        this.closed = value;
    };

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleActionClick(event) {
        const name = event.currentTarget.value;

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: name,
                    targetName: this.name
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
        const href = event.currentTarget.href;
        if (
            // eslint-disable-next-line no-script-url
            ['#', 'javascript:void(0)', 'javascript:void(0);'].includes(href)
        ) {
            event.preventDefault();
        }
    }

    handleSelect(event) {
        this._hasSelectedChildren = undefined;
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: event.detail.name
                }
            })
        );
    }

    handleToggle() {
        const closed = !this.closed;
        this.asyncSetClosed(closed).then(() => {
            // Wait for the group to rerender to send the height change
            if (this.variant === 'horizontal') {
                this.dispatchEvent(new CustomEvent('heightchange'));
            }
        });
        this.dispatchEvent(
            new CustomEvent('toggle', {
                detail: {
                    name: this.name,
                    closed,
                    isActiveGroup: !!this.selectedItemComponent
                }
            })
        );

        if (!this.selectedItemComponent) return;
        if (closed) {
            this._hasSelectedChildren = false;
        } else {
            // When reopening the group, make sure the items are unselected
            this.selectedItemComponent.activeSelection = false;
            this.selectedItemComponent.selected = false;
        }
    }

    dispatchActionClickEvent(event) {
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: event.detail
            })
        );
    }
}
