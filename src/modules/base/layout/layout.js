import { AvonniResizeObserver } from 'c/resizeObserver';
import {
    classSet,
    generateUUID,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { LightningElement, api } from 'lwc';

const DIRECTIONS = {
    valid: ['row', 'row-reverse', 'column', 'column-reverse'],
    default: 'row'
};

const HORIZONTAL_ALIGNMENTS = {
    valid: ['start', 'center', 'end', 'space', 'spread'],
    default: 'start'
};

const VERTICAL_ALIGNMENTS = {
    valid: ['start', 'center', 'end', 'stretch'],
    default: 'stretch'
};

const WIDTHS = {
    default: 'default',
    valid: ['default', 'small', 'medium', 'large']
};

/**
 * @class
 * @descriptor avonni-layout
 * @description Responsive grid system.
 * @storyId example-layout--base
 * @public
 */
export default class Layout extends LightningElement {
    _direction = DIRECTIONS.default;
    _horizontalAlign = HORIZONTAL_ALIGNMENTS.default;
    _multipleRows = false;
    _verticalAlign = VERTICAL_ALIGNMENTS.default;

    _disconnected = false;
    _items = new Map();
    _name = generateUUID();
    _previousWidth;
    _requestId;
    _resizeIsHandledByParent = false;
    _resizeObserver;
    _resizeTimeoutId; // Add debounce timeout
    _cachedWidth; // Cache the current width to avoid unnecessary updates
    _pendingSizeUpdates = new Set(); // Track items that need size updates

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        /**
         * The event fired when the layout is inserted in the DOM.
         *
         * @event
         * @name privatelayoutconnected
         * @param {string} name Unique name of the layout.
         * @param {object} callbacks Object with two keys:
         * * `setItemsSize`: When called, the layout passes down its current width to its layout items.
         * * `setIsResizedByParent`: If called with `true`, the resizing of the layout is handled by its parent. The layout will not watch its width and update the size of its items automatically.
         * @bubbles
         * @composed
         */
        const event = new CustomEvent('privatelayoutconnected', {
            detail: {
                callbacks: {
                    setItemsSize: this.setItemsSize.bind(this),
                    setIsResizedByParent: this.setIsResizedByParent.bind(this)
                },
                name: this._name
            },
            composed: true,
            bubbles: true
        });
        this.dispatchEvent(event);
    }

    renderedCallback() {
        this.initResizeObserver();
    }

    disconnectedCallback() {
        this.removeResizeObserver();

        // Clear any pending resize timeout
        if (this._resizeTimeoutId) {
            clearTimeout(this._resizeTimeoutId);
            this._resizeTimeoutId = null;
        }

        // Clear any pending animation frame
        if (this._requestId) {
            cancelAnimationFrame(this._requestId);
            this._requestId = null;
        }

        /**
         * The event fired when the layout is removed from the DOM.
         *
         * @event
         * @name privatelayoutdisconnected
         * @param {string} name Unique name of the layout.
         * @bubbles
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('privatelayoutdisconnected', {
                detail: {
                    name: this._name
                },
                composed: true,
                bubbles: true
            })
        );
        // If the parent is disconnected too, the event won't get to its other ancestors.
        // Use _disconnected to still make sure setItemsSize() is not called uselessly.
        this._disconnected = true;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Direction in which the items are placed in the container. Valid values include row, row-reverse, column and column-reverse.
     *
     * @type {string}
     * @default row
     * @public
     */
    @api
    get direction() {
        return this._direction;
    }
    set direction(value) {
        this._direction = normalizeString(value, {
            fallbackValue: DIRECTIONS.default,
            validValues: DIRECTIONS.valid
        });
    }

    /**
     * Determines how to spread the layout items horizontally. Valid values include start, center, space, spread, and end.
     *
     * @type {string}
     * @default start
     * @public
     */
    @api
    get horizontalAlign() {
        return this._horizontalAlign;
    }
    set horizontalAlign(value) {
        this._horizontalAlign = normalizeString(value, {
            fallbackValue: HORIZONTAL_ALIGNMENTS.default,
            validValues: HORIZONTAL_ALIGNMENTS.valid
        });
    }

    /**
     * If present, layout items wrap to the following line when they exceed the layout width.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get multipleRows() {
        return this._multipleRows;
    }
    set multipleRows(value) {
        this._multipleRows = normalizeBoolean(value);
    }

    /**
     * Determines how to align the layout items vertically in the container. Valid values include start, center, end, and stretch.
     *
     * @type {string}
     * @default stretch
     * @public
     */
    @api
    get verticalAlign() {
        return this._verticalAlign;
    }
    set verticalAlign(value) {
        this._verticalAlign = normalizeString(value, {
            fallbackValue: VERTICAL_ALIGNMENTS.default,
            validValues: VERTICAL_ALIGNMENTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed CSS classes for the layout wrapper.
     *
     * @type {string}
     */
    get computedWrapperClass() {
        return classSet('slds-grid avonni-layout-wrapper')
            .add({
                'slds-grid_vertical': this.direction === 'column',
                'slds-grid_reverse': this.direction === 'row-reverse',
                'slds-grid_vertical-reverse':
                    this.direction === 'column-reverse',
                'slds-grid_align-center': this.horizontalAlign === 'center',
                'slds-grid_align-end': this.horizontalAlign === 'end',
                'slds-grid_align-space': this.horizontalAlign === 'space',
                'slds-grid_align-spread': this.horizontalAlign === 'spread',
                'slds-wrap': this.multipleRows,
                'slds-grid_vertical-stretch': this.verticalAlign === 'stretch',
                'slds-grid_vertical-align-start':
                    this.verticalAlign === 'start',
                'slds-grid_vertical-align-center':
                    this.verticalAlign === 'center',
                'slds-grid_vertical-align-end': this.verticalAlign === 'end'
            })
            .toString();
    }

    /**
     * Compute current width value.
     */
    get width() {
        const width = this.wrapper?.getBoundingClientRect().width || 0;
        if (width >= 1024) return 'large';
        if (width >= 768) return 'medium';
        if (width >= 480) return 'small';
        return WIDTHS.default;
    }

    /**
     * Wrapper element
     */
    get wrapper() {
        return this.template.querySelector('[data-element-id="div-wrapper"]');
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Initialize the resize observer, triggered when the layout is resized.
     */
    initResizeObserver() {
        if (
            !this.wrapper ||
            this._resizeObserver ||
            this._resizeIsHandledByParent
        ) {
            return;
        }
        this._dispatchSizeChange();
        this.debouncedSetItemsSize();

        this._resizeObserver = new AvonniResizeObserver(this.wrapper, () => {
            this._dispatchSizeChange();
            this.debouncedSetItemsSize();
        });
    }

    /**
     * Remove the resize observer.
     */
    removeResizeObserver() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
    }

    /**
     * Set the resize observer to be handled by the parent.
     *
     * @param {boolean} value
     */
    setIsResizedByParent(value) {
        this._resizeIsHandledByParent = normalizeBoolean(value);

        if (this._resizeIsHandledByParent) {
            this.removeResizeObserver();
        } else {
            this.initResizeObserver();
        }
    }

    /**
     * Debounced version of setItemsSize to prevent excessive updates during rapid resize events.
     */
    debouncedSetItemsSize() {
        if (this._disconnected) return;

        // Clear any pending timeout
        if (this._resizeTimeoutId) {
            clearTimeout(this._resizeTimeoutId);
        }

        // Debounce resize updates to prevent excessive calculations
        this._resizeTimeoutId = setTimeout(() => {
            this.setItemsSize();
        }, 16); // ~60fps debounce
    }

    /**
     * Set the size of the items.
     */
    setItemsSize() {
        if (this._disconnected) return;

        const currentWidth = this.width;

        // Skip if width hasn't changed
        if (this._cachedWidth === currentWidth) return;

        this._cachedWidth = currentWidth;

        // We use requestAnimationFrame to improve rendering performance,
        // especially when there is a lot of items.
        cancelAnimationFrame(this._requestId);
        this._requestId = requestAnimationFrame(() => {
            // Batch all size updates in a single frame
            this._items.forEach((item) => {
                item.setContainerSize(currentWidth);
            });
        });
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Handle an item inserted into the DOM.
     *
     * @param {Event} event `privatelayoutitemconnected` event coming from a layout item.
     */
    handleItemConnected(event) {
        event.stopPropagation();
        const { name, callbacks } = event.detail;
        this._items.set(name, callbacks);

        // Only update size if we have a cached width, otherwise wait for first resize
        if (this._cachedWidth) {
            this.debouncedSetItemsSize();
        }
    }

    /**
     * Handle an item removed from the DOM.
     *
     * @param {Event} event `privatelayoutitemdisconnected` event coming from a layout item.
     */
    handleItemDisconnected(event) {
        event.stopPropagation();
        const name = event.detail.name;
        this._items.delete(name);
    }

    /*
     * ------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Dispatch the `sizechange` event when the layout width changes.
     */
    _dispatchSizeChange() {
        const newWidth = this.width;
        if (this._previousWidth === newWidth) return;
        this._previousWidth = newWidth;

        /**
         * The event fired when the layout width changes.
         *
         * @event
         * @name sizechange
         * @param {string} width Current width of the layout: default, small, medium or large.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('sizechange', {
                detail: {
                    width: newWidth
                }
            })
        );
    }
}
