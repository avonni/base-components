

import { LightningElement, api } from 'lwc';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const validVariants = ['base', 'comment'];

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
    @api submitAction;

    _disabled = false;
    _variant = 'base';
    _value;

    isActive = false;
    showFigureSlot = true;
    showActionsSlot = true;

    renderedCallback() {
        if (this.isActive) {
            this.template.querySelector('.richTextPublisher').focus();
        }

        if (this.figureSlot) {
            this.showFigureSlot =
                this.figureSlot.assignedElements().length !== 0 &&
                this._variant === 'comment';
        }

        if (this.actionsSlot) {
            this.showActionsSlot =
                this.actionsSlot.assignedElements().length !== 0;
        }
    }

    /**
     * Get figure slot DOM element.
     *
     * @type {Element}
     */
    get figureSlot() {
        return this.template.querySelector('slot[name=figure]');
    }

    /**
     * Get figure slot DOM element.
     *
     * @type {Element}
     */
    get actionsSlot() {
        return this.template.querySelector('slot[name=actions]');
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
    @api get disabled() {
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
    @api get value() {
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
    @api get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: 'base',
            validValues: validVariants
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Compute Publisher class isActive.
     *
     * @type {string}
     */
    get publisherClass() {
        return classSet('slds-publisher')
            .add({
                'slds-is-active': this.isActive
            })
            .toString();
    }

    /**
     * Compute actions section class.
     *
     * @type {string}
     */
    get actionsSectionClass() {
        return classSet('slds-publisher__actions slds-grid')
            .add({
                'slds-grid_align-spread': this.showActionsSlot,
                'slds-grid_align-end': !this.showActionsSlot
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
     * Set focus on the publisher.
     *
     * @public
     */
    @api
    focus() {
        this.isActive = true;
    }

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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
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
