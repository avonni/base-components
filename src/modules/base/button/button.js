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

    /**
     * Once we are connected, we fire a register event so the button-group (or other) component can register
     * the buttons.
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
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

    get computedMediaClass() {
        return classSet('').add({
            'slds-order_0': this.iconPosition === 'left',
            'slds-order_2': this.iconPosition === 'right',
            'slds-m-right_x-small': this.iconPosition === 'left' && this.src,
            'slds-m-left_x-small': this.iconPosition === 'right' && this.src
        });
    }

    get displayIcon() {
        return this.iconName && !this.src;
    }

    get displayMedia() {
        return this.iconName || this.src;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Simulates a mouse click on the button.
     */
    @api
    click() {
        if (this._connected) {
            this.button.click();
        }
    }

    /**
     * Sets focus on the button.
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

    handleButtonBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }

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

    handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
