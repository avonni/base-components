import { LightningElement, api } from 'lwc';
import { classSet, normalizeArray, normalizeString } from 'c/utils';
import Step from './step';

const INDICATOR_VARIANTS = { valid: ['base', 'shaded'], default: 'base' };

/**
 * @class
 * @descriptor avonni-progress-indicator
 * @storyId example-progress-indicator--base-with-popover-hidden
 * @public
 */
export default class ProgressIndicator extends LightningElement {
    _completedSteps = [];
    _currentStep;
    _disabledSteps = [];
    _errorSteps = [];
    _steps = [];
    _variant = INDICATOR_VARIANTS.default;
    _warningSteps = [];

    computedSteps = [];

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._connected = true;
        this._initSteps();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of completed steps values.
     *
     * @type {string[]}
     * @public
     */
    @api
    get completedSteps() {
        return this._completedSteps;
    }
    set completedSteps(value) {
        this._completedSteps = normalizeArray(value);

        if (this._connected) {
            this._initSteps();
        }
    }

    /**
     * Set current-step to match the value attribute of one of progress-step components.
     *
     * @type {string}
     * @public
     */
    @api
    get currentStep() {
        return this._currentStep;
    }
    set currentStep(value) {
        this._currentStep = value;

        if (this._connected) {
            this._initSteps();
        }
    }

    /**
     * Array of disabled steps values.
     *
     * @type {string[]}
     * @public
     */
    @api
    get disabledSteps() {
        return this._disabledSteps;
    }
    set disabledSteps(value) {
        this._disabledSteps = normalizeArray(value);

        if (this._connected) {
            this._initSteps();
        }
    }

    /**
     * Array of error steps values.
     *
     * @type {string[]}
     * @public
     */
    @api
    get errorSteps() {
        return this._errorSteps;
    }
    set errorSteps(value) {
        this._errorSteps = normalizeArray(value);

        if (this._connected) {
            this._initSteps();
        }
    }

    /**
     * Array of step bjects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get steps() {
        return this._steps;
    }

    set steps(value) {
        this._steps = normalizeArray(value);

        if (this._connected) {
            this._initSteps();
        }
    }

    /**
     * Changes the appearance of the progress indicator for the base type only.
     * Valid values are base or shaded. The shaded variant adds a light gray border to the step indicators.
     *
     * @type {string}
     * @public
     * @default base
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: INDICATOR_VARIANTS.default,
            validValues: INDICATOR_VARIANTS.valid
        });
    }

    /**
     * Array of warning steps values.
     *
     * @type {string[]}
     * @public
     */
    @api
    get warningSteps() {
        return this._warningSteps;
    }
    set warningSteps(value) {
        this._warningSteps = normalizeArray(value);

        if (this._connected) {
            this._initSteps();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed Outer class styling.
     *
     * @type {string}
     */
    get computedOuterClass() {
        return classSet(
            'slds-progress slds-progress_horizontal slds-scrollable_x'
        )
            .add({
                'slds-progress_shade': this.variant === 'shaded'
            })
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    _initSteps() {
        this.computedSteps = this.steps.map((step) => {
            return new Step({
                ...step,
                completedSteps: this.completedSteps,
                currentStep: this.currentStep,
                disabledSteps: this.disabledSteps,
                errorSteps: this.errorSteps,
                warningSteps: this.warningSteps
            });
        });
    }

    /**
     * Click on step dispatcher.
     */
    dispatchStepClick(event) {
        const value = event.detail.value;
        /**
         * The event fired when a step is clicked.
         *
         * @event
         * @name stepclick
         * @param {string} value Unique value of the clicked step.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('stepclick', {
                detail: {
                    value: value
                }
            })
        );
    }

    /**
     * Blur step dispatcher.
     */
    dispatchStepBlur(event) {
        const value = event.detail.value;

        /**
         * The event fired when a step looses focus.
         *
         * @event
         * @name stepblur
         * @param {string} value Unique value of the blurred step.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('stepblur', {
                detail: {
                    value: value
                }
            })
        );
    }

    /**
     * Focus on step dispatcher.
     */
    dispatchStepFocus(event) {
        const value = event.detail.value;
        /**
         * The event fired when a step receives focus.
         *
         * @event
         * @name stepfocus
         * @param {string} value Unique value of the focused step.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('stepfocus', {
                detail: {
                    value: value
                }
            })
        );
    }

    /**
     * Mouse Enter step dispatcher.
     */
    dispatchStepMouseEnter(event) {
        const value = event.detail.value;

        /**
         * The event fired when the mouse enters a step.
         *
         * @event
         * @name stepmouseenter
         * @param {string} value Unique value of the step entered by the mouse.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('stepmouseenter', {
                detail: {
                    value: value
                }
            })
        );
    }

    /**
     * Mouse Leave step dispatcher.
     */
    dispatchStepMouseLeave(event) {
        const value = event.detail.value;
        /**
         * Event that fires when mouse leaves step.
         *
         * @event
         * @name stepmouseleave
         * @param {string} value Unique value of the step left by the mouse.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('stepmouseleave', {
                detail: {
                    value: value
                }
            })
        );
    }

    /**
     * Click on step button dispatcher.
     */
    dispatchStepButtonClick(event) {
        const value = event.detail.value;
        /**
         * The event fired when a step button is clicked.
         *
         * @event
         * @name stepbuttonclick
         * @param {string} value Unique value of the step the clicked button belongs to.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('stepbuttonclick', {
                detail: {
                    value: value
                }
            })
        );
    }

    /**
     * Click on step popover dispatcher.
     */
    dispatchStepPopoverClick(event) {
        const value = event.detail.value;
        /**
         * The event fired when a step popover is clicked.
         *
         * @event
         * @name steppopoverclick
         * @param {string} value Unique value of the step the clicked popover belongs to.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('steppopoverclick', {
                detail: {
                    value: value
                }
            })
        );
    }
}
