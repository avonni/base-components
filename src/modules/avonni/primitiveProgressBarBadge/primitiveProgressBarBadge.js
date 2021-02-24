import { LightningElement, api } from 'lwc';
import { classSet } from 'avonni/utils';
import { normalizeString } from 'avonni/utilsPrivate';

const validVariants = [
    'default',
    'darker',
    'lightest',
    'success',
    'warning',
    'error'
];

const validBorderStyles = ['dashed', 'solid'];

export default class PrimitiveProgressBarBadge extends LightningElement {
    @api label;
    @api variant;
    @api value;
    @api borderStyle;
    @api badge;
    @api thickness;
    @api orientation;

    connectedCallback() {
        console.log(this.borderStyle);
    }

    get normalizedBorderStyles() {
        return normalizeString(this.borderStyle, {
            fallBackValue: 'solid',
            validValues: validBorderStyles
        });
    }

    get normalizedVariant() {
        return normalizeString(this.variant, {
            fallBackValue: 'default',
            validValues: validVariants
        });
    }

    get isHorizontal() {
        return this.orientation === 'horizontal';
    }

    get computedBadgeClass() {
        return classSet('slds-badge avonni-progress-bar-badges')
            .add({
                'slds-badge_inverse': this.variant === 'darker',
                'slds-badge_lightest avonni-progress-bar-badges-border_none':
                    this.variant === 'lightest',
                'slds-badge slds-theme_success': this.variant === 'success',
                'slds-badge slds-theme_warning': this.variant === 'warning',
                'slds-badge slds-theme_error': this.variant === 'error'
            })
            .toString();
    }

    get computedBadgeBorder() {
        return classSet('avonni-progress-bar-marker')
            .add({
                'avonni-progress-bar-badge-border-style_solid':
                    this.borderStyle === 'solid' &&
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
                    this.variant === 'success',
                'avonni-progress-bar-badge-border-color_warning':
                    this.variant === 'warning',
                'avonni-progress-bar-badge-border-color_error':
                    this.variant === 'error',
                'avonni-progress-bar-badge-border-color_lightest':
                    this.variant === 'lightest'
            })
            .toString();
    }

    get computedBadgeValue() {
        if (this.value >= 100) {
            return `width: 100%;`;
        } else if (this.value <= 0) {
            return `width: 0%;`;
        }
        return `width: ${this.value}%;`;
    }

    get computedBadgeBorderVertical() {
        return classSet('avonni-progress-bar-marker-vertical')
            .add({
                'avonni-progress-bar-badge-border-vertical-style_solid':
                    this.borderStyle === 'solid' &&
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
                    this.variant === 'success',
                'avonni-progress-bar-badge-border-vertical-color_warning':
                    this.variant === 'warning',
                'avonni-progress-bar-badge-border-vertical-color_error':
                    this.variant === 'error',
                'avonni-progress-bar-badge-border-vertical-color_lightest':
                    this.variant === 'lightest'
            })
            .toString();
    }
}
