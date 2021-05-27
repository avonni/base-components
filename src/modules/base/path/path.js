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
const DEFAULT_SELECT_LAST_STEP_BUTTON_LABEL = 'Select Closed Stage';
const DEFAULT_CHANGE_CLOSED_STATUS_BUTTON_LABEL = 'Change Closed Stage';

export default class Path extends LightningElement {
    @api nextButtonIconName;
    @api selectButtonIconName;
    @api selectLastStepButtonIconName;
    @api changeClosedStatusButtonIconName;

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
    _selectLastStepButtonLabel = DEFAULT_SELECT_LAST_STEP_BUTTON_LABEL;
    _selectLastStepButtonIconPosition = ICON_POSITIONS.default;
    _changeClosedStatusButtonLabel = DEFAULT_CHANGE_CLOSED_STATUS_BUTTON_LABEL;
    _changeClosedStatusButtonIconPosition = ICON_POSITIONS.default;
    _actions = [];
    @track _steps = [];

    _status = 'success';
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
    get selectLastStepButtonLabel() {
        return this._selectLastStepButtonLabel;
    }
    set selectLastStepButtonLabel(value) {
        this._selectLastStepButtonLabel =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_SELECT_LAST_STEP_BUTTON_LABEL;
    }

    @api
    get selectLastStepButtonIconPosition() {
        return this._selectLastStepButtonIconPosition;
    }
    set selectLastStepButtonIconPosition(value) {
        this._selectLastStepButtonIconPosition = normalizeString(value, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    @api
    get changeClosedStatusButtonLabel() {
        return this._changeClosedStatusButtonLabel;
    }
    set changeClosedStatusButtonLabel(value) {
        this._changeClosedStatusButtonLabel =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_CHANGE_CLOSED_STATUS_BUTTON_LABEL;
    }

    @api
    get changeClosedStatusButtonIconPosition() {
        return this._changeClosedStatusButtonIconPosition;
    }
    set changeClosedStatusButtonIconPosition(value) {
        this._changeClosedStatusButtonIconPosition = normalizeString(value, {
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

    get showChangeClosedStatusButton() {
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
        const isClosed = this.currentStepIndex === this.steps.length - 1;
        return classSet('slds-path slds-path_has-coaching')
            .add({
                'slds-is-expanded': this.coachingIsVisible,
                'slds-is-won': this._status === 'success' && isClosed,
                'slds-is-lost': this._status === 'error' && isClosed,
                'path-is-closed': isClosed,
                'path-is-closed_warning':
                    isClosed && this._status === 'warning',
                'path-is-closed_offline':
                    isClosed && this._status === 'offline',
                'path-is-closed_base': isClosed && this._status === 'base'
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
        const oldStepIndex = this.currentStepIndex;
        const previousStepIndex = oldStepIndex - 1;

        if (previousStepIndex >= 0) {
            const previousStep = this.steps[previousStepIndex];
            this.moveToStep(previousStep.name);
            this.dispatchChange(this.steps[oldStepIndex].name);
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
            // the new status of the path will be its variant
            if (options && options.length === 1) {
                this._status = options[0].variant;
            }
            // If there is no completed option, the current status is kept

            this.dispatchChange(this.currentStep);
            this.moveToStep(toStep.name);
        }
    }

    moveToStep(name) {
        this._currentStep = name;
        this.computedCurrentStep = this.getStepFromName(name);
        this._activeStep = undefined;
        this.updateStepsStatus();
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
                    'path__item-last': isLast
                })
                .toString();

            if (isWarning || isError || isOffline) {
                step.iconName = `utility:${this._status}`;
            } else {
                step.iconName = 'utility:check';
            }
        });
    }

    hideDialog() {
        this._candidateStep = undefined;
        this.showDialog = false;
    }

    handleSaveDialog() {
        const value = this.template.querySelector('lightning-combobox').value;
        if (!value) return;

        // Get the new path status
        const selectedOption = this.completedOptions.find(
            (option) => option.value === value
        );
        this._status = selectedOption.variant;

        // Save the current step to dispatch it later
        const previousStep = this.currentStep;

        // Go to new step
        this._currentStep = this._candidateStep.name;
        this.computedCurrentStep = this._candidateStep;
        this._activeStep = undefined;

        this.updateStepsStatus();
        this.hideDialog();
        this.dispatchChange(previousStep);
    }

    handleChangeClosedStatus() {
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
                    oldStep: oldStep
                }
            })
        );
    }
}
