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
const DEFAULT_STATUS_OPTIONS = [
    {
        label: 'Closed Lost',
        value: 'lost'
    },
    {
        label: 'Closed Won',
        value: 'won'
    }
];

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

    _status;
    _activeStep;
    statusOptions = DEFAULT_STATUS_OPTIONS;
    coachingIsVisible = false;
    computedCurrentStep;

    connectedCallback() {
        this.initSteps();
        this.moveToStep(this.currentStep);
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
        return (
            this.lastStepIsCurrent &&
            (!this._activeStep || this.lastStepIsActive)
        );
    }

    get showSelectButton() {
        return (
            this._activeStep &&
            !this.currentStepIsActive &&
            !this.lastStepIsActive
        );
    }

    get showNextButton() {
        return (
            !this.lastStepIsCurrent &&
            (!this._activeStep || this.currentStepIsActive)
        );
    }

    get showSelectLastStepButton() {
        return !this.lastStepIsCurrent && this.lastStepIsActive;
    }

    get currentStepIndex() {
        return this.steps.findIndex((step) => step.name === this.currentStep);
    }

    get pathClass() {
        return classSet('slds-path slds-path_has-coaching')
            .add({
                'slds-is-expanded': this.coachingIsVisible,
                'slds-is-won': this._status === 'won',
                'slds-is-lost': this._status === 'lost'
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
        const oldStepIndex = this.currentStepIndex;
        const nextStepIndex = oldStepIndex + 1;

        if (nextStepIndex < this.steps.length - 1) {
            this._currentStep = this.steps[nextStepIndex].name;
            this.computedCurrentStep = this.steps[nextStepIndex];
            this._activeStep = undefined;
            this.updateStepsStatus();

            this.dispatchChange(this.steps[oldStepIndex].name);
        } else if (nextStepIndex === this.steps.length - 1) {
            this.openDialog();
        }
    }

    @api
    previous() {
        const oldStepIndex = this.currentStepIndex;
        const previousStepIndex = oldStepIndex - 1;

        if (previousStepIndex >= 0) {
            this._currentStep = this.steps[previousStepIndex].name;
            this.computedCurrentStep = this.steps[previousStepIndex];
            this._activeStep = undefined;
            this._status = undefined;

            this.updateStepsStatus();
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

    initTooltips() {
        this.steps.forEach((step) => {
            if (step.tooltip) {
                step.tooltip.initialize();
            }
        });
    }

    updateStepsStatus() {
        const isLost = this._status === 'lost';
        const isWon = this._status === 'won';
        let currentStepPassed = false;

        this.steps.forEach((step) => {
            let isActive = false;
            step.isCurrentStep = step.name === this.currentStep;

            if (this.format === 'linear' && step.isCurrentStep) {
                currentStepPassed = true;
            }

            if (this._activeStep && this._activeStep.name === step.name) {
                isActive = true;
            }

            step.isComplete =
                this.format === 'linear' &&
                ((isWon && !step.isCurrentStep) ||
                    (!currentStepPassed && !isLost));

            step.class = classSet('slds-path__item')
                .add({
                    'slds-is-complete': step.isComplete,
                    'slds-is-current': step.isCurrentStep,
                    'slds-is-incomplete':
                        !step.isCurrentStep &&
                        (this.format === 'non-linear' ||
                            currentStepPassed ||
                            isLost),
                    'slds-is-active':
                        ((isWon || isLost) && step.isCurrentStep) ||
                        isActive ||
                        (step.isCurrentStep && !this._activeStep),
                    'slds-is-won': isWon && step.isCurrentStep
                })
                .toString();
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

    hideDialog() {
        this.template.querySelector('c-dialog').hide();
    }

    openDialog() {
        this.template.querySelector('c-dialog').show();
    }

    handleSaveDialog() {
        const combobox = this.template.querySelector('lightning-combobox');
        this._status = combobox.value;

        const currentStep = this.steps[this.steps.length - 1];
        this.computedCurrentStep = currentStep;
        this._currentStep = currentStep.name;
        this._activeStep = undefined;

        this.updateStepsStatus();
        this.hideDialog();
        this.dispatchEvent(
            new CustomEvent('close', {
                detail: {
                    value: this._status
                }
            })
        );
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
        const currentStep = this.currentStep;
        const nextStep = this._activeStep.name;
        this._activeStep = undefined;
        this._status = undefined;

        this.moveToStep(nextStep);
        this.dispatchChange(currentStep);
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
