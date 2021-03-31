import { LightningElement, api } from 'lwc';
import { generateUniqueId, classSet } from 'c/utils';
import { normalizeArray } from 'c/utilsPrivate';

export default class PrimitiveRelationshipGraphItem extends LightningElement {
    @api label;
    @api name;
    @api avatarSrc;
    @api avatarFallbackIconName;
    @api href;
    @api contentData;
    @api groups;
    @api hideDefaultActions;
    @api theme;
    @api defaultActions;

    _customActions;
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
    get activeSelection() {
        return this._activeSelection;
    }
    set activeSelection(value) {
        this._activeSelection = value;
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

    updateClasses() {
        this.wrapperClass = classSet(
            'slds-box slds-box_small slds-m-bottom_small slds-is-relative avonni-relationship-graph__item'
        ).add({
            'avonni-relationship-graph__item_has-groups': this.groups,
            'avonni-relationship-graph__item_has-children': this.hasChildren,
            'avonni-relationship-graph__item_is-selected': this.selected,
            'avonni-relationship-graph__item_is-active': this.activeSelection,
            'slds-theme_shade slds-text-color_default': this.theme === 'shade',
            'slds-theme_inverse': this.theme === 'inverse',
            'slds-theme_default': this.theme === 'default'
        });
    }

    get hasChildren() {
        if (!this.groups) return false;

        return this.groups.some((group) => group.items);
    }

    get generateKey() {
        return generateUniqueId();
    }

    get hasAvatar() {
        return this.avatarFallbackIconName || this.avatarSrc;
    }

    get actions() {
        return (
            !this.hideDefaultActions &&
            this.defaultActions.concat(this.customActions)
        );
    }

    handleClick(event) {
        // Stop event if click was on action menu button
        if (event.target.tagName === 'LIGHTNING-BUTTON-MENU') return;

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
