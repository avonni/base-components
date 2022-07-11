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
import { normalizeString, normalizeArray } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const INDICATOR_VARIANTS = { valid: ['base', 'shaded'], default: 'base' };

/**
 * @class
 * @descriptor avonni-progress-indicator
 * @storyId example-progress-indicator--base-with-popover-hidden
 * @public
 */
export default class ProgressIndicator extends LightningElement {
    /**
     * Set current-step to match the value attribute of one of progress-step components.
     *
     * @type {string}
     * @public
     */
    @api currentStep;

    _completedSteps = [];
    _disabledSteps = [];
    _errorSteps = [];
    _steps = [];
    _variant = INDICATOR_VARIANTS.default;
    _warningSteps = [];

    _initialRender = true;

    renderedCallback() {
        this.updateErrorSteps();
        this.updateWarningSteps();
        this.updateCompletedSteps();
        this.updateCurrentStep();
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
        return classSet('slds-progress slds-progress_horizontal')
            .add({
                'slds-progress_shade': this._variant === 'shaded'
            })
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set what type of step (active, completed, warning, error, disabled).
     *
     * @returns {Object[]}
     */
    getSteps() {
        return Array.from(
            this.template.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            )
        );
    }

    /**
     * Update current step value.
     */
    updateCurrentStep() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            if (step.value === this.currentStep) {
                step.classList.add('slds-is-active');
            }
        });
    }

    /**
     * Update step value if error.
     */
    updateErrorSteps() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            this.errorSteps.forEach((error) => {
                if (step.value === error) {
                    step.setIcon('utility:error');
                    step.classList.add('slds-has-error');
                }
            });
        });
    }

    /**
     * Update step with icon and warning.
     */
    updateWarningSteps() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            this.warningSteps.forEach((warning) => {
                if (step.value === warning) {
                    step.setIcon('utility:warning');
                    step.classList.add('slds-has-warning');
                    if (this._variant === 'shaded') {
                        step.classList.remove('slds-has-warning');
                        step.classList.add('slds-has-warning-shaded');
                    }
                }
            });
        });
    }

    /**
     * Update completed steps with icon and class.
     */
    updateCompletedSteps() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            this.completedSteps.forEach((completed) => {
                if (step.value === completed) {
                    step.setIcon('utility:success');
                    step.classList.add('slds-is-completed');
                }
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
