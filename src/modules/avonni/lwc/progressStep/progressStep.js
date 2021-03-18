import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const POSITIONS = { valid: ['top', 'bottom'], default: 'top' };

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

const POPOVER_RATIO = {
    valid: ['1-by-1', '4-by-3', '16-by-9'],
    default: '1-by-1'
};

export default class ProgressStep extends LightningElement {
    stepIconName;
    @api disabledSteps;
    @api warningSteps;
    @api completedSteps;
    @api assistiveText;
    @api label;
    @api description;
    @api iconName;
    @api iconSrc;
    @api buttonLabel;
    @api buttonName;
    @api buttonIconName;
    @api buttonTitle;
    @api popoverIconName;
    @api popoverIconSrc;
    @api popoverIconNameWhenHover;
    @api popoverIconSrcWhenHover;
    @api popoverLabel;
    @api popoverDescription;

    _value;
    _labelPosition = 'top';
    _descriptionPosition = 'top';
    _buttonIconPosition = 'left';
    _buttonVariant = 'neutral';
    _buttonDisabled = false;
    _popoverIconSize = 'medium';
    _popoverRatio = '1-by-1';
    _popoverHidden = false;

    _popoverVisible = true;
    _popoverIconHoverVisible = false;
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

    @api
    get popoverIconSize() {
        return this._popoverIconSize;
    }

    set popoverIconSize(size) {
        this._popoverIconSize = normalizeString(size, {
            fallbackValue: SIZES.default,
            validValues: SIZES.valid
        });
    }

    @api
    get popoverRatio() {
        return this._popoverRatio;
    }

    set popoverRatio(ratio) {
        this._popoverRatio = normalizeString(ratio, {
            fallbackValue: POPOVER_RATIO.default,
            validValues: POPOVER_RATIO.valid
        });
    }

    @api
    get popoverHidden() {
        return this._popoverHidden;
    }

    set popoverHidden(value) {
        this._popoverHidden = normalizeBoolean(value, {
            fallbackValue: false
        });
    }

    get computedButtonClass() {
        const classes = classSet('slds-button slds-progress__marker');
        if (this.stepIconName) {
            classes.add('slds-button_icon').add('slds-progress__marker_icon');
        }
        return classes.toString();
    }

    get computedPopoverClass() {
        const classes = classSet(
            'slds-popover slds-nubbin_bottom avonni-progress-step-popover'
        );
        if (this.completedSteps.includes(this.getAttribute('data-step'))) {
            classes.add('avonni-progress-step-popover-completed');
        }
        classes.add(`ratio-${this._popoverRatio}`);
        return classes.toString();
    }

    get computedPopoverButtonClass() {
        const classes = classSet(
            'slds-popover slds-nubbin_bottom avonni-progress-step-popover-button'
        );
        if (this.completedSteps.includes(this.getAttribute('data-step'))) {
            classes.add('avonni-progress-step-popover-button-completed');
        }
        classes.add(`ratio-${this._popoverRatio}`);
        return classes.toString();
    }

    get showLabelTop() {
        return this._labelPosition === 'top' && this.label;
    }

    get showLabelBottom() {
        return this._labelPosition === 'bottom' && this.label;
    }

    get showDescriptionTop() {
        return this._descriptionPosition === 'top' && this.description;
    }

    get showDescriptionBottom() {
        return this._descriptionPosition === 'bottom' && this.description;
    }

    get isButtonDisabled() {
        return (
            this._buttonDisabled ||
            this.disabledSteps.includes(this.getAttribute('data-step'))
        );
    }

    get displayPopover() {
        return (
            ((!this._popoverHidden && this._popoverVisible) ||
                (this.popoverHidden && !this._popoverVisible)) &&
            (this.popoverLabel ||
                this.popoverDescription ||
                this.popoverIconName)
        );
    }

    get popoverIconHoverVisible() {
        return this._popoverIconHoverVisible && this.popoverIconNameWhenHover;
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

    get primitiveButtonIconVariant() {
        if (this.warningSteps.includes(this.getAttribute('data-step'))) {
            return 'warning';
        }
        return 'bare';
    }

    get primitivePopoverIconVariant() {
        if (this.completedSteps.includes(this.getAttribute('data-step'))) {
            return 'inverse';
        }
        return '';
    }

    handleStepMouseEnter() {
        this.dispatchEvent(new CustomEvent('stepmouseenter'));
    }

    handleStepMouseLeave() {
        this.dispatchEvent(new CustomEvent('stepmouseleave'));
    }

    handleStepFocus() {
        if (this._popoverHidden) {
            this._popoverVisible = !this._popoverVisible;
        }
        this.dispatchEvent(new CustomEvent('stepfocus'));
    }

    handleStepBlur() {
        if (this._popoverHidden) {
            this._popoverVisible = !this._popoverVisible;
        }
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
            this._popoverIconHoverVisible = false;
        }
    }

    handlePopoverMouseEnter() {
        if (this.popoverIconNameWhenHover) {
            if (this._allowBlur) {
                return;
            }
            this._popoverIconHoverVisible = true;
        }
    }

    handlePopoverMouseLeave() {
        if (this.popoverIconNameWhenHover) {
            if (this._allowBlur) {
                return;
            }
            this._popoverIconHoverVisible = false;
        }
    }
}
