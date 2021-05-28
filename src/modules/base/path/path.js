import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import { Tooltip } from 'c/tooltipLibrary';

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
const DEFAULT_CHANGE_COMPLETION_OPTION_LABEL = 'Change Completion Status';
const DEFAULT_COMPLETED_OPTION = 'base';

const CONFETTI_FREQUENCY = {
    valid: [
        {
            label: 'rarely',
            value: 0.25
        },
        {
            label: 'sometimes',
            value: 0.5
        },
        {
            label: 'often',
            value: 0.75
        },
        {
            label: 'always',
            value: 1
        }
    ],
    default: {
        label: 'sometimes',
        value: 0.5
    }
};

export default class Path extends LightningElement {
    @api nextButtonIconName;
    @api selectButtonIconName;

    _currentStep;
    _disabled = false;
    _format = FORMATS.default;
    _keyFieldsLabel = DEFAULT_KEYFIELDS_LABEL;
    _guidanceLabel = DEFAULT_GUIDANCE_LABEL;
    _hideCoaching = false;
    _hideButton = false;
    _nextButtonLabel = DEFAULT_NEXT_BUTTON_LABEL;
    _nextButtonIconPosition = ICON_POSITIONS.default;
    _selectButtonLabel = DEFAULT_SELECT_BUTTON_LABEL;
    _selectButtonIconPosition = ICON_POSITIONS.default;
    _changeCompletionStatusLabel = DEFAULT_CHANGE_COMPLETION_OPTION_LABEL;
    _actions = [];
    @track _steps = [];

    _status = DEFAULT_COMPLETED_OPTION;
    _activeStep;
    _candidateStep;
    coachingIsVisible = false;
    computedCurrentStep;
    completedOptions;
    showDialog;

    connectedCallback() {
        this.initSteps();
        this.initCurrentStep(this.currentStep);
    }

    renderedCallback() {
        this.initTooltips();
    }

    @api
    get currentStep() {
        return this._currentStep;
    }
    set currentStep(value) {
        if (typeof value === 'string') {
            this._currentStep = value;

            if (this.isConnected) this.initCurrentStep(this.currentStep);
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
    get hideCoaching() {
        return this._hideCoaching;
    }
    set hideCoaching(bool) {
        this._hideCoaching = normalizeBoolean(bool);
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
    get changeCompletionStatusLabel() {
        return this._changeCompletionStatusLabel;
    }
    set changeCompletionStatusLabel(value) {
        this._changeCompletionStatusLabel =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_CHANGE_COMPLETION_OPTION_LABEL;
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
            this.initCurrentStep(this.currentStep);
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

    get lastStepName() {
        return this.steps[this.steps.length - 1].name;
    }

    get lastStepIsCurrent() {
        return this.lastStepName === this.currentStep;
    }

    get lastStepIsActive() {
        return this._activeStep && this.lastStepName === this._activeStep.name;
    }

    get currentStepIsActive() {
        return this._activeStep && this._activeStep.name === this.currentStep;
    }

    get showChangeCompletionStatusButton() {
        const previousStep = this.steps[this.currentStepIndex - 1];
        return (
            previousStep &&
            previousStep.completedOptions &&
            previousStep.completedOptions.length > 1
        );
    }

    get showSelectButton() {
        return this._activeStep && !this.currentStepIsActive;
    }

    get showNextButton() {
        return (
            !this.lastStepIsCurrent &&
            (!this._activeStep || this.currentStepIsActive)
        );
    }

    get currentStepIndex() {
        return this.steps.findIndex((step) => step.name === this.currentStep);
    }

    get pathClass() {
        const isComplete = this.currentStepIndex === this.steps.length - 1;
        const isLinear = this.format === 'linear';

        return classSet('slds-path slds-path_has-coaching')
            .add({
                'slds-is-expanded': this.coachingIsVisible,
                'slds-is-won':
                    this._status === 'success' && (isComplete || !isLinear),
                'slds-is-lost':
                    this._status === 'error' && (isComplete || !isLinear),
                'path-is-complete': isComplete || !isLinear,
                'path-is-complete_warning':
                    this._status === 'warning' && (isComplete || !isLinear),
                'path-is-complete_offline':
                    this._status === 'offline' && (isComplete || !isLinear),
                'path-is-complete_base':
                    this._status === 'base' && (isComplete || !isLinear)
            })
            .toString();
    }

    get stageTitle() {
        return this._activeStep
            ? this._activeStep.label
            : this.computedCurrentStep.label;
    }

    @api
    next() {
        const toIndex = this.currentStepIndex + 1;

        if (toIndex <= this.steps.length - 1) {
            this.computeMovement({ toIndex });
        }
    }

    @api
    previous() {
        const toIndex = this.currentStepIndex - 1;

        if (toIndex >= 0) {
            this.computeMovement({ toIndex });
        }
    }

    initSteps() {
        this.steps.forEach((step) => {
            step.keyFields = normalizeArray(step.keyFields);
            step.actions = normalizeArray(step.actions);

            if (!step.hideDefaultActions) {
                step.actions = step.actions.concat(this.actions);
            }

            if (step.tooltip) {
                const tooltip = new Tooltip(step.tooltip, {
                    root: this,
                    target: () =>
                        this.template.querySelector(
                            `a[data-step-name=${step.name}]`
                        ),
                    align: { horizontal: 'center' },
                    targetAlign: { horizontal: 'center' }
                });
                step.tooltip = tooltip;
            }
        });
    }

    initCurrentStep(name) {
        const currentStep = this.getStepFromName(name);

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

    initTooltips() {
        this.steps.forEach((step) => {
            if (step.tooltip) {
                step.tooltip.initialize();
            }
        });
    }

    computeMovement({ toIndex, toName }) {
        const toStep = toName
            ? this.getStepFromName(toName)
            : this.steps[toIndex];

        // The completed options come from the step just before the step we are moving to
        const i =
            toIndex || this.steps.findIndex((step) => step.name === toName);
        const options = this.steps[i - 1] && this.steps[i - 1].completedOptions;

        // If there are many completed options, open the dialog
        if (options && options.length > 1) {
            this._candidateStep = toStep;
            this.completedOptions = options;
            this.showDialog = true;
        } else {
            // If there is only one completed option,
            // the new status of the path will be its variant.
            if (options && options.length === 1) {
                this._status = options[0].variant;
                this._completedOptionValue = options[0].value;
            } else {
                // If there is no completed option, the default is used
                this._status = DEFAULT_COMPLETED_OPTION;
                this._completedOptionValue = undefined;
            }

            const fromName = this.currentStep;
            this.moveToStep(toStep.name);
            this.dispatchChange(fromName);
        }
    }

    moveToStep(name) {
        this._currentStep = name;
        this.computedCurrentStep = this.getStepFromName(name);
        this._activeStep = undefined;
        this.updateStepsStatus();
        this.fireConfetti();
    }

    getStepFromName(name) {
        return this.steps.find((step) => step.name === name);
    }

    updateStepsStatus() {
        const base = this._status === 'base';
        const success = this._status === 'success';
        const error = this._status === 'error';
        const warning = this._status === 'warning';
        const offline = this._status === 'offline';
        const linear = this.format === 'linear';

        if (!this._activeStep) this._activeStep = this.computedCurrentStep;

        let currentStepPassed = false;

        this.steps.forEach((step, index) => {
            const isCurrentStep = (step.isCurrentStep =
                step.name === this.currentStep);
            if (linear && isCurrentStep) {
                currentStepPassed = true;
            }

            const isActive = this._activeStep.name === step.name;
            const isComplete = (step.isComplete = linear && !currentStepPassed);
            const isLast = index === this.steps.length - 1;
            const isError = error && isComplete && !isActive;
            const isWarning = warning && isComplete && !isActive;
            const isOffline = offline && isComplete && !isActive;

            step.class = classSet('slds-path__item')
                .add({
                    'slds-is-complete': isComplete && success,
                    'slds-is-current': isCurrentStep,
                    'slds-is-incomplete':
                        !isCurrentStep && (base || !isComplete),
                    'slds-is-active': isActive,
                    path__item_error: isError,
                    path__item_warning: isWarning,
                    path__item_offline: isOffline,
                    path__item: isError || isWarning || isOffline,
                    'path__item-last':
                        (isLast && linear) || (isCurrentStep && !linear)
                })
                .toString();

            if (isWarning || isError) {
                step.iconName = `utility:${this._status}`;
            } else if (isOffline) {
                step.iconName = 'utility:routing_offline';
            } else {
                step.iconName = 'utility:check';
            }
        });
    }

    hideDialog() {
        this._candidateStep = undefined;
        this.showDialog = false;
    }

    fireConfetti() {
        const previousStep = this.steps[this.currentStepIndex - 1];
        const showConfetti = previousStep && previousStep.showConfetti;

        if (showConfetti) {
            const stepFrequency = CONFETTI_FREQUENCY.valid.find((frequency) => {
                return frequency.label === previousStep.confettiFrequency;
            });
            const frequency = stepFrequency
                ? stepFrequency.value
                : CONFETTI_FREQUENCY.default.value;
            const randomConfetti = Math.random() < frequency;
            if (randomConfetti) {
                this.template.querySelector('.path__confetti').fire();
            }
        }
    }

    handleSaveDialog() {
        this._completedOptionValue = this.template.querySelector(
            'lightning-combobox'
        ).value;
        if (!this._completedOptionValue) return;

        // Get the new path status (base, success, etc.)
        const selectedOption = this.completedOptions.find(
            (option) => option.value === this._completedOptionValue
        );
        this._status = selectedOption.variant;

        // Save the current step to dispatch it later
        const previousStep = this.currentStep;

        // Go to new step
        this.moveToStep(this._candidateStep.name);
        this.hideDialog();
        this.dispatchChange(previousStep);
    }

    handleChangeCompletionStatus() {
        const previousStep = this.steps[this.currentStepIndex - 1];
        this.completedOptions = previousStep.completedOptions;
        this._candidateStep = this.computedCurrentStep;
        this.showDialog = true;
    }

    handlePathStepClick(event) {
        event.preventDefault();

        if (!this.disabled) {
            const name = event.currentTarget.dataset.stepName;
            this._activeStep = this.steps.find((step) => step.name === name);
            this.updateStepsStatus();
        }
    }

    handleSelectButtonClick() {
        const toName = this._activeStep.name;
        this.computeMovement({ toName });
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
                    oldStep: oldStep,
                    completedValue: this._completedOptionValue,
                    lastStep: this.lastStepIsCurrent
                }
            })
        );
    }
}
