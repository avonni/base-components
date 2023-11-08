import { classSet } from 'c/utils';
import {
    normalizeAriaAttribute,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';

const POSITIONS = {
    valid: ['top', 'bottom'],
    default: 'top'
};

/**
 * Action
 *
 * @class
 * @param {string} key Unique identifier for the header
 * @property {string} label Required. The action label.
 * @property {string} name Required. The name of the action, which identifies the selected action. It will be returned by the actionclick event.
 * @property {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the label.
 * @property {boolean} disabled Specifies whether the action can be selected. If true, the action item is shown as disabled. This value defaults to false.
 * @property {string} position Position of the action in the drop-down. Valid values include top and bottom. Defaults to top.
 * @property {boolean} isBackLink
 */
export default class Action {
    constructor(action) {
        this.name = action.name;
        this.label = action.label;
        this.iconName = action.iconName;
        this.position = normalizeString(action.position, {
            fallbackValue: POSITIONS.default,
            validValues: POSITIONS.valid
        });
        this.disabled = normalizeBoolean(action.disabled);
        this.fixed = normalizeBoolean(action.fixed);
    }

    /**
     * Class of the action.
     *
     * @type {string}
     */
    get computedClass() {
        return classSet(
            'slds-listbox__item slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_term avonni-primitive-combobox__action'
        )
            .add({
                'avonni-primitive-combobox__action_disabled': this.disabled,
                'avonni-primitive-combobox__action_fixed': this.fixed
            })
            .toString();
    }

    /**
     * String of true or false.
     *
     * @type {string}
     */
    get computedAriaDisabled() {
        return normalizeAriaAttribute(this.disabled.toString());
    }
}
