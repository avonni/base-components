import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const validVariants = {
    valid: ['default', 'brand', 'warning', 'error', 'success'],
    default: 'default'
};
const validIconPositions = { valid: ['left', 'right'], default: 'left' };
const validIconSizes = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

export default class Blockquote extends LightningElement {
    @api title;
    @api iconName;

    _variant = validVariants.default;
    _iconPosition = validIconPositions.default;
    _iconSize = validIconSizes.default;

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

    set iconPosition(position) {
        this._iconPosition = normalizeString(position, {
            fallbackValue: validIconPositions.default,
            validValues: validIconPositions.valid
        });
    }

    @api
    get iconSize() {
        return this._iconSize;
    }

    set iconSize(size) {
        this._iconSize = normalizeString(size, {
            fallbackValue: validIconSizes.default,
            validValues: validIconSizes.valid
        });
    }

    get blockquoteClass() {
        return classSet('doc')
            .add({
                'blockquote-default': this._variant === 'default',
                'blockquote-brand': this._variant === 'brand',
                'blockquote-warning': this._variant === 'warning',
                'blockquote-error': this._variant === 'error',
                'blockquote-success': this._variant === 'success'
            })
            .toString();
    }

    get leftIcon() {
        return this._iconPosition === 'left' && this.iconName;
    }

    get rightIcon() {
        return this._iconPosition === 'right' && this.iconName;
    }
}
