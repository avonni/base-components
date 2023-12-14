import { api } from 'lwc';
import { normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import PrimitiveButton from 'c/primitiveButton';
import { Tooltip, TooltipType } from 'c/tooltipLibrary';

const BUTTON_VARIANTS = {
    valid: [
        'bare',
        'bare-inverse',
        'base',
        'border',
        'border-filled',
        'border-inverse',
        'brand',
        'brand-outline',
        'container',
        'destructive',
        'destructive-text',
        'inverse',
        'neutral',
        'success'
    ],
    default: 'border'
};

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

/**
 * @class
 * @name Button Icon
 * @descriptor avonni-button-icon
 * @description A clickable element used to perform an action.
 * @storyId example-button-icon--base
 * @public
 */
export default class ButtonIcon extends PrimitiveButton {
    /**
     * The keyboard shortcut for the button.
     *
     * @name accessKey
     * @public
     * @type {string}
     */
    /**
     * The alternative text used to describe the icon. This text should describe what
     * happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'.
     *
     * @public
     * @type {string}
     */
    @api alternativeText;
    /**
     * If present, the button icon can't be clicked by users.
     *
     * @name disabled
     * @public
     * @type {boolean}
     * @default false
     */
    /**
     * The class to be applied to the contained icon element.
     * Only Lightning Design System utility classes are currently supported.
     *
     * @public
     * @type {string}
     */
    @api iconClass;
    /**
     * The Lightning Design System name of the icon.
     * Names are written in the format 'utility:down' where 'utility' is the category,
     * and 'down' is the specific icon to be displayed. Only utility icons can be used in this component.
     *
     * @name iconName
     * @public
     * @required
     * @type {string}
     */
    /**
     * URL to set for the image attribute.
     *
     * @name iconSrc
     * @public
     * @type {string}
     */
    /**
     * The name for the button element.
     * This value is optional and can be used to identify the button in a callback.
     *
     * @name name
     * @public
     * @type {string}
     */
    /**
     * Reserved for internal use only.
     * Should be set to -1 if button should not
     * be focused during tab navigation and should
     * be set to 0 if button should be focused.
     *
     * @name tabIndex
     * @public
     * @type {number}
     */
    /**
     * Specifies the type of button.
     * Options include button, reset, and submit.
     *
     * @name type
     * @public
     * @type {string}
     * @default button
     */
    /**
     * The value for the button element.
     * This value is optional and can be used when submitting a form.
     *
     * @name value
     * @public
     * @type {string}
     */

    _size = ICON_SIZES.default;
    _tooltip = null;
    _variant = 'border';

    tooltipType = TooltipType.Info;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        super.connectedCallback();
    }

    renderedCallback() {
        super.renderedCallback();
        this.initTooltip();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The size of the button-icon. For the bare variant, options include x-small, small, medium, and large.
     * For non-bare variants, options include xx-small, x-small, small, and medium.
     *
     * @public
     * @type {string}
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = normalizeString(value, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * Text to display when the user mouses over or focuses on the button.
     * The tooltip is auto-positioned relative to the button and screen space.
     *
     * @type {string}
     * @param {string} value - The plain text string for the tooltip
     * @public
     */
    @api
    get tooltip() {
        return this._tooltip ? this._tooltip.value : undefined;
    }
    set tooltip(value) {
        if (this._tooltip) {
            this._tooltip.value = value;
        } else if (value) {
            this._tooltip = new Tooltip(value, {
                root: this,
                target: () => this.button
            });
            this._tooltip.initialize();
        }
    }

    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled,
     * border-inverse, brand, brand-outline, container, destructive, destructive-text, inverse, neutral and success.
     *
     * @public
     * @type {string}
     * @default border
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Returns the button element.
     *
     * @type {Element}
     */
    get button() {
        return this.template.querySelector('[data-element-id="button"]');
    }

    /**
     * Computed button class styling.
     *
     * @type {string}
     */
    get computedButtonClass() {
        const classes = classSet(super.computedButtonClass);
        const isBare =
            this.variant === 'bare' ||
            this.variant === 'bare-inverse' ||
            this.variant === 'base';
        const isAddedVariant =
            this.variant === 'brand-outline' ||
            this.variant === 'destructive' ||
            this.variant === 'destructive-text' ||
            this.variant === 'inverse' ||
            this.variant === 'neutral' ||
            this.variant === 'success';
        classes.add('slds-button_icon avonni-button-icon');
        if (!isBare) {
            switch (this._size) {
                case 'xx-small':
                    classes.add('slds-button_icon-xx-small');
                    break;
                case 'x-small':
                    classes.add('slds-button_icon-x-small');
                    break;
                case 'small':
                    classes.add('slds-button_icon-small');
                    break;
                case 'medium':
                default:
            }
        }
        if (isAddedVariant) {
            classes.add(`avonni-button-icon_${this.size}`);
        }
        return classes
            .add(`avonni-button-icon_${this.computedVariant}`)
            .add({
                'slds-button_icon-bare': isBare,
                'slds-button_icon-container':
                    this.computedVariant === 'container',
                'slds-button_icon-border': this.computedVariant === 'border',
                'slds-button_icon-border-filled':
                    this.computedVariant === 'border-filled',
                'slds-button_icon-border-inverse':
                    this.computedVariant === 'border-inverse',
                'slds-button_icon-inverse':
                    this.computedVariant === 'bare-inverse',
                'slds-button_icon-brand': this.computedVariant === 'brand'
            })
            .toString();
    }

    /**
     * Computed icon class styling.
     *
     * @type {string}
     */
    get computedIconClass() {
        const isBare =
            this.computedVariant === 'bare' ||
            this.computedVariant === 'bare-inverse' ||
            this.computedVariant === 'base';
        const iconClass = this.iconClass || '';
        const classes = classSet('slds-button__icon');
        if (iconClass) classes.add(iconClass);

        if (isBare) {
            // If the variant is bare, then size the icon instead of the button
            switch (this.size) {
                case 'large':
                    classes.add('slds-button__icon_large');
                    break;
                case 'small':
                    classes.add('slds-button__icon_small');
                    break;
                /* falls through */
                case 'x-small':
                    classes.add('slds-button__icon_x-small');
                    break;
                case 'medium':
                default:
            }
        }

        return classes.toString();
    }

    /**
     * Computed image class styling.
     *
     * @type {string}
     */
    get computedImageClass() {
        const isBare =
            this.computedVariant === 'bare' ||
            this.computedVariant === 'bare-inverse' ||
            this.computedVariant === 'base';
        const classes = classSet('avonni-button-icon__image');
        if (isBare) {
            classes.add(`avonni-button-icon__image_${this.size}-bare`);
        } else {
            classes.add(`avonni-button-icon__image_${this.size}`);
        }
        return classes.toString();
    }

    /**
     * Display avatar or icon if they are set.
     *
     * @type {boolean}
     */
    get showButtonIcon() {
        return this.iconName || this.iconSrc;
    }

    /**
     * Display icon only if iconName is set and src is not set.
     *
     * @type {boolean}
     */
    get showIcon() {
        return this.iconName && !this.iconSrc;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Simulate a click on the button.
     *
     * @public
     */
    @api
    click() {
        if (this._connected && this.button) {
            this.button.click();
        }
    }

    /**
     * Set focus on the button.
     *
     * @public
     */
    @api
    focus() {
        if (this._connected && this.button) {
            this.button.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Tooltip initialization.
     */
    initTooltip() {
        if (this._tooltip && !this._tooltip.initialized) {
            this._tooltip.initialize();
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Blur handler.
     */
    handleButtonBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Click handler.
     */
    handleButtonClick() {
        // In native shadow mode, parent form can't be submitted from within the
        // shadow boundary, so we need to manually find the parent form and submit.
        // Once TD-0118070 is delivered, we can access the parent form using `elementInternals.form`
        if (!this.template.synthetic && this.type === 'submit') {
            const form = this.template.host.closest('form');
            if (form) {
                form.requestSubmit();
            }
        }

        this.dispatchEvent(new CustomEvent('click'));
    }

    /**
     * Focus handler.
     */
    handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
