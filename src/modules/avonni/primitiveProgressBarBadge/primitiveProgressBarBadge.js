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

export default class PrimitiveProgressBarBadge extends LightningElement {
    @api label;
    @api variant;
    @api value;

    get normalizedVariant() {
        return normalizeString(this.variant, {
            fallBackValue: 'default',
            validValues: validVariants
        });
    }

    get computedClass() {
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
}
