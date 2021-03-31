import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeArray } from 'c/utilsPrivate';

export default class PrimitiveRelationshipGraphGroup extends LightningElement {
    @api label;
    @api name;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api items;
    @api expanded;
    @api defaultActions;
    @api hideDefaultActions;
    @api shrinkIconName;
    @api expandIconName;
    @api active;
    @api actionsPosition;
    @api theme;
    @api itemActions;
    @api itemTheme;
    @api hideItemsCount;

    _closed;
    _expanded;
    _customActions;
    _defaultActions;

    connectedCallback() {
        this._closed = this.expanded === false;
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
        const group = this.template.querySelector(
            '.avonni-relationship-graph__group'
        );
        return group.offsetHeight;
    }

    @api
    get customActions() {
        return this._customActions;
    }
    set customActions(value) {
        this._customActions = normalizeArray(value);
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

    get wrapperClass() {
        return classSet(
            'slds-p-around_medium slds-m-bottom_medium avonni-relationship-graph__group slds-box'
        ).add({
            'avonni-relationship-graph__group_active': this.active,
            'slds-theme_shade': this.theme === 'shade',
            'slds-theme_inverse': this.theme === 'inverse',
            'slds-theme_default': this.theme === 'default'
        });
    }

    get actions() {
        return (
            !this.hideDefaultActions &&
            this.defaultActions.concat(this.customActions)
        );
    }

    get hasMoreThanOneAction() {
        return this.actions.length > 1;
    }

    get topActions() {
        return this.actionsPosition === 'top';
    }

    get closed() {
        return this._closed;
    }
    set closed(value) {
        // The value needs to be undefined for the summary detail to be open
        this._closed = value === true ? true : undefined;
    }

    asyncSetClosed = async (value) => {
        this.closed = value;
    };

    handleSelect(event) {
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: event.detail.name
                }
            })
        );
    }

    handleToggle(event) {
        // Wait for the group to rerender to send the height change
        this.asyncSetClosed(!this.closed).then(() => {
            this.dispatchEvent(new CustomEvent('heightchange'));
        });

        if (!this.selectedItemComponent) return;

        const closed = event.detail.closed;
        if (closed) {
            this.dispatchEvent(new CustomEvent('closeactivegroup'));
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
