import { LightningElement, api } from 'lwc';
import { normalizeBoolean } from '../utilsPrivate/normalize';

// QUESTIONS:
// Problem of actions slot: prev/next buttons in parent or child? Send all the parent properties to child on init?
// Name set automatically through the parent?

export default class WizardStep extends LightningElement {
    @api label;
    @api name;
    @api actionPosition;

    _hidePreviousButton = false;
    _hideNextFinishButton = false;

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
