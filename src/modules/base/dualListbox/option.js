import { classSet } from 'c/utils';
import { normalizeBoolean, normalizeObject } from 'c/utilsPrivate';

export default class DualListboxOption {
    constructor(props) {
        this.avatar = normalizeObject(props.avatar);
        this.description = props.description;
        this.groupName = props.groupName;
        this.isFocusable = normalizeBoolean(props.isFocusable);
        this.isLocked = false;
        this.label = props.label;
        this.selected = normalizeBoolean(props.selected);
        this.value = props.value;
        this.showAvatar = false;

        this.initAvatar();
    }

    get classList() {
        return classSet(
            'slds-listbox__option slds-listbox__option_plain slds-media slds-media_center slds-media_inline avonni-dual-listbox__list-item_min-height avonni-dual-listbox__option'
        )
            .add({ 'slds-media_small': !this.description })
            .add({ 'slds-is-selected': this.selected })
            .toString();
    }

    get tabIndex() {
        return this.isFocusable ? '0' : '-1';
    }

    initAvatar() {
        this.showAvatar =
            this.description ||
            normalizeBoolean(Object.keys(this.avatar).length);

        if (!this.showAvatar) {
            return;
        }

        if (this.description) {
            this.avatar.size = this.avatar.size || 'medium';
            this.avatar.primaryText = this.label;
            this.avatar.secondaryText = this.description;
        }

        if (!this.avatar.size) {
            this.avatar.size = 'small';
        }
    }
}
