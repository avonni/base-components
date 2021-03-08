import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';

// const BASE_ICONS = {
//     completed: 'utility:success',
//     error: 'utility:error',
//     warning: 'utility:warning'
// };

export default class ProgressStep extends LightningElement {
    @api label;
    // status => completed, warning, error, current
    iconName;
    // iconSrc
    // iconPosition
    // buttonLabel
    // buttonName
    // buttonIconName
    // buttonIconPosition
    // buttonDisabled
    // buttonTitle
    // buttonVariant
    // assistiveText

    _value;

    connectedCallback() {
        this.classList.add('slds-progress__item');
    }

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.setAttribute('data-step', value);
    }

    get computedButtonClass() {
        const classes = classSet('slds-button slds-progress__marker');
        if (this.iconName) {
            classes
                .add('slds-button_icon')
                .add('slds-progress__marker')
                .add('slds-progress__marker_icon');
        }
        return classes.toString();
    }

    get hasIcon() {
        return true;
    }

    @api
    setIcon(iconName) {
        this.iconName = iconName;
    }
}
