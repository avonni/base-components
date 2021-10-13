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
import {
    colorType,
    generateColors,
    observePosition,
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';
import { FieldConstraintApi, InteractingState } from 'c/inputUtils';

import { classSet } from 'c/utils';
import { generateUUID } from 'c/utils';

const validVariants = {
    valid: ['standard', 'label-inline', 'label-hidden', 'label-stacked'],
    default: 'standard'
};

const LABEL_TYPES = {
    valid: ['base', 'custom', 'predefined'],
    default: 'base'
};

const MENU_VARIANTS = {
    valid: [
        'bare',
        'container',
        'border',
        'border-filled',
        'bare-inverse',
        'border-inverse'
    ],
    default: 'border'
};

const MENU_ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'x-small'
};

const MENU_ALIGNMENTS = {
    valid: [
        'left',
        'center',
        'right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
    ],
    default: 'left'
};

const DEFAULT_COLORS = [
    '#e3abec',
    '#c2dbf6',
    '#9fd6ff',
    '#9de7da',
    '#9df0bf',
    '#fff099',
    '#fed49a',
    '#d073df',
    '#86b9f3',
    '#5ebbff',
    '#44d8be',
    '#3be281',
    '#ffe654',
    '#ffb758',
    '#bd35bd',
    '#5778c1',
    '#5ebbff',
    '#00aea9',
    '#3bba4c',
    '#f4bc25',
    '#f99120',
    '#580d8c',
    '#001870',
    '#0a2399',
    '#097476',
    '#096a50',
    '#b67d11',
    '#b85d0d'
];

/**
 * @class
 * @descriptor avonni-color-picker
 * @storyId example-color-picker--standard
 * @public
 */
export default class ColorPicker extends LightningElement {
    /**
     * Specifies a shortcut key to activate or focus an element.
     *
     * @public
     * @type {string}
     */
    @api accessKey;
    /**
     * Help text detailing the purpose and function of the input. This attribute isn't supported for file, radio, toggle, and checkbox-button types.
     *
     * @public
     * @type {string}
     */
    @api fieldLevelHelp;
    /**
     * Text label for the input.
     *
     * @public
     * @type {string}
     * @required
     */
    @api label;
    /**
     * If no icon-name specified, display default dropdown icon and color box.
     *
     * @public
     * @type {string}
     */
    @api menuIconName;
    /**
     * Optional text to be shown on the button.
     *
     * @public
     * @type {string}
     */
    @api menuLabel;
    /**
     * Error message to be displayed when a bad input is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenBadInput;
    /**
     * Error message to be displayed when the value is missing and input is required.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;

    _value;
    _name;
    _variant = validVariants.default;
    _type = LABEL_TYPES.default;
    _menuVariant = MENU_VARIANTS.default;
    _menuIconSize = MENU_ICON_SIZES.default;
    _menuAlignment = MENU_ALIGNMENTS.default;
    _disabled = false;
    _isLoading = false;
    _readOnly = false;
    _required = false;
    _hideColorInput = false;
    _menuNubbin = false;
    _colors = DEFAULT_COLORS;
    _opacity = false;

    _dropdownVisible = false;
    _dropdownOpened = false;
    _inputValue;
    init = false;
    isDefault = true;
    newValue;

    helpMessage;
    currentLabel;
    currentToken;

    connectedCallback() {
        this.addEventListener('colordblclick', () => {
            this.handlerDone();
        });

        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());

        this._connected = true;
    }

    renderedCallback() {
        if (!this.init) {
            this.initSwatchColor();
            this.init = true;
        }
    }

    /**
     * Specifies the name of an input element.
     *
     * @public
     * @type {string}
     */
    @api
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value ? value : this.uniqueKey;
    }

    /**
     * Specifies the value of an input element.
     *
     * @public
     * @type {string}
     */
    @api
    get value() {
        return this._value;
    }

    set value(value) {
        if (!value) {
            this._value = '';
            this._inputValue = '';
            this.currentLabel = '';
            this.currentToken = '';
        } else {
            this._value = value;
            this.inputValue = value;
        }
        this.initSwatchColor();
    }

    /**
     * The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.
     *
     * @public
     * @type {string}
     * @default standard
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: validVariants.default,
            validValues: validVariants.valid
        });
    }

    /**
     * Values include base, custom, predefined.
     *
     * @public
     * @type {string}
     * @default base
     */
    @api
    get type() {
        return this._type;
    }

    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: LABEL_TYPES.default,
            validValues: LABEL_TYPES.valid
        });
    }

    /**
     * The variant changes the look of the button. Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse.
     *
     * @public
     * @type {string}
     * @default border
     */
    @api
    get menuVariant() {
        return this._menuVariant;
    }

    set menuVariant(variant) {
        this._menuVariant = normalizeString(variant, {
            fallbackValue: MENU_VARIANTS.default,
            validValues: MENU_VARIANTS.valid
        });
    }

    /**
     * The size of the icon. Options include xx-small, x-small, small, medium, or large.
     *
     * @public
     * @type {string}
     * @default x-small
     */
    @api
    get menuIconSize() {
        return this._menuIconSize;
    }

    set menuIconSize(size) {
        this._menuIconSize = normalizeString(size, {
            fallbackValue: MENU_ICON_SIZES.default,
            validValues: MENU_ICON_SIZES.valid
        });
    }

    /**
     * Determines the alignment of the menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space.
     *
     * @public
     * @type {string}
     * @default left
     */
    @api
    get menuAlignment() {
        return this._menuAlignment;
    }

    set menuAlignment(value) {
        this._menuAlignment = normalizeString(value, {
            fallbackValue: MENU_ALIGNMENTS.default,
            validValues: MENU_ALIGNMENTS.valid
        });
    }

    /**
     * If present, the input field is disabled and users cannot interact with it.
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
     * If present, a spinner is displayed to indicate that data is loading.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * If present, the input field is read-only and cannot be edited by users.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * If present, the input field must be filled out before the form is submitted.
     *
     * @public
     * @type {boolean}
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
     * Color values displayed in the default palette.
     *
     * @public
     * @type {string[]}
     * @default [“#e3abec”, “#c2dbf6”, ”#9fd6ff”, ”#9de7da”, ”#9df0bf”, ”#fff099”, ”#fed49a”, ”#d073df”, ”#86b9f3”, ”#5ebbff”, ”#44d8be”, ”#3be281”, ”#ffe654”, ”#ffb758”, ”#bd35bd”, ”#5778c1”, ”#5ebbff”, ”#00aea9”, ”#3bba4c”, ”#f4bc25”, ”#f99120”, ”#580d8c”, ”#001870”, ”#0a2399”, ”#097476”, ”#096a50”, ”#b67d11”, ”#b85d0d”]
     */
    @api
    get colors() {
        return this._colors;
    }

    set colors(value) {
        const colors = normalizeArray(value);
        this._colors = colors.length > 0 ? colors : DEFAULT_COLORS;
    }

    /**
     * If true, hide the input color value.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideColorInput() {
        return this._hideColorInput;
    }

    set hideColorInput(value) {
        this._hideColorInput = normalizeBoolean(value);
    }

    /**
     * If present, a nubbin is present on the menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get menuNubbin() {
        return this._menuNubbin;
    }

    set menuNubbin(value) {
        this._menuNubbin = normalizeBoolean(value);
    }

    /**
     * Defines whether the alpha slider will be displayed.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get opacity() {
        return this._opacity;
    }

    set opacity(value) {
        this._opacity = normalizeBoolean(value);
    }

    get uniqueKey() {
        return generateUUID();
    }

    /**
     * Verify if type is Base.
     *
     * @returns {boolean}
     */
    get isBase() {
        return this.type === 'base';
    }

    /**
     * Verify if type is Custom.
     *
     * @returns {boolean}
     */
    get isCustom() {
        return this.type === 'custom';
    }

    /**
     * Verify if type is Predefined.
     *
     * @returns {boolean}
     */
    get isPredefined() {
        return this.type === 'predefined';
    }

    /**
     * Get the icon class.
     *
     * @returns menuLabel
     */
    get iconClass() {
        return this.menuLabel ? 'slds-m-left_xx-small' : '';
    }

    /**
     * Show label.
     *
     * @returns {boolean}
     */
    get showLabel() {
        return this.label || this.required;
    }

    /**
     * Disabled input.
     *
     * @returns {boolean}
     */
    get disabledInput() {
        return this.disabled || this.readOnly;
    }

    /*
     * Whether there a label next to each default color.
     */
    get isLabelDisplayed() {
        return !!this.currentLabel;
    }

    /**
     * Retrieve the input value.
     *
     * @type {string}
     */
    get inputValue() {
        return this.currentLabel ? this.currentLabel : this._inputValue;
    }

    set inputValue(val) {
        this._inputValue = val;
    }

    /**
     * Whether the color input field contains a value.
     *
     * @type {string}
     */
    get isInputFilled() {
        let input = this.template.querySelector('[data-element-id="input"]');
        if (input == null) {
            return this.inputValue;
        }
        return !!this.inputValue;
    }

    get hasBadInput() {
        return !(
            colorType(this.inputValue) === 'hex' ||
            (colorType(this.inputValue) === 'hexa' && this.opacity)
        );
    }

    get elementSwatch() {
        return this.template.querySelector('[data-element-id="swatch"]');
    }

    get colorGradient() {
        return this.template.querySelector('[data-name="colorGradient"]');
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
     * Gets FieldConstraintApi.
     *
     * @type {object}
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled && this.required && !this.value,
                badInput: () => this.inputValue && this.hasBadInput
            });
        }
        return this._constraintApi;
    }

    /**
     * Indicates whether the element meets all constraint validations.
     *
     * @returns {boolean} the valid attribute value on the ValidityState object.
     * @public
     */
    @api
    checkValidity() {
        return this._constraint.checkValidity();
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
     * Sets focus on the input element.
     *
     * @public
     */
    @api
    focus() {
        if (this._connected) {
            this.focusOnButton();
        }
    }

    /**
     * Change event dispatcher.
     *
     * @param {object} colors
     */
    dispatchChange(colors) {
        if (!this.disabled && !this.readOnly) {
            /**
             * The event fired when the color value changed.
             *
             * @event
             * @public
             * @name change
             * @param {string} hex Color in hexadecimal format.
             * @param {string} hexa Color in hexadecimal format with alpha.
             * @param {string} rgb Color in rgb format.
             * @param {string} rgba Color in rgba format.
             * @param {string} alpha Alpha value of the color.
             */
            this.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        hex: colors.hex,
                        hexa: colors.hexa,
                        rgb: colors.rgb,
                        rgba: colors.rgba,
                        alpha: colors.alpha,
                        token: this.currentToken
                    },
                    bubbles: true,
                    cancelable: true,
                    composed: false
                })
            );
        }
    }

    /**
     * Dispatches an event when the input is cleared.
     *
     */
    dispatchClear() {
        this.dispatchChange({
            hex: undefined,
            hexa: undefined,
            rgb: undefined,
            rgba: undefined,
            alpha: undefined,
            token: undefined
        });
    }

    /**
     * Initialize swatch colors.
     */
    initSwatchColor() {
        if (this.elementSwatch) {
            this.elementSwatch.style.background = this.value;
        }
    }

    /**
     * Button focus handler.
     */
    focusOnButton() {
        this.template.querySelector('[data-element-id="button"]').focus();
    }

    /**
     * Compute Aria Expanded for dropdown.
     *
     * @type {string}
     * @return {String} from dropdownVisible
     */
    get computedAriaExpanded() {
        return String(this._dropdownVisible);
    }

    /**
     * Computed container class styling.
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet()
            .add({
                'slds-form-element_stacked': this.variant === 'label-stacked',
                'avonni-label-inline': this.variant === 'label-inline'
            })
            .toString();
    }

    /**
     * Computed Legend class styling.
     *
     * @type {string}
     */
    get computedLegendClass() {
        return classSet('slds-form-element__label slds-no-flex')
            .add({
                'slds-assistive-text': this.variant === 'label-hidden'
            })
            .toString();
    }

    /**
     * Computed Button class styling.
     *
     * @type {string}
     */
    get computedButtonClass() {
        const isDropdownIcon = !this.computedShowDownIcon;
        const isBare =
            this.menuVariant === 'bare' || this.menuVariant === 'bare-inverse';

        const classes = classSet('slds-button');

        const useMoreContainer =
            this.menuVariant === 'container' ||
            this.menuVariant === 'bare-inverse' ||
            this.menuVariant === 'border-inverse';

        if (this.menuLabel) {
            classes.add({
                'slds-button_neutral':
                    this.menuVariant === 'border' && isDropdownIcon,
                'slds-button_inverse': this.menuVariant === 'border-inverse'
            });
        } else {
            classes.add({
                'slds-button_icon': !isDropdownIcon,
                'slds-button_icon-bare': isBare,
                'slds-button_icon-more': !useMoreContainer && !isDropdownIcon,
                'slds-button_icon-container-more':
                    useMoreContainer && !isDropdownIcon,
                'slds-button_icon-container':
                    this.menuVariant === 'container' && isDropdownIcon,
                'slds-button_icon-border':
                    this.menuVariant === 'border' && isDropdownIcon,
                'slds-button_icon-border-filled':
                    this.menuVariant === 'border-filled',
                'slds-button_icon-border-inverse':
                    this.menuVariant === 'border-inverse',
                'slds-button_icon-inverse': this.menuVariant === 'bare-inverse',
                'slds-button_icon-xx-small':
                    this.menuIconSize === 'xx-small' &&
                    !isBare &&
                    this.menuLabel,
                'slds-button_icon-x-small':
                    this.menuIconSize === 'x-small' &&
                    !isBare &&
                    this.menuLabel,
                'slds-button_icon-small':
                    this.menuIconSize === 'small' && !isBare && this.menuLabel,
                'slds-icon_large':
                    this.menuIconSize === 'large' && this.menuIconName
            });
        }

        return classes.toString();
    }

    /**
     * Compute show down Icon.
     *
     * @type {boolean}
     */
    get computedShowDownIcon() {
        return !(
            this.menuIconName === 'utility:down' ||
            this.menuIconName === 'utility:chevrondown'
        );
    }

    /**
     * Computed dropdown menu classs styling.
     *
     * @type {string}
     */
    get computedDropdownClass() {
        return classSet('slds-color-picker__selector slds-dropdown')
            .add({
                'slds-dropdown_left':
                    this.menuAlignment === 'left' || this.isAutoAlignment(),
                'slds-dropdown_center': this.menuAlignment === 'center',
                'slds-dropdown_right': this.menuAlignment === 'right',
                'slds-dropdown_bottom': this.menuAlignment === 'bottom-center',
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                    this.menuAlignment === 'bottom-right',
                'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                    this.menuAlignment === 'bottom-left',
                'slds-nubbin_top-left':
                    this.menuNubbin && this.menuAlignment === 'left',
                'slds-nubbin_top-right':
                    this.menuNubbin && this.menuAlignment === 'right',
                'slds-nubbin_top':
                    this.menuNubbin && this.menuAlignment === 'center',
                'slds-nubbin_bottom-left':
                    this.menuNubbin && this.menuAlignment === 'bottom-left',
                'slds-nubbin_bottom-right':
                    this.menuNubbin && this.menuAlignment === 'bottom-right',
                'slds-nubbin_bottom':
                    this.menuNubbin && this.menuAlignment === 'bottom-center',
                'slds-p-vertical_large': this.isLoading
            })
            .toString();
    }

    /**
     * Check if auto aligned.
     *
     * @returns {boolean}
     */
    isAutoAlignment() {
        return this.menuAlignment.startsWith('auto');
    }

    clearInput() {
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        this.value = undefined;
        this.inputValue = '';
        this.currentLabel = undefined;
        this.currentToken = undefined;
        this.interactingState.enter();
        this.interactingState.leave();

        this.dispatchClear();
    }

    /**
     * Change Handler.
     *
     * @param {Event} event
     */
    handlerChange(event) {
        if (event.detail) {
            this.newValue =
                this.opacity && Number(event.detail.alpha) < 1
                    ? event.detail.hexa
                    : event.detail.hex;
            this.currentLabel = event.detail.label;
            this.currentToken = event.detail.token;
        }
    }

    /**
     * Handle new value change and update ui.
     */
    handlerDone() {
        if (!this.readOnly && this.newValue) {
            // eslint-disable-next-line @lwc/lwc/no-api-reassignments
            this.value = this.newValue;
            this.newValue = '';

            if (!this.menuIconName) {
                this.elementSwatch.style.background = this.value;
            }
            if (this.colorGradient) {
                this.colorGradient.renderValue(this.value);
            }

            this.dispatchChange(generateColors(this.value));
        }

        this.handleBlur();
    }

    /**
     * Handle new value canceled.
     */
    handlerCancel() {
        this.newValue = '';

        if (this.colorGradient) {
            this.colorGradient.renderValue(this.value);
        }

        this.handleBlur();
    }

    /**
     * Button click handler.
     */
    handleButtonClick() {
        this.allowBlur();
        this.toggleMenuVisibility();
        this.focus();
    }

    /**
     * Handle mouse down on Button.
     *
     * @param {Event} event
     */
    handleButtonMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    /**
     * Dropdown menu mouse down handler.
     *
     * @param {Event} event
     */
    handleDropdownMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    /**
     * Dropdown menu mouse up handler.
     */
    handleDropdownMouseUp() {
        this.allowBlur();
    }

    /**
     * Dropdown menu mouse leave handler.
     */
    handleDropdownMouseLeave() {
        if (!this._menuHasFocus) {
            this.close();
        }
    }

    /**
     * Tab click event handler.
     *
     * @param {Event} event
     */
    handlerTabClick(event) {
        event.preventDefault();

        [...this.template.querySelectorAll('a')].forEach((tab) => {
            if (tab.id === event.target.id) {
                tab.parentElement.classList.add('slds-is-active');
                this.isDefault = tab.parentElement.title === 'Default';
            } else {
                tab.parentElement.classList.remove('slds-is-active');
            }
        });
    }

    /**
     * Sets blur.
     */
    allowBlur() {
        this._cancelBlur = false;
    }

    /**
     * Cancels blur.
     */
    cancelBlur() {
        this._cancelBlur = true;
    }

    /**
     * Blur handler.
     */
    handleBlur() {
        if (this._cancelBlur) {
            return;
        }

        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Private focus handler.
     *
     * @param {Event} event
     */
    handlePrivateFocus(event) {
        event.stopPropagation();

        this.allowBlur();
        this._menuHasFocus = true;
    }

    handleInputFocus() {
        this.interactingState.enter();
    }

    handleInputBlur() {
        this.interactingState.leave();
    }

    /**
     * Private blur handler.
     *
     * @param {Event} event
     */
    handlePrivateBlur(event) {
        event.stopPropagation();

        this.handleBlur();
        this._menuHasFocus = false;
    }

    /**
     * Input color event handler.
     *
     * @param {Event} event
     */
    handleInputColor(event) {
        let color = event.target.value;
        this.inputValue = color;
        if (
            colorType(color) === 'hex' ||
            (colorType(color) === 'hexa' && this.opacity)
        ) {
            if (!this.menuIconName) {
                this.elementSwatch.style.background = color;
            }
            // eslint-disable-next-line @lwc/lwc/no-api-reassignments
            this.value = color;

            if (this.colorGradient) {
                this.colorGradient.renderValue(color);
            }
            this.dispatchChange(generateColors(color));
        }
        event.stopPropagation();
    }

    /**
     * Dropdown menu visibility toggle.
     */
    toggleMenuVisibility() {
        if (!this.disabled) {
            this._dropdownVisible = !this._dropdownVisible;

            if (!this._dropdownOpened && this._dropdownVisible) {
                this._dropdownOpened = true;
            }

            if (this._dropdownVisible) {
                this._boundingRect = this.getBoundingClientRect();
                this.pollBoundingRect();
            }

            this.template
                .querySelector('.slds-dropdown-trigger')
                .classList.toggle('slds-is-open');
        }
    }

    /**
     * Close dropdown menu.
     */
    close() {
        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Poll bounding rect of the dropdown menu.
     */
    pollBoundingRect() {
        if (this.isAutoAlignment() && this._dropdownVisible) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(() => {
                if (this._connected) {
                    observePosition(this, 300, this._boundingRect, () => {
                        this.close();
                    });

                    this.pollBoundingRect();
                }
            }, 250);
        }
    }
}
