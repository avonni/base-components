import { LightningElement, api } from 'lwc';
import { normalizeBoolean } from '../utilsPrivate/normalize';

export default class WizardStep extends LightningElement {
    @api label;
    @api name;

    stepClass;
    _hidePreviousButton = false;
    _hideNextFinishButton = false;

    connectedCallback() {
        const stepRegister = new CustomEvent('wizardstepregister', {
            bubbles: true,
            detail: {
                callbacks: {
                    setClass: this.setClass
                },
                name: this.name,
                label: this.label,
                hidePreviousButton: this.hidePreviousButton,
                hideNextFinishButton: this.hideNextFinishButton
            }
        });

        this.dispatchEvent(stepRegister);
    }

    setClass = (value) => {
        this.stepClass = value;
    };

    @api
    get hidePreviousButton() {
        return this._hidePreviousButton;
    }
    set hidePreviousButton(value) {
        this._hidePreviousButton = normalizeBoolean(value);
    }

    @api
    get hideNextFinishButton() {
        return this._hideNextFinishButton;
    }
    set hideNextFinishButton(value) {
        this._hideNextFinishButton = normalizeBoolean(value);
    }
}
