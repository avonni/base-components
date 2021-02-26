import { LightningElement, api } from 'lwc';
import { classSet } from 'avonni/utils';

export default class PrimitiveProgressBarBadge extends LightningElement {
    @api badge;
    @api thickness;
    @api isHorizontal;

    _value = 0;

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

    get computedInnerClass() {
        return classSet('slds-badge avonni-progress-bar-badges')
            .add({
                'slds-badge_inverse': this.badge.variant === 'darker',
                'slds-badge_lightest avonni-progress-bar-badges-border_none':
                    this.badge.variant === 'lightest',
                'slds-badge slds-theme_success':
                    this.badge.variant === 'success',
                'slds-badge slds-theme_warning':
                    this.badge.variant === 'warning',
                'slds-badge slds-theme_error': this.badge.variant === 'error'
            })
            .toString();
    }

    get computedOuterClass() {
        return classSet('')
            .add({
                'avonni-progress-bar-marker': this.isHorizontal
            })
            .add({
                'avonni-progress-bar-badge-border-style_solid':
                    this.badge.borderStyle === 'solid' && this.isHorizontal
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
                'avonni-progress-bar-badge-border-color_success':
                    this.badge.variant === 'success',
                'avonni-progress-bar-badge-border-color_warning':
                    this.badge.variant === 'warning',
                'avonni-progress-bar-badge-border-color_error':
                    this.badge.variant === 'error',
                'avonni-progress-bar-badge-border-color_lightest':
                    this.badge.variant === 'lightest'
            })
            .add({
                'avonni-progress-bar-marker-vertical': !this.isHorizontal
            })
            .add({
                'avonni-progress-bar-badge-border-vertical-style_solid':
                    this.badge.borderStyle === 'solid' && !this.isHorizontal
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
                'avonni-progress-bar-badge-border-vertical-color_success':
                    this.badge.variant === 'success',
                'avonni-progress-bar-badge-border-vertical-color_warning':
                    this.badge.variant === 'warning',
                'avonni-progress-bar-badge-border-vertical-color_error':
                    this.badge.variant === 'error',
                'avonni-progress-bar-badge-border-vertical-color_lightest':
                    this.badge.variant === 'lightest'
            })
            .toString();
    }

    get computedStyle() {
        return this.isHorizontal
            ? `width: ${this._value}%`
            : `height: ${this._value}%`;
    }
}
