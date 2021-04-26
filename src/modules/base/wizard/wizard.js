import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import BaseView from './base.html';
import ModalView from './modal.html';
import CardView from './card.html';
import { classSet } from '../utils/classSet';

const VARIANTS = {
    valid: ['base', 'modal', 'card'],
    default: 'base'
};
const INDICATOR_POSITIONS = {
    valid: ['top', 'bottom', 'right', 'left'],
    default: 'bottom'
};

const INDICATOR_TYPES = {
    valid: ['base', 'base-shaded', 'path', 'bullet', 'fractions', 'bar'],
    default: 'base'
};

const BUTTON_VARIANTS = {
    valid: [
        'bare',
        'neutral',
        'brand',
        'brand-outline',
        'inverse',
        'destructive',
        'destructive-text',
        'success'
    ],
    defaultButtonPrevious: 'neutral',
    defaultButtonNext: 'neutral',
    defaultButtonFinish: 'neutral'
};

const POSITIONS = {
    valid: ['left', 'right'],
    defaultButtonPreviousIcon: 'left',
    defaultButtonNextIcon: 'left',
    defaultButtonFinishIcon: 'left',
    defaultAction: 'left'
};

const DEFAULT_BUTTON_PREVIOUS_LABEL = 'Previous';
const DEFAULT_BUTTON_NEXT_LABEL = 'Next';
const DEFAULT_BUTTON_FINISH_LABEL = 'Finish';
const DEFAULT_FRACTION_PREFIX_LABEL = 'Step';
const DEFAULT_FRACTION_LABEL = 'of';

export default class Wizard extends LightningElement {
    @api title;
    @api iconName;
    @api buttonPreviousIconName;
    @api buttonNextIconName;
    @api buttonFinishIconName;

    _variant = VARIANTS.default;
    _hideNavigation = false;
    _indicatorPosition = INDICATOR_POSITIONS.default;
    _indicatorType = INDICATOR_TYPES.default;
    _hideIndicator = false;
    _currentStep;
    _initialCurrentStep;
    _buttonPreviousIconPosition = POSITIONS.defaultButtonPreviousIcon;
    _buttonPreviousLabel = DEFAULT_BUTTON_PREVIOUS_LABEL;
    _buttonPreviousVariant = BUTTON_VARIANTS.defaultButtonPrevious;
    _buttonNextIconPosition = POSITIONS.defaultButtonNextIcon;
    _buttonNextLabel = DEFAULT_BUTTON_NEXT_LABEL;
    _buttonNextVariant = BUTTON_VARIANTS.defaultButtonNext;
    _buttonFinishIconPosition = POSITIONS.defaultButtonFinishIcon;
    _buttonFinishLabel = DEFAULT_BUTTON_FINISH_LABEL;
    _buttonFinishVariant = BUTTON_VARIANTS.defaultButtonFinish;
    _buttonAlignmentBump;
    _actionPosition = POSITIONS.defaultAction;
    _fractionPrefixLabel = DEFAULT_FRACTION_PREFIX_LABEL;
    _fractionLabel = DEFAULT_FRACTION_LABEL;

    steps = [];
    showWizard = true;
    errorMessage;

    handleStepRegister(event) {
        event.stopPropagation();

        const step = event.detail;
        this.steps.push(step);

        this._initSteps();
    }

    connectedCallback() {
        if (this.variant === 'modal') this.hide();
    }

    render() {
        if (this.variant === 'modal') {
            return ModalView;
        } else if (this.variant === 'card') {
            return CardView;
        }
        return BaseView;
    }

    _initSteps() {
        // Make sure all steps have a name
        this.steps.forEach((step, index) => {
            step.name = step.name || `step-${index}`;
        });

        // If no current step was given, set current step to first step
        const stepNames = this.steps.map((step) => step.name);
        const index = stepNames.indexOf(this._initialCurrentStep);
        this._currentStep =
            index === -1 ? this.steps[0].name : this.steps[index].name;

        this._updateStepDisplay();
    }

    _updateStepDisplay() {
        this.steps.forEach((step) => {
            step.callbacks.setClass('slds-hide');
        });
        this.steps[this.currentStepIndex].callbacks.setClass(undefined);
    }

    @api
    get currentStep() {
        return this._currentStep;
    }
    set currentStep(name) {
        this._currentStep = (typeof name === 'string' && name.trim()) || '';
        this._initialCurrentStep = this._currentStep;
    }

    @api
    get hideNavigation() {
        return this._hideNavigation;
    }
    set hideNavigation(boolean) {
        this._hideNavigation = normalizeBoolean(boolean);
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    @api
    get indicatorPosition() {
        return this._indicatorPosition;
    }
    set indicatorPosition(position) {
        this._indicatorPosition = normalizeString(position, {
            fallbackValue: INDICATOR_POSITIONS.default,
            validValues: INDICATOR_POSITIONS.valid
        });
    }

    @api
    get indicatorType() {
        return this._indicatorType;
    }
    set indicatorType(type) {
        this._indicatorType = normalizeString(type, {
            fallbackValue: INDICATOR_TYPES.default,
            validValues: INDICATOR_TYPES.valid
        });
    }

    @api
    get hideIndicator() {
        return this._hideIndicator;
    }
    set hideIndicator(value) {
        this._hideIndicator = normalizeBoolean(value);
    }

    @api
    get buttonPreviousIconPosition() {
        return this._buttonPreviousIconPosition;
    }
    set buttonPreviousIconPosition(value) {
        this._buttonPreviousIconPosition = normalizeString(value, {
            fallbackValue: POSITIONS.defaultButtonPreviousIcon,
            validValues: POSITIONS.valid
        });
    }

    @api
    get buttonPreviousLabel() {
        return this._buttonPreviousLabel;
    }
    set buttonPreviousLabel(label) {
        this._buttonPreviousLabel =
            (typeof label === 'string' && label.trim()) ||
            DEFAULT_BUTTON_PREVIOUS_LABEL;
    }

    @api
    get buttonPreviousVariant() {
        return this._buttonPreviousVariant;
    }
    set buttonPreviousVariant(value) {
        this._buttonPreviousVariant = normalizeString(value, {
            fallbackValue: BUTTON_VARIANTS.defaultButtonPrevious,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    @api
    get buttonNextIconPosition() {
        return this._buttonNextIconPosition;
    }
    set buttonNextIconPosition(position) {
        this._buttonNextIconPosition = normalizeString(position, {
            fallbackValue: POSITIONS.defaultButtonNextIcon,
            validValues: POSITIONS.valid
        });
    }

    @api
    get buttonNextLabel() {
        return this._buttonNextLabel;
    }
    set buttonNextLabel(label) {
        this._buttonNextLabel =
            (typeof label === 'string' && label.trim()) ||
            DEFAULT_BUTTON_NEXT_LABEL;
    }

    @api
    get buttonNextVariant() {
        return this._buttonNextVariant;
    }
    set buttonNextVariant(variant) {
        this._buttonNextVariant = normalizeString(variant, {
            fallbackValue: BUTTON_VARIANTS.defaultButtonNext,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    @api
    get buttonFinishIconPosition() {
        return this._buttonFinishIconPosition;
    }
    set buttonFinishIconPosition(position) {
        this._buttonFinishIconPosition = normalizeString(position, {
            fallbackValue: POSITIONS.defaultButtonFinishIcon,
            validValues: POSITIONS.valid
        });
    }

    @api
    get buttonFinishLabel() {
        return this._buttonFinishLabel;
    }
    set buttonFinishLabel(label) {
        this._buttonFinishLabel =
            (typeof label === 'string' && label.trim()) ||
            DEFAULT_BUTTON_FINISH_LABEL;
    }

    @api
    get buttonFinishVariant() {
        return this._buttonFinishVariant;
    }
    set buttonFinishVariant(variant) {
        this._buttonFinishVariant = normalizeString(variant, {
            fallbackValue: BUTTON_VARIANTS.defaultButtonFinish,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    @api
    get buttonAlignmentBump() {
        return this._buttonAlignmentBump;
    }
    set buttonAlignmentBump(position) {
        this._buttonAlignmentBump = normalizeString(position, {
            fallbackValue: null,
            validValues: POSITIONS.valid
        });
    }

    @api
    get actionPosition() {
        return this._actionPosition;
    }
    set actionPosition(position) {
        this._actionPosition = normalizeString(position, {
            fallbackValue: POSITIONS.defaultAction,
            validValues: POSITIONS.valid
        });
    }

    @api
    get fractionPrefixLabel() {
        return this._fractionPrefixLabel;
    }
    set fractionPrefixLabel(prefix) {
        this._fractionPrefixLabel =
            (typeof prefix === 'string' && prefix.trim()) ||
            DEFAULT_FRACTION_PREFIX_LABEL;
    }

    @api
    get fractionLabel() {
        return this._fractionLabel;
    }
    set fractionLabel(label) {
        this._fractionLabel =
            (typeof label === 'string' && label.trim()) ||
            DEFAULT_FRACTION_LABEL;
    }

    get currentStepIndex() {
        const stepNames = this.steps.map((step) => step.name);
        return stepNames.indexOf(this.currentStep);
    }

    get indicatorInHeader() {
        return !this.hideIndicator && this.indicatorPosition === 'top';
    }

    get indicatorOnSide() {
        return (
            !this.hideIndicator &&
            !this.hideNavigation &&
            (this.indicatorPosition === 'left' ||
                this.indicatorPosition === 'right')
        );
    }

    get baseIndicator() {
        return (
            this.indicatorType === 'base-shaded' ||
            this.indicatorType === 'base'
        );
    }

    get wrapperClass() {
        return classSet().add({
            'slds-grid slds-gutters slds-has-flexi-truncate':
                this.indicatorPosition === 'right' ||
                this.indicatorPosition === 'left'
        });
    }

    get mainColClass() {
        return classSet().add({
            'slds-col':
                this.indicatorPosition === 'right' ||
                this.indicatorPosition === 'left',
            'slds-order_2': this.indicatorPosition === 'left'
        });
    }

    @api
    show() {
        this.showWizard = true;
    }

    @api
    hide() {
        this.showWizard = false;
        this.steps = [];
    }

    @api
    next() {
        const oldStep = this.currentStep;
        this._currentStep = this.steps[this.currentStepIndex + 1].name;

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    currentStep: this.currentStep,
                    oldStep: oldStep
                }
            })
        );

        this._updateStepDisplay();
    }

    @api
    previous() {
        const oldStep = this.currentStep;
        this._currentStep = this.steps[this.currentStepIndex - 1].name;

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    currentStep: this.currentStep,
                    oldStep: oldStep
                }
            })
        );

        this._updateStepDisplay();
    }

    beforeChange(step) {
        return new Promise((resolve) => {
            if (!step.callbacks.beforeChange) {
                return resolve(true);
            }

            return resolve(step.callbacks.beforeChange());
        });
    }

    async handleChange(event) {
        this.errorMessage = undefined;
        const verticalIndicator = this.template.querySelector(
            'c-vertical-progress-indicator'
        );
        if (verticalIndicator) {
            verticalIndicator.hasError = false;
        }

        // Execute beforeChange function set on the step
        // If the function returns false, the change does not happen
        const hasError = !(await this.beforeChange(
            this.steps[this.currentStepIndex]
        ));
        if (hasError) {
            this.errorMessage = this.steps[
                this.currentStepIndex
            ].beforeChangeErrorMessage;

            if (verticalIndicator) {
                verticalIndicator.hasError = true;
            }
            return;
        }

        const action = event.detail.action;

        switch (action) {
            case 'finish':
                this.dispatchEvent(new CustomEvent('complete'));
                break;
            case 'previous':
                this.previous();
                break;
            case 'next':
                this.next();
                break;
            default:
                break;
        }
    }

    handleCloseDialog() {
        this.hide();
    }
}
