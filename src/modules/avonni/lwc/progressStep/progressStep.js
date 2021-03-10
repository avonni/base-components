import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const POPOVER_STATE = { valid: ['show', 'hidden', 'hover'], default: 'hover' };
const POSITIONS = { valid: ['top', 'bottom', 'inside-nubbin'], default: 'top' };
const SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};
const BUTTON_ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };
const BUTTON_VARIANTS = {
    valid: [
        'neutral',
        'brand',
        'brand-outline',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'neutral'
};

export default class ProgressStep extends LightningElement {
    @api label;
    @api description;
    @api iconName;
    @api iconSrc;
    @api buttonLabel;
    @api buttonName;
    @api buttonIconName;
    @api buttonTitle;
    @api assistiveText;

    stepIconName;
    _value;
    _popoverState = 'hover';
    _labelPosition = 'top';
    _descriptionPosition = 'top';
    _iconPosition = 'top';
    _iconSize = 'medium';
    _buttonPosition = 'top';
    _buttonIconPosition = 'left';
    _buttonDisabled = false;
    _buttonVariant = 'neutral';

    connectedCallback() {
        this.classList.add('slds-progress__item');
    }

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.setAttribute('data-step', value);
    }

    @api
    get popoverState() {
        return this._popoverState;
    }

    set popoverState(state) {
        this._popoverState = normalizeString(state, {
            fallbackValue: POPOVER_STATE.default,
            validValues: POPOVER_STATE.valid
        });
    }

    @api
    get labelPosition() {
        return this._labelPosition;
    }

    set labelPosition(position) {
        this._labelPosition = normalizeString(position, {
            fallbackValue: POSITIONS.default,
            validValues: POSITIONS.valid
        });
    }

    @api
    get descriptionPosition() {
        return this._descriptionPosition;
    }

    set descriptionPosition(position) {
        this._descriptionPosition = normalizeString(position, {
            fallbackValue: POSITIONS.default,
            validValues: POSITIONS.valid
        });
    }

    @api
    get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(position) {
        this._iconPosition = normalizeString(position, {
            fallbackValue: POSITIONS.default,
            validValues: POSITIONS.valid
        });
    }

    @api
    get iconSize() {
        return this._iconSize;
    }

    set iconSize(size) {
        this._iconSize = normalizeString(size, {
            fallbackValue: SIZES.default,
            validValues: SIZES.valid
        });
    }

    @api
    get buttonPosition() {
        return this._buttonPosition;
    }

    set buttonPosition(position) {
        this._buttonPosition = normalizeString(position, {
            fallbackValue: POSITIONS.default,
            validValues: POSITIONS.valid
        });
    }

    @api
    get buttonIconPosition() {
        return this._buttonIconPosition;
    }

    set buttonIconPosition(position) {
        this._buttonIconPosition = normalizeString(position, {
            fallbackValue: BUTTON_ICON_POSITIONS.default,
            validValues: BUTTON_ICON_POSITIONS.valid
        });
    }

    @api
    get buttonDisabled() {
        return this._buttonDisabled;
    }

    set buttonDisabled(value) {
        this._buttonDisabled = normalizeBoolean(value);
    }

    @api
    get buttonVariant() {
        return this._buttonVariant;
    }

    set buttonVariant(variant) {
        this._buttonVariant = normalizeString(variant, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    get computedButtonClass() {
        const classes = classSet('slds-button slds-progress__marker');
        if (this.stepIconName) {
            classes
                .add('slds-button_icon')
                .add('slds-progress__marker')
                .add('slds-progress__marker_icon');
        }
        return classes.toString();
    }

    get showLabelTop() {
        return this._labelPosition === 'top' && this.label;
    }

    get showLabelBottom() {
        return this._labelPosition === 'bottom' && this.label;
    }

    get showLabelNubbin() {
        return this._labelPosition === 'inside-nubbin' && this.label;
    }

    get showDescriptionTop() {
        return this._descriptionPosition === 'top' && this.description;
    }

    get showDescriptionBottom() {
        return this._descriptionPosition === 'bottom' && this.description;
    }

    get showDescriptionNubbin() {
        return (
            this._descriptionPosition === 'inside-nubbin' && this.description
        );
    }

    get showIconTop() {
        return this._iconPosition === 'top' && this.iconName;
    }

    get showIconBottom() {
        return this._iconPosition === 'bottom' && this.iconName;
    }

    get showIconNubbin() {
        return this._iconPosition === 'inside-nubbin' && this.iconName;
    }

    get showButtonTop() {
        return this._buttonPosition === 'top' && this.buttonLabel;
    }

    get showButtonBottom() {
        return this._buttonPosition === 'bottom' && this.buttonLabel;
    }

    get showButtonNubbin() {
        return this._buttonPosition === 'inside-nubbin' && this.buttonLabel;
    }

    @api
    setIcon(stepIconName) {
        this.stepIconName = stepIconName;
    }

    handleStepMouseEnter() {
        this.dispatchEvent(
            new CustomEvent('stepmouseenter', {
                bubbles: true,
                cancelable: true,
                detail: { value: this.value }
            })
        );
    }

    handleStepMouseLeave() {
        this.dispatchEvent(
            new CustomEvent('stepmouseleave', {
                bubbles: true,
                cancelable: true,
                detail: { value: this.value }
            })
        );
    }

    handleStepFocus() {
        this.dispatchEvent(
            new CustomEvent('stepfocus', {
                bubbles: true,
                cancelable: true,
                detail: { value: this.value }
            })
        );
    }

    handleStepBlur() {
        this.dispatchEvent(
            new CustomEvent('stepblur', {
                bubbles: true,
                detail: { value: this.value }
            })
        );
    }

    handleStepClick() {
        this.dispatchEvent(
            new CustomEvent('stepsclick', {
                bubbles: true,
                detail: { value: this.value }
            })
        );
    }
}
