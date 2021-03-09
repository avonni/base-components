import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
import { getCurrentStepIndex, computeProgressValue } from './utils';
import { classSet } from 'c/utils';

const TYPES = { valid: ['base', 'arrow'], default: 'base' };

const VARIANTS = { valid: ['base', 'shaded'], default: 'base' };

// const STATES = { completed: 'completed', current: 'current', warning: 'warning', error: 'error', incomplete: 'incomplete' }

export default class ProgressIndicator extends LightningElement {
    @api currentStep;
    @api errorSteps = [];
    @api warningSteps = [];
    @api completedSteps = [];
    @api disabledSteps = [];

    _variant = 'base';
    _type = 'base';
    _progressValue;

    connectedCallback() {}

    renderedCallback() {
        this.updateProgressValue();
        this.updateSteps();
        this.updateErrorSteps();
        this.updateWarningSteps();
        this.updateCompletedSteps();
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    @api
    get type() {
        return this._type;
    }

    set type(type) {
        this._variant = normalizeString(type, {
            fallbackValue: TYPES.default,
            validValues: TYPES.valid
        });
    }

    @api
    get steps() {
        return this._steps;
    }

    set steps(value) {
        this._steps = Array.isArray(value) ? value : [];
    }

    get computedOuterClass() {
        return classSet('slds-progress')
            .add({
                'slds-progress_shade':
                    this._variant === 'shaded' && this._type === 'base'
            })
            .toString();
    }

    getSteps() {
        return Array.from(this.template.querySelectorAll('c-progress-step'));
    }

    updateSteps() {
        let steps = this.getSteps();

        let indexCompleted = this.currentStep <= 1 ? 0 : this.currentStep - 1;
        steps.forEach((step, index) => {
            if (step.getAttribute('data-step') === this.currentStep) {
                indexCompleted = index;
            }
        });

        steps.forEach((step, index) => {
            if (indexCompleted > index) {
                step.classList.add('slds-progress__item');
                step.classList.add('slds-is-completed');
                step.setIcon('utility:success');
            } else if (indexCompleted === index) {
                step.classList.add('slds-progress__item');
                step.classList.add('slds-is-active');
            }
        });
    }

    updateProgressValue() {
        const steps = this.getSteps();
        const currentStepIndex = getCurrentStepIndex(steps, this.currentStep);
        this._progressValue = computeProgressValue(steps, currentStepIndex);
    }

    get progressValue() {
        return this._progressValue;
    }

    updateErrorSteps() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            this.errorSteps.forEach((error) => {
                if (parseInt(step.getAttribute('data-step'), 10) === error) {
                    step.setIcon('utility:error');
                    step.classList.remove('slds-is-completed');
                    step.classList.add('slds-has-error');
                }
            });
        });
    }

    updateWarningSteps() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            this.warningSteps.forEach((warning) => {
                if (parseInt(step.getAttribute('data-step'), 10) === warning) {
                    step.setIcon('utility:warning');
                    // step.classList.remove('slds-is-completed')
                    step.classList.add('avonni-progress-indicator-has-warning');
                }
            });
        });
    }

    updateCompletedSteps() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            this.completedSteps.forEach((completed) => {
                if (
                    parseInt(step.getAttribute('data-step'), 10) === completed
                ) {
                    step.setIcon('utility:success');
                    step.classList.add('slds-is-completed');
                }
            });
        });
    }

    selectStep(event) {
        const step = event.target.dataset;
        console.log(step);
        this.dispatchEvent(
            new CustomEvent('stepselect', {
                bubbles: true,
                detail: { value: this.value }
            })
        );
        // this.updateAriaDescribedBy('button')
    }
}
