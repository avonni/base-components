import { LightningElement, api } from 'lwc';
import { classSet } from 'avonni/utils';
import { normalizeString } from 'avonni/utilsPrivate';

const VARIANTS = {
    valid: ['default', 'darker', 'success', 'warning', 'error', 'lightest'],
    default: 'default'
};
const BORDER_STYLES = {
    valid: ['solid', 'dashed', 'dotted', 'none'],
    default: 'none'
};

export default class PrimitiveProgressBarBadge extends LightningElement {
    @api label;
    @api thickness;
    @api isHorizontal;

    _value = 0;
    _variant = 'default';
    _borderStyle = 'none';

    connectedCallback() {
        console.log(this._borderStyle);
    }

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        if (value <= 0) {
            this._value = 0;
        } else if (value > 100) {
            this._value = 100;
        } else {
            this._value = value;
        }
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    @api
    get borderStyle() {
        return this._borderStyle;
    }

    set borderStyle(borderStyle) {
        this._borderStyle = normalizeString(borderStyle, {
            fallbackValue: BORDER_STYLES.default,
            validValues: BORDER_STYLES.valid
        });
    }

    get computedInnerClass() {
        return classSet('avonni-progress-bar-badges')
            .add({
                'slds-badge_inverse': this._variant === 'darker',
                'slds-badge_lightest avonni-progress-bar-badges-border_none':
                    this._variant === 'lightest',
                'slds-theme_success': this._variant === 'success',
                'slds-theme_warning': this._variant === 'warning',
                'slds-theme_error': this._variant === 'error'
            })
            .toString();
    }

    get computedOuterClass() {
        return classSet('')
            .add({
                'avonni-progress-bar-marker': this.isHorizontal
            })
            .add({
                'avonni-progress-bar-badge-border-style_dashed':
                    this._borderStyle === 'dashed' && this.isHorizontal,
                'avonni-progress-bar-badge-border-style_solid':
                    this._borderStyle === 'solid' && this.isHorizontal,
                'avonni-progress-bar-badge-border-style_dotted':
                    this._borderStyle === 'dotted' && this.isHorizontal
            })
            .add({
                'avonni-progress-bar-badge-border-thickness_x-small':
                    this.thickness === 'x-small' && this.isHorizontal,
                'avonni-progress-bar-badge-border-thickness_small':
                    this.thickness === 'small' && this.isHorizontal,
                'avonni-progress-bar-badge-border-thickness_large':
                    this.thickness === 'large' && this.isHorizontal
            })
            .add({
                'avonni-progress-bar-badge-border-color_darker':
                    this._variant === 'darker',
                'avonni-progress-bar-badge-border-color_success':
                    this._variant === 'success',
                'avonni-progress-bar-badge-border-color_warning':
                    this._variant === 'warning',
                'avonni-progress-bar-badge-border-color_error':
                    this._variant === 'error',
                'avonni-progress-bar-badge-border-color_lightest':
                    this._variant === 'lightest'
            })
            .add({
                'avonni-progress-bar-marker-vertical': !this.isHorizontal
            })
            .add({
                'avonni-progress-bar-badge-border-vertical-style_dashed':
                    this._borderStyle === 'dashed' && !this.isHorizontal,
                'avonni-progress-bar-badge-border-vertical-style_solid':
                    this._borderStyle === 'solid' && !this.isHorizontal,
                'avonni-progress-bar-badge-border-vertical-style_dotted':
                    this._borderStyle === 'dotted' && !this.isHorizontal
            })
            .add({
                'avonni-progress-bar-badge-border-thickness-vertical_x-small':
                    this.thickness === 'x-small' && !this.isHorizontal,
                'avonni-progress-bar-badge-border-thickness-vertical_small':
                    this.thickness === 'small' && !this.isHorizontal,
                'avonni-progress-bar-badge-border-thickness-vertical_large':
                    this.thickness === 'large' && !this.isHorizontal
            })
            .add({
                'avonni-progress-bar-badge-border-vertical-color_darker':
                    this._variant === 'darker',
                'avonni-progress-bar-badge-border-vertical-color_success':
                    this._variant === 'success',
                'avonni-progress-bar-badge-border-vertical-color_warning':
                    this._variant === 'warning',
                'avonni-progress-bar-badge-border-vertical-color_error':
                    this._variant === 'error',
                'avonni-progress-bar-badge-border-vertical-color_lightest':
                    this._variant === 'lightest'
            })
            .toString();
    }

    get computedStyle() {
        return this.isHorizontal
            ? `width: ${this._value}%`
            : `height: ${this._value}%`;
    }
}
