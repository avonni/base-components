import { api } from 'lwc';
import { normalizeString, isCSR } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import PrimitiveButton from 'c/primitiveButton';
import { isCustomIconType, isStandardIconType } from 'c/iconUtils';

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

/**
 * @class
 * @name Button
 * @descriptor avonni-button
 * @description A clickable element used to perform an action.
 * @storyId example-button--base
 * @public
 */
export default class Button extends PrimitiveButton {
    /**
     * If present, the button can't be clicked by users.
     *
     * @name disabled
     * @public
     * @type {boolean}
     * @default false
     */
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
     * Describes the position of the icon with respect to the button label. Options include left and right.
     *
     * @name iconPosition
     * @public
     * @type {string}
     * @default left
     */
    /**
     * URL to set for the image attribute.
     *
     * @name iconSrc
     * @public
     * @type {string}
     */
    /**
     * The text to be displayed inside the button.
     *
     * @name label
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

    _iconSize = ICON_SIZES.default;

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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Returns the button element.
     *
     * @type {Element}
     */
    get button() {
        return isCSR
            ? this.template.querySelector('[data-element-id="button"]')
            : null;
    }

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

    get computedPrimitiveIconClass() {
        // Scale adjustment is needed for standard or custom icons.
        const isCustomOrStandardIcon =
            isCustomIconType(this.iconName) ||
            isStandardIconType(this.iconName);
        return classSet('slds-grid').add({
            [`avonni-button__icon_${this.iconSize}`]: !isCustomOrStandardIcon,
            [`avonni-button__icon-adjust-scale_${this.iconSize}`]:
                isCustomOrStandardIcon
        });
    }

    /**
     * Computed size for the icon.
     *
     * @type {string}
     */
    get computedIconSize() {
        if (this.iconSize === 'medium') return 'x-small';
        if (this.iconSize === 'large') return 'small';
        return '';
    }

    /**
     * Display button only if label is set or showIcon is true.
     *
     * @type {boolean}
     */
    get showButton() {
        return this.label || this.showMedia;
    }

    /**
     * Display icon only if iconName is set and src is not set.
     *
     * @type {boolean}
     */
    get showIcon() {
        return this.iconName && !this.iconSrc;
    }

    /**
     * Display image or icon if they are set.
     *
     * @type {boolean}
     */
    get showMedia() {
        return this.iconName || this.iconSrc;
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
        if (this._connected && this.button) {
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
        if (this._connected && this.button) {
            this.button.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
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
    handleButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
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
