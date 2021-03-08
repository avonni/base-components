import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
import { getCurrentStepIndex, computeProgressValue } from './utils';
import { classSet } from 'c/utils';

const TYPES = { valid: ['base', 'arrow'], default: 'base' };

const VARIANTS = { valid: ['base', 'shaded'], default: 'base' };

// const STATES = { completed: 'completed', current: 'current', warning: 'warning', error: 'error', incomplete: 'incomplete' }

export default class ProgressIndicator extends LightningElement {
    @api currentStep;

    _completedSteps = [];
    _disabledSteps = [];
    _errorSteps = [];
    _warningSteps = [];
    _variant = 'base';
    _type = 'base';
    _steps = [];
    _progressValue;

    connectedCallback() {}

    renderedCallback() {
        this.updateProgressValue();
        this.updateSteps();
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

        let indexCompleted = 0;
        steps.forEach((step, index) => {
            if (
                step.getAttribute('data-step') ===
                parseInt(this.currentStep, 10)
            ) {
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
}
