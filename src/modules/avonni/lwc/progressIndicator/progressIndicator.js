import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const TYPES = { valid: ['base', 'arrow'], default: 'base' };

const VARIANTS = { valid: ['base', 'shaded'], default: 'base' };

export default class ProgressIndicator extends LightningElement {
    @api currentStep = 1;
    @api errorSteps = [];
    @api warningSteps = [];
    @api completedSteps = [];
    @api disabledSteps = [];

    _variant = 'base';
    _type = 'base';

    renderedCallback() {
        this.updateErrorSteps();
        this.updateWarningSteps();
        this.updateCompletedSteps();
        this.updateCurrentStep();
        this.updateDisabledSteps();
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
        return classSet('slds-progress slds-progress_horizontal')
            .add({
                'slds-progress_shade':
                    this._variant === 'shaded' && this._type === 'base'
            })
            .toString();
    }

    getSteps() {
        return Array.from(this.template.querySelectorAll('c-progress-step'));
    }

    updateCurrentStep() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            if (
                parseInt(step.getAttribute('data-step'), 10) ===
                this.currentStep
            ) {
                step.classList.add('slds-is-active');
            }
        });
    }

    updateErrorSteps() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            this.errorSteps.forEach((error) => {
                if (parseInt(step.getAttribute('data-step'), 10) === error) {
                    step.setIcon('utility:error');
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
                    step.classList.add('slds-has-error');
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

    updateDisabledSteps() {
        const steps = this.getSteps();
        steps.forEach((step) => {
            this.disabledSteps.forEach((disabled) => {
                if (parseInt(step.getAttribute('data-step'), 10) === disabled) {
                    step.classList.add('slds-is-disabled');
                }
            });
        });
    }
}
