import { LightningElement, api } from 'lwc';
import { normalizeBoolean } from '../utilsPrivate/normalize';

export default class WizardStep extends LightningElement {
    @api label;
    @api name;

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
