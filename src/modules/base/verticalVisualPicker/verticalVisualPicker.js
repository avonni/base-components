/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { LightningElement, api } from 'lwc';
import { classSet, generateUUID } from 'c/utils';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { InteractingState, FieldConstraintApi } from 'c/inputUtils';

const ITEM_SIZES = {
    valid: ['small', 'medium', 'large', 'responsive'],
    default: 'medium'
};

const ITEM_TYPES = { valid: ['radio', 'checkbox'], default: 'radio' };

const ITEM_VARIANTS = {
    valid: ['coverable', 'non-coverable'],
    default: 'non-coverable'
};

const DEFAULT_DISABLED = false;
const DEFAULT_HIDE_CHECK_MARK = false;
const DEFAULT_REQUIRED = false;

/**
 * @class
 * @descriptor avonni-vertical-visual-picker
 * @storyId example-verticalvisualpicker--base
 * @public
 */
export default class VerticalVisualPicker extends LightningElement {
    /**
     * Array of item objects.
     *
     * @type {object[]}
     * @public
     */
    @api items = [];

    /**
     * Text label to title the visual picker.
     *
     * @type {string}
     * @public
     */
    @api label;

    /**
     * Optional message to be displayed when no checkbox is selected and the required attribute is set.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;

    /**
     * The name of the visual picker.
     *
     * @type {string}
     * @public
     * @required
     */
    @api name = generateUUID();

    _disabled = DEFAULT_DISABLED;
    _hideCheckMark = DEFAULT_HIDE_CHECK_MARK;
    _required = DEFAULT_REQUIRED;
    _size = ITEM_SIZES.default;
    _type = ITEM_TYPES.default;
    _variant = ITEM_VARIANTS.default;
    _value = [];

    helpMessage;

    connectedCallback() {
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
    }

    renderedCallback() {
        const inputs = this.template.querySelectorAll(
            '[data-element-id="input"]'
        );

        if (inputs) {
            Array.from(inputs).forEach((item) => {
                if (this._value.indexOf(item.value) > -1) {
                    item.checked = true;
                }
            });
        }
    }

    /**
     * If present, the virtual visual picker is disabled.
     *
     * @type {boolean}
     * @public
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
     * If present, hide the check mark.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideCheckMark() {
        return this._hideCheckMark;
    }

    set hideCheckMark(value) {
        this._hideCheckMark = normalizeBoolean(value);
    }

    /**
     * If present, at least one item must be selected.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get required() {
        return this._required;
    }

    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * The size of the items. Valid values include xx-small, x-small, small, medium and large.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: ITEM_SIZES.default,
            validValues: ITEM_SIZES.valid
        });
    }

    /**
     * Valid values include radio and checkbox.
     *
     * @type {string}
     * @public
     * @default radio
     */
    @api
    get type() {
        return this._type;
    }

    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: ITEM_TYPES.default,
            validValues: ITEM_TYPES.valid
        });
    }

    /**
     * Value of the selected item. For the checkbox type, the value is an array (Ex: [value1, value2]
     *
     * @type {(string|string[])}
     * @public
     */
    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value instanceof Array ? value : [value];
    }

    /**
     * Changes the appearance of the vertical visual picker. Valid values include coverable and non-coverable.
     *
     * @type {string}
     * @public
     * @default non-coverable
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: ITEM_VARIANTS.default,
            validValues: ITEM_VARIANTS.valid
        });
    }

    /**
     * Verify if variant is coverable.
     *
     * @type {string}
     */
    get isCoverable() {
        return this._variant === 'coverable';
    }

    get listItems() {
        return this.items.map((item, index) => {
            let {
                title,
                description,
                disabled,
                iconAlternativeText,
                iconName,
                iconPosition,
                iconSize,
                imgAlternativeText,
                imgPosition,
                imgSrc,
                tags,
                value
            } = item;
            iconSize = iconSize || 'medium';
            iconPosition = iconPosition || 'left';
            imgPosition = imgPosition || 'left';
            const key = `vertical-visual-picker-key-${index}`;
            const iconIsLeft = iconPosition === 'left' && iconName;
            const iconIsRight = iconPosition === 'right' && iconName;
            const imgIsLeft = imgPosition === 'left' && imgSrc;
            const imgIsRight = imgPosition === 'right' && imgSrc;
            const bodyClass = classSet('slds-p-around_small').add({
                'slds-border_left': iconIsLeft || imgIsLeft,
                'slds-border_right': iconIsRight || imgIsRight
            });
            if (this.disabled) {
                disabled = true;
            }
            return {
                key,
                title,
                description,
                disabled,
                iconAlternativeText,
                iconName,
                iconPosition,
                iconSize,
                imgAlternativeText,
                imgPosition,
                imgSrc,
                tags,
                value,
                iconIsLeft,
                iconIsRight,
                imgIsLeft,
                imgIsRight,
                bodyClass
            };
        });
    }

    /**
     * Compute visual picker type class styling based on selected attributes.
     *
     * @type {string}
     */
    get verticalVisualPickerClass() {
        return classSet('slds-visual-picker slds-visual-picker_vertical')
            .add(`avonni-vertical-visual-picker__item_size-${this._size}`)
            .toString();
    }

    /**
     * Compute visual picker type class styling based on selected attributes.
     *
     * @type {string}
     */
    get verticalVisualPickerTypeClass() {
        return classSet(
            'slds-visual-picker__figure avonni-vertical-visual-picker__figure slds-align_absolute-left'
        )
            .add(`avonni-vertical-visual-picker__item_size-${this._size}`)
            .add({
                'slds-visual-picker__text': this._variant === 'non-coverable',
                'slds-visual-picker__icon': this._variant === 'coverable',
                'avonni-hide-check-mark': this._hideCheckMark
            })
            .toString();
    }

    /**
     * Compute NOT selected class styling.
     *
     * @type {string}
     */
    get notSelectedClass() {
        return classSet('avonni-vertical-visual-picker__content_container')
            .add({
                'slds-is-not-selected':
                    this._variant === 'coverable' && !this._hideCheckMark,
                'avonni-is-not-selected':
                    this._variant === 'coverable' && this._hideCheckMark
            })
            .toString();
    }

    /**
     * Compute selected class styling.
     *
     * @type {string}
     */
    get selectedClass() {
        return this._variant === 'coverable' ? 'slds-is-selected' : '';
    }

    /**
     * Represents the validity states that an element can be in, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api
    get validity() {
        return this._constraint.validity;
    }

    /**
     * Removes keyboard focus from the input element.
     *
     * @public
     */
    @api
    blur() {
        this.template.querySelector('[data-element-id="input"]').blur();
    }

    /**
     * Checks if the input is valid.
     *
     * @returns {boolean} Indicates whether the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    /**
     * Sets focus on the input element.
     *
     * @public
     */
    @api
    focus() {
        this.template.querySelector('[data-element-id="input"]').focus();
    }

    /**
     * Displays the error messages and returns false if the input is invalid.
     * If the input is valid, reportValidity() clears displayed error messages and returns true.
     *
     * @returns {boolean} - The validity status of the input fields.
     * @public
     */
    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this.helpMessage = message;
        });
    }

    /**
     * Sets a custom error message to be displayed when a form is submitted.
     *
     * @param {string} message - The string that describes the error.
     * If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    /**
     * Displays error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when checkValidity() is called.
     *
     * @public
     */
    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    /**
     * Validation with constraint Api.
     *
     * @type {object}
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled && this.required && this.value.length === 0
            });
        }
        return this._constraintApi;
    }

    /**
     * Dispatches the blur event.
     */
    handleBlur() {
        this.interactingState.leave();

        /**
         * The event fired when the focus is removed from the input toggle.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Dispatches the focus event.
     */
    handleFocus() {
        this.interactingState.enter();

        /**
         * The event fired when you focus the input toggle.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * Change event handler.
     *
     * @param {Event} event
     */
    handleChange(event) {
        event.stopPropagation();

        const inputs = this.template.querySelectorAll(
            '[data-element-id="input"]'
        );
        const value = Array.from(inputs)
            .filter((input) => input.checked)
            .map((input) => input.value);

        this._value = value;

        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string[]} value The visual picker value.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value
                }
            })
        );
    }
}
