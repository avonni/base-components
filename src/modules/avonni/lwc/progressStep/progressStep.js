import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const POPOVER_STATE = {
    valid: ['show', 'hidden', 'hover', 'button', 'button-icon-name'],
    default: 'hover'
};

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
        'destructive',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'neutral'
};

export default class ProgressStep extends LightningElement {
    stepIconName;
    @api label;
    @api description;
    @api iconName;
    @api iconSrc;
    @api buttonLabel;
    @api buttonName;
    @api buttonIconName;
    @api popoverButtonIcon;
    @api buttonTitle;
    @api assistiveText;
    @api disabledSteps;
    @api warningSteps;

    _value;
    _popoverState = 'hover';
    _labelPosition = 'top';
    _descriptionPosition = 'top';
    _iconPosition = 'top';
    _iconSize = 'medium';
    _buttonIconPosition = 'left';
    _buttonVariant = 'neutral';
    _buttonDisabled = false;

    _popoverVisible = false;
    _popoverIconVisible = false;
    _allowBlur = false;

    connectedCallback() {
        this.classList.add('slds-progress__item');
    }

    renderedCallback() {
        this.isDisabled();
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
            classes.add('slds-button_icon').add('slds-progress__marker_icon');
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

    get popoverHover() {
        return this._popoverState === 'hover';
    }

    get popoverShow() {
        return this._popoverState === 'show';
    }

    get displayPopover() {
        if (
            this.showDescriptionNubbin ||
            this.showIconNubbin ||
            this.showLabelNubbin
        ) {
            return this._popoverVisible || this.popoverShow;
        }
        return false;
    }

    get popoverIconVisible() {
        return this._popoverIconVisible;
    }

    get popoverButton() {
        if (
            this.showDescriptionNubbin ||
            this.showIconNubbin ||
            this.showLabelNubbin
        ) {
            return (
                this._popoverState === 'button' ||
                this._popoverState === 'button-icon-name'
            );
        }
        return false;
    }

    get isButtonDisabled() {
        return (
            this._buttonDisabled ||
            this.disabledSteps.includes(this.getAttribute('data-step'))
        );
    }

    isDisabled() {
        const buttons = this.template.querySelectorAll('button');
        buttons.forEach((button) => {
            if (this.disabledSteps.includes(this.getAttribute('data-step'))) {
                button.setAttribute('disabled', 'true');
            }
        });
    }

    @api
    setIcon(stepIconName) {
        this.stepIconName = stepIconName;
    }

    get primitiveIconVariant() {
        if (this.warningSteps.includes(this.getAttribute('data-step'))) {
            return 'warning';
        }
        return 'bare';
    }

    handleStepMouseEnter() {
        setTimeout(
            function () {
                if (this.popoverHover) {
                    this._popoverVisible = !this._popoverVisible;
                }
            }.bind(this),
            250
        );

        this.dispatchEvent(new CustomEvent('stepmouseenter', {}));
    }

    handleStepMouseLeave() {
        setTimeout(
            function () {
                if (this.popoverHover) {
                    this._popoverVisible = !this._popoverVisible;
                }
            }.bind(this),
            250
        );
        this.dispatchEvent(new CustomEvent('stepmouseleave'));
    }

    handleStepFocus() {
        this.dispatchEvent(new CustomEvent('stepfocus'));
    }

    handleStepBlur() {
        this.dispatchEvent(new CustomEvent('stepblur'));
    }

    handleStepClick() {
        this.dispatchEvent(new CustomEvent('stepclick'));
    }

    handleStepButtonClick() {
        this.dispatchEvent(new CustomEvent('stepbuttonclick'));
    }

    handleStepPopoverClick() {
        this.dispatchEvent(new CustomEvent('steppopoverclick'));
    }

    // Events for popoverButtonIconName
    allowBlur() {
        this._allowBlur = true;
    }

    cancelBlur() {
        this._allowBlur = false;
    }

    handlePopoverFocus() {
        if (!this._allowBlur) {
            this.allowBlur();
        }
    }

    handlePopoverBlur() {
        if (this._allowBlur) {
            this.cancelBlur();
            this._popoverIconVisible = false;
        }
    }

    handlePopoverMouseEnter() {
        if (this.popoverButtonIcon) {
            if (this._allowBlur) {
                return;
            }
            this._popoverIconVisible = true;
        }
    }

    handlePopoverMouseLeave() {
        if (this.popoverButtonIcon) {
            if (this._allowBlur) {
                return;
            }
            this._popoverIconVisible = false;
        }
    }
}
