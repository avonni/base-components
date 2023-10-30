import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const SCOPED_NOTIFICATION_VARIANTS = {
    valid: ['base', 'dark', 'warning', 'error', 'success'],
    default: 'base'
};
const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

/**
 * @class
 * @descriptor avonni-scoped-notification
 * @storyId example-scoped-notification--base
 * @public
 */
export default class ScopedNotification extends LightningElement {
    /**
     * The name of the icon to be used in the format 'utility:down'.
     *
     * @type {}
     * @public
     * @default
     */
    @api iconName;
    /**
     * Title of the notification.
     *
     * @type {string}
     * @public
     */
    @api title;

    _iconSize = ICON_SIZES.default;
    _variant = SCOPED_NOTIFICATION_VARIANTS.default;

    showTitle = true;

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }
    }

    /**
     * Get the title slot DOM element.
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The size of the icon. Valid options include xx-small, x-small, small, medium, or large.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api get iconSize() {
        return this._iconSize;
    }

    set iconSize(iconSize) {
        this._iconSize = normalizeString(iconSize, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * The variant changes the look of the scoped notification. Valid values include base, dark, warning, error, success.
     *
     * @type {string}
     * @public
     * @default base
     */
    @api get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: SCOPED_NOTIFICATION_VARIANTS.default,
            validValues: SCOPED_NOTIFICATION_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed notification class styling.
     *
     * @type {string}
     */
    get computedNotificationClass() {
        return classSet('slds-scoped-notification slds-media slds-media_center')
            .add(`avonni-scoped-notification_theme-${this._variant}`)
            .toString();
    }

    /**
     * Computed Icon variant class based on selection.
     *
     * @type {string}
     */
    get computedIconVariant() {
        return classSet()
            .add({
                inverse:
                    this.variant === 'dark' ||
                    this.variant === 'success' ||
                    this.variant === 'error'
            })
            .toString();
    }
}
