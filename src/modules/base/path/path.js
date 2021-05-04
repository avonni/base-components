import { LightningElement, api } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';

const FORMATS = {
    valid: ['linear', 'non-linear'],
    default: 'linear'
};

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};

// QUESTIONS:
// Round radius for path update button?
// Slot and path-step to allow for more styling?
// Style of the screenshot, or style of LDS?

export default class Path extends LightningElement {
    @api keyFieldsLabel;
    @api guidanceLabel;
    @api pathUpdateButtonLabel;
    @api pathUpdateButtonIconName;

    _currentStep;
    _disabled = false;
    _format = FORMATS.default;
    _hidePathUpdateButton = false;
    _pathUpdateButtonIconPosition = ICON_POSITIONS.default;
    _steps = [];
    _actions = [];

    computedCurrentStep;

    connectedCallback() {
        this.initSteps();
        this.moveToStep(this.currentStep);
    }

    @api
    get currentStep() {
        return this._currentStep;
    }
    set currentStep(value) {
        if (typeof value === 'string') {
            this._currentStep = value;
        }
    }

    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(bool) {
        this._disabled = normalizeBoolean(bool);
    }

    @api
    get format() {
        return this._format;
    }
    set format(value) {
        this._format = normalizeString(value, {
            fallbackValue: FORMATS.default,
            validValues: FORMATS.valid
        });
    }

    @api
    get hidePathUpdateButton() {
        return this._hidePathUpdateButton;
    }
    set hidePathUpdateButton(bool) {
        this._hidePathUpdateButton = normalizeBoolean(bool);
    }

    @api
    get pathUpdateButtonIconPosition() {
        return this._pathUpdateButtonIconPosition;
    }
    set pathUpdateButtonIconPosition(value) {
        this._pathUpdateButtonIconPosition = normalizeString(value, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    @api
    get steps() {
        return this._steps;
    }
    set steps(proxy) {
        const array = normalizeArray(proxy);
        this._steps = JSON.parse(JSON.stringify(array));

        if (this.isConnected) this.initSteps();
    }

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);

        if (this.isConnected) this.initSteps();
    }

    @api
    next() {
        const currentStepIndex = this.steps.findIndex(
            (step) => step.name === this.currentStep
        );
        const nextStepIndex = currentStepIndex + 1;

        if (nextStepIndex < this.steps.length) {
            this._currentStep = this.steps[nextStepIndex].name;
            this.computedCurrentStep = this.steps[nextStepIndex];

            if (this.nextStepIndex === this.steps.length - 1) {
                this.dispatchEvent(new CustomEvent('complete'));
            } else {
                this.dispatchChange(this.steps[currentStepIndex].name);
            }
        }
    }

    @api
    previous() {
        const currentStepIndex = this.steps.findIndex(
            (step) => step.name === this.currentStep
        );
        const previousStepIndex = currentStepIndex - 1;

        if (previousStepIndex >= 0) {
            this._currentStep = this.steps[previousStepIndex].name;
            this.computedCurrentStep = this.steps[previousStepIndex];
            this.dispatchChange(this.steps[currentStepIndex].name);
        }
    }

    initSteps() {
        this.steps.forEach((step) => {
            step.actions = normalizeArray(step.actions);
            step.keyFields = normalizeArray(step.keyFields);

            if (!step.hideDefaultActions) {
                step.actions = step.actions.concat(this.actions);
            }
        });
    }

    moveToStep(name) {
        const currentStep = this.steps.find((step) => step.name === name);

        if (currentStep) {
            this._currentStep = name;
            this.computedCurrentStep = currentStep;
        } else {
            // Sets current step to first step
            this._currentStep = this.steps[0].name;
            this.computedCurrentStep = this.steps[0];
        }
    }

    handlePathStepClick(event) {
        if (this.format === 'non-linear' && !this.disabled) {
            const currentStep = this.currentStep;
            const nextStep = event.currentTarget.value;
            this.moveToStep(nextStep);
            this.dispatchChange(currentStep);
        }
    }

    handleActionClick(event) {
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: event.currentTarget.name,
                    targetName: event.currentTarget.dataset.stepName
                }
            })
        );
    }

    dispatchChange(oldStep) {
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    currentStep: this.currentStep,
                    oldStep: oldStep
                }
            })
        );
    }
}
