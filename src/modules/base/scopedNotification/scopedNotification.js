import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const SCOPED_NOTIFICATION_VARIANTS = {valid: ['base', 'light', 'dark', 'warning', 'error', 'success'], default: 'base'};
const ICON_SIZES = {valid: ['xx-small', 'x-small', 'small', 'medium', 'large'], default: 'medium'};

export default class ScopedNotification extends LightningElement {
    @api title;
    @api iconName;

    _variant = SCOPED_NOTIFICATION_VARIANTS.default;
    _iconSize = ICON_SIZES.default;
    showTitle = true;

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }
    }

    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    @api get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: SCOPED_NOTIFICATION_VARIANTS.default,
            validValues: SCOPED_NOTIFICATION_VARIANTS.valid
        });
    }

    @api get iconSize() {
        return this._iconSize;
    }

    set iconSize(iconSize) {
        this._iconSize = normalizeString(iconSize, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    get computedNotificationClass() {
        return classSet('slds-scoped-notification slds-media slds-media_center')
            .add({
                'slds-scoped-notification_light': this.variant === 'light',
                'slds-scoped-notification_dark': this.variant === 'dark',
                'avonni-scoped-notification_warning':
                    this.variant === 'warning',
                'avonni-scoped-notification_error': this.variant === 'error',
                'avonni-scoped-notification_success': this.variant === 'success'
            })
            .toString();
    }

    get computedIconVariant() {
        return classSet()
            .add({
                inverse: this.variant === 'dark',
                warning: this.variant === 'warning',
                error: this.variant === 'error',
                success: this.variant === 'success'
            })
            .toString();
    }
}
