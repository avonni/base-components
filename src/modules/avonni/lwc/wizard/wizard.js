import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from '../utilsPrivate/normalize';
import BaseView from './base.html';
import ModalView from './modal.html';
import CardView from './card.html';

const VARIANTS = ['base', 'modal', 'card'];
const VERTICAL_POSITIONS = ['header', 'footer'];

// QUESTIONS:
// If beforeChange returns an error, should we display it somewhere? In the console? In the step?
// In modal, if iconName, change default header for media object? => icon centered

export default class Wizard extends LightningElement {
    @api title;
    @api iconName;
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

    _variant;
    _indicatorPosition;
    _currentStep;

    steps = [];
    showWizard = true;

    handleStepRegister(event) {
        event.stopPropagation();

        const step = event.detail;
        this.steps.push(step);

        this._initSteps();
    }

    connectedCallback() {
        if (this.variant === 'modal') this.hide();
    }

    render() {
        if (this.variant === 'modal') {
            return ModalView;
        } else if (this.variant === 'card') {
            return CardView;
        }
        return BaseView;
    }

    _initSteps() {
        // Make sure all steps have a name
        this.steps.forEach((step, index) => {
            step.name = step.name || `step-${index}`;
        });

        // If no current step was given, set current step to first step
        if (this.currentStepIndex === -1) {
            this._currentStep = this.steps[0].name;
        }
        this._updateStepDisplay();
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

    get indicatorInHeader() {
        return this.indicatorPosition === 'header';
    }

    @api
    get currentStep() {
        return this._currentStep;
    }
    set currentStep(name) {
        this._currentStep = name;
    }

    @api
    get hideNavigation() {
        return this._hideNavigation;
    }
    set hideNavigation(boolean) {
        this._hideNavigation = normalizeBoolean(boolean);
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: 'base',
            validValues: VARIANTS
        });
    }

    @api
    get indicatorPosition() {
        return this._indicatorPosition;
    }
    set indicatorPosition(position) {
        this._indicatorPosition = normalizeString(position, {
            fallbackValue: 'footer',
            validValues: VERTICAL_POSITIONS
        });
    }

    @api
    show() {
        this.showWizard = true;
    }

    @api
    hide() {
        this.showWizard = false;
        this.steps = [];
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

    handleCloseDialog() {
        this.hide();
    }
}
