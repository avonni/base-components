import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeArray, normalizeString } from 'c/utilsPrivate';

const THEMES = {
    valid: ['default', 'shade', 'inverse'],
    default: 'default'
};

const VARIANTS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};
const ACTIONS_POSITIONS = {
    valid: ['top', 'bottom'],
    default: 'top'
};

const DEFAULT_SHRINK_ICON_NAME = 'utility:chevrondown';
const DEFAULT_EXPAND_ICON_NAME = 'utility:chevronright';

export default class PrimitiveRelationshipGraphGroup extends LightningElement {
    @api label;
    @api name;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api hideDefaultActions;
    @api selected;
    @api shrinkIconName = DEFAULT_SHRINK_ICON_NAME;
    @api expandIconName = DEFAULT_EXPAND_ICON_NAME;
    @api activeChild = false;
    @api itemActions;
    @api itemTheme;
    @api hideItemsCount = false;
    @api isFirstChild;

    _actionsPosition = ACTIONS_POSITIONS.default;
    _closed;
    _customActions = [];
    _defaultActions = [];
    _expanded = true;
    _hasSelectedChildren;
    _items = [];
    _theme = THEMES.default;
    _variant = VARIANTS.default;

    connectedCallback() {
        this._closed = this.expanded === false;
    }

    renderedCallback() {
        // Accessibility: sets focus on the first group child of the active item
        if (this.activeChild && this.isFirstChild) {
            const wrapper = this.template.querySelector('.group');
            wrapper.focus();
        }
    }

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
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = normalizeArray(value);
    }

    @api
    get selectedItemComponent() {
        const items = this.template.querySelectorAll(
            'c-primitive-relationship-graph-item'
        );

        let selectedItem;
        items.forEach((item) => {
            if (item.selected) selectedItem = item;
        });
        return selectedItem;
    }

    @api
    get height() {
        const group = this.template.querySelector('.group');
        return group.offsetHeight;
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

        if (this.isConnected) {
            this._closed = this.expanded === false;
        }
    }

    @api
    get theme() {
        return this._theme;
    }
    set theme(value) {
        this._theme = normalizeString(value, {
            validValues: THEMES.valid,
            fallbackValue: THEMES.defaultActions
        });
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            validValues: VARIANTS.valid,
            fallbackValue: VARIANTS.defaultActions
        });
    }

    get title() {
        if (this.hideItemsCount) return this.label;

        const count = this.items ? this.items.length : 0;
        return `${this.label} (${count})`;
    }

    get isEmpty() {
        return !this.items;
    }

    get hasAvatar() {
        return this.avatarSrc || this.avatarFallbackIconName;
    }

    get activeParent() {
        return this.items && this.items.find((item) => item.activeSelection);
    }

    get hasSelectedChildren() {
        if (this._hasSelectedChildren !== undefined) {
            return this._hasSelectedChildren;
        }
        const selectedItem =
            this.items && this.items.find((item) => item.selected);
        return selectedItem && selectedItem.groups && true;
    }
    set hasSelectedChildren(value) {
        this._hasSelectedChildren = value;
    }

    get wrapperClass() {
        return classSet(
            'slds-p-around_medium slds-m-bottom_medium group slds-box'
        )
            .add({
                'group_active-child': this.activeChild,
                'group_active-parent': !this.closed && this.activeParent,
                group_selected: this.selected && this.hasSelectedChildren,
                'slds-theme_shade': this.theme === 'shade',
                'avonni-theme_inverse': this.theme === 'inverse',
                'slds-theme_default': this.theme === 'default',
                'group_horizontal slds-is-relative':
                    this.variant === 'horizontal',
                group_vertical: this.variant === 'vertical',
                'slds-m-right_medium': this.variant === 'vertical'
            })
            .toString();
    }

    get actionButtonClass() {
        return classSet('slds-button').add({
            'slds-button_inverse': this.theme === 'inverse',
            'slds-button_neutral': this.theme !== 'inverse',
            'action-button_shade': this.theme === 'shade',
            'slds-button_stretch': this.actionsPosition === 'bottom'
        });
    }

    get actions() {
        if (this.hideDefaultActions) return this.customActions;

        return this.defaultActions.concat(this.customActions);
    }

    get hasMoreThanOneAction() {
        return this.actions.length > 1;
    }

    get topActions() {
        return this.actions && this.actionsPosition === 'top';
    }

    get closed() {
        return this._closed;
    }
    set closed(value) {
        // The value needs to be undefined for the summary detail to be open
        this._closed = value === true ? true : undefined;
    }

    get buttonMenuVariant() {
        return this.theme === 'inverse' ? 'border-inverse' : 'border';
    }

    get buttonVariant() {
        return this.theme === 'inverse' ? 'inverse' : 'neutral';
    }

    asyncSetClosed = async (value) => {
        this.closed = value;
    };

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

    handleToggle(event) {
        this.asyncSetClosed(!this.closed).then(() => {
            // Wait for the group to rerender to send the height change
            if (this.variant === 'horizontal') {
                this.dispatchEvent(new CustomEvent('heightchange'));
            }
        });

        if (!this.selectedItemComponent) return;

        const closed = event.detail.closed;
        if (closed) {
            this.dispatchEvent(new CustomEvent('closeactivegroup'));
            this._hasSelectedChildren = false;
        } else {
            // When reopening the group, make sure the items are unselected
            this.selectedItemComponent.activeSelection = false;
            this.selectedItemComponent.selected = false;
        }
    }

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

    dispatchActionClickEvent(event) {
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: event.detail
            })
        );
    }
}
