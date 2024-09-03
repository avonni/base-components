import { LightningElement, api } from 'lwc';
import { normalizeBoolean } from 'c/utils';

/**
 * The Wizard Step is used in the Wizard slot.
 *
 * @class
 * @descriptor avonni-wizard-step
 * @public
 */
export default class WizardStep extends LightningElement {
    /**
     * Custom function to execute before advancing to the next step or going back to the previous step. If the value returned is falsy, the step change will be prevented.
     *
     * @type {function}
     * @public
     */
    @api beforeChange = function () {
        return true;
    };
    /**
     * Error message displayed to the user if the before-change function returns false.
     *
     * @type {string}
     * @public
     */
    @api beforeChangeErrorMessage;
    /**
     * Label for the wizard step.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Unique name of the wizard step.
     *
     * @type {string}
     * @public
     */
    @api name;

    _hideNextFinishButton = false;
    _hidePreviousButton = false;

    stepClass;

    connectedCallback() {
        /**
         * Register the step event.
         *
         * @event
         * @name wizardstepregister
         * @param {function} setClass
         * @param {object} beforeChange
         * @param {string} name
         * @param {string} label
         * @param {boolean} hidePreviousButton
         * @param {boolean} hideNextFinishButton
         * @param {string} beforeChangeErrorMessage
         * @bubbles
         */
        const stepRegister = new CustomEvent('wizardstepregister', {
            bubbles: true,
            detail: {
                callbacks: {
                    setClass: this.setClass,
                    beforeChange:
                        typeof this.beforeChange === 'function'
                            ? this.beforeChange.bind(this)
                            : null
                },
                name: this.name,
                label: this.label,
                hidePreviousButton: this.hidePreviousButton,
                hideNextFinishButton: this.hideNextFinishButton,
                beforeChangeErrorMessage: this.beforeChangeErrorMessage
            }
        });

        this.dispatchEvent(stepRegister);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, hide the next/finish button.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideNextFinishButton() {
        return this._hideNextFinishButton;
    }
    set hideNextFinishButton(value) {
        this._hideNextFinishButton = normalizeBoolean(value);
    }

    /**
     * If present, hide the previous button.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hidePreviousButton() {
        return this._hidePreviousButton;
    }
    set hidePreviousButton(value) {
        this._hidePreviousButton = normalizeBoolean(value);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the step class value.
     *
     * @param {string} value
     */
    setClass = (value) => {
        this.stepClass = value;
    };
}
