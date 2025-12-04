import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { LightningElement, api } from 'lwc';

const ALERT_ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};
const ALERT_VARIANTS = {
    valid: ['base', 'error', 'offline', 'warning'],
    default: 'base'
};

/**
 * Alert banners communicate a state that affects the entire system, not just a feature or page. It persists over a session and appears without the user initiating the action.
 * @class
 * @name Alert
 * @public
 * @storyId example-alert--base
 * @descriptor avonni-alert
 */
export default class Alert extends LightningElement {
    /**
     * The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     * @type {string}
     * @public
     */
    @api iconName;
    /**
     * Custom function to execute when the user closes the alert.
     * @type {function}
     * @public
     */
    @api closeAction;

    _iconSize = ALERT_ICON_SIZES.default;
    _isDismissible = false;
    _variant = ALERT_VARIANTS.default;

    hideAlert;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The size of the icon. Options include xx-small, x-small, small, medium, or large.
     * @type {string}
     * @default small
     * @public
     */
    @api
    get iconSize() {
        return this._iconSize;
    }
    set iconSize(value) {
        this._iconSize = normalizeString(value, {
            fallbackValue: ALERT_ICON_SIZES.default,
            validValues: ALERT_ICON_SIZES.valid
        });
    }

    /**
     * Specify if the alert can be closed.
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isDismissible() {
        return this._isDismissible;
    }
    set isDismissible(value) {
        this._isDismissible = normalizeBoolean(value);
    }

    /**
     * The variant change the apparence of the alert. Valid values include base, error, offline and warning.
     * @type {string}
     * @default base
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: ALERT_VARIANTS.default,
            validValues: ALERT_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Wrapper div class, depending on the variant value.
     * @type {string}
     */
    get computedVariantClass() {
        return classSet('avonni-alert__wrapper')
            .add(`avonni-alert_${this.variant}`)
            .add({
                'avonni-alert__wrapper_dismissible': this.isDismissible
            })
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Hide the alert and execute the close action.
     */
    handleClose() {
        const cancelled = this._dispatchClose();
        if (cancelled) {
            return;
        }
        this.hideAlert = true;
        if (typeof this.closeAction === 'function') {
            this.closeAction();
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    _dispatchClose() {
        const event = new CustomEvent('close', { cancelable: true });

        /**
         * The event fired when the alert is closed.
         *
         * @event
         * @name close
         * @public
         * @cancelable
         */
        this.dispatchEvent(event);
        return event.defaultPrevented;
    }
}
