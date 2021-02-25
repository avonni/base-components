import { LightningElement, api } from 'lwc';
import { classSet } from 'avonni/utils';

export default class PrimitiveProgressBarBadge extends LightningElement {
    @api badge;
    @api thickness;
    @api orientation;

    get isHorizontal() {
        return this.orientation === 'horizontal';
    }

    get computedBadgeClass() {
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

    get computedBadgeBorder() {
        return classSet('avonni-progress-bar-marker')
            .add({
                'avonni-progress-bar-badge-border-style_solid':
                    this.badge.borderStyle === 'solid' &&
                    this.orientation === 'horizontal'
            })
            .add({
                'avonni-progress-bar-badge-border-thickness_x-small':
                    this.thickness === 'x-small' &&
                    this.orientation === 'horizontal',
                'avonni-progress-bar-badge-border-thickness_small':
                    this.thickness === 'small' &&
                    this.orientation === 'horizontal',
                'avonni-progress-bar-badge-border-thickness_large':
                    this.thickness === 'large' &&
                    this.orientation === 'horizontal'
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
            .toString();
    }

    get computedBadgeValue() {
        if (this.badge.value >= 100) {
            return `width: 100%;`;
        } else if (this.badge.value <= 0) {
            return `width: 0%;`;
        }
        return `width: ${this.badge.value}%;`;
    }

    get computedBadgeBorderVertical() {
        return classSet('avonni-progress-bar-marker-vertical')
            .add({
                'avonni-progress-bar-badge-border-vertical-style_solid':
                    this.badge.borderStyle === 'solid' &&
                    this.orientation === 'vertical'
            })
            .add({
                'avonni-progress-bar-badge-border-thickness-vertical_x-small':
                    this.thickness === 'x-small' &&
                    this.orientation === 'vertical',
                'avonni-progress-bar-badge-border-thickness-vertical_small':
                    this.thickness === 'small' &&
                    this.orientation === 'vertical',
                'avonni-progress-bar-badge-border-thickness-vertical_large':
                    this.thickness === 'large' &&
                    this.orientation === 'vertical'
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

    get computedBadgeValueVertical() {
        if (this.badge.value >= 100) {
            return 'height: 100%';
        } else if (this.badge.value <= 0) {
            return 'height: 0%';
        }
        return `height: ${this.badge.value}%`;
    }
}
