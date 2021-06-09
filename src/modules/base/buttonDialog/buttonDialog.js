import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

const validVariants = {
    valid: [
        'base',
        'neutral',
        'brand',
        'brand-outline',
        'destructive',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'neutral'
};
const validIconPositions = { valid: ['left', 'right'], default: 'left' };

export default class ButtonDialog extends LightningElement {
    @api accessKey;
    @api label;
    @api iconName;
    @api alternativeText;

    _disabled = false;
    _variant = 'neutral';
    _iconPosition = 'left';
    _dialogSlot;

    renderedCallback() {
        this._dialogSlot = this.template.querySelector('slot');
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
    get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(iconPosition) {
        this._iconPosition = normalizeString(iconPosition, {
            fallbackValue: validIconPositions.default,
            validValues: validIconPositions.valid
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
        this.template.querySelector('lightning-button').focus();
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
