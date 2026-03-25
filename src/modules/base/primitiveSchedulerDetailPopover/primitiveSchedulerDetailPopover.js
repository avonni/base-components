import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { normalizeArray, normalizeBoolean } from 'c/utils';

export default class PrimitiveSchedulerDetailPopover extends LightningElement {
    /**
     * Label to be displayed in the event detail popover header.
     *
     * @type {string}
     * @public
     */
    @api label = '';

    _contextMenuEvent = [];
    _fields = [];
    _isMobileView = false;
    _show = false;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects, to be displayed as buttons or in a button menu in the event detail popover.
     *
     * @type {object[]}
     * @public
     */
    @api
    get contextMenuEvent() {
        return this._contextMenuEvent;
    }
    set contextMenuEvent(value) {
        this._contextMenuEvent = normalizeArray(value);
    }

    /**
     * Array of field objects, to be displayed in the event detail popover body.
     *
     * @type {object[]}
     * @public
     */
    @api
    get fields() {
        return this._fields;
    }
    set fields(value) {
        this._fields = normalizeArray(value);
    }

    /**
     * If present, the event detail popover is displayed for a mobile view, with a different layout.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isMobileView() {
        return this._isMobileView;
    }
    set isMobileView(value) {
        this._isMobileView = normalizeBoolean(value);
    }

    /**
     * If present, the event detail popover is shown.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get show() {
        return this._show;
    }
    set show(value) {
        this._show = normalizeBoolean(value);

        if (value) {
            requestAnimationFrame(() => {
                const closeButton = this.template.querySelector(
                    '[data-element-id="lightning-button-icon-detail-popover-close-button"]'
                );
                closeButton?.focus();
            });
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed CSS classes for the event details popover field layout.
     *
     * @type {string}
     */
    get computedFieldLayoutClass() {
        return classSet('slds-col slds-p-vertical_xx-small').add({
            'slds-size_1-of-2': !this.isMobileView,
            'slds-size_1-of-1': this.isMobileView
        });
    }

    /**
     * Computed CSS classes for the display popover.
     *
     * @type {string}
     */
    get detailPopoverClass() {
        return classSet('slds-popover')
            .add({
                'slds-popover_medium': !this.isMobileView,
                'avonni-scheduler__event-details-popover-full':
                    this.isMobileView
            })
            .toString();
    }

    /**
     * Array of action objects, to be displayed as buttons in the event detail popover.
     *
     * @type {object[]}
     */
    get firstEventActions() {
        return this.contextMenuEvent.slice(0, 2);
    }

    /**
     * Array of action objects, to be displayed in a button menu, in the event detail popover.
     *
     * @type {object[]}
     */
    get lastEventActions() {
        return this.contextMenuEvent.slice(2);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    _hideDetailPopover() {
        this._show = false;

        /**
         * The event fired when the popover is closed.
         * @event
         * @name close
         */
        this.dispatchEvent(new CustomEvent('close'));
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the click on an action.
     *
     * @param {Event} selectEvent `select` event fired by the button menu, or `click` event fired by a button.
     */
    handleActionSelect(selectEvent) {
        const name = selectEvent.detail.value || selectEvent.currentTarget.name;

        /**
         * Event fired when clicking an action in the detail popover.
         *
         * @event
         * @name actionselect
         * @param {string} name Name of the action clicked.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionselect', { detail: { name } })
        );
    }

    /**
     * Handle a key up on the event detail popover.
     *
     * @param {Event} event `keyup` event.
     */
    handleDetailPopoverKeyUp(event) {
        event.stopPropagation();
        if (event.key === 'Escape') {
            this._hideDetailPopover();
        }
    }

    /**
     * Handle the cursor entering the event detail popover.
     */
    handleDetailPopoverMouseEnter() {
        this.dispatchEvent(new CustomEvent('privatemouseenter'));
    }

    /**
     * Handle the cursor leaving the event detail popover.
     */
    handleDetailPopoverMouseLeave() {
        this.dispatchEvent(new CustomEvent('privatemouseleave'));
    }

    /**
     * Handle the click on the hide button of the event detail popover.
     */
    handleHideButtonClick() {
        this._hideDetailPopover();
    }
}
