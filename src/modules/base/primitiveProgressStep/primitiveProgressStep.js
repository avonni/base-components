import { LightningElement, api } from 'lwc';
import {
    classListMutation,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
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

const VARIANTS = { valid: ['base', 'shaded'], default: 'base' };

export default class ProgressStep extends LightningElement {
    // Deprecated
    @api completedSteps;
    @api disabledSteps;
    @api warningSteps;

    @api assistiveText;
    @api buttonLabel;
    @api buttonName;
    @api buttonIconName;
    @api description;
    @api label;
    @api popoverIconName;
    @api popoverIconSrc;
    @api popoverIconNameWhenHover;
    @api popoverIconSrcWhenHover;
    @api popoverLabel;
    @api popoverDescription;

    _buttonDisabled = false;
    _buttonIconPosition = ICON_POSITIONS.default;
    _buttonVariant = BUTTON_VARIANTS.default;
    _descriptionPosition = TEXT_POSITIONS.default;
    _isCompleted = false;
    _isCurrent = false;
    _isDisabled = false;
    _isError = false;
    _isWarning = false;
    _labelPosition = TEXT_POSITIONS.default;
    _popoverHidden = false;
    _popoverRatio = POPOVER_RATIOS.default;
    _popoverSize = POPOVER_SIZES.default;
    _popoverVariant = POPOVER_VARIANTS.default;
    _value;
    _variant = VARIANTS.default;

    _connected = false;
    _popoverVisible = true;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._connected = true;
        this._updateClasses();
    }

    /*
     * -------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get buttonDisabled() {
        return this._buttonDisabled;
    }
    set buttonDisabled(value) {
        this._buttonDisabled = normalizeBoolean(value);
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
    get isCompleted() {
        return this._isCompleted;
    }
    set isCompleted(value) {
        this._isCompleted = normalizeBoolean(value);

        if (this._connected) {
            this._updateClasses();
        }
    }

    @api
    get isCurrent() {
        return this._isCurrent;
    }
    set isCurrent(value) {
        this._isCurrent = normalizeBoolean(value);

        if (this._connected) {
            this._updateClasses();
        }
    }

    @api
    get isDisabled() {
        return this._isDisabled;
    }
    set isDisabled(value) {
        this._isDisabled = normalizeBoolean(value);
    }

    @api
    get isError() {
        return this._isError;
    }
    set isError(value) {
        this._isError = normalizeBoolean(value);

        if (this._connected) {
            this._updateClasses();
        }
    }

    @api
    get isWarning() {
        return this._isWarning;
    }
    set isWarning(value) {
        this._isWarning = normalizeBoolean(value);

        if (this._connected) {
            this._updateClasses();
        }
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
    get popoverHidden() {
        return this._popoverHidden;
    }
    set popoverHidden(value) {
        this._popoverHidden = normalizeBoolean(value);
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
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });

        if (this._connected) {
            this._updateClasses();
        }
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedButtonClass() {
        return classSet('slds-button slds-progress__marker')
            .add({
                'slds-button_icon slds-progress__marker_icon avonni-progress-step__button':
                    this.stepIconName,
                'avonni-progress-step__button_completed': this.isCompleted,
                'avonni-progress-step__button_error': this.isError,
                'avonni-progress-step__button_warning': this.isWarning,
                'avonni-progress-step__button_shaded': this.variant === 'shaded'
            })
            .toString();
    }

    get computedPopoverBody() {
        return classSet('slds-popover__body')
            .add({
                'avonni-progress-step__popover-body-icon-hover':
                    this.popoverButton && this.popoverIconNameWhenHover,
                'avonni-progress-step__popover-body-no-icon-hover':
                    this.popoverButton && !this.popoverIconNameWhenHover,
                'avonni-progress-step__popover-body-has-icon':
                    this.showPopoverIcon
            })
            .toString();
    }

    get computedPopoverClass() {
        return classSet('slds-popover slds-nubbin_bottom')
            .add({
                'avonni-progress-step__popover-completed':
                    this.isCompleted && this._popoverVariant !== 'button',
                'avonni-progress-step__popover-button-completed':
                    this.isCompleted && this._popoverVariant === 'button',
                'avonni-progress-step__popover-button_background-color':
                    !this.isCompleted && this._popoverVariant === 'button'
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

    get displayPopover() {
        return (
            ((!this._popoverHidden && this._popoverVisible) ||
                (this.popoverHidden && !this._popoverVisible)) &&
            (this.popoverLabel ||
                this.popoverDescription ||
                this.popoverIconName)
        );
    }

    get hasBottom() {
        return (
            this.showLabelBottom ||
            this.showDescriptionBottom ||
            this.buttonLabel
        );
    }

    get hasTop() {
        return this.showLabelTop || this.showDescriptionTop;
    }

    get isButtonDisabled() {
        return this._buttonDisabled || this.isDisabled;
    }

    get popoverButton() {
        return this._popoverVariant === 'button';
    }

    get primitivePopoverIconVariant() {
        if (this.isCompleted) {
            return 'inverse';
        }
        return '';
    }

    get showDescriptionBottom() {
        return this._descriptionPosition === 'bottom' && this.description;
    }

    get showDescriptionTop() {
        return this._descriptionPosition === 'top' && this.description;
    }

    get showLabelBottom() {
        return this._labelPosition === 'bottom' && this.label;
    }

    get showLabelTop() {
        return this._labelPosition === 'top' && this.label;
    }

    get showPopoverIcon() {
        return this.popoverIconSrc || this.popoverIconName;
    }

    get showPopoverIconWhenHover() {
        return this.popoverIconSrcWhenHover || this.popoverIconNameWhenHover;
    }

    get showPopoverText() {
        return this.popoverLabel || this.popoverDescription;
    }

    get stepIconName() {
        if (this.isCompleted) {
            return 'utility:success';
        }
        if (this.isError) {
            return 'utility:error';
        } else if (this.isWarning) {
            return 'utility:warning';
        }
        return undefined;
    }

    /*
     * -------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    setIcon() {
        console.warn(
            'Deprecated method "setIcon()". Please set the boolean attributes corresponding to the step variants instead (isCompleted, isError, etc.).'
        );
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    _updateClasses() {
        classListMutation(this.classList, {
            'slds-progress__item': true,
            'avonni-progress-step__shaded': this.variant === 'shaded',
            'slds-is-completed': this.isCompleted,
            'slds-is-active': this.isCurrent,
            'slds-has-error': this.isError,
            'slds-has-warning': this.isWarning && this.variant !== 'shaded',
            'slds-has-warning-shaded':
                this.isWarning && this.variant === 'shaded'
        });
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

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
