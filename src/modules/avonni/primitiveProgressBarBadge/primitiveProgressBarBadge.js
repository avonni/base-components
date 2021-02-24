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

    _variant = 'default';

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: 'default',
            validValues: validVariants
        });
    }

    get computedClass() {
        return classSet('avonni-progress-bar-badges')
            .add({
                'slds-badge_inverse': this._variant === 'inverse',
                'slds-badge_lightest avonni-progress-bar-badges-border_none':
                    this._variant === 'lightest',
                'slds-badge slds-theme_success': this._variant === 'success',
                'slds-badge slds-theme_warning': this._variant === 'warning',
                'slds-badge slds-theme_error': this._variant === 'error'
            })
            .toString();
    }
}
