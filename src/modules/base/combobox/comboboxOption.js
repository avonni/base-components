import { normalizeArray } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

export default class ComboboxOption {
    constructor(option) {
        this.avatarFallbackIconName = option.avatarFallbackIconName;
        this.avatarSrc = option.avatarSrc;
        this.groups = option.groups;
        this.label = option.label;
        this.options = normalizeArray(option.options);
        this.secondaryText = option.secondaryText;
        this.value = option.value;
    }

    get hasAvatar() {
        return this.avatarFallbackIconName || this.avatarSrc;
    }

    get computedClass() {
        return classSet(
            'slds-media slds-media_small slds-media_center slds-listbox__item slds-listbox__option slds-listbox__option_plain slds-listbox__option_entity'
        )
            .add({
                'slds-is-selected': this.selected
            })
            .toString();
    }
}
