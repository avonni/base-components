import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';

const HORIZONTAL_POSITIONS = ['left', 'right'];
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

export default class WizardNavigation extends LightningElement {
    @api buttonPreviousIconName;
    @api buttonNextIconName;
    @api buttonFinishIconName;

    _rendered;
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
    _buttonAlignmentBump;
    _actionPosition = 'left';
    _fractionPrefixLabel = 'Steps';
    _fractionLabel = 'of';

    steps;
    currentStep;
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
    previousButtonColClass;
    progressColClass = 'slds-text-align_left';
    actionsNextFinishButtonColClass;
    actionsSlotColClass;
    nextFinishButtonColClass;

    connectedCallback() {
        // Apply buttonAlignmentBump and actionPosition.
        this._reorderColumns();

        const navigationRegister = new CustomEvent('wizardnavigationregister', {
            bubbles: true,
            detail: {
                callbacks: {
                    setSteps: this.setSteps,
                    setCurrentStep: this.setCurrentStep
                }
            }
        });

        this.dispatchEvent(navigationRegister);
    }

    renderedCallback() {
        // steps and currentStep are set automatically by the parent avonni-wizard
        if (!this._rendered && this.steps) {
            this._rendered = true;
            this._initIndicator();
            this._updateSteps();
        }
    }

    setSteps = (value) => {
        this.steps = value;
    };
    setCurrentStep = (value) => {
        this.currentStep = value;
    };

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
        const currentStepIndex = this.currentStepIndex;
        const currentStep = this.steps[currentStepIndex];

        this.lastStep =
            currentStepIndex === this.steps.length - 1 ? true : false;
        this.progressBarValue =
            (currentStepIndex / (this.steps.length - 1)) * 100;
        this.fractionCurrentStep = currentStepIndex + 1;
        this.hidePreviousButton = currentStep.hidePreviousButton;
        this.hideNextFinishButton = currentStep.hideNextFinishButton;

        // Add info to step for bullet variant
        if (this.indicatorType === 'bullet') {
            this.steps.forEach((step) => {
                step.selected = false;
                step.bulletClass = 'slds-carousel__indicator-action';
            });
            currentStep.selected = true;
            currentStep.bulletClass =
                'slds-carousel__indicator-action slds-is-active';
        }
    }

    _reorderColumns() {
        const bump = this.buttonAlignmentBump;
        if (bump) {
            this.actionsNextFinishButtonColClass =
                bump === 'right' ? 'slds-order_3' : 'slds-order_2';
            this.progressColClass =
                bump === 'right'
                    ? 'slds-order_1 slds-text-align_left'
                    : 'slds-order_3 slds-text-align_right';
            this.previousButtonColClass =
                bump === 'right' ? 'slds-order_2' : 'slds-order_1';
        }

        if (this.actionPosition === 'right') {
            this.nextFinishButtonColClass = 'slds-order_1';
            this.actionsSlotColClass = 'slds-order_2';
        }
    }

    get currentStepIndex() {
        const stepNames = this.steps.map((step) => step.name);
        return stepNames.indexOf(this.currentStep);
    }

    get showIndicator() {
        return this.steps && !this.hideIndicator;
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
            validValues: HORIZONTAL_POSITIONS
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
            validValues: HORIZONTAL_POSITIONS
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
            validValues: HORIZONTAL_POSITIONS
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
            validValues: HORIZONTAL_POSITIONS
        });
    }

    @api
    get actionPosition() {
        return this._actionPosition;
    }
    set actionPosition(position) {
        this._actionPosition = normalizeString(position, {
            fallbackValue: 'left',
            validValues: HORIZONTAL_POSITIONS
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
            this.currentStep =
                this.currentStepIndex === 0
                    ? this.currentStep
                    : this.steps[this.currentStepIndex - 1].name;
        } else {
            this.currentStep = this.steps[this.currentStepIndex + 1].name;
        }

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    currentStep: this.currentStep,
                    oldStep: oldStep
                },
                bubbles: true,
                cancelable: false,
                composed: false
            })
        );

        this._updateSteps();
    }

    handleFinishClick() {
        this.dispatchEvent(
            new CustomEvent('complete', {
                bubbles: true,
                cancelable: false,
                composed: false
            })
        );
    }
}
