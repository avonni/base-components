import { normalizeArray } from 'c/utils';
import { LightningElement, api } from 'lwc';

const MAX_LOADED_EVENTS = 25;
const LOADING_OFFSET = 10;
const LOADING_THRESHOLD = 60;

export default class PrimitiveSchedulerCalendarPopover extends LightningElement {
    @api dateFormat;
    @api hiddenActions;
    @api readOnly;
    @api resources;
    @api timezone;

    _contextMenuIsOpen = false;
    _isFocused = false;
    _mouseIn = false;
    _startIndex = 0;
    label;
    events = [];
    show = false;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    renderedCallback() {
        if (this.show) {
            this.focus();
        }
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of visible events. To avoid performance issues, the events are loaded slice by slice.
     *
     * @type {object[]}
     */
    get loadedEvents() {
        let endIndex = this._startIndex + MAX_LOADED_EVENTS;
        const lastIndex = this.events.length;
        if (endIndex + LOADING_OFFSET >= lastIndex) {
            // If only 10 events are left, load them all
            endIndex = lastIndex;
        }

        const items = this.events.slice(this._startIndex, endIndex);
        return items.map((it, index) => {
            return {
                ...it,
                index: index + this._startIndex
            };
        });
    }

    /*
     * -------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the close button.
     *
     * @public
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

    /**
     * Open the popover.
     *
     * @param {object} props Object with two keys: events and label.
     * @public
     */
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

    /**
     * Close the popover.
     */
    _close() {
        const cancel = this._dispatchClose();
        if (cancel) {
            return;
        }
        this.events = [];
        this.label = null;
        this.show = false;
        this._mouseIn = false;
        this._isFocused = false;
        this._contextMenuIsOpen = false;
        this._startIndex = 0;
    }

    /**
     * Get information on the event at the given popover position.
     *
     * @param {number} y Y position of the event we are looking for.
     * @returns {object} Object containing the key and the offset of the event.
     */
    _getEventFromPosition(y) {
        const elements = this.template.querySelectorAll(
            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
        );
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            const position = el.getBoundingClientRect();
            const isBeforeFirst = i === 0 && y < position.top;
            const isAfterLast =
                i === elements.length - 1 && y > position.bottom;

            if (
                (y + 1 >= position.top && y - 1 <= position.bottom) ||
                isBeforeFirst ||
                isAfterLast
            ) {
                return {
                    key: el.dataset.key,
                    offset: y - position.top
                };
            }
        }
        return null;
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Handle a click on the close button.
     */
    handleClose() {
        this._close();
    }

    /**
     * Handle a double click on an event occurrence.
     *
     * @param {Event} event privatedblclick event fired by a primitive event occurrence.
     */
    handleEventDoubleClick(event) {
        this._dispatchEventDoubleClick(event.detail);
    }

    /**
     * Handle a mouse down on an event occurrence.
     *
     * @param {Event} event privatemousedown event fired by a primitive event occurrence.
     */
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

        this._dispatchContextMenu(event.detail);
        this._contextMenuIsOpen = true;
    }

    /**
     * Handle a focus inside the popover.
     */
    handleFocusIn() {
        this._isFocused = true;
    }

    /**
     * Handle a focus out of the popover. Wait for the next animation frame, and close the popover if the focus was meant to be lost, or refocus it if it wasn't meant to be lost.
     */
    handleFocusOut() {
        this._isFocused = false;

        requestAnimationFrame(() => {
            if (!this._isFocused && this._mouseIn && !this._contextMenuIsOpen) {
                this.focus();
            } else if (
                !this._isFocused &&
                !this._mouseIn &&
                !this._contextMenuIsOpen
            ) {
                this._close();
            }
        });
    }

    /**
     * Handle the mouse entering popover.
     */
    handleMouseEnter() {
        this._mouseIn = true;
    }

    /**
     * Handle the mouse leaving popover.
     */
    handleMouseLeave() {
        this._mouseIn = false;
    }

    /**
     * Handle scrolling in the popover body. Load previous or next events if needed.
     *
     * @param {Event} event Scroll event.
     */
    handleScroll(event) {
        const popover = event.currentTarget;
        const popoverTop = popover.getBoundingClientRect().top;
        const height = popover.scrollHeight;
        const scrolledDistance = popover.scrollTop;
        const bottomLimit = height - popover.clientHeight - LOADING_THRESHOLD;
        const loadDown = scrolledDistance >= bottomLimit;
        const loadUp = scrolledDistance <= LOADING_THRESHOLD;

        let newIndex;
        if (loadUp) {
            newIndex = this._startIndex - LOADING_OFFSET;
        } else if (loadDown) {
            const nextIndex = this._startIndex + LOADING_OFFSET;
            const maxIndex =
                this.events.length - MAX_LOADED_EVENTS - LOADING_OFFSET;
            newIndex = Math.min(nextIndex, maxIndex);
        }
        newIndex = Math.max(newIndex, 0);

        if (!isNaN(newIndex) && this._startIndex !== newIndex) {
            const topItem = this._getEventFromPosition(popoverTop);
            this._startIndex = newIndex;

            requestAnimationFrame(() => {
                // Move the scroll bar back to the previous top item
                const previousTopItem = this.template.querySelector(
                    `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-key="${topItem.key}"]`
                );
                if (previousTopItem) {
                    popover.scrollTop =
                        previousTopItem.offsetTop + topItem.offset;
                }
            });
        }
    }

    /*
     * -------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Dispatch the `close` event.
     */
    _dispatchClose() {
        const event = new CustomEvent('close', {
            cancelable: true
        });
        this.dispatchEvent(event);
        return event.defaultPrevented;
    }

    /**
     * Dispatch the `eventcontextmenu` event.
     *
     * @param {object} detail Detail of the event.
     */
    _dispatchContextMenu(detail = {}) {
        this.dispatchEvent(
            new CustomEvent('eventcontextmenu', {
                detail: {
                    ...detail,
                    focusPopover: this.focus.bind(this)
                },
                bubbles: true,
                composed: true
            })
        );
    }

    /**
     * Dispatch the `eventdblclick` event.
     *
     * @param {object} detail Detail of the event.
     */
    _dispatchEventDoubleClick(detail) {
        this.dispatchEvent(new CustomEvent('eventdblclick', { detail }));
    }

    /**
     * Dispatch the `eventmousedown` event.
     *
     * @param {object} detail Detail of the event.
     */
    _dispatchEventMouseDown(detail) {
        this.dispatchEvent(new CustomEvent('eventmousedown', { detail }));
    }
}
