import {
    FieldConstraintApi,
    InteractingState,
    normalizeVariant,
    VARIANT
} from 'c/inputUtils';
import { Direction } from 'c/positionLibrary';
import { AvonniResizeObserver } from 'c/resizeObserver';
import { Tooltip, TooltipType } from 'c/tooltipLibrary';
import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import {
    classListMutation,
    getRealDOMId,
    isOrgSlds2,
    synchronizeAttrs
} from 'c/utilsPrivate';
import { api, LightningElement } from 'lwc';
import InputChoiceOption from './inputChoiceOption';

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
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const DEFAULT_REQUIRED_ALTERNATIVE_TEXT = 'Required';
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
        'scrollable',
        'showScrollButtons',
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
     * Message displayed while the button is in the loading state.
     *
     * @public
     * @type {string}
     * @default Loading...
     */
    @api loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
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
     * The assistive text when the required attribute is set to true.
     *
     * @type {string}
     * @public
     * @default Required
     */
    @api requiredAlternativeText = DEFAULT_REQUIRED_ALTERNATIVE_TEXT;

    _checkPosition = CHECK_POSITIONS.default;
    _disabled = false;
    _isLoading = false;
    _isMultiSelect = false;
    _options = [];
    _orientation = INPUT_CHOICE_ORIENTATIONS.default;
    _orientationAttributes = {};
    _required = false;
    _type = INPUT_CHOICE_TYPES.default;
    _typeAttributes = {};
    _value = [];
    _variant;

    computedOptions = [];
    computedOrientationAttributes = {};
    computedTypeAttributes = {};
    displayShowMoreMenu = false;
    helpMessage;
    overflowingOptions = [];
    visibleOptions = [];

    _connected = false;
    _containerWidth;
    _fixedOptionWidth;
    _rendered = false;
    _resizeObserver;
    _tooltip;
    _tooltipTimeout;

    connectedCallback() {
        if (!Object.keys(this.computedOrientationAttributes).length) {
            this.initOrientationAttributes();
        }

        this.normalizeTypeAttributes();
        this.classList.add('slds-form-element');
        this.updateClassList();
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this.initOptions();
        this._connected = true;
    }

    renderedCallback() {
        this.synchronizeA11y();
        if (!this._resizeObserver) {
            this.initResizeObserver();
        }

        if (!this._rendered) {
            this.setFixedOptionWidth();
            this.updateLabelsStyle();
        }
        this._rendered = true;
        this.updateCheckboxCheckedState();
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
        this.destroyTooltip();
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
        if (this._connected) {
            this.setFixedOptionWidth();
        }
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

        if (this._connected) {
            this.initOptions();
        }
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

        if (this._connected) {
            this.setFixedOptionWidth();
            this.initOptions();
        }
    }

    /**
     * Array of option objects.
     *
     * @type {object[]}
     * @public
     * @required
     */
    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = normalizeArray(value);

        if (this._connected) {
            this.initOptions();
        }
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
        if (this._connected) {
            this.initOrientationAttributes();
            this.initOptions();
            this.setFixedOptionWidth();
            this.destroyTooltip();
        }
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

        if (this._connected) {
            this.initOrientationAttributes();
            this.initOptions();
            this.setFixedOptionWidth();
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
        this.supportDeprecatedAttributes();
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
        if (this._connected) {
            this.normalizeTypeAttributes();
            this.initOptions();
            this.destroyTooltip();
        }
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
        if (this._connected) {
            this.normalizeTypeAttributes();
            this.destroyTooltip();
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

        if (this._connected) {
            this.updateCheckboxCheckedState();
            this.updateLabelsStyle();
        }
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
        this.updateClassList();
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
     *  Returns the list of checkboxes.
     *
     * @type {HTMLElement[]}
     */
    get checkboxes() {
        const id = this.toggleVariant ? 'input-toggle' : 'input';
        const visibleElements = this.template.querySelectorAll(
            `[data-element-id="${id}"]`
        );
        const overflowingCheckboxes = this.template.querySelectorAll(
            '[data-element-id="input-overflowing-option"]'
        );
        return [
            ...Array.from(visibleElements),
            ...Array.from(overflowingCheckboxes)
        ];
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
     * Computed Button Class styling.
     *
     * @type {string}
     */
    get computedButtonClass() {
        const { stretch, displayAsRow } = this.computedTypeAttributes;
        return classSet(`avonni-input-choice-set__${this.orientation}`).add({
            'slds-size_full': this.isHorizontal && !this.buttonVariant,
            'slds-checkbox_button-group':
                this.buttonVariant && !displayAsRow && this.isMultiSelect,
            'slds-radio_button-group':
                this.buttonVariant && !displayAsRow && !this.isMultiSelect,
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
                'slds-checkbox_button': !displayAsRow && this.isMultiSelect,
                'slds-radio_button': !displayAsRow && !this.isMultiSelect,
                'avonni-input-choice-set__button__row': displayAsRow,
                'avonni-input-choice-set__horizontal':
                    this.isHorizontal && !displayAsRow && !stretch,
                'slds-grow': stretch && displayAsRow,
                'slds-grid': stretch && this.isHorizontal && displayAsRow
            })
            .toString();
    }

    /**
     * Computed Check Container Class styling.
     *
     * @type {string}
     */
    get computedCheckContainerClass() {
        return classSet('avonni-input-choice-set__checkbox-container')
            .add({
                'slds-order_3': this.checkPosition === 'right',
                'slds-p-top_xx-small': this.toggleVariant,
                'slds-p-left_x-small':
                    this.toggleVariant &&
                    this.checkPosition === 'right' &&
                    !this.isHorizontal,
                'slds-p-right_x-small':
                    (this.toggleVariant &&
                        this.checkPosition === 'left' &&
                        !this.isHorizontal) ||
                    (this.toggleVariant && this.isHorizontal)
            })
            .toString();
    }

    /**
     * Computed Check Label Class styling.
     *
     * @type {string}
     */
    get computedCheckLabelClass() {
        return classSet('slds-grid slds-grid_vertical-align-center')
            .add({
                'avonni-input-choice-set__toggle_stretch':
                    this.toggleVariant &&
                    this.computedTypeAttributes?.stretch &&
                    !this.isHorizontal
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
     * Computed Checkmark Class styling.
     *
     * @type {string}
     */
    get computedCheckmarkClass() {
        const { checkmarkPosition } = this.computedTypeAttributes;
        return classSet('avonni-input-choice-set__checkmark')
            .add({
                'slds-order_0 slds-p-left_x-small slds-align_absolute-center':
                    checkmarkPosition === 'left' || !checkmarkPosition,
                'slds-order_2 slds-p-right_x-small slds-align_absolute-center':
                    checkmarkPosition === 'right'
            })
            .toString();
    }

    /**
     * Computed direction based on orientation.
     * If orientation is horizontal, direction is row. If orientation is vertical, direction is column.
     *
     * @type {string}
     */
    get computedDirection() {
        return this.isHorizontal ? 'row' : 'column';
    }

    /**
     * Computed Header Class styling.
     *
     * @type {string}
     */
    get computedHeaderClass() {
        return classSet(
            'slds-form-element__label avonni-input-choice-set__label'
        )
            .add({
                slds1: !isOrgSlds2(),
                slds2: isOrgSlds2()
            })
            .toString();
    }

    /**
     * Computed hide check attributes for c-input-toggle based on typeAttributes showCheckmark.
     *
     * @type {string}
     */
    get computedHideCheck() {
        return !this.computedTypeAttributes?.showCheckmark;
    }

    /**
     * Computed Input Class styling.
     *
     * @type {string}
     */
    get computedInputClass() {
        return classSet('avonni-input-choice-set__option')
            .add({
                'avonni-input-choice-set__option-button': this.buttonVariant,
                'avonni-input-choice-set__option-toggle': this.checkboxVariant,
                'avonni-input-choice-set__option-default':
                    !this.buttonVariant && !this.checkboxVariant
            })
            .toString();
    }

    /**
     * Computed Input Container Class styling.
     *
     * @type {string}
     */
    get computedInputContainerClass() {
        const checkboxClass = this.isMultiSelect
            ? `slds-checkbox avonni-input-choice-set__${this.orientation}`
            : `slds-radio slds-is-relative avonni-input-choice-set__${this.orientation}`;
        const toggleClass = `slds-checkbox_toggle slds-is-relative slds-grid slds-grid_vertical slds-grid_align-spread avonni-input-choice-set__${this.orientation}`;

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
        if (this.buttonVariant || this.checkboxVariant) {
            return this.isMultiSelect ? 'checkbox' : 'radio';
        }
        return 'checkbox';
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
        } else if (this.buttonVariant && this.isMultiSelect) {
            label = `slds-checkbox_button__label slds-align_absolute-center avonni-input-choice-set__${this.orientation}`;
        } else if (this.buttonVariant) {
            label = `slds-radio_button__label slds-align_absolute-center avonni-input-choice-set__${this.orientation}`;
        }
        return label;
    }

    /**
     * Computed Label Container Class styling.
     *
     * @type {string}
     */
    get computedLabelContainerClass() {
        return classSet(
            'avonni-input-choice-set__option-label-icon-container slds-form-element__label'
        )
            .add({
                'avonni-input-choice-set__option-label-icon-container_toggle':
                    this.toggleVariant
            })
            .toString();
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
                'slds-grid': this.variant !== VARIANT.LABEL_INLINE
            })
            .toString();
    }

    get computedOptionLabelClass() {
        return classSet(
            'slds-order_1 avonni-input-choice-set__option-label_line-clamp'
        )
            .add({
                'avonni-input-choice-set__option-label_line-clamp-vertical':
                    !this.isHorizontal
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
     * Computed vertical align based on typeAttributes stretch.
     *
     * @type {string}
     */
    get computedVerticalAlign() {
        return this.computedTypeAttributes?.stretch ? 'stretch' : 'start';
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
                    (!this.value || !this.value?.length)
            });
        }
        return this._constraintApi;
    }

    /**
     * Returns true, if type is default, toggle or button displayAsRow.
     *
     * @type {boolean}
     */
    get hasLayoutItem() {
        return (
            this.checkboxVariant ||
            this.toggleVariant ||
            (this.buttonVariant && this.computedTypeAttributes?.displayAsRow)
        );
    }

    get horizontalOverflowIsDisabled() {
        return (
            !this.isHorizontal ||
            this.computedOrientationAttributes.multipleRows ||
            this.computedTypeAttributes.stretch
        );
    }

    /**
     * True if orientation is horizontal.
     *
     * @type {boolean}
     */
    get isHorizontal() {
        return this.orientation === 'horizontal';
    }

    get showMoreMenuVariant() {
        return this.buttonVariant ? 'neutral' : 'base';
    }

    /**
     * True if type is toggle.
     *
     * @type {boolean}
     */
    get toggleVariant() {
        return this.type === 'toggle';
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Clear all tooltips and remove all event listeners.
     */
    destroyTooltip() {
        if (this._tooltipTimeout) {
            clearTimeout(this._tooltipTimeout);
        }
        if (this._tooltip) {
            this._tooltip.destroy();
        }
        this._tooltip = null;
    }

    /**
     * Make sure only the authorized attributes for the given orientation are kept.
     *
     * @returns {object} The normalized orientation attributes.
     */
    getNormalizedOrientationAttributes() {
        const orientationAttributes = {};
        Object.entries(this.orientationAttributes).forEach(([key, value]) => {
            const allowedAttribute =
                ORIENTATION_ATTRIBUTES[this.orientation] &&
                ORIENTATION_ATTRIBUTES[this.orientation].includes(key);
            if (allowedAttribute) {
                orientationAttributes[key] = value;
            }
        });
        return orientationAttributes;
    }

    /**
     * Handles the checking for the change event.
     *
     * @param {string} value Value of the checkbox.
     * @param {HTMLElement} target event target.
     * @param {boolean} isInput If the target is an input.
     */
    handleChecking({ value, target, isInput, isOverflowing }) {
        const isSingleToggle =
            this.toggleVariant && this.checkboxes.length === 1;
        if (this.isMultiSelect || isSingleToggle) {
            if (this.toggleVariant) {
                const checked = target.checked;
                if (!isInput) {
                    target.checked = checked;
                    target.dataset.checked = checked;
                } else {
                    target.checked = !checked;
                    target.dataset.checked = !checked;
                }
            } else {
                target.dataset.checked = target.checked;
            }
            const option = this.computedOptions.find(
                (opt) => opt.value === value
            );
            if (option) {
                option.isChecked = target.checked;
            }
        } else {
            if (isOverflowing) {
                target.dataset.checked = target.checked;
            } else if (this.toggleVariant) {
                target.checked = true;
                target.dataset.checked = 'true';
            }
            if (this.value === value) {
                // Prevent unselecting the current option when the type is 'button'
                target.checked = true;
                target.dataset.checked = 'true';
                return;
            }

            const checkboxesToUncheck = Array.from(this.checkboxes).filter(
                (checkbox) => checkbox.value !== value
            );
            checkboxesToUncheck.forEach((checkbox) => {
                checkbox.checked = false;
                checkbox.dataset.checked = 'false';
            });
            const optionsToUncheck = this.computedOptions.filter(
                (opt) => opt.value !== value
            );
            optionsToUncheck.forEach((option) => {
                option.isChecked = false;
            });
        }

        this._value = this.valueChangeHandler();
        this._dispatchChangeEvent();
    }

    /**
     * Initialize the options.
     */
    initOptions() {
        this.displayShowMoreMenu = false;
        this.computedOptions = Array.isArray(this.options)
            ? this.options.map((option) => {
                  return new InputChoiceOption(option, {
                      disabled: this.disabled,
                      isMultiSelect: this.isMultiSelect,
                      labelClass: this.computedLabelClass,
                      type: this.type,
                      value: this.value,
                      fixedWidth: this._fixedOptionWidth
                  });
              })
            : [];
        this.visibleOptions = this.computedOptions;
        this.overflowingOptions = [];

        requestAnimationFrame(() => {
            this.setOptionWidth();
        });
    }

    /**
     * Initialize the orientation attributes.
     */
    initOrientationAttributes() {
        const attributes = this.getNormalizedOrientationAttributes();

        if (
            attributes.scrollable ||
            (this.isHorizontal && !attributes.multipleRows)
        ) {
            this.computedOrientationAttributes = attributes;
            return;
        }
        const small = this.normalizeHorizontalColumns(
            attributes.smallContainerCols
        );
        const medium = this.normalizeHorizontalColumns(
            attributes.mediumContainerCols
        );
        const large = this.normalizeHorizontalColumns(
            attributes.largeContainerCols
        );
        const defaults = this.normalizeHorizontalColumns(attributes.cols);

        // Keep same logic as in layoutItem.
        attributes.cols = this.isHorizontal
            ? defaults || DEFAULT_COLUMNS.default
            : 12;
        attributes.smallContainerCols = this.isHorizontal
            ? small || defaults || DEFAULT_COLUMNS.small
            : 12;

        attributes.mediumContainerCols = this.isHorizontal
            ? medium || small || defaults || DEFAULT_COLUMNS.medium
            : 12;
        attributes.largeContainerCols = this.isHorizontal
            ? large || medium || small || defaults || DEFAULT_COLUMNS.large
            : 12;

        if (!this.isHorizontal) {
            attributes.multipleRows = true;
        }
        this.computedOrientationAttributes = attributes;
    }

    /**
     * Initialize the resize observer, triggered when the layout is resized.
     */
    initResizeObserver() {
        const wrapper = this.template.querySelector(
            '[data-element-id="container"]'
        );
        if (!wrapper) return;

        this._resizeObserver = new AvonniResizeObserver(wrapper, () => {
            this._containerWidth = wrapper.getBoundingClientRect().width;
            this.setFixedOptionWidth();
            this.destroyTooltip();

            if (this._containerWidth === 0) {
                // Corner case when the choice set is hidden
                // (for example when it is inside a tabbed container).
                // We reinitialize the options to make sure the hidden options
                // are reset properly if the choice set is shown again.
                this.initOptions();
            } else {
                this.setOptionWidth();
            }
        });
    }

    /**
     * Only accept predetermined number of columns.
     *
     * @param {number} value
     * @returns {number}
     */
    normalizeColumns(value) {
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
    normalizeHorizontalColumns(value) {
        const normalizedCols = this.normalizeColumns(value);
        return normalizedCols
            ? 12 / Math.pow(2, Math.log2(normalizedCols))
            : null;
    }

    /**
     * Create the computed type attributes. Make sure only the authorized attributes for the given type are kept, add the deperecated
     * attributes and compute the input choice set.
     */
    normalizeTypeAttributes() {
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
        this.supportDeprecatedAttributes();
    }

    /**
     * Set the width of the label icon container when check position is right and orientation vertical.
     */
    setFixedOptionWidth() {
        const labelIconContainers = this.template.querySelectorAll(
            '[data-element-id="label-icon-container"]'
        );
        let maxWidth = 0;

        if (labelIconContainers.length === 0) return;

        labelIconContainers.forEach((labelIconContainer) => {
            labelIconContainer.style.width = '';
        });

        if (this.isHorizontal && !this.orientationAttributes?.multipleRows)
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
        this._fixedOptionWidth = maxWidth + 4;
    }

    setOptionWidth() {
        this.computedOptions.forEach((option) => {
            const optionElement = this.template.querySelector(
                `[data-element-id="span-checkbox-container"][data-value="${option.value}"]`
            );
            option.width = optionElement?.offsetWidth || 0;
        });
    }

    showTooltip(tooltipValue, target) {
        if (!tooltipValue) {
            return;
        }
        const tooltip = new Tooltip(tooltipValue, {
            type: TooltipType.Toggle,
            root: this,
            target: () => target,
            align: {
                horizontal: Direction.Left,
                vertical: Direction.Top
            },
            targetAlign: {
                horizontal: Direction.Left,
                vertical: Direction.Bottom
            }
        });
        this._tooltip = tooltip;
        this._tooltip.initialize();
        this._tooltip.show();

        this._tooltipTimeout = setTimeout(() => {
            if (this._tooltip) {
                this._tooltip.startPositioning();
            }
        }, 50);
    }

    /**
     * Make sure the deprecated attributes are still supported through the type attributes.
     */
    supportDeprecatedAttributes() {
        const { stretch } = this.computedTypeAttributes;
        if (stretch === undefined) {
            this.computedTypeAttributes.stretch = this.stretch;
        }
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

    /**
     * Update the checkbox checked state.
     */
    updateCheckboxCheckedState() {
        this.checkboxes.forEach((checkbox) => {
            const value = checkbox.value || checkbox.name;
            const valueSet = new Set(this.value);
            const checked = valueSet.has(value) || this.value === value;
            checkbox.checked = checked;
            checkbox.dataset.checked = checked;
        });
    }

    /**
     * Update form class styling.
     */
    updateClassList() {
        classListMutation(this.classList, {
            'slds-form-element_stacked': this.variant === VARIANT.LABEL_STACKED,
            'slds-form-element_horizontal':
                this.variant === VARIANT.LABEL_INLINE
        });
    }

    /**
     * Update label styling.
     */
    updateLabelsStyle() {
        const labels = this.template.querySelectorAll(
            '[data-element-id="label"]'
        );

        labels.forEach((label) => {
            const val = label.dataset.value;
            const valueSet = new Set(this.value);
            const hasValue = valueSet.has(val) || this.value === val;
            const icon = label.querySelector(
                '[data-element-id="lightning-icon-button"]'
            );
            if (icon) {
                icon.variant = hasValue ? 'inverse' : 'base';
            }
            if (
                this.computedTypeAttributes?.showCheckmark &&
                this.buttonVariant
            ) {
                const checkmark = label.querySelector(
                    '[data-element-id="lightning-icon-check"]'
                );
                if (!checkmark) return;
                checkmark.style.display = hasValue ? 'block' : 'none';
            }
            const color = label.dataset.color;
            if (!color) return;
            if (hasValue && !this.toggleVariant) {
                if (this.buttonVariant) {
                    label.style.backgroundColor = color;
                    label.style.borderColor = color;
                }
                label.style.color = this.buttonVariant ? 'white' : color;
            } else {
                label.style.backgroundColor = '';
                label.style.borderColor = '';
                label.style.color = color;
            }
        });
    }

    /**
     * Value change handler.
     * @returns {array} Checked values.
     */
    valueChangeHandler() {
        const checkedValues = Array.from(this.checkboxes)
            .filter(
                (checkbox) =>
                    checkbox.checked || checkbox.dataset.checked === 'true'
            )
            .map((checkbox) => checkbox.value);
        return this.isMultiSelect ? checkedValues : checkedValues[0] || null;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handles and dispatches the blur event.
     */
    handleBlur() {
        this.interactingState.leave();
        if (this.buttonVariant) {
            this.destroyTooltip();
        }

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

        let target = event.currentTarget;
        const value = target.value || target.name;
        const isInput = target.dataset.elementId === 'input';
        const isOverflowing =
            target.dataset.elementId === 'input-overflowing-option';

        // When toggle variant, if we press on the label we need to get the target input-toggle
        if (!isOverflowing && this.toggleVariant && isInput) {
            target = this.template.querySelector(
                `[data-element-id="input-toggle"][data-value="${value}"]`
            );
        }
        this.handleChecking({ value, target, isInput, isOverflowing });
        this.updateLabelsStyle();

        if (isOverflowing && !this.isMultiSelect) {
            const scrollableContainer = this.template.querySelector(
                '[data-element-id="avonni-primitive-scrollable-container"]'
            );
            if (scrollableContainer) {
                scrollableContainer.closeMenu();
            }
        }
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
     * Handle a mouse enter.
     *
     * @param {Event} event
     */
    handleEnter(event) {
        if (this.buttonVariant && !this._tooltip && !this.disabled) {
            const target = event.currentTarget;
            const buttonValue = event.currentTarget.dataset.value;
            const option = this.options.find(
                (opt) => opt.value === buttonValue
            );
            this.showTooltip(option?.tooltip, target);
        }
    }

    /**
     * Handles and Dispatches the focus event.
     */
    handleFocus(event) {
        this.interactingState.enter();

        if (this.buttonVariant && !this._tooltip && !this.disabled) {
            const target = event.currentTarget;
            const buttonValue = event.currentTarget.value;
            const option = this.options.find(
                (opt) => opt.value === buttonValue
            );
            this.showTooltip(option?.tooltip, target);
        }

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
     * Handle a mouse leave.
     *
     * @param {Event} event
     */
    handleLeave() {
        if (this.buttonVariant) {
            this.destroyTooltip();
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

    handleWidthChange(event) {
        const allowShowMoreMenu =
            this.isHorizontal &&
            !this.computedOrientationAttributes.scrollable &&
            !this.horizontalOverflowIsDisabled;
        if (!allowShowMoreMenu) {
            return;
        }
        let availableWidth = event.detail.availableWidth;
        let firstHiddenIndex = this.computedOptions.length;

        for (let i = 0; i < this.computedOptions.length; i++) {
            availableWidth -= this.computedOptions[i].width;
            // Allow for 5px to overflow the container,
            // to avoid displaying the "show more" menu
            // when only a tiny bit of space is missing
            if (availableWidth <= -5) {
                firstHiddenIndex = i;
                break;
            }
        }

        this.visibleOptions = this.computedOptions.slice(0, firstHiddenIndex);
        this.overflowingOptions = this.computedOptions.slice(firstHiddenIndex);
        this.displayShowMoreMenu = this.overflowingOptions.length > 0;
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
