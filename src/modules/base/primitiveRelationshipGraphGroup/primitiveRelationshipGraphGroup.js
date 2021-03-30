import { LightningElement, api } from 'lwc';

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

    handleSelect(event) {
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: event.detail.name
                }
            })
        );
    }
}
