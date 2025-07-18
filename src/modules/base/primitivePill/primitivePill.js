import { classSet, normalizeArray, normalizeString } from 'c/utils';
import { keyCodes } from 'c/utilsPrivate';
import { LightningElement, api } from 'lwc';

const VARIANTS = {
    valid: ['base', 'list'],
    default: 'base'
};

/**
 * @class
 * @descriptor c-primitive-pill
 */
export default class PrimitivePill extends LightningElement {
    /**
     * Text to display in the pill.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Name to identify the pill.
     *
     * @type {string}
     * @public;
     */
    @api name;

    _actions = [];
    _avatar;
    _href;
    _variant = VARIANTS.default;

    _focusedActions = false;

    connectedCallback() {
        this.addEventListener('keydown', this.handleKeyDown);
    }

    disconnectedCallback() {
        this.removeEventListener('keydown', this.handleKeyDown);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects. See pill container for allowed keys.
     *
     * @type {object[]}
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
        this._focusedActions = false;
    }

    /**
     * Avatar object. See pill container for allowed keys.
     *
     * @type {object}
     * @public
     */
    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar =
            value instanceof Object && Object.keys(value).length ? value : null;
    }

    /**
     * URL of the page that the pill’s link goes to.
     *
     * @type {string}
     * @public
     */
    @api
    get href() {
        return this._href;
    }
    set href(value) {
        this._href = value;
    }

    /**
     * Variant of the pill. Valid values include base and list.
     *
     * @type {string}
     * @default base
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get actionButtonAltText() {
        return this.actions.length > 1 ? 'Actions menu' : this.actions[0].label;
    }

    get actionButtonDisabled() {
        return this.actions.length > 1 ? false : this.actions[0].disabled;
    }

    get actionButtonIconName() {
        return this.actions.length > 1
            ? 'utility:down'
            : this.actions[0].iconName;
    }

    get computedWrapperClass() {
        return classSet('slds-pill avonni-primitive-pill')
            .add({
                'avonni-primitive-pill__action': !!this.href,
                'avonni-primitive-pill_list': this.variant === 'list'
            })
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the label link.
     */
    @api
    focusLink() {
        const link = this.template.querySelector('[data-element-id="a-label"]');
        if (link) link.focus();
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle a click on an action.
     *
     * @param {Event} event
     */
    handleActionClick(event) {
        // Do not dispatch it as a regular click.
        event.stopPropagation();

        if (this.actions.length > 1) {
            this.dispatchEvent(
                new CustomEvent('openactionmenu', {
                    detail: {
                        targetName: this.name,
                        bounds: event.currentTarget.getBoundingClientRect()
                    },
                    bubbles: true
                })
            );
        } else {
            /**
             * The event fired when a user clicks on an action.
             *
             * @event
             * @name actionclick
             * @param {string} name Name of the action.
             * @param {string} targetName Name of the pill the action belongs to.
             * @public
             * @bubbles
             */
            this.dispatchEvent(
                new CustomEvent('actionclick', {
                    detail: {
                        name: this.actions[0].name,
                        targetName: this.name
                    },
                    bubbles: true
                })
            );
        }
    }

    /**
     * Handle a key pressed on the pill.
     *
     * @param {Event} event
     */
    handleKeyDown = (event) => {
        if (
            event.keyCode === keyCodes.tab &&
            this.actions.length &&
            !this._focusedActions &&
            !event.shiftKey
        ) {
            event.preventDefault();
            event.stopPropagation();

            this._focusedActions = true;
            const actionElement = this.template.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            actionElement.focus();
        } else {
            this._focusedActions = false;
        }
    };

    /**
     * Handle a mouse button pressed on the pill link or avatar. Prevent them from being dragged, to allow for dragging the whole item when the pill is in a pill container.
     *
     * @param {Event} event
     */
    handleDraggableMouseDown(event) {
        event.preventDefault();
    }

    /**
     * Stops the propagation of the event.
     * Used for mouseup, mousedown on the action icon to avoid double dispatch of itemclick.
     * @param {Event} event
     */
    handleStopPropagation(event) {
        event.stopPropagation();
    }
}
