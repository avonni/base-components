import { classSet } from 'c/utils';

const POSITION_ICON = {
    TOP: 'top',
    BOTTOM: 'bottom',
    RIGHT: 'right',
    LEFT: 'left'
};

/**
 * Input choice set options
 * @class
 * @param {string} label Label of the option.
 * @param {boolean} hideLabel If present, the label of the option is hidden.
 * @param {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the header label.
 * @param {string} iconPosition The position of the icon with respect to the label. Valid options include left, right, top and bottom. This value defaults to left.
 * @param {string} tooltip Tooltip of the option.
 * @param {string} value Value of the option.
 */
export default class InputChoiceOption {
    constructor(option, value, type, width) {
        this.color = option.color;
        this.iconName = option.iconName;
        this.iconPosition = option.iconPosition;
        this.hideLabel = option.hideLabel;
        this.label = option.label;
        this.tooltip = option.tooltip;
        this.value = option.value;
        this.displayLabel = this.label && !this.hideLabel;
        this.type = type;
        this.width = width;
        this.isChecked = Array.isArray(value)
            ? value.includes(option.value)
            : value === option.value;
    }

    get computedButtonLabelStyle() {
        if (!this.color || this.type !== 'button') {
            return undefined;
        }
        return this.isChecked
            ? `background-color: ${this.color}; border-color: ${this.color};`
            : `color: ${this.color};`;
    }

    get computedCheckmarkStyle() {
        return this.isChecked ? 'display: block;' : 'display: none;';
    }

    get computedFauxInputStyle() {
        if (!this.color) {
            return undefined;
        }
        if (this.type === 'toggle') {
            return `
                --sds-c-checkbox-toggle-color-border-checked: ${this.color};
                --sds-c-checkbox-toggle-color-background-checked: ${this.color};
                --slds-c-checkbox-toggle-color-background-checked-focus: ${this.color};
            `;
        }
        return `
            --slds-c-checkbox-color-border: ${this.color};
            --slds-c-checkbox-mark-color-foreground: ${this.color};
            --slds-c-checkbox-color-border-checked: ${this.color};
            --slds-c-checkbox-color-border-focus: ${this.color};
            --slds-c-radio-color-border-checked: ${this.color};
            --slds-c-radio-color-border: ${this.color};
            --slds-c-radio-mark-color-foreground: ${this.color};
            --slds-c-radio-color-border-focus: ${this.color};
        `;
    }

    /**
     * Class of options's icon button.
     *
     * @type {string}
     */
    get computedIconButtonClass() {
        return classSet('slds-align_absolute-center')
            .add({
                'avonni-input-choice-set__option-button-icon-min-height':
                    !this.displayLabel,
                'slds-m-top_x-small': this.iconPosition === POSITION_ICON.TOP,
                'slds-m-bottom_x-small':
                    this.iconPosition === POSITION_ICON.BOTTOM,
                'slds-m-left_x-small':
                    this.label && this.iconPosition === POSITION_ICON.RIGHT,
                'slds-m-right_x-small':
                    this.label &&
                    (this.iconPosition === POSITION_ICON.LEFT ||
                        !this.iconPosition)
            })
            .toString();
    }

    get computedIconClass() {
        return classSet('slds-p-right_x-small')
            .add({
                'slds-order_0': this.isIconTopOrLeft,
                'slds-order_2': this.isIconBottomOrRight
            })
            .toString();
    }

    /**
     * Class of options's label button.
     *
     * @type {string}
     */
    get computedLabelButtonClass() {
        return classSet(
            'slds-checkbox_faux slds-truncate avonni-input-choice-set__option-button-label'
        )
            .add({ 'slds-align_absolute-center': this.isIconTopOrBottom })
            .toString();
    }

    /**
     * Class of options's label container.
     *
     * @type {string}
     */
    get computedLabelContainerClass() {
        return classSet('slds-p-horizontal_small slds-order_1').add({
            'slds-grid': !this.isIconTopOrBottom
        });
    }

    /**
     * Class of options's button variant.
     *
     * @type {string}
     */
    get computedVariantButton() {
        return this.isChecked ? 'inverse' : 'base';
    }

    /**
     * True if options's icon position is bottom or right.
     *
     * @type {boolean}
     */
    get isIconBottomOrRight() {
        return (
            this.iconPosition === POSITION_ICON.BOTTOM ||
            this.iconPosition === POSITION_ICON.RIGHT
        );
    }

    /**
     * True if options's icon position is top or left or no icon position or no icon name.
     *
     * @type {boolean}
     */
    get isIconTopOrLeft() {
        return (
            this.iconPosition === POSITION_ICON.TOP ||
            this.iconPosition === POSITION_ICON.LEFT ||
            !this.iconPosition ||
            !this.iconName
        );
    }

    /**
     * True if options's icon position is top or bottom.
     *
     * @type {boolean}
     */
    get isIconTopOrBottom() {
        return (
            this.iconPosition === POSITION_ICON.TOP ||
            this.iconPosition === POSITION_ICON.BOTTOM
        );
    }
}
