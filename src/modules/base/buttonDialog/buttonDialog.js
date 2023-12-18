import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

const BUTTON_VARIANTS = {
    valid: [
        'bare',
        'bare-inverse',
        'base',
        'border',
        'border-filled',
        'border-inverse',
        'brand',
        'brand-outline',
        'container',
        'destructive',
        'destructive-text',
        'inverse',
        'neutral',
        'success'
    ],
    default: 'neutral'
};
const ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };

const ICON_SIZES = {
    valid: ['x-small', 'small', 'medium', 'large'],
    default: 'x-small'
};

/**
 * @class
 * @name Button Dialog
 * @descriptor avonni-button-dialog
 * @description The button dialog component displays an avonni button. On click, open the modal box
 * @storyId example-button-dialog--base
 * @public
 */
export default class ButtonDialog extends LightningElement {
    /**
     * The keyboard shortcut for the button.
     *
     * @public
     * @type {string}
     */
    @api accessKey;
    /**
     * The assistive text for the button.
     *
     * @public
     * @type {string}
     */
    @api alternativeText;
    /**
     * The name of the icon to be used in the format 'utility:down'.
     *
     * @public
     * @type {string}
     */
    @api iconName;
    /**
     * URL to set for the image attribute.
     *
     * @public
     * @type {string}
     */
    @api iconSrc;
    /**
     * Optional text to be shown on the button.
     *
     * @public
     * @type {string}
     */
    @api label;

    _disabled = false;
    _iconPosition = ICON_POSITIONS.default;
    _iconSize = ICON_SIZES.default;
    _stretch = false;
    _variant = BUTTON_VARIANTS.default;

    _dialogSlot;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    renderedCallback() {
        this._dialogSlot = this.template.querySelector(
            '[data-element-id="slot"]'
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the modal box can't be opened by users.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * Describes the position of the icon with respect to body. Options include left and right.
     *
     * @public
     * @type {string}
     * @default left
     */
    @api
    get iconPosition() {
        return this._iconPosition;
    }
    set iconPosition(iconPosition) {
        this._iconPosition = normalizeString(iconPosition, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    /**
     * The size of the icon. Options include x-small, small, medium or large.
     *
     * @public
     * @type {string}
     * @default x-small
     */
    @api
    get iconSize() {
        return this._iconSize;
    }
    set iconSize(value) {
        this._iconSize = normalizeString(value, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * Setting it to true allows the button to take up the entire available width.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get stretch() {
        return this._stretch;
    }
    set stretch(value) {
        this._stretch = normalizeBoolean(value);
    }

    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled,
     * border-inverse, brand, brand-outline, container, destructive, destructive-text, inverse, neutral and success.
     *
     * @public
     * @type {string}
     * @default neutral
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Open the modal box.
     *
     * @public
     */
    @api
    show() {
        if (this.disabled) return;
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].show();
        }
        /**
         * The event fired when the modal box is opened.
         *
         * @event
         * @name show
         * @public
         */
        this.dispatchEvent(new CustomEvent('show'));
    }

    /**
     * Close the modal box.
     *
     * @public
     */
    @api
    hide() {
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].hide();
        }
        /**
         * The event fired when the modal box is closed.
         *
         * @event
         * @name hide
         * @public
         */
        this.dispatchEvent(new CustomEvent('hide'));
    }

    /**
     * Simulate a click on the button.
     *
     * @public
     */
    @api
    click() {
        if (this.disabled) return;
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].show();
        }

        /**
         * @event
         * @name click
         */
        this.dispatchEvent(new CustomEvent('click'));
    }

    /**
     * Set focus on the button.
     *
     * @public
     */
    @api
    focus() {
        if (this.disabled) return;
        this.template.querySelector('[data-element-id="button"]').focus();
        /**
         * @event
         * @name focus
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
