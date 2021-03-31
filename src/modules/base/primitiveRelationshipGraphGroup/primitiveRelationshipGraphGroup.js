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

    _customActions;
    _defaultActions;

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
        const style = getComputedStyle(group);
        return (
            group.offsetHeight +
            parseInt(style.marginTop, 10) +
            parseInt(style.marginBottom, 10)
        );
    }

    @api
    get customActions() {
        return this._customActions;
    }
    set customActions(value) {
        this._customActions = normalizeArray(value);
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
        return this.defaultActions.concat(this.customActions);
    }

    get hasMoreThanOneAction() {
        return this.actions.length > 1;
    }

    get topActions() {
        return this.actionsPosition === 'top';
    }

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
