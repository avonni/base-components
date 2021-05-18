import { LightningElement, api } from 'lwc';
import { generateUniqueId, classSet } from 'c/utils';
import { normalizeArray, normalizeString } from 'c/utilsPrivate';

const THEMES = {
    valid: ['default', 'shade', 'inverse'],
    default: 'default'
};

const VARIANTS = {
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
    _theme = THEMES.default;
    _variant = VARIANTS.default;
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
    get theme() {
        return this._theme;
    }
    set theme(value) {
        this._theme = normalizeString(value, {
            validValues: THEMES.valid,
            fallbackValue: THEMES.default
        });
        this.updateClasses();
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            validValues: VARIANTS.valid,
            fallbackValue: VARIANTS.default
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
            item_horizontal: this.variant === 'horizontal',
            'slds-theme_shade slds-text-color_default': this.theme === 'shade',
            'avonni-theme_inverse': this.theme === 'inverse',
            'slds-theme_default': this.theme === 'default'
        });
    }

    get hasChildren() {
        if (this.groups.length === 0) return false;

        return this.groups.some((group) => group.items);
    }

    get generateKey() {
        return generateUniqueId();
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

    get buttonMenuVariant() {
        return this.theme === 'inverse' ? 'border-inverse' : 'border';
    }

    get ariaExpanded() {
        if (this.groups.length > 0 && !this.selected) {
            return false;
        } else if (this.groups.length > 0 && this.selected) {
            return true;
        }
        return undefined;
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
