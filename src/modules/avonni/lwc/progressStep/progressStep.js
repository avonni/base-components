import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';

// const BASE_ICONS = {
//     completed: 'utility:success',
//     error: 'utility:error',
//     warning: 'utility:warning'
// };

export default class ProgressStep extends LightningElement {
    @api value;
    @api label;
    // status => completed, warning, error, current
    // iconName
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

    get computedButtonClass() {
        const classes = classSet('slds-button slds-progress__marker');
        if (this.hasIcon) {
            classes
                .add('slds-button_icon')
                .add('slds-progress__marker')
                .add('slds-progress__marker_icon');
        }
        return classes.toString();
    }

    get hasIcon() {
        return false;
    }
}
