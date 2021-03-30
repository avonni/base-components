import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';

export default class PrimitiveRelationshipGraphGroup extends LightningElement {
    @api label;
    @api name;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api items;
    @api expanded;
    @api hideDefaultActions;
    @api actions;
    @api shrinkIconName;
    @api expandIconName;
    @api active;
    @api theme;
    @api itemTheme;

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
}
