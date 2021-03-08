import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
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

    connectedCallback() {}

    renderedCallback() {
        let elements = Array.from(
            this.template.querySelectorAll('c-progress-step')
        );
        let indexCompleted = 0;

        elements.forEach((element, index) => {
            // element.setAttributes(this.variant === 'shade');

            if (element.getAttribute('data-step') === this.currentStep) {
                indexCompleted = index;
            }

            console.log(index);
        });

        elements.forEach((element, index) => {
            if (indexCompleted > index) {
                element.classList.add('slds-progress__item');
                element.classList.add('slds-is-completed');
                element.setIcon('utility:success');
            } else if (indexCompleted === index) {
                element.classList.add('slds-progress__item');
                element.classList.add('slds-is-active');
            }
        });
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
}
