import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
// import { classSet } from 'c/utils';

const POSITIONS = ['left', 'right'];
const BUTTON_VARIANTS = [
    'bare',
    'neutral',
    'brand',
    'brand-outline',
    'inverse',
    'destructive',
    'destructive-text',
    'success'
];
const INDICATOR_TYPES = [
    'base',
    'base-shaded',
    'path',
    'bullet',
    'fractions',
    'bar'
];

// QUESTIONS:
// Current step: reference to name and not value?
// Button position middle: where goes the indicator?
// Button alignment bump: bumps to other side of the indicator?
// Indicator type: bullet => similar to a carousel?

export default class Wizard extends LightningElement {
    // TODO:
    @api variant;
    @api buttonPosition;
    _buttonAlignmentBump;

    @api title;
    @api buttonPreviousIconName;
    @api buttonNextIconName;
    @api buttonFinishIconName;

    _currentStep;
    _indicatorType = 'base';
    _hideIndicator;
    _buttonPreviousIconPosition = 'left';
    _buttonPreviousLabel = 'Previous';
    _buttonPreviousVariant = 'neutral';
    _buttonNextIconPosition = 'left';
    _buttonNextLabel = 'Next';
    _buttonNextVariant = 'neutral';
    _buttonFinishIconPosition = 'left';
    _buttonFinishLabel = 'Finish';
    _buttonFinishVariant = 'neutral';
    _fractionPrefixLabel = 'Steps';
    _fractionLabel = 'of';
    _rendered;

    steps;
    lastStep;
    progressIndicatorVariant = 'base';
    progressIndicatorType = 'base';
    progressBarValue = 0;
    fractionCurrentStep;
    fractionTotalSteps;
    showBulletIndicator;
    showProgressIndicator;
    showFractionIndicator;
    showBarIndicator;
    hidePreviousButton;
    hideNextFinishButton;

    renderedCallback() {
        if (!this._rendered) {
            this._rendered = true;

            this.steps = this.template
                .querySelector('slot:not([name])')
                .assignedElements();
            this.steps.forEach((step, index) => {
                step.name = step.name || `step-${index}`;
            });

            // If no current step was given, sets current step to first step.
            if (this.currentStepIndex === -1) {
                this._currentStep = this.steps[0].name;
            }

            this._initIndicator();
            this._updateSteps();
        }
    }

    _initIndicator() {
        switch (this.indicatorType) {
            case 'base-shaded':
                this.showProgressIndicator = true;
                this.progressIndicatorVariant = 'shaded';
                this.progressIndicatorType = 'base';
                break;
            case 'path':
                this.showProgressIndicator = true;
                this.progressIndicatorType = 'path';
                break;
            case 'bullet':
                this.showBulletIndicator = true;
                break;
            case 'fractions':
                this.showFractionIndicator = true;
                this.fractionTotalSteps = this.steps.length;
                break;
            case 'bar':
                this.showBarIndicator = true;
                break;
            default:
                this.showProgressIndicator = true;
                break;
        }
    }

    _updateSteps() {
        const currentStepComponent = this.steps[this.currentStepIndex];

        this.lastStep =
            this.currentStepIndex === this.steps.length - 1 ? true : false;
        this.progressBarValue =
            (this.currentStepIndex / (this.steps.length - 1)) * 100;
        this.fractionCurrentStep = this.currentStepIndex + 1;
        this.hidePreviousButton = currentStepComponent.hidePreviousButton;
        this.hideNextFinishButton = currentStepComponent.hideNextFinishButton;

        this.steps.forEach((step) =>
            step.setAttribute('style', 'display: none;')
        );
        currentStepComponent.setAttribute('style', '');
    }

    get currentStepIndex() {
        const stepNames = this.steps.map((step) => step.name);
        return stepNames.indexOf(this.currentStep);
    }

    get showIndicator() {
        return this.steps && !this.hideIndicator;
    }

    @api
    get currentStep() {
        return this._currentStep;
    }
    set currentStep(name) {
        this._currentStep = name;
    }

    @api
    get indicatorType() {
        return this._indicatorType;
    }
    set indicatorType(type) {
        this._indicatorType = normalizeString(type, {
            fallbackValue: 'base',
            validValues: INDICATOR_TYPES
        });
    }

    @api
    get hideIndicator() {
        return this._hideIndicator;
    }
    set hideIndicator(boolean) {
        this._hideIndicator = normalizeBoolean(boolean);
    }

    @api
    get buttonPreviousIconPosition() {
        return this._buttonPreviousIconPosition;
    }
    set buttonPreviousIconPosition(position) {
        this._buttonPreviousIconPosition = normalizeString(position, {
            fallbackValue: 'left',
            validValues: POSITIONS
        });
    }

    @api
    get buttonPreviousLabel() {
        return this._buttonPreviousLabel;
    }
    set buttonPreviousLabel(label) {
        this._buttonPreviousLabel = label;
    }

    @api
    get buttonPreviousVariant() {
        return this._buttonPreviousVariant;
    }
    set buttonPreviousVariant(variant) {
        this._buttonPreviousVariant = normalizeString(variant, {
            fallbackValue: 'neutral',
            validValues: BUTTON_VARIANTS
        });
    }

    @api
    get buttonNextIconPosition() {
        return this._buttonNextIconPosition;
    }
    set buttonNextIconPosition(position) {
        this._buttonNextIconPosition = normalizeString(position, {
            fallbackValue: 'left',
            validValues: POSITIONS
        });
    }

    @api
    get buttonNextLabel() {
        return this._buttonNextLabel;
    }
    set buttonNextLabel(label) {
        this._buttonNextLabel = label;
    }

    @api
    get buttonNextVariant() {
        return this._buttonNextVariant;
    }
    set buttonNextVariant(variant) {
        this._buttonNextVariant = normalizeString(variant, {
            fallbackValue: 'neutral',
            validValues: BUTTON_VARIANTS
        });
    }

    @api
    get buttonFinishIconPosition() {
        return this._buttonFinishIconPosition;
    }
    set buttonFinishIconPosition(position) {
        this._buttonFinishIconPosition = normalizeString(position, {
            fallbackValue: 'left',
            validValues: POSITIONS
        });
    }

    @api
    get buttonFinishLabel() {
        return this._buttonFinishLabel;
    }
    set buttonFinishLabel(label) {
        this._buttonFinishLabel = label;
    }

    @api
    get buttonFinishVariant() {
        return this._buttonFinishVariant;
    }
    set buttonFinishVariant(variant) {
        this._buttonFinishVariant = normalizeString(variant, {
            fallbackValue: 'neutral',
            validValues: BUTTON_VARIANTS
        });
    }

    @api
    get buttonAlignmentBump() {
        return this._buttonAlignmentBump;
    }
    set buttonAlignmentBump(position) {
        this._buttonAlignmentBump = normalizeString(position, {
            fallbackValue: null,
            validValues: POSITIONS
        });
    }

    @api
    get fractionPrefixLabel() {
        return this._fractionPrefixLabel;
    }
    set fractionPrefixLabel(prefix) {
        this._fractionPrefixLabel = prefix;
    }

    @api
    get fractionLabel() {
        return this._fractionLabel;
    }
    set fractionLabel(label) {
        this._fractionLabel = label;
    }

    handlePreviousNextClick(event) {
        const oldStep = this.currentStep;
        const button = event.currentTarget.dataset.label;

        if (button === 'previous') {
            // If user clicks 'previous' on first step, currentStep === oldStep
            this._currentStep =
                this.currentStepIndex === 0
                    ? this._currentStep
                    : this.steps[this.currentStepIndex - 1].name;
        } else {
            this._currentStep = this.steps[this.currentStepIndex + 1].name;
        }

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    currentStep: this.currentStep,
                    oldStep: oldStep
                },
                bubbles: false,
                cancelable: false,
                composed: false
            })
        );

        this._updateSteps();
    }

    handleFinishClick() {
        this.dispatchEvent(
            new CustomEvent('complete', {
                bubbles: false,
                cancelable: false,
                composed: false
            })
        );
    }
}
