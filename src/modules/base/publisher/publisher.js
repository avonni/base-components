import { LightningElement, api } from 'lwc';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';

const VALID_VARIANTS = { valid: ['base', 'comment'], default: 'base' };

/**
 * @class
 * @descriptor avonni-publisher
 * @storyId example-publisher--variant-base
 * @public
 */
export default class Publisher extends LightningElement {
    /**
     * Optional text to be shown on the button.
     *
     * @type {string}
     * @public
     */
    @api buttonLabel;
    /**
     * Text that is displayed when the field is empty, to prompt the user for a valid entry.
     *
     * @type {string}
     * @public
     */
    @api placeholder;
    /**
     * The action to be performed when the publisher is submitted.
     *
     * @type {function}
     * @public
     */
    @api submitAction;

    _disabled = false;
    _value;
    _variant = VALID_VARIANTS.default;

    isActive = false;
    showActionsSlot = true;
    showFigureSlot = true;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    renderedCallback() {
        if (this.isActive) {
            this.template.querySelector('.richTextPublisher').focus();
        }

        if (this.actionsSlot) {
            this.showActionsSlot =
                this.actionsSlot.assignedElements().length !== 0;
        }
        if (this.figureSlot) {
            this.showFigureSlot =
                this.figureSlot.assignedElements().length !== 0 &&
                this._variant === 'comment';
        }
    }

    /**
     * Get figure slot DOM element.
     *
     * @type {Element}
     */
    get actionsSlot() {
        return this.template.querySelector('slot[name=actions]');
    }

    /**
     * Get figure slot DOM element.
     *
     * @type {Element}
     */
    get figureSlot() {
        return this.template.querySelector('slot[name=figure]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the publisher can't be used by users.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * The HTML content in the rich text editor.
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
    }

    /**
     * Valid variants include base and comment
     *
     * @type {string}
     * @public
     * @default base
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VALID_VARIANTS.default,
            validValues: VALID_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Compute actions section class.
     *
     * @type {string}
     */
    get computedActionsSectionClass() {
        return classSet('slds-publisher__actions slds-grid')
            .add({
                'slds-grid_align-spread': this.showActionsSlot,
                'slds-grid_align-end': !this.showActionsSlot
            })
            .toString();
    }

    /**
     * Compute Publisher class isActive.
     *
     * @type {string}
     */
    get computedPublisherClass() {
        return classSet('slds-publisher')
            .add({
                'slds-is-active': this.isActive
            })
            .toString();
    }

    /**
     * Check if the button is disabled.
     *
     * @type {boolean}
     */
    get buttonDisabled() {
        return (this.isActive && !this.value) || this._disabled;
    }

    /**
     * Render button on base variant or isActive.
     */
    get renderButton() {
        return this._variant === 'base' || this.isActive;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Removes focus from the publisher.
     *
     * @public
     */
    @api
    blur() {
        if (this.isActive) {
            this.template.querySelector('.richTextPublisher').blur();
        }
    }

    /**
     * Set focus on the publisher.
     *
     * @public
     */
    @api
    focus() {
        this.isActive = true;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Change event handler.
     *
     * @param {Event} event
     */
    handleChange(event) {
        this._value = event.detail.value;
    }

    /**
     * Click submit event handler.
     */
    handlerClick() {
        if (this.isActive) {
            /**
             * The event fired when the publisher submit data.
             *
             * @event
             * @name submit
             * @param {string} value The input value.
             * @public
             */
            const selectedEvent = new CustomEvent('submit', {
                detail: {
                    value: this._value
                }
            });
            this.dispatchEvent(selectedEvent);

            this.isActive = false;
            this._value = '';
        } else {
            this.isActive = true;
        }
    }
}
