import { api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import PrimitiveButton from 'c/primitiveButton';
import { Tooltip, TooltipType } from 'c/tooltipLibrary';

const ICON_SIZES = {
    validBare: ['x-small', 'small', 'medium', 'large'],
    validNonBare: ['xx-small', 'x-small', 'small', 'medium'],
    default: 'medium'
};

/**
 * @class
 * @name Button Icon
 * @descriptor avonni-button-icon
 * @description A clickable element used to perform an action.
 * @storyId example-button-icon--base
 * @public
 */
export default class ButtonIcon extends PrimitiveButton {
    /**
     * The keyboard shortcut for the button.
     *
     * @name accessKey
     * @public
     * @type {string}
     */
    /**
     * The alternative text used to describe the icon. This text should describe what
     * happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'.
     *
     * @public
     * @type {string}
     */
    @api alternativeText;
    /**
     * If present, the button icon can't be clicked by users.
     *
     * @name disabled
     * @public
     * @type {boolean}
     * @default false
     */
    /**
     * The class to be applied to the contained icon element.
     * Only Lightning Design System utility classes are currently supported.
     *
     * @public
     * @type {string}
     */
    @api iconClass;
    /**
     * The Lightning Design System name of the icon.
     * Names are written in the format 'utility:down' where 'utility' is the category,
     * and 'down' is the specific icon to be displayed.
     *
     * @name iconName
     * @public
     * @type {string}
     */
    /**
     * URL to set for the image attribute.
     *
     * @name iconSrc
     * @public
     * @type {string}
     */
    /**
     * The name for the button element.
     * This value is optional and can be used to identify the button in a callback.
     *
     * @name name
     * @public
     * @type {string}
     */
    /**
     * Reserved for internal use only.
     * Should be set to -1 if button should not
     * be focused during tab navigation and should
     * be set to 0 if button should be focused.
     *
     * @name tabIndex
     * @public
     * @type {number}
     */
    /**
     * Specifies the type of button.
     * Options include button, reset, and submit.
     *
     * @name type
     * @public
     * @type {string}
     * @default button
     */
    /**
     * The value for the button element.
     * This value is optional and can be used when submitting a form.
     *
     * @name value
     * @public
     * @type {string}
     */
    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled, border-inverse, brand, brand-outline, container, destructive, destructive-text, neutral, inverse and success.
     *
     * @name variant
     * @public
     * @type {string}
     * @default neutral
     */

    _size = ICON_SIZES.default;
    _tooltip = null;
    tooltipValue = null;
    tooltipType = TooltipType.Info;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        super.connectedCallback();
    }

    renderedCallback() {
        super.renderedCallback();
        this.initTooltip();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The size of the button-icon. For the bare variant, options include x-small, small, medium, and large.
     * For non-bare variants, options include xx-small, x-small, small, and medium.
     *
     * @public
     * @type {string}
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }
    set size(value) {
        if (this._variant === 'bare' || this._variant === 'bare-inverse') {
            this._size = normalizeString(value, {
                fallbackValue: ICON_SIZES.default,
                validValues: ICON_SIZES.validBare
            });
        } else {
            this._size = normalizeString(value, {
                fallbackValue: ICON_SIZES.default,
                validValues: ICON_SIZES.validNonBare
            });
        }
    }

    /**
     * Text to display when the user mouses over or focuses on the button.
     * The tooltip is auto-positioned relative to the button and screen space.
     *
     * @type {string}
     * @param {string} value - The plain text string for the tooltip
     * @public
     */
    @api
    get tooltip() {
        return this._tooltip ? this._tooltip.value : undefined;
    }
    set tooltip(value) {
        if (this._tooltip) {
            this._tooltip.value = value;
        } else if (value) {
            this._tooltip = new Tooltip(value, {
                root: this,
                target: () =>
                    this.template.querySelector('[data-element-id="button"]')
            });
            this._tooltip.initialize();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed button class styling.
     *
     * @type {string}
     */
    get computedButtonClass() {
        return classSet('slds-button avonni-button')
            .add(`avonni-button_${this.computedVariant}`)
            .add({
                'slds-button_neutral': this.computedVariant === 'neutral',
                'slds-button_inverse': this.computedVariant === 'inverse',
                'slds-button_brand': this.computedVariant === 'brand',
                'slds-button_outline-brand':
                    this.computedVariant === 'brand-outline',
                'slds-button_destructive':
                    this.computedVariant === 'destructive',
                'slds-button_text-destructive':
                    this.computedVariant === 'destructive-text',
                'slds-button_success': this.computedVariant === 'success',
                'slds-button_stretch': this.stretch,
                'avonni-button__container_large': this.iconSize === 'large',
                'avonni-button__container_medium': this.iconSize === 'medium'
            });
    }

    /**
     * Computed icon container class styling.
     *
     * @type {string}
     */
    get computedIconContainerClass() {
        return classSet('').add({
            'slds-order_0': this.iconPosition === 'left',
            'slds-order_2': this.iconPosition === 'right',
            'slds-m-right_x-small':
                this.iconPosition === 'left' && this.iconSrc,
            'slds-m-left_x-small':
                this.iconPosition === 'right' && this.iconSrc,
            'slds-grid': this.iconSrc
        });
    }

    /**
     * Computed image class styling.
     *
     * @type {string}
     */
    get computedImageClass() {
        return classSet('avonni-button__image')
            .add(`avonni-button__image_${this.iconSize}`)
            .toString();
    }

    /**
     * Computed size for the icon.
     *
     * @type {string}
     */
    get computedIconSize() {
        switch (this.iconSize) {
            case 'x-small':
                return 'xx-small';
            case 'small':
                return 'x-small';
            case 'medium':
                return 'small';
            default:
                return this.iconSize;
        }
    }

    /**
     * Display avatar or icon if they are set.
     *
     * @type {boolean}
     */
    get showButtonIcon() {
        return this.iconName || this.iconSrc;
    }

    /**
     * Display icon only if iconName is set and src is not set.
     *
     * @type {boolean}
     */
    get showIcon() {
        return this.iconName && !this.iconSrc;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Simulate a click on the button.
     *
     * @public
     */
    @api
    click() {
        if (this._connected) {
            this.button.click();
        }
    }

    /**
     * Set focus on the button.
     *
     * @public
     */
    @api
    focus() {
        if (this._connected) {
            this.button.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Tooltip initialization.
     */
    initTooltip() {
        if (this._tooltip && !this._tooltip.initialized) {
            this._tooltip.initialize();
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Blur handler.
     */
    handleButtonBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Click handler.
     */
    handleButtonClick() {
        // In native shadow mode, parent form can't be submitted from within the
        // shadow boundary, so we need to manually find the parent form and submit.
        // Once TD-0118070 is delivered, we can access the parent form using `elementInternals.form`
        if (!this.template.synthetic && this.type === 'submit') {
            const form = this.template.host.closest('form');
            if (form) {
                form.requestSubmit();
            }
        }

        this.dispatchEvent(new CustomEvent('click'));
    }

    /**
     * Focus handler.
     */
    handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
