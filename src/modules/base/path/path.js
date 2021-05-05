import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const FORMATS = {
    valid: ['linear', 'non-linear'],
    default: 'linear'
};

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};

const DEFAULT_KEYFIELDS_LABEL = 'Key Fields';
const DEFAULT_GUIDANCE_LABEL = 'Guidance for Success';
const DEFAULT_NEXT_BUTTON_LABEL = 'Mark as Complete';
const DEFAULT_SELECT_BUTTON_LABEL = 'Mark as Current Stage';

// TODO:
// Modal on complete and won/lost status
// Tests

export default class Path extends LightningElement {
    @api nextButtonIconName;
    @api selectButtonIconName;

    _currentStep;
    _disabled = false;
    _format = FORMATS.default;
    _keyFieldsLabel = DEFAULT_KEYFIELDS_LABEL;
    _guidanceLabel = DEFAULT_GUIDANCE_LABEL;
    _hideButton = false;
    _nextButtonLabel = DEFAULT_NEXT_BUTTON_LABEL;
    _nextButtonIconPosition = ICON_POSITIONS.default;
    _selectButtonLabel = DEFAULT_SELECT_BUTTON_LABEL;
    _selectButtonIconPosition = ICON_POSITIONS.default;
    _actions = [];
    @track _steps = [];

    activeStep;
    coachingIsVisible = false;
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

            if (this.isConnected) this.moveToStep(this.currentStep);
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
    get keyFieldsLabel() {
        return this._keyFieldsLabel;
    }
    set keyFieldsLabel(value) {
        this._keyFieldsLabel =
            typeof value === 'string' ? value.trim() : DEFAULT_KEYFIELDS_LABEL;
    }

    @api
    get guidanceLabel() {
        return this._guidanceLabel;
    }
    set guidanceLabel(value) {
        this._guidanceLabel =
            typeof value === 'string' ? value.trim() : DEFAULT_GUIDANCE_LABEL;
    }

    @api
    get hideButton() {
        return this._hideButton;
    }
    set hideButton(bool) {
        this._hideButton = normalizeBoolean(bool);
    }

    @api
    get nextButtonLabel() {
        return this._nextButtonLabel;
    }
    set nextButtonLabel(value) {
        this._nextButtonLabel =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_NEXT_BUTTON_LABEL;
    }

    @api
    get nextButtonIconPosition() {
        return this._nextButtonIconPosition;
    }
    set nextButtonIconPosition(value) {
        this._nextButtonIconPosition = normalizeString(value, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    @api
    get selectButtonLabel() {
        return this._selectButtonLabel;
    }
    set selectButtonLabel(value) {
        this._selectButtonLabel =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_SELECT_BUTTON_LABEL;
    }

    @api
    get selectButtonIconPosition() {
        return this._selectButtonIconPosition;
    }
    set selectButtonIconPosition(value) {
        this._selectButtonIconPosition = normalizeString(value, {
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

        if (this.isConnected) {
            this.initSteps();
            this.moveToStep(this.currentStep);
        }
    }

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);

        if (this.isConnected) this.initSteps();
    }

    get toggleCoachingIcon() {
        return this.coachingIsVisible
            ? 'utility:chevrondown'
            : 'utility:chevronright';
    }

    get showSelectButton() {
        return this.activeStep && this.activeStep.name !== this.currentStep;
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
            this.updateStepsStatus();

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
            this.updateStepsStatus();
            this.dispatchChange(this.steps[currentStepIndex].name);
        }
    }

    initSteps() {
        this.steps.forEach((step) => {
            step.keyFields = normalizeArray(step.keyFields);
            step.actions = normalizeArray(step.actions);

            if (!step.hideDefaultActions) {
                step.actions = step.actions.concat(this.actions);
            }
        });
    }

    updateStepsStatus() {
        let currentStepPassed = false;

        this.steps.forEach((step) => {
            let isActive = false;
            step.isCurrentStep = step.name === this.currentStep;

            if (this.format === 'linear' && step.isCurrentStep) {
                currentStepPassed = true;
            }

            if (this.activeStep && this.activeStep.name === step.name) {
                isActive = true;
            }

            step.class = classSet('slds-path__item').add({
                'slds-is-complete':
                    this.format === 'linear' && !currentStepPassed,
                'slds-is-current': step.isCurrentStep,
                'slds-is-incomplete':
                    !step.isCurrentStep &&
                    (this.format === 'non-linear' || currentStepPassed),
                'slds-is-active':
                    isActive || (step.isCurrentStep && !this.activeStep)
            });
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

        this.updateStepsStatus();
    }

    handlePathStepClick(event) {
        event.preventDefault();

        if (!this.disabled) {
            const name = event.currentTarget.dataset.stepName;
            this.activeStep = this.steps.find((step) => step.name === name);
            this.updateStepsStatus();
        }
    }

    handleSelectButtonClick() {
        const currentStep = this.currentStep;
        const nextStep = this.activeStep.name;
        this.moveToStep(nextStep);
        this.dispatchChange(currentStep);
        this.activeStep = undefined;
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

    handleToggleCoaching() {
        this.coachingIsVisible = !this.coachingIsVisible;
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
