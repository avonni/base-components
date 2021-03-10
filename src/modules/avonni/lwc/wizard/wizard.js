import { LightningElement, api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
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

// QUESTIONS:
// Current step: reference to name and not value?
// Button position middle: where goes the indicator?
// Button alignment bump: bumps to other side of the indicator?
// Indicator type: bullet => similar to a carousel?

export default class Wizard extends LightningElement {
    // TODO:
    @api variant;
    @api indicatorType;
    @api hideIndicator;
    @api buttonPosition;
    @api fractionPrefixLabel;
    @api fractionLabel;
    _buttonAlignmentBump;

    @api title;
    @api buttonPreviousIconName;
    @api buttonNextIconName;
    @api buttonFinishIconName;

    _currentStep;
    _buttonPreviousIconPosition;
    _buttonPreviousLabel;
    _buttonPreviousVariant;
    _buttonNextIconPosition;
    _buttonNextLabel;
    _buttonNextVariant;
    _buttonFinishIconPosition;
    _buttonFinishLabel;
    _buttonFinishVariant;
    _rendered = false;

    steps;
    lastStep = false;

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
            const stepNames = this.steps.map((step) => step.name);
            if (stepNames.indexOf(this.currentStep) === -1) {
                this._currentStep = this.steps[0].name;
            }
        }
    }

    @api
    get currentStep() {
        return this._currentStep;
    }
    set currentStep(name) {
        this._currentStep = name;
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
        this._buttonPreviousLabel = label || 'Previous';
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
        this._buttonNextLabel = label || 'Next';
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
        this._buttonFinishLabel = label || 'Finish';
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
}
