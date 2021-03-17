import { LightningElement, api } from 'lwc';
import { normalizeString } from '../utilsPrivate/normalize';
import BaseView from './base.html';
import ModalView from './modal.html';
import CardView from './card.html';

const TYPES = ['base', 'modal', 'card'];

// QUESTIONS / TO VALIDATE:
// If beforeChange returns an error, should we display it somewhere? In the console? In the step?
// next/previous methods fire the change/complete event.
// The change event is fired when the user clicks on 'previous' in the first step (with oldStep === currentStep).

export default class Wizard extends LightningElement {
    @api title;
    @api indicatorType;
    @api hideIndicator;
    @api buttonPreviousIconName;
    @api buttonPreviousIconPosition;
    @api buttonPreviousLabel;
    @api buttonPreviousVariant;
    @api buttonNextIconName;
    @api buttonNextIconPosition;
    @api buttonNextLabel;
    @api buttonNextVariant;
    @api buttonFinishIconName;
    @api buttonFinishIconPosition;
    @api buttonFinishLabel;
    @api buttonFinishVariant;
    @api buttonAlignmentBump;
    @api actionPosition;
    @api fractionPrefixLabel;
    @api fractionLabel;

    _rendered;
    _type;
    _currentStep;

    steps = [];

    handleStepRegister(event) {
        event.stopPropagation();

        const step = event.detail;
        this.steps.push(step);
    }

    renderedCallback() {
        if (!this._rendered) {
            this._rendered = true;
            if (this.steps.length === 0) return;

            // Make sure all steps have a name
            this.steps.forEach((step, index) => {
                step.name = step.name || `step-${index}`;
            });

            // If no current step was given, sets current step to first step
            if (this.currentStepIndex === -1) {
                this._currentStep = this.steps[0].name;
            }

            this._updateStepDisplay();
        }
    }

    render() {
        if (this.type === 'modal') {
            return ModalView;
        } else if (this.type === 'card') {
            return CardView;
        }
        return BaseView;
    }

    _updateStepDisplay() {
        this.steps.forEach((step) => {
            step.callbacks.setClass('avonni-wizard-step_hidden');
        });
        this.steps[this.currentStepIndex].callbacks.setClass(undefined);
    }

    get currentStepIndex() {
        const stepNames = this.steps.map((step) => step.name);
        return stepNames.indexOf(this.currentStep);
    }

    @api
    get currentStep() {
        return this._currentStep;
    }
    set currentStep(name) {
        this._currentStep = name;
    }

    @api
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: 'base',
            validValues: TYPES
        });
    }

    @api
    next() {
        const oldStep = this.currentStep;
        this._currentStep = this.steps[this.currentStepIndex + 1].name;

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    currentStep: this.currentStep,
                    oldStep: oldStep
                }
            })
        );

        this._updateStepDisplay();
    }

    @api
    previous() {
        const oldStep = this.currentStep;

        // If user clicks 'previous' on first step, currentStep === oldStep
        this._currentStep =
            this.currentStepIndex === 0
                ? this.currentStep
                : this.steps[this.currentStepIndex - 1].name;

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    currentStep: this.currentStep,
                    oldStep: oldStep
                }
            })
        );

        this._updateStepDisplay();
    }

    beforeChange(step) {
        return new Promise((resolve) => {
            if (!step.callbacks.beforeChange) {
                return resolve(true);
            }

            return resolve(step.callbacks.beforeChange());
        });
    }

    async handleChange(event) {
        // Execute beforeChange function set on the step
        const hasError = !(await this.beforeChange(
            this.steps[this.currentStepIndex]
        ));
        if (hasError) return;

        const action = event.detail.action;

        // eslint-disable-next-line default-case
        switch (action) {
            case 'finish':
                this.dispatchEvent(new CustomEvent('complete'));
                break;
            case 'previous':
                this.previous();
                break;
            case 'next':
                this.next();
                break;
        }
    }
}
