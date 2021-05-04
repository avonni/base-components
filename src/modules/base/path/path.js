import { LightningElement, api } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';

const FORMATS = {
    valid: ['linear', 'non-linear'],
    default: 'linear'
};

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};

export default class Path extends LightningElement {
    @api currentStep;
    @api keyFieldsLabel;
    @api guidanceLabel;
    @api pathUpdateButtonLabel;
    @api pathUpdateButtonIconName;

    _disabled = false;
    _format = FORMATS.default;
    _hidePathUpdateButton = false;
    _pathUpdateButtonIconPosition = ICON_POSITIONS.default;
    _steps = [];
    _actions = [];

    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(bool) {
        this._disabled = normalizeBoolean(bool);
    }

    @api
    get format() {
        return this._format;
    }
    set format(value) {
        this._format = normalizeString(value, {
            fallbackValue: FORMATS.default,
            validValues: FORMATS.valid
        });
    }

    @api
    get hidePathUpdateButton() {
        return this._hidePathUpdateButton;
    }
    set hidePathUpdateButton(bool) {
        this._hidePathUpdateButton = normalizeBoolean(bool);
    }

    @api
    get pathUpdateButtonIconPosition() {
        return this._pathUpdateButtonIconPosition;
    }
    set pathUpdateButtonIconPosition(value) {
        this._pathUpdateButtonIconPosition = normalizeString(value, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    @api
    get steps() {
        return this._steps;
    }
    set steps(value) {
        this._steps = normalizeArray(value);
    }

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
    }
}
