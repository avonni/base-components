import { classSet } from 'c/utils';

export default class Action {
    constructor(action) {
        this.name = action.name;
        this.label = action.label;
        this.iconName = action.iconName;
        this.position = action.position;
        this.focused = false;
        this.isBackLink = false;
    }

    get computedClass() {
        return classSet(
            'slds-listbox__item slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_term combobox__action_top'
        )
            .add({
                'slds-has-focus': this.focused,
                'slds-border_bottom': this.isBackLink
            })
            .toString();
    }
}
