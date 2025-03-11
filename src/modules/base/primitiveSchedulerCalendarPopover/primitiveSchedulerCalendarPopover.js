import { LightningElement, api } from 'lwc';
import { normalizeArray } from 'c/utils';

export default class PrimitiveSchedulerCalendarPopover extends LightningElement {
    @api dateFormat;
    @api hiddenActions;
    @api readOnly;
    @api resources;
    @api timezone;

    _contextMenuIsOpen = false;
    _isFocused = false;
    _mouseIn = false;
    label;
    events = [];
    show = false;

    renderedCallback() {
        if (this.show) {
            this.focus();
        }
    }

    /*
     * -------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    focus() {
        const closeButton = this.template.querySelector(
            '[data-element-id="lightning-button-icon-show-more-close"]'
        );
        if (closeButton) {
            closeButton.focus();
            this._isFocused = true;
        }
        this._contextMenuIsOpen = false;
    }

    @api
    open({ events, label }) {
        this.events = normalizeArray(events);
        this.label = label;
        this.show = true;
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    _close() {
        this.events = [];
        this.label = null;
        this.show = false;
        this._mouseIn = false;
        this._isFocused = false;
        this._contextMenuIsOpen = false;
        this._dispatchClose();
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    handleClose() {
        this._close();
    }

    handleEventDoubleClick(event) {
        this._dispatchEventDoubleClick(event.detail);
    }

    handleEventMouseDown(event) {
        this._close();
        this._dispatchEventMouseDown(event.detail);
    }

    /**
     * Handle a context menu click on an occurrence. Select the event and open its context menu.
     *
     * @param {Event} event `privatecontextmenu` event fired by a primitive event occurrence.
     */
    handleEventContextMenu(event) {
        const target = event.currentTarget;
        if (target.disabled || target.referenceLine) {
            return;
        }

        this.dispatchEvent(
            new CustomEvent('eventcontextmenu', {
                detail: {
                    ...event.detail,
                    focusPopover: this.focus.bind(this)
                },
                bubbles: true,
                composed: true
            })
        );

        this._contextMenuIsOpen = true;
    }

    /**
     * Handle a focus inside the month view "Show more" popover.
     */
    handleFocusIn() {
        this._isFocused = true;
    }

    /**
     * Handle a focus out of the month view "Show more" popover. Wait for the next animation frame, and close the popover if the focus was meant to be lost, or refocus it if it wasn't meant to be lost.
     */
    handleFocusOut() {
        this._isFocused = false;

        requestAnimationFrame(() => {
            const activeElement = this.template.activeElement;
            const activeCalendar =
                this.isYear &&
                activeElement &&
                activeElement.dataset.elementId ===
                    'avonni-calendar-year-month';

            if (!this._isFocused && this._mouseIn && !this._contextMenuIsOpen) {
                this.focus();
            } else if (
                !this._isFocused &&
                !this._mouseIn &&
                !this._contextMenuIsOpen &&
                !activeCalendar
            ) {
                this._close();
            }
        });
    }

    /**
     * Handle the mouse entering the month view "Show more" popover.
     */
    handleMouseEnter() {
        this._mouseIn = true;
    }

    /**
     * Handle the mouse leaving the month view "Show more" popover.
     */
    handleMouseLeave() {
        this._mouseIn = false;
    }

    /*
     * -------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    _dispatchClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }

    _dispatchEventDoubleClick(detail) {
        this.dispatchEvent(new CustomEvent('eventdblclick', { detail }));
    }

    _dispatchEventMouseDown(detail) {
        this.dispatchEvent(new CustomEvent('eventmousedown', { detail }));
    }
}
