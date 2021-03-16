import { LightningElement, api } from 'lwc';

export default class Wizard extends LightningElement {
    _rendered;
    _currentStep;

    steps = [];
    navigation;

    handleStepRegister(event) {
        event.stopPropagation();

        const step = event.detail;
        this.steps.push(step);
    }

    handleNavigationRegister(event) {
        event.stopPropagation();

        this.navigation = event.detail;
        this.navigation.callbacks.registerChange(this.handleChange);
        this.navigation.callbacks.registerComplete(this.handleComplete);
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
            this.navigation.callbacks.setSteps(this.steps);
            this.navigation.callbacks.setCurrentStep(this.currentStep);
        }
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

    handleChange = (event) => {
        this._currentStep = event.detail.currentStep;
        this._updateStepDisplay();

        this.dispatchEvent(event);
    };

    handleComplete = (event) => {
        this.dispatchEvent(event);
    };
}
