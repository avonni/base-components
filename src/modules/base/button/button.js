import { api } from 'lwc';
import { normalizeBoolean, isCSR } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import PrimitiveButton from 'c/primitiveButton';

/**
 * @class
 * @name Button
 * @descriptor avonni-button
 * @description A clickable element used to perform an action.
 * @storyId example-button--base
 * @public
 */
export default class Button extends PrimitiveButton {
    _stretch = false;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        super.connectedCallback();
        this._connected = true;
    }

    renderedCallback() {
        // initialize aria attributes in primitiveButton
        super.renderedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._connected = false;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the button can't be clicked by users.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get disabled() {
        return super.disabled;
    }
    set disabled(value) {
        super.disabled = normalizeBoolean(value);
    }

    /**
     * The Lightning Design System name of the icon.
     * Names are written in the format 'utility:down' where 'utility' is the category,
     * and 'down' is the specific icon to be displayed.
     *
     * @type {string}
     */
    @api
    get iconName() {
        return super.iconName;
    }
    set iconName(value) {
        super.iconName = value;
    }

    /**
     * Describes the position of the icon with respect to the button label. Options include left and right.
     *
     * @public
     * @type {string}
     * @default left
     */
    @api
    get iconPosition() {
        return super.iconPosition;
    }
    set iconPosition(value) {
        super.iconPosition = value;
    }

    /**
     * The size of the icon. Options include xx-small, x-small, small, medium or large.
     *
     * @public
     * @type {string}
     * @default medium
     */
    @api
    get iconSize() {
        return super.iconSize;
    }
    set iconSize(value) {
        super.iconSize = value;
    }

    /**
     * URL to set for the image attribute.
     *
     * @public
     * @type {string}
     */
    @api
    get imageSrc() {
        return super.imageSrc;
    }
    set imageSrc(value) {
        super.imageSrc = value;
    }

    /**
     * The variant changes the shape of the image. Valid values includes circle and square.
     *
     * @public
     * @type {string}
     * @default square
     */
    @api
    get imageVariant() {
        return super.imageVariant;
    }
    set imageVariant(value) {
        super.imageVariant = value;
    }

    /**
     * The text to be displayed inside the button.
     *
     * @public
     * @type {string}
     */
    @api
    get label() {
        return super.label;
    }
    set label(value) {
        super.label = value;
    }

    /**
     * The name for the button element.
     * This value is optional and can be used to identify the button in a callback.
     *
     * @public
     * @type {string}
     */
    @api
    get name() {
        return super.name;
    }
    set name(value) {
        super.name = value;
    }

    /**
     * Setting it to true allows the button to take up the entire available width.
     * This value defaults to false.
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
     * Specifies the type of button.
     * Valid values are button, reset, and submit.
     * This value defaults to button.
     *
     * @public
     * @type {string}
     * @default button
     */
    @api
    get type() {
        return super.type;
    }
    set type(value) {
        super.type = value;
    }

    /**
     * The value for the button element.
     * This value is optional and can be used when submitting a form.
     *
     * @public
     * @type {string}
     */
    @api
    get value() {
        return super.value;
    }
    set value(value) {
        super.value = value;
    }

    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled, border-inverse, brand, brand-outline, container, destructive, destructive-text, neutral, inverse and success.
     *
     * @public
     * @type {string}
     * @default neutral
     */
    @api
    get variant() {
        return super.variant;
    }
    set variant(value) {
        super.variant = value;
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
                'avonni-button__avatar_small':
                    this.iconSize === 'small' && this.src,
                'avonni-button__avatar_medium':
                    this.iconSize === 'medium' && this.src,
                'avonni-button__avatar_large':
                    this.iconSize === 'large' && this.src
            });
    }

    /**
     * Computed media class styling.
     *
     * @type {string}
     */
    get computedMediaClass() {
        return classSet('').add({
            'slds-order_0': this.iconPosition === 'left',
            'slds-order_2': this.iconPosition === 'right',
            'slds-m-right_x-small': this.iconPosition === 'left' && this.src,
            'slds-m-left_x-small': this.iconPosition === 'right' && this.src
        });
    }

    /**
     * Display icon only if iconName is set and src is not set.
     *
     * @type {boolean}
     */
    get showIcon() {
        return this.iconName && !this.src;
    }

    /**
     * Display avatar or icon if they are set.
     *
     * @type {boolean}
     */
    get showMedia() {
        return this.iconName || this.src;
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
    }

    /**
     * Focus handler.
     */
    handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
