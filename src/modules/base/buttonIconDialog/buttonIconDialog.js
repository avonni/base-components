import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utils';

const BUTTON_SIZES = {
    validBare: ['x-small', 'small', 'medium', 'large'],
    validNonBare: ['xx-small', 'x-small', 'small', 'medium'],
    default: 'medium'
};

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
    default: 'border'
};

const CANCEL_BUTTON_LABEL = 'Cancel';
const SAVE_BUTTON_LABEL = 'Save';

/**
 * @class
 * @name ButtonIconDialog
 * @descriptor avonni-button-icon-dialog
 * @description The button icon dialog component displays an avonni button icon. On click, open the modal box.
 * @storyId example-button-icon-dialog--border
 * @public
 */
export default class ButtonIconDialog extends LightningElement {
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
     * The label for the cancel button.
     *
     * @public
     * @type {string}
     * @default Cancel
     */
    @api cancelButtonLabel = CANCEL_BUTTON_LABEL;
    /**
     * The class to be applied to the contained icon element ( e.g. "slds-icon-text-success").
     *
     * @public
     * @type {string}
     */
    @api iconClass;
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
     * Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.
     *
     * @public
     * @type {string}
     */
    @api tooltip;
    /**
     * The label for the save button.
     *
     * @public
     * @type {string}
     * @default Save
     */
    @api saveButtonLabel = SAVE_BUTTON_LABEL;

    _disabled = false;
    _size = BUTTON_SIZES.default;
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
     * @default false
     * @type {boolean}
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * The size of the button icon. For the bare variant, options include x-small, small, medium, and large. For non-bare variants,
     * options include xx-small, x-small, small, and medium.
     *
     * @public
     * @type {string}
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }
    set size(size) {
        if (
            this._variant === 'bare' ||
            this._variant === 'bare-inverse' ||
            this._variant === 'base'
        ) {
            this._size = normalizeString(size, {
                fallbackValue: BUTTON_SIZES.default,
                validValues: BUTTON_SIZES.validBare
            });
        } else {
            this._size = normalizeString(size, {
                fallbackValue: BUTTON_SIZES.default,
                validValues: BUTTON_SIZES.validNonBare
            });
        }
    }

    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled,
     * border-inverse, brand, brand-outline, container, destructive, destructive-text, inverse, neutral and success.
     *
     * @public
     * @type {string}
     * @default border
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
        if (this._dialogSlot.assignedElements().length !== 0) {
            this._dialogSlot.assignedElements()[0].show();
        }
        /**
         * The event fired when the button is clicked.
         *
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
        this.template.querySelector('[data-element-id="button-icon"]').focus();
        /**
         * The event fired when the button is focused.
         *
         * @event
         * @name focus
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
