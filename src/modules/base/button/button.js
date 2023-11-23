import { api } from 'lwc';
import { normalizeBoolean } from 'c/utilsPrivate';
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

    /**
     * Computed button class styling.
     *
     * @type {string}
     */
    get computedButtonClass() {
        return classSet('slds-button')
            .add(`avonni-button_${this.computedVariant}`)
            .add({
                'avonni-button_label': this.label,
                'slds-button_neutral': [
                    'border',
                    'border-filled',
                    'neutral'
                ].includes(this.computedVariant),
                'slds-button_inverse': [
                    'inverse',
                    'bare-inverse',
                    'border-inverse'
                ].includes(this.computedVariant),
                'slds-button_brand': this.computedVariant === 'brand',
                'slds-button_outline-brand':
                    this.computedVariant === 'brand-outline',
                'slds-button_destructive':
                    this.computedVariant === 'destructive',
                'slds-button_text-destructive':
                    this.computedVariant === 'destructive-text',
                'slds-button_success': this.computedVariant === 'success',
                'slds-button_stretch': this.stretch
            });
    }
}
