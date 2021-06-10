import { normalizeArray } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

export default class Option {
    constructor(option) {
        this.avatarFallbackIconName = option.avatarFallbackIconName;
        this.avatarSrc = option.avatarSrc;
        this.groups = normalizeArray(option.groups);
        this.label = option.label;
        this.options = normalizeArray(option.options);
        this.secondaryText = option.secondaryText;
        this.value = option.value;
        this.hasAvatar = this.avatarFallbackIconName || this.avatarSrc;
        this.focused = false;
    }

    get computedClass() {
        return classSet(
            'slds-media slds-media_small slds-media_center slds-listbox__item slds-listbox__option slds-listbox__option_plain slds-listbox__option_entity combobox__option'
        )
            .add({
                'slds-is-selected': this.selected || this.hasSelectedChildren(),
                'slds-has-focus': this.focused
            })
            .toString();
    }

    get showCheckmark() {
        return (
            this.selected || (this.options.length && this.hasSelectedChildren())
        );
    }

    hasSelectedChildren(options = this.options) {
        return options.some((option) => {
            return (
                option.selected ||
                (option.options.length &&
                    this.hasSelectedChildren(option.options))
            );
        });
    }
}
