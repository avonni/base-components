import { classSet } from 'c/utils';

export default class ComboboxScope {
    constructor(scope) {
        this.label = scope.label;
        this.name = scope.name;
        this.iconName = scope.iconName;
    }

    get showIcon() {
        return this.iconName || this.selected;
    }

    get computedIconName() {
        return this.iconName || 'utility:check';
    }

    get computedClass() {
        return classSet(
            'slds-media slds-listbox__option slds-listbox__option_plain slds-media_small'
        )
            .add({
                'slds-is-selected': this.selected
            })
            .toString();
    }

    get computedIconClass() {
        if (this.selected) return 'slds-current-color';
        return undefined;
    }
}
