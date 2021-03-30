import { LightningElement, api } from 'lwc';
import { generateUniqueId, classSet } from 'c/utils';

export default class PrimitiveRelationshipGraphItem extends LightningElement {
    @api label;
    @api name;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api contentData;
    @api groups;
    @api hideDefaultActions;
    @api actions;
    @api selected;
    @api activeSelection;

    get wrapperClass() {
        return classSet(
            'slds-box slds-box_small slds-m-bottom_small slds-is-relative'
        ).add({
            'avonni-relationship-graph__item_has-groups': this.groups,
            'avonni-relationship-graph__item_is-selected': this.selected,
            'avonni-relationship-graph__item_is-active': this.activeSelection
        });
    }
    get generateKey() {
        return generateUniqueId();
    }

    get hasAvatar() {
        return this.avatarFallbackIconName || this.avatarSrc;
    }

    handleClick() {
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: this.name
                }
            })
        );
    }
}
