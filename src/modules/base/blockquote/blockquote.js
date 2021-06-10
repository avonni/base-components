import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const BLOCKQUOTE_VARIANTS = {
    valid: ['default', 'brand', 'warning', 'error', 'success'],
    default: 'default'
};
const ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };
const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

export default class Blockquote extends LightningElement {
    @api title;
    @api iconName;

    _variant = BLOCKQUOTE_VARIANTS.default;
    _iconPosition = ICON_POSITIONS.default;
    _iconSize = ICON_SIZES.default;

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: BLOCKQUOTE_VARIANTS.default,
            validValues: BLOCKQUOTE_VARIANTS.valid
        });
    }

    @api
    get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(position) {
        this._iconPosition = normalizeString(position, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    @api
    get iconSize() {
        return this._iconSize;
    }

    set iconSize(size) {
        this._iconSize = normalizeString(size, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
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
