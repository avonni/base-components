import { LightningElement, api } from 'lwc';

export default class Wizard extends LightningElement {
    _rendered;
    _currentStep;

    steps;

    renderedCallback() {
        const slot = this.template.querySelector('slot:not([name])');

        if (!this._rendered && slot) {
            this._rendered = true;
            const slotElements = slot.assignedElements();
            this.steps = slotElements.filter(
                (element) => element.tagName === 'AVONNI-WIZARD-STEP'
            );

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
            this._linkNavigation(slotElements);
        }
    }

    _updateStepDisplay() {
        this.steps.forEach((step) => {
            step.setAttribute('style', 'display: none;');
        });
        this.steps[this.currentStepIndex].removeAttribute('style');
    }

    _linkNavigation(slotElements) {
        const navigation = slotElements.find(
            (element) => element.tagName === 'AVONNI-WIZARD-NAVIGATION'
        );
        if (!navigation) return;

        navigation.steps = this.steps;
        navigation.currentStep = this.currentStep;

        navigation.addEventListener('change', (event) => {
            this._currentStep = event.detail.currentStep;
            this._updateStepDisplay();

            this.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        currentStep: this._currentStep,
                        oldStep: event.detail.oldStep
                    },
                    bubbles: false,
                    cancelable: false,
                    composed: false
                })
            );
        });
        navigation.addEventListener('complete', () => {
            this.dispatchEvent(
                new CustomEvent('complete', {
                    bubbles: false,
                    cancelable: false,
                    composed: false
                })
            );
        });
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
}
