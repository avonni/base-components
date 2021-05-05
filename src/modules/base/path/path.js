import { LightningElement, api } from 'lwc';
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
const DEFAULT_PATH_UPDATE_BUTTON_LABEL = 'Mark as Complete';

// TODO:
// Handle toggle button
// Change click on step
// Modal on complete and won/lost status
// Tests

export default class Path extends LightningElement {
    @api pathUpdateButtonIconName;

    _currentStep;
    _disabled = false;
    _format = FORMATS.default;
    _keyFieldsLabel = DEFAULT_KEYFIELDS_LABEL;
    _guidanceLabel = DEFAULT_GUIDANCE_LABEL;
    _hidePathUpdateButton = false;
    _pathUpdateButtonLabel = DEFAULT_PATH_UPDATE_BUTTON_LABEL;
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
    get hidePathUpdateButton() {
        return this._hidePathUpdateButton;
    }
    set hidePathUpdateButton(bool) {
        this._hidePathUpdateButton = normalizeBoolean(bool);
    }

    @api
    get pathUpdateButtonLabel() {
        return this._pathUpdateButtonLabel;
    }
    set pathUpdateButtonLabel(value) {
        this._pathUpdateButtonLabel =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_PATH_UPDATE_BUTTON_LABEL;
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
            step.isCurrentStep = step.name === this.currentStep;

            if (this.format === 'linear' && step.isCurrentStep) {
                currentStepPassed = true;
            }

            step.class = classSet('slds-path__item').add({
                'slds-is-complete':
                    this.format === 'linear' && !currentStepPassed,
                'slds-is-active slds-is-current': step.isCurrentStep,
                'slds-is-incomplete':
                    currentStepPassed || this.format === 'non-linear'
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
            const currentStep = this.currentStep;
            const nextStep = event.currentTarget.dataset.stepName;
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

    handleToggleCoaching() {
        console.log('toggle coaching');
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
