import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';

export default class ProgressStep extends LightningElement {
    @api label;
    iconName;
    // status => completed, warning, error, current
    // iconSrc
    // iconPosition
    // buttonLabel
    // buttonName
    // buttonIconName
    // buttonIconPosition
    // buttonDisabled
    // buttonTitle
    // buttonVariant

    _value;

    connectedCallback() {
        this.classList.add('slds-progress__item');
    }

    renderedCallback() {
        // console.log(Array.from(this.template.getAttribute('data-key')))
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

    handleStepMouseEnter() {
        this.dispatchEvent(
            new CustomEvent('stepmouseenter', {
                bubbles: true,
                cancelable: true,
                detail: { value: this.value }
            })
        );
    }

    handleStepMouseLeave() {
        this.dispatchEvent(
            new CustomEvent('stepmouseleave', {
                bubbles: true,
                cancelable: true,
                detail: { value: this.value }
            })
        );
    }

    handleStepFocus() {
        this.dispatchEvent(
            new CustomEvent('stepfocus', {
                bubbles: true,
                cancelable: true,
                detail: { value: this.value }
            })
        );
    }

    handleStepBlur() {
        this.dispatchEvent(
            new CustomEvent('stepblur', {
                bubbles: true,
                detail: { value: this.value }
            })
        );
    }

    selectStep() {
        this.dispatchEvent(
            new CustomEvent('stepselect', {
                bubbles: true,
                detail: { value: this.value }
            })
        );
    }
}
