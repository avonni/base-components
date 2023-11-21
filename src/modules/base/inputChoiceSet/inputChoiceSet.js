import { LightningElement, api } from 'lwc';
import {
    deepCopy,
    normalizeBoolean,
    normalizeObject,
    normalizeString,
    normalizeArray,
    synchronizeAttrs,
    getRealDOMId,
    classListMutation
} from 'c/utilsPrivate';
import {
    FieldConstraintApi,
    InteractingState,
    normalizeVariant,
    VARIANT
} from 'c/inputUtils';
import { classSet } from 'c/utils';
import InputChoiceOption from './inputChoiceOption';
import { AvonniResizeObserver } from 'c/resizeObserver';

const i18n = {
    required: 'required'
};

const CHECK_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};
const COLUMNS = { valid: [1, 2, 3, 4, 6, 12], default: 1 };
const DEFAULT_COLUMNS = {
    default: 1,
    small: 12,
    medium: 6,
    large: 4
};
const INPUT_CHOICE_ORIENTATIONS = {
    valid: ['vertical', 'horizontal'],
    default: 'vertical'
};
const INPUT_CHOICE_TYPES = {
    valid: ['default', 'button', 'toggle'],
    default: 'default'
};
const ORIENTATION_ATTRIBUTES = {
    vertical: [],
    horizontal: [
        'cols',
        'smallContainerCols',
        'mediumContainerCols',
        'largeContainerCols',
        'multipleRows'
    ]
};
const TYPE_ATTRIBUTES = {
    default: [],
    button: ['checkmarkPosition', 'displayAsRow', 'showCheckmark', 'stretch'],
    toggle: [
        'messageToggleActive',
        'messageToggleInactive',
        'showCheckmark',
        'size',
        'stretch'
    ]
};

/**
 * @class
 * @descriptor avonni-input-choice-set
 * @storyId example-input-choice-set--radio-buttons
 * @public
 */
export default class InputChoiceSet extends LightningElement {
    static delegatesFocus = true;
    /**
     * Help text detailing the purpose and function of the input.
     *
     * @type {string}
     * @public
     */
    @api fieldLevelHelp;
    /**
     * Text label for the input.
     *
     * @type {string}
     * @public
     * @required
     */
    @api label;
    /**
     * Optional message to be displayed when no option is selected and the required attribute is set.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;
    /**
     * Specifies the name of an input element.
     *
     * @type {string}
     * @public
     * @required
     */
    @api name;
    /**
     * Array of option objects.
     *
     * @type {object[]}
     * @public
     * @required
     */
    @api options;

    _checkPosition = CHECK_POSITIONS.default;
    _disabled = false;
    _isLoading = false;
    _isMultiSelect = false;
    _orientation = INPUT_CHOICE_ORIENTATIONS.default;
    _orientationAttributes = {};
    _required = false;
    _type = INPUT_CHOICE_TYPES.default;
    _typeAttributes = {};
    _value = [];
    _variant;

    computedOrientationAttributes = {};
    computedTypeAttributes = {};
    helpMessage;
    _connected = false;
    _containerWidth;
    _rendered = false;
    _resizeObserver;

    constructor() {
        super();
        this.itemIndex = 0;
    }

    /**
     * Synchronize all inputs Aria help element ID.
     */
    synchronizeA11y() {
        const inputs = this.template.querySelectorAll(
            '[data-element-id^="input"]'
        );
        Array.prototype.slice.call(inputs).forEach((input) => {
            synchronizeAttrs(input, {
                'aria-describedby': this.computedUniqueHelpElementId
            });
        });
    }

    connectedCallback() {
        if (!Object.keys(this.computedOrientationAttributes).length) {
            this._initOrientationAttributes();
        }

        if (this.isMultiSelect && this.value) {
            // Make sure the value is an array when the input is multiselect
            this._value =
                typeof this.value === 'string'
                    ? [this.value]
                    : normalizeArray(this.value);
        }

        this.classList.add('slds-form-element');
        this._updateClassList();
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this._connected = true;
    }

    renderedCallback() {
        this.synchronizeA11y();
        if (!this._resizeObserver) {
            this._initResizeObserver();
        }
        if (!this._rendered) {
            this._setWidth();
        }
        this._rendered = true;
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Describes the position of the toggle, radio or checkbox. Options include left and right and is not available for type button.
     *
     * @type {string}
     * @default left
     * @public
     */
    @api
    get checkPosition() {
        return this._checkPosition;
    }
    set checkPosition(value) {
        this._checkPosition = normalizeString(value, {
            fallbackValue: CHECK_POSITIONS.default,
            validValues: CHECK_POSITIONS.valid
        });
        this._setWidth();
    }

    /**
     * If present, the input field is disabled and users cannot interact with it.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get disabled() {
        return this._disabled || false;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * If present, the input is loading and a spinner is visible where the options should be.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * If present, multiple choices can be selected.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isMultiSelect() {
        return this._isMultiSelect || false;
    }
    set isMultiSelect(value) {
        this._isMultiSelect = normalizeBoolean(value);
        this._setWidth();
    }

    /**
     * Orientation of the input options. Valid values include vertical and horizontal.
     *
     * @type {string}
     * @default vertical
     * @public
     */
    @api
    get orientation() {
        return this._orientation;
    }
    set orientation(orientation) {
        this._orientation = normalizeString(orientation, {
            fallbackValue: INPUT_CHOICE_ORIENTATIONS.default,
            validValues: INPUT_CHOICE_ORIENTATIONS.valid
        });
        this._setWidth();
    }

    /**
     * Field attributes: cols, smallContainerCols, mediumContainerCols, largeContainerCols and multipleRows.
     *
     * @type {object}
     * @public
     */
    @api
    get orientationAttributes() {
        return this._orientationAttributes;
    }
    set orientationAttributes(value) {
        this._orientationAttributes = normalizeObject(value);
        this._normalizeOrientationAttributes();

        if (this._connected) {
            this._initOrientationAttributes();
            this._setWidth();
        }
    }

    /**
     * If present, the input field is read-only and cannot be edited by users.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get readOnly() {
        return this._readOnly || false;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * If present, at least one option must be selected.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get required() {
        return this._required || false;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * Deprecated. If present, the options stretch to full width.
     *
     * @type {boolean}
     * @default false
     * @deprecated
     */
    @api
    get stretch() {
        return this._stretch || false;
    }
    set stretch(value) {
        this._stretch = normalizeBoolean(value);

        console.warn(
            'The "stretch" attribute is deprecated. Add a "stretch" key to the type attributes instead.'
        );
        this._supportDeprecatedAttributes();
    }

    /**
     * Type of the input. Valid values include default, button and toggle.
     *
     * @type {string}
     * @default default
     * @public
     */
    @api
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: INPUT_CHOICE_TYPES.default,
            validValues: INPUT_CHOICE_TYPES.valid
        });
    }

    /**
     * Attributes specific to the type (see **Types and Type Attributes**).
     *
     * @type {object}
     * @public
     */
    @api
    get typeAttributes() {
        return this._typeAttributes;
    }
    set typeAttributes(value) {
        this._typeAttributes = normalizeObject(value);
        this._normalizeTypeAttributes();
    }

    /**
     * The list of selected options. Each array entry contains the value of a selected option. The value of each option is set in the options attribute.
     *
     * @type {(string|string[])}
     * @public
     * @required
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;

        if (value && this.isConnected && this.isMultiSelect) {
            this._value =
                typeof value === 'string' ? [value] : normalizeArray(value);
        }
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
     * The variant changes the appearance of the input label.
     * Accepted variants include standard, label-hidden, label-inline, and label-stacked.
     * Use label-hidden to hide the label but make it available to assistive technology.
     * Use label-inline to horizontally align the label and checkbox group.
     * Use label-stacked to place the label above the checkbox group.
     *
     * @type {string}
     * @default standard
     * @public
     */
    @api
    get variant() {
        return this._variant || VARIANT.STANDARD;
    }
    set variant(value) {
        this._variant = normalizeVariant(value);
        this._updateClassList();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Returns true, if type is button.
     *
     * @type {boolean}
     */
    get buttonVariant() {
        return this.type === 'button';
    }

    /**
     * Returns true, if type is default.
     *
     * @type {boolean}
     */
    get checkboxVariant() {
        return this.type === 'default';
    }

    /**
     * Returns true, if type is default, toggle or button displayAsRow.
     *
     * @type {boolean}
     */
    get hasLayoutItem() {
        return (
            this.type === 'default' ||
            this.type === 'toggle' ||
            (this.type === 'button' &&
                this.computedTypeAttributes?.displayAsRow)
        );
    }

    /**
     * Gets FieldConstraintApi for validation.
     *
     * @type {object}
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled &&
                    this.required &&
                    (!this.value || !this.value.length)
            });
        }
        return this._constraintApi;
    }

    /**
     * Computed Button Class styling.
     *
     * @type {string}
     */
    get computedButtonClass() {
        const { stretch, displayAsRow } = this.computedTypeAttributes;
        return classSet(`avonni-input-choice-set__${this.orientation}`).add({
            'slds-size_full':
                this.orientation === 'horizontal' && !this.buttonVariant,
            'slds-checkbox_button-group': this.buttonVariant && !displayAsRow,
            'avonni-input-choice-set__button_stretch': stretch
        });
    }

    /**
     * Computed Button Container Class styling.
     *
     * @type {string}
     */
    get computedButtonContainerClass() {
        const { displayAsRow, stretch } = this.computedTypeAttributes;
        return classSet('slds-button')
            .add({
                'slds-checkbox_button': !displayAsRow,
                'avonni-input-choice-set__button__row': displayAsRow,
                'avonni-input-choice-set__horizontal':
                    this.orientation === 'horizontal' &&
                    !displayAsRow &&
                    !stretch,
                'slds-grow': stretch,
                'slds-grid':
                    stretch && this.orientation === 'horizontal' && displayAsRow
            })
            .toString();
    }

    /**
     * Computed Check Container Class styling.
     *
     * @type {string}
     */
    get computedCheckContainerClass() {
        const { size } = this.computedTypeAttributes;
        return classSet('')
            .add({
                'slds-order_3': this.checkPosition === 'right',
                'slds-p-top_xx-small':
                    this.toggleVariant &&
                    (size === 'small' || size === 'x-small'),
                'slds-p-left_x-small':
                    this.toggleVariant &&
                    this.checkPosition === 'right' &&
                    this.orientation === 'vertical',
                'slds-p-right_x-small':
                    (this.toggleVariant &&
                        this.checkPosition === 'left' &&
                        this.orientation === 'vertical') ||
                    (this.toggleVariant && this.orientation === 'horizontal')
            })
            .toString();
    }

    /**
     * Computed Check Label Class styling.
     *
     * @type {string}
     */
    get computedCheckLabelClass() {
        return classSet('slds-grid')
            .add({
                'slds-grid_vertical-align-center': !this.toggleVariant,
                'avonni-input-choice-set__toggle_stretch':
                    this.toggleVariant &&
                    this.computedTypeAttributes.stretch &&
                    this.orientation === 'vertical'
            })
            .toString();
    }

    /**
     * Computed Checkmark Class styling.
     *
     * @type {string}
     */
    get computedCheckmarkClass() {
        const { checkmarkPosition } = this.computedTypeAttributes;
        return classSet('')
            .add({
                'slds-order_0 slds-p-left_x-small slds-align_absolute-center':
                    checkmarkPosition === 'left' || !checkmarkPosition,
                'slds-order_2 slds-p-right_x-small slds-align_absolute-center':
                    checkmarkPosition === 'right'
            })
            .toString();
    }

    /**
     * Returns slds-checkbox_faux if is-multi-select is true and slds-radio_faux if is-multi-select is false.
     *
     * @type {string}
     */
    get computedCheckboxShapeClass() {
        return this.isMultiSelect ? 'slds-checkbox_faux' : 'slds-radio_faux';
    }

    /**
     * Computed hide check attributes for c-input-toggle based on typeAttributes showCheckmark.
     *
     * @type {string}
     */
    get computedHideCheck() {
        return !this.computedTypeAttributes.showCheckmark;
    }

    /**
     * Computed Input Container Class styling.
     *
     * @type {string}
     */
    get computedInputContainerClass() {
        const checkboxClass = this.isMultiSelect
            ? `slds-checkbox avonni-input-choice-set__${this.orientation}`
            : `slds-radio avonni-input-choice-set__${this.orientation}`;
        const toggleClass = `slds-checkbox_toggle slds-grid slds-grid_vertical slds-grid_align-spread avonni-input-choice-set__${this.orientation}`;

        if (this.checkboxVariant) {
            return checkboxClass;
        } else if (this.buttonVariant) {
            return this.computedButtonContainerClass;
        }
        return toggleClass;
    }

    /**
     * Returns checkbox if is-multi-select is true or type is not default and radio if is-multi-select is false.
     *
     * @type {string}
     */
    get computedInputType() {
        return this.isMultiSelect || !this.checkboxVariant
            ? 'checkbox'
            : 'radio';
    }

    /**
     * Computed Label Class styling.
     *
     * @type {string}
     */
    get computedLabelClass() {
        let label = '';
        if (this.checkboxVariant && this.isMultiSelect) {
            label = 'slds-checkbox__label';
        } else if (this.checkboxVariant) {
            label = 'slds-radio__label';
        } else if (this.buttonVariant) {
            label = `slds-checkbox_button__label slds-align_absolute-center avonni-input-choice-set__${this.orientation}`;
        }

        if (!this.disabled) {
            label += ' avonni-input-choice-set__option-label';
        }
        return label;
    }

    /**
     * Computed Legend Class styling.
     *
     * @type {string}
     */
    get computedLegendClass() {
        return classSet('')
            .add({
                'slds-assistive-text': this.variant === VARIANT.LABEL_HIDDEN,
                'avonni-input-choice-set__display_flex':
                    this.variant !== VARIANT.LABEL_INLINE
            })
            .toString();
    }

    /**
     * Get element unique help ID.
     *
     * @type {string}
     */
    get computedUniqueHelpElementId() {
        const helpElement = this.template.querySelector('[data-helptext]');
        return getRealDOMId(helpElement);
    }

    /**
     * Localization.
     *
     * @type {i18n}
     */
    get i18n() {
        return i18n;
    }

    /**
     * True if type is toggle.
     *
     * @type {boolean}
     */
    get toggleVariant() {
        return this.type === 'toggle';
    }

    /**
     * Create new InputChoiceOption object.
     *
     * @type {Object[]}
     */
    get transformedOptions() {
        const { options, value } = this;
        if (Array.isArray(options)) {
            return options.map((option) => {
                return new InputChoiceOption(option, value, this.itemIndex++);
            });
        }
        return [];
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Checks if the input is valid.
     *
     * @returns {boolean} True if the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    /**
     * Displays the error messages. If the input is valid, <code>reportValidity()</code> clears displayed error messages.
     *
     * @returns {boolean} False if invalid, true if valid.
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
     * @param {string} message The string that describes the error. If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    /**
     * Displays error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when <code>checkValidity()</code> is called.
     *
     * @public
     */
    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    /**
     * Sets the focus on the first input option.
     *
     * @public
     */
    @api
    focus() {
        const firstCheckbox = this.template.querySelector(
            '[data-element-id="input"]'
        );
        if (firstCheckbox) {
            firstCheckbox.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Handles the checking for the change event.
     *
     * @param {array} checkboxes Array of checkboxes.
     * @param {string} value Value of the checkbox.
     * @param {Event} event Change event.
     *
     */
    _handleChecking(checkboxes, value, event) {
        if (
            this.isMultiSelect ||
            (this.type === 'toggle' && checkboxes.length === 1)
        ) {
            this._value = this._valueChangeHandler(checkboxes);
        } else {
            if (this.value === value) {
                // Prevent unselecting the current option when the type is 'button'
                event.currentTarget.checked = true;
                return;
            }

            const checkboxesToUncheck = Array.from(checkboxes).filter(
                (checkbox) => checkbox.value !== value
            );
            checkboxesToUncheck.forEach((checkbox) => {
                checkbox.checked = false;
            });
            this._value = this._valueChangeHandler(checkboxes);
        }
        this._dispatchChangeEvent();
    }

    /**
     * Initialize the orientation attributes.
     */
    _initOrientationAttributes() {
        const attributes = deepCopy(this.orientationAttributes);
        const small = this._normalizeHorizontalColumns(
            attributes.smallContainerCols
        );
        const medium = this._normalizeHorizontalColumns(
            attributes.mediumContainerCols
        );
        const large = this._normalizeHorizontalColumns(
            attributes.largeContainerCols
        );
        const defaults = this._normalizeHorizontalColumns(attributes.cols);

        // Keep same logic as in layoutItem.
        attributes.cols =
            this.orientation === 'horizontal'
                ? defaults || DEFAULT_COLUMNS.default
                : 12;
        attributes.smallContainerCols =
            this.orientation === 'horizontal'
                ? small || defaults || DEFAULT_COLUMNS.small
                : 12;

        attributes.mediumContainerCols =
            this.orientation === 'horizontal'
                ? medium || small || defaults || DEFAULT_COLUMNS.medium
                : 12;
        attributes.largeContainerCols =
            this.orientation === 'horizontal'
                ? large || medium || small || defaults || DEFAULT_COLUMNS.large
                : 12;

        if (this.orientation === 'vertical') {
            attributes.multipleRows = true;
        }
        this.computedOrientationAttributes = attributes;
    }

    /**
     * Initialize the resize observer, triggered when the layout is resized.
     */
    _initResizeObserver() {
        const wrapper = this.template.querySelector(
            '[data-element-id="container"]'
        );
        if (!wrapper) return;
        this._resizeObserver = new AvonniResizeObserver(wrapper, () => {
            this._containerWidth = wrapper.getBoundingClientRect().width;
            this._setWidth();
        });
    }

    /**
     * Only accept predetermined number of columns.
     *
     * @param {number} value
     * @returns {number}
     */
    _normalizeColumns(value) {
        const numValue = parseInt(value, 10);
        return COLUMNS.valid.includes(numValue) ? numValue : null;
    }

    /**
     * Inverse logic of number of columns.
     * Matches the logic of cols, smallContainerCols, mediumContainerCols and largeContainerCols attributes.
     *
     * @param {number} value
     * @returns {number}
     */
    _normalizeHorizontalColumns(value) {
        const normalizedCols = this._normalizeColumns(value);
        return normalizedCols
            ? 12 / Math.pow(2, Math.log2(normalizedCols))
            : null;
    }

    /**
     * Create the computed orientation attributes. Make sure only the authorized attributes for the given orientation are kept.
     */
    _normalizeOrientationAttributes() {
        const orientationAttributes = {};
        Object.entries(this._orientationAttributes).forEach(([key, value]) => {
            const allowedAttribute =
                ORIENTATION_ATTRIBUTES[this.orientation] &&
                ORIENTATION_ATTRIBUTES[this.orientation].includes(key);
            if (allowedAttribute) {
                orientationAttributes[key] = value;
            }
        });
        this._orientationAttributes = orientationAttributes;
    }

    /**
     * Create the computed type attributes. Make sure only the authorized attributes for the given type are kept, add the deperecated attributes and compute the input choice set.
     */
    _normalizeTypeAttributes() {
        const typeAttributes = {};
        Object.entries(this.typeAttributes).forEach(([key, value]) => {
            const allowedAttribute =
                TYPE_ATTRIBUTES[this.type] &&
                TYPE_ATTRIBUTES[this.type].includes(key);
            if (allowedAttribute) {
                typeAttributes[key] = value;
            }
        });
        this.computedTypeAttributes = typeAttributes;
        this._supportDeprecatedAttributes();
    }

    /**
     * Set the width of the label icon container when check position is right and orientation vertical.
     *
     */
    _setWidth() {
        const labelIconContainers = this.template.querySelectorAll(
            '[data-element-id="label-icon-container"]'
        );
        let maxWidth = 0;

        if (labelIconContainers.length === 0) return;

        labelIconContainers.forEach((labelIconContainer) => {
            labelIconContainer.style.width = '';
        });

        if (
            this.orientation === 'horizontal' &&
            !this.orientationAttributes?.multipleRows
        )
            return;

        labelIconContainers.forEach((labelIconContainer) => {
            maxWidth = Math.max(maxWidth, labelIconContainer.offsetWidth);
        });

        labelIconContainers.forEach((labelIconContainer) => {
            maxWidth =
                this._containerWidth < maxWidth
                    ? this._containerWidth
                    : maxWidth;
            labelIconContainer.style.width = `${maxWidth + 4}px`;
        });
    }

    /**
     * Make sure the deprecated attributes are still supported through the type attributes.
     */
    _supportDeprecatedAttributes() {
        const { stretch } = this.computedTypeAttributes;

        if (stretch === undefined) {
            this.computedTypeAttributes.stretch = this.stretch;
        }
    }

    /**
     * Update form class styling.
     */
    _updateClassList() {
        classListMutation(this.classList, {
            'slds-form-element_stacked': this.variant === VARIANT.LABEL_STACKED,
            'slds-form-element_horizontal':
                this.variant === VARIANT.LABEL_INLINE
        });
    }

    /**
     * Value change handler.
     *
     * @param {array} inputs All inputs.
     * @returns {array} Checked values.
     */
    _valueChangeHandler(inputs) {
        const checkedValues = Array.from(inputs)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);
        return this.isMultiSelect ? checkedValues : checkedValues[0] || null;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Dispatch the blur event.
     */
    handleBlur() {
        this.interactingState.leave();

        /**
         * The event fired when the focus is removed from the input.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Handles the change event for default and button type.
     *
     * @param {Event} event
     */
    handleChange(event) {
        event.stopPropagation();

        const value = event.currentTarget.value;
        const checkboxes = this.template.querySelectorAll(
            '[data-element-id="input"]'
        );
        this._handleChecking(checkboxes, value, event);
    }

    /**
     * Dispatch the focus event.
     */
    handleFocus() {
        this.interactingState.enter();

        /**
         * The event fired when you focus the input.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * Click handler.
     *
     * @param {Event} event
     */
    handleClick(event) {
        if (this.readOnly) {
            event.preventDefault();
        }
        if (this.template.activeElement !== event.target) {
            event.target.focus();
        }
    }

    /**
     * Input keyup event handler.
     *
     * @param {Event} event
     */
    handleKeyUp(event) {
        if (event.key !== 'Enter') return;
        event.currentTarget.click();
    }

    /**
     * Handles the change event for toggle type.
     *
     * @param {Event} event
     */
    handleToggleChange(event) {
        event.stopPropagation();
        const value = event.currentTarget.name;
        let checkboxes = Array.from(
            this.template.querySelectorAll('[data-element-id="input-toggle"]')
        );
        this._handleChecking(checkboxes, value, event);
    }

    /**
     * Dispatches the change event.
     */
    _dispatchChangeEvent() {
        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string|string[]} value Selected options' value. Returns an array of string if the input is multi-select. Returns a string otherwise.
         * @public
         * @bubbles
         * @cancelable
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: this.value
                },
                composed: true,
                bubbles: true,
                cancelable: true
            })
        );
    }
}
