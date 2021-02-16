import { LightningElement, api, track } from 'lwc';
import { normalizeString } from 'avonni/utilsPrivate';
import { classSet } from 'avonni/utils';

const validVariants = ['default', 'brand', 'warning', 'error', 'success'];
const validIconPositions = ['left', 'right'];
const validIconSizes = ['xx-small', 'x-small', 'small', 'medium', 'large'];

export default class Blockquote extends LightningElement {
    @api title;
    @api iconName;

    @track _variant = 'default';
    @track _iconPosition = 'left';
    @track _iconSize = 'small';

    @api get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: 'default',
            validValues: validVariants
        });
    }

    @api get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(position) {
        this._iconPosition = normalizeString(position, {
            fallbackValue: 'left',
            validValues: validIconPositions
        });
    }

    @api get iconSize() {
        return this._iconSize;
    }

    set iconSize(size) {
        this._iconSize = normalizeString(size, {
            fallbackValue: 'small',
            validValues: validIconSizes
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
