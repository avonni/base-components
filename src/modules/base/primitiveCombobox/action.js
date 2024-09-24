import {
    classSet,
    normalizeAriaAttribute,
    normalizeBoolean,
    normalizeString
} from 'c/utils';

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
 * @property {boolean} displayOnSearch If true, the action will only be visible during a search. This value defaults to false.
 * @property {boolean} displayWhenNoResults If true, the action will only be visible when no results are found during a search, and the action will include the search term. The default value is false.
 * @property {boolean} fixed If true, the action will always be visible, no matter the scroll position in the dropdown. Defaults to false.
 * @property {string} position Position of the action in the drop-down. Valid values include top and bottom. Defaults to top.
 * @property {boolean} isBackLink
 */
export default class Action {
    constructor(action, searchTerm, nbOfResults) {
        this.disabled = normalizeBoolean(action.disabled);
        this.displayOnSearch = normalizeBoolean(action.displayOnSearch);
        this.displayWhenNoResults = normalizeBoolean(
            action.displayWhenNoResults
        );
        this.fixed = normalizeBoolean(action.fixed);
        this.iconName = action.iconName;
        this.label = action.label;
        this.name = action.name;
        this.position = normalizeString(action.position, {
            fallbackValue: POSITIONS.default,
            validValues: POSITIONS.valid
        });
        this.searchTerm = searchTerm;
        this.nbOfResults = nbOfResults;
    }

    /**
     * String of true or false.
     *
     * @type {string}
     */
    get computedAriaDisabled() {
        return normalizeAriaAttribute(this.disabled.toString());
    }

    /**
     * Label of the action.
     *
     * @type {string}
     */
    get computedLabel() {
        return this.displayWhenNoResults && this.searchTerm
            ? `${this.label} "${this.searchTerm}"`
            : this.label;
    }

    /**
     * Class of the action.
     *
     * @type {string}
     */
    get computedClass() {
        const hideOption =
            (this.displayOnSearch && !this.searchTerm) ||
            (this.displayWhenNoResults && !!this.nbOfResults);
        return classSet(
            'slds-listbox__item slds-media slds-listbox__option slds-listbox__option_entity slds-listbox__option_term avonni-primitive-combobox__action'
        )
            .add({
                'avonni-primitive-combobox__action_disabled': this.disabled,
                'avonni-primitive-combobox__action_fixed': this.fixed,
                'slds-hide': hideOption
            })
            .toString();
    }
}
