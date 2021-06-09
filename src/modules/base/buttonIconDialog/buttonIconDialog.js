import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

const validSizesBare = {
    valid: ['x-small', 'small', 'medium', 'large'],
    default: 'medium'
};
const validSizesNonBare = {
    valid: ['xx-small', 'x-small', 'small', 'medium'],
    default: 'medium'
};
const validVariants = {
    valid: [
        'bare',
        'container',
        'brand',
        'border',
        'border-filled',
        'bare-inverse',
        'border-inverse'
    ],
    default: 'border'
};

export default class ButtonIconDialog extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api tooltip;
    @api iconClass;
    @api iconName;

    _disabled = false;
    _size = 'medium';
    _variant = validVariants.default;
    _dialogSlot;

    renderedCallback() {
        this._dialogSlot = this.template.querySelector('slot');
    }

    @api
    get size() {
        return this._size;
    }

    set size(size) {
        if (this._variant === 'bare' || this._variant === 'bare-inverse') {
            this._size = normalizeString(size, {
                fallbackValue: validSizesBare.default,
                validValues: validSizesBare.valid
            });
        } else {
            this._size = normalizeString(size, {
                fallbackValue: validSizesNonBare.default,
                validValues: validSizesNonBare.valid
            });
        }
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: validVariants.default,
            validValues: validVariants.valid
        });
    }

    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    show() {
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].show();
        }
        this.dispatchEvent(new CustomEvent('show'));
    }

    @api
    hide() {
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].hide();
        }
        this.dispatchEvent(new CustomEvent('hide'));
    }

    @api
    click() {
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].show();
        }
        this.dispatchEvent(new CustomEvent('click'));
    }

    @api
    focus() {
        this.template.querySelector('lightning-button-icon').focus();
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
