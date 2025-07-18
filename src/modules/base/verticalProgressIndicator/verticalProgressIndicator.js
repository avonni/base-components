import { LightningElement, api } from 'lwc';
import { normalizeArray, normalizeBoolean, normalizeString } from 'c/utils';

const INDICATOR_VARIANTS = { valid: ['base', 'shaded'], default: 'base' };

const VERTICAL_PROGRESS_INDICATOR_FORMATS = {
    valid: ['linear', 'non-linear'],
    default: 'linear'
};

/**
 * @class
 * @descriptor avonni-vertical-progress-indicator
 * @storyId example-vertical-progress-indicator--base
 * @public
 */
export default class VerticalProgressIndicator extends LightningElement {
    /**
     * Sets current-step to match the value attribute of one of progress-step components.
     * If current-step is not provided, the value of the first progress-step component is used.
     *
     * @type {string}
     * @public
     */
    @api currentStep;

    _completedSteps = [];
    _contentInLine = false;
    _format = VERTICAL_PROGRESS_INDICATOR_FORMATS.default;
    _hasError = false;
    _markAsComplete = false;
    _variant = INDICATOR_VARIANTS.default;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    renderedCallback() {
        let elements = this.template
            .querySelector('[data-element-id="slot-default"]')
            .assignedElements();
        let indexCompleted = 0;

        elements.forEach((element, index) => {
            element.setAttributes(
                this.contentInLine,
                this.variant === 'shaded'
            );

            if (element.getAttribute('data-step') === this.currentStep) {
                indexCompleted = index;
            }
        });

        elements.forEach((element, index) => {
            element.classList.remove('slds-has-error');
            element.classList.remove('slds-is-active');
            element.classList.remove('slds-is-completed');
            element.setIcon(undefined);

            if (indexCompleted > index && this.format === 'linear') {
                element.classList.add('slds-is-completed');
                element.setIcon('utility:success');
            } else if (this.completedSteps.includes(element.value)) {
                element.classList.add('slds-is-completed');
                element.setIcon('utility:success');
            } else if (indexCompleted === index && !this.markAsComplete) {
                if (this.hasError && this.variant === 'base') {
                    element.setIcon('utility:error');
                    element.classList.add('slds-has-error');
                } else {
                    element.classList.add('slds-is-active');
                }
            } else if (this.markAsComplete) {
                element.classList.add('slds-is-completed');
                element.setIcon('utility:success');
            }
        });
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
    }

    /**
     * If present, the steps are separated by lines.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get contentInLine() {
        return this._contentInLine;
    }
    set contentInLine(value) {
        this._contentInLine = normalizeBoolean(value);
    }

    /**
     * Sets the progression format of the vertical progress indicator. Valid values include linear and non-linear.
     *
     * @type {string}
     * @public
     * @default linear
     */
    @api
    get format() {
        return this._format;
    }
    set format(format) {
        this._format = normalizeString(format, {
            fallbackValue: VERTICAL_PROGRESS_INDICATOR_FORMATS.default,
            validValues: VERTICAL_PROGRESS_INDICATOR_FORMATS.valid
        });
    }

    /**
     * If present, the current step is in error state and an error icon is displayed on the step indicator. Only the base type can display errors.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hasError() {
        return this._hasError;
    }
    set hasError(value) {
        this._hasError = normalizeBoolean(value);
    }

    /**
     * If present, all steps are completed.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get markAsComplete() {
        return this._markAsComplete;
    }
    set markAsComplete(value) {
        this._markAsComplete = normalizeBoolean(value);
    }

    /**
     * Changes the appearance of the progress indicator for the base type only. Valid values are base or shaded.
     * The shaded variant adds a light gray border to the step indicators.
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed progress class styling.
     *
     * @type {string}
     */
    get computedProgressClass() {
        return this.variant === 'base'
            ? 'slds-progress slds-progress_vertical slds-progress_success'
            : 'slds-progress slds-progress_vertical slds-progress_success slds-progress_shade';
    }

    /**
     * Computed progress list class styling.
     *
     * @type {string}
     */
    get computedProgressListClass() {
        return this.contentInLine
            ? 'slds-progress__list slds-progress__list-bordered'
            : 'slds-progress__list';
    }
}
