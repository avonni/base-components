import { LightningElement, api } from 'lwc';

/**
 * The Vertical Progress Step is used in the Vertical Progress Indicator slot.
 *
 * @class
 * @descriptor avonni-vertical-progress-step
 * @public
 */
export default class VerticalProgressStep extends LightningElement {
    /**
     * Text label to title the step.
     *
     * @type {string}
     * @public
     */
    @api label;

    _value;

    contentInLine = false;
    iconName;
    showLabelSlot = true;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.classList.add('slds-progress__item');
    }

    renderedCallback() {
        if (this.labelSlot && !this.label) {
            this.showLabelSlot = this.labelSlot.assignedElements().length !== 0;
        }
    }

    /**
     * Get the item elements from the default slot.
     *
     * @type {Element}
     */
    get defaultSlot() {
        return this.template.querySelector(
            'slot[data-element-id="slot-default"]'
        );
    }

    /**
     * Get the item elements from the label slot.
     *
     * @type {Element}
     */
    get labelSlot() {
        return this.template.querySelector('slot[name="label"]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Text to name the step.
     *
     * @type {string}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.setAttribute('data-step', value);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Reserved for internal use. Attributes for in line and variant shade sent from avonni-vertical-progress-indicator.
     *
     * @param {boolean} contentInLine
     * @param {string} shade
     * @public
     */
    @api
    setAttributes(contentInLine, shade) {
        if (contentInLine) {
            this.contentInLine = contentInLine;
            this.classList.add('avonni-content-in-line');
        }
        if (shade) {
            this.classList.add('avonni-spread');
        }
    }

    /**
     * Reserved for internal use. Icon name sent from avonni-vertical-progress-indicator.
     *
     * @param {string} iconName
     */
    @api
    setIcon(iconName) {
        this.iconName = iconName;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Blur event handler.
     */
    handleBlur() {
        /**
         * The event fired when the focus is removed from the step.
         *
         * @event
         * @name stepblur
         * @param {string} value The step value.
         * @public
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('stepblur', {
                bubbles: true,
                cancelable: true,
                detail: {
                    value: this.value
                }
            })
        );
    }

    /**
     * Focus on step event handler.
     */
    handleFocus() {
        /**
         * The event fired when the step receives focus.
         *
         * @event
         * @name stepfocus
         * @param {string} value The step value.
         * @public
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('stepfocus', {
                bubbles: true,
                cancelable: true,
                detail: {
                    value: this.value
                }
            })
        );
    }

    /**
     * Mouse enter event handler.
     */
    handleMouseEnter() {
        /**
         * The event fired when the mouse enter the step.
         *
         * @event
         * @name stepmouseenter
         * @param {string} value the step value.
         * @public
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('stepmouseenter', {
                bubbles: true,
                cancelable: true,
                detail: {
                    value: this.value
                }
            })
        );
    }

    /**
     * Mouse leave event handler.
     */
    handleMouseLeave() {
        /**
         * The event fired when the mouse leave the step.
         *
         * @event
         * @name stepmouseleave
         * @param {string} value The step value.
         * @public
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('stepmouseleave', {
                bubbles: true,
                cancelable: true,
                detail: {
                    value: this.value
                }
            })
        );
    }
}
