

import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const TEXT_POSITIONS = { valid: ['top', 'bottom'], default: 'top' };

const ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };

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

const POPOVER_VARIANTS = { valid: ['button', 'base'], default: 'base' };

const POPOVER_SIZES = {
    valid: ['small', 'medium', 'large'],
    default: 'medium'
};

const POPOVER_RATIOS = {
    valid: ['1-by-1', '4-by-3', '16-by-9'],
    default: '1-by-1'
};

export default class ProgressStep extends LightningElement {
    stepIconName;
    @api disabledSteps = [];
    @api warningSteps;
    @api completedSteps = [];
    @api assistiveText;
    @api label;
    @api description;
    @api buttonLabel;
    @api buttonName;
    @api buttonIconName;
    @api popoverIconName;
    @api popoverIconSrc;
    @api popoverIconNameWhenHover;
    @api popoverIconSrcWhenHover;
    @api popoverLabel;
    @api popoverDescription;

    _value;
    _labelPosition = TEXT_POSITIONS.default;
    _descriptionPosition = TEXT_POSITIONS.default;
    _buttonIconPosition = ICON_POSITIONS.default;
    _buttonDisabled = false;
    _buttonVariant = BUTTON_VARIANTS.default;
    _popoverVariant = POPOVER_VARIANTS.default;
    _popoverSize = POPOVER_SIZES.default;
    _popoverRatio = POPOVER_RATIOS.default;
    _popoverHidden = false;

    _popoverVisible = true;

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
    }

    @api
    get labelPosition() {
        return this._labelPosition;
    }

    set labelPosition(position) {
        this._labelPosition = normalizeString(position, {
            fallbackValue: TEXT_POSITIONS.default,
            validValues: TEXT_POSITIONS.valid
        });
    }

    @api
    get descriptionPosition() {
        return this._descriptionPosition;
    }

    set descriptionPosition(position) {
        this._descriptionPosition = normalizeString(position, {
            fallbackValue: TEXT_POSITIONS.default,
            validValues: TEXT_POSITIONS.valid
        });
    }

    @api
    get buttonIconPosition() {
        return this._buttonIconPosition;
    }

    set buttonIconPosition(position) {
        this._buttonIconPosition = normalizeString(position, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
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
    get popoverVariant() {
        return this._popoverVariant;
    }

    set popoverVariant(variant) {
        this._popoverVariant = normalizeString(variant, {
            fallbackValue: POPOVER_VARIANTS.default,
            validValues: POPOVER_VARIANTS.valid
        });
    }

    @api
    get popoverSize() {
        return this._popoverSize;
    }

    set popoverSize(size) {
        this._popoverSize = normalizeString(size, {
            fallbackValue: POPOVER_SIZES.default,
            validValues: POPOVER_SIZES.valid
        });
    }

    @api
    get popoverRatio() {
        return this._popoverRatio;
    }

    set popoverRatio(ratio) {
        this._popoverRatio = normalizeString(ratio, {
            fallbackValue: POPOVER_RATIOS.default,
            validValues: POPOVER_RATIOS.valid
        });
    }

    @api
    get popoverHidden() {
        return this._popoverHidden;
    }

    set popoverHidden(value) {
        this._popoverHidden = normalizeBoolean(value);
    }

    get computedButtonClass() {
        return classSet('slds-button slds-progress__marker')
            .add({
                'slds-button_icon slds-progress__marker_icon': this.stepIconName
            })
            .toString();
    }

    get computedPopoverClass() {
        return classSet('slds-popover slds-nubbin_bottom')
            .add({
                'avonni-progress-step__popover-completed':
                    this.completedSteps.includes(this.value) &&
                    this._popoverVariant !== 'button',
                'avonni-progress-step__popover-button-completed':
                    this.completedSteps.includes(this.value) &&
                    this._popoverVariant === 'button',
                'avonni-progress-step__popover-button_background-color':
                    !this.completedSteps.includes(this.value) &&
                    this._popoverVariant === 'button'
            })
            .add(`avonni-progress-step__popover_size-${this._popoverSize}`)
            .add({
                'avonni-progress-step__popover-body':
                    this._popoverVariant !== 'button',
                'avonni-progress-step__popover-button':
                    this._popoverVariant === 'button'
            })
            .add(`ratio-${this._popoverRatio}`)
            .toString();
    }

    get computedPopoverIconSize() {
        if (this._popoverSize === 'small') {
            return 'small';
        } else if (this._popoverSize === 'large') {
            return 'large';
        }
        return 'medium';
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

    get hasTop() {
        return this.showLabelTop || this.showDescriptionTop;
    }

    get hasBottom() {
        return (
            this.showLabelBottom ||
            this.showDescriptionBottom ||
            this.buttonLabel
        );
    }

    get showPopoverIcon() {
        return this.popoverIconSrc || this.popoverIconName;
    }

    get showPopoverIconWhenHover() {
        return this.popoverIconSrcWhenHover || this.popoverIconNameWhenHover;
    }

    get isButtonDisabled() {
        return this._buttonDisabled || this.disabledSteps.includes(this.value);
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

    get popoverButton() {
        return this._popoverVariant === 'button';
    }

    get computedPopoverBody() {
        return this.popoverIconNameWhenHover
            ? 'slds-popover__body avonni-progress-step__popover-body-icon-hover'
            : 'slds-popover__body avonni-progress-step__popover-body-no-icon-hover';
    }

    isDisabled() {
        const buttons = this.template.querySelectorAll(
            '[data-element-id^="button"]'
        );
        buttons.forEach((button) => {
            if (this.disabledSteps.includes(this.value)) {
                button.setAttribute('disabled', 'true');
            }
        });
    }

    @api
    setIcon(stepIconName) {
        this.stepIconName = stepIconName;
    }

    get primitiveButtonIconVariant() {
        if (this.warningSteps.includes(this.value)) {
            return 'warning';
        }
        return 'bare';
    }

    get primitivePopoverIconVariant() {
        if (this.completedSteps.includes(this.value)) {
            return 'inverse';
        }
        return '';
    }

    handleStepMouseEnter() {
        this.dispatchEvent(
            new CustomEvent('stepmouseenter', {
                detail: {
                    value: this.value
                }
            })
        );
    }

    handleStepMouseLeave() {
        this.dispatchEvent(
            new CustomEvent('stepmouseleave', {
                detail: {
                    value: this.value
                }
            })
        );
    }

    handleStepFocus() {
        if (this._popoverHidden) {
            this._popoverVisible = !this._popoverVisible;
        }
        this.dispatchEvent(
            new CustomEvent('stepfocus', {
                detail: {
                    value: this.value
                }
            })
        );
    }

    handleStepBlur() {
        if (this._popoverHidden) {
            this._popoverVisible = !this._popoverVisible;
        }
        this.dispatchEvent(
            new CustomEvent('stepblur', {
                detail: {
                    value: this.value
                }
            })
        );
    }

    handleStepClick() {
        this.dispatchEvent(
            new CustomEvent('stepclick', {
                detail: {
                    value: this.value,
                    bubbles: true
                }
            })
        );
    }

    handleStepButtonClick() {
        this.dispatchEvent(
            new CustomEvent('stepbuttonclick', {
                detail: {
                    value: this.value
                }
            })
        );
    }

    handleStepPopoverClick() {
        this.dispatchEvent(
            new CustomEvent('steppopoverclick', {
                detail: {
                    value: this.value
                }
            })
        );
    }
}
