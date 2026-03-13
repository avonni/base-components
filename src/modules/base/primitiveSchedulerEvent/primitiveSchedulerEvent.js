import {
    dateTimeObjectFrom,
    getWeekday,
    getWeekNumber
} from 'c/luxonDateTimeUtils';
import { DateTime } from 'c/luxon';
import { normalizeObject } from 'c/utils';
import { api, LightningElement } from 'lwc';

export default class PrimitiveSchedulerEvent extends LightningElement {
    /**
     * Background color of the event.
     *
     * @type {string}
     * @public
     */
    @api color;

    _cellDuration = 0;
    _cellHeight = 0;
    _cellWidth = 0;
    _from;
    _headerCells = [];
    _timezone;
    _to;
    _x = 0;
    _y = 0;

    _connected = false;
    _focused = false;
    _offsetStart = 0;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._connected = true;
        this._updatePosition();
        this._updateLength();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Duration of a scheduler column, in milliseconds.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get cellDuration() {
        return this._cellDuration;
    }
    set cellDuration(value) {
        this._cellDuration =
            !isNaN(Number(value)) && value >= 0 ? Number(value) : 0;

        if (this._connected) {
            this._updateLength();
        }
    }

    /**
     * Height of a cell, in pixels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get cellHeight() {
        return this._cellHeight;
    }
    set cellHeight(value) {
        this._cellHeight =
            !isNaN(Number(value)) && value >= 0 ? Number(value) : 0;

        if (this._connected) {
            this._updatePosition();
            this._updateLength();
        }
    }

    /**
     * Width of a cell, in pixels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get cellWidth() {
        return this._cellWidth;
    }
    set cellWidth(value) {
        this._cellWidth =
            !isNaN(Number(value)) && value >= 0 ? Number(value) : 0;

        if (this._connected) {
            this._updatePosition();
            this._updateLength();
        }
    }

    /**
     * Start date of the event.
     *
     * @type {DateTime}
     * @public
     * @required
     */
    @api
    get from() {
        return this._from;
    }
    set from(value) {
        this._from =
            value instanceof DateTime ? value : this._createDate(value);

        if (this._connected) {
            this._updatePosition();
            this._updateLength();
        }
    }

    /**
     * The header cells used to position and size the event. Two keys are allowed: xAxis and yAxis. If present, each key must be an array of cell objects.
     *
     * @type {object}
     * @public
     * @required
     */
    @api
    get headerCells() {
        return this._headerCells;
    }
    set headerCells(value) {
        const normalized =
            typeof value === 'string'
                ? JSON.parse(value)
                : normalizeObject(value);
        this._headerCells = normalized;

        if (this._connected) {
            this._updatePosition();
            this._updateLength();
        }
    }

    /**
     * Time zone used, in a valid IANA format. If empty, the browser's time zone is used.
     *
     * @type {string}
     * @public
     */
    @api
    get timezone() {
        return this._timezone;
    }
    set timezone(value) {
        this._timezone = value;

        if (this._connected) {
            this._updatePosition();
            this._updateLength();
        }
    }

    /**
     * End date of the event.
     *
     * @type {DateTime}
     * @public
     * @required
     */
    @api
    get to() {
        return this._to;
    }
    set to(value) {
        this._to = value instanceof DateTime ? value : this._createDate(value);

        if (this._connected) {
            this._updateLength();
        }
    }

    /**
     * Horizontal position of the event in the scheduler, in pixels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = parseInt(value, 10);

        if (this._connected) {
            this._updateHostTranslate();
        }
    }

    /**
     * Vertical position of the event in the scheduler, in pixels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = parseInt(value, 10);

        if (this._connected) {
            this._updateHostTranslate();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Outermost HTML element of the component.
     *
     * @type {HTMLElement}
     */
    get hostElement() {
        return this.template.host;
    }

    /**
     * Computed scheduler header cells.
     *
     * @type {object[]}
     */
    get cells() {
        if (this.isVerticalCalendar || this.isVerticalTimeline) {
            return this.headerCells.yAxis;
        }
        return this.headerCells.xAxis;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the occurrence.
     *
     * @public
     */
    @api
    focus() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-event-wrapper"]'
        );
        if (wrapper) {
            wrapper.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Create a Luxon DateTime object from a date, including the timezone.
     *
     * @param {string|number|Date} date Date to convert.
     * @returns {DateTime|boolean} Luxon DateTime object or false if the date is invalid.
     */
    _createDate(date) {
        return dateTimeObjectFrom(date, { zone: this.timezone });
    }

    /**
     * If the event is in a vertical setup of a calendar, remove the year, month and day from the date, to allow for comparison of the time only.
     *
     * @param {Date} date Date to transform.
     * @returns {Date}
     */
    _getComparableTime(date) {
        if (!this.isVerticalCalendar || !date) {
            return date;
        }
        const time = this._createDate(date);
        return time.set({ year: 1, month: 1, day: 1 });
    }

    /**
     * Get the size (in pixels) between the end of the item, and the end of the last cell it crosses.
     *
     * @param {Date} cellEnd Time at which the cell ends.
     * @param {number} cellSize Size of the cell, in pixels.
     * @param {DateTime} to End date of the item.
     * @returns {number} Size of the offset between the end of the item, and the end of the cell.
     */
    _getOffsetEnd(cellEnd, cellSize, to) {
        const durationLeft = cellEnd - to;
        const percentageLeft = durationLeft / this.cellDuration;
        return percentageLeft * cellSize;
    }

    /**
     * Get the size (in pixels) between the start of the item, and the end of the first cell it crosses.
     *
     * @param {Date} cellEnd Time at which the cell ends.
     * @param {number} cellSize Size of the cell, in pixels.
     * @returns {number} Size of the offset between the start of the item, and the end of the cell.
     */
    _getOffsetStart(cellEnd, cellSize) {
        const cellDuration = this.cellDuration;
        const from = this.from;

        const itemDuration = cellEnd - from;
        const emptyDuration = cellDuration - itemDuration;
        const emptyPercentageOfCell = emptyDuration / cellDuration;
        this._offsetStart = cellSize * emptyPercentageOfCell;
        this._updateHostTranslate();

        const itemPercentageOfCell = itemDuration / cellDuration;
        return cellSize * itemPercentageOfCell;
    }

    /**
     * Get the first cell that the event crosses.
     *
     * @param {object[]} cells Array of cell objects.
     * @returns {object} First cell crossed.
     */
    _getStartCellIndex(cells) {
        const start = this.occurrence?.weekStart || this.from;
        return cells.findIndex((cell) => {
            return (
                this._getComparableTime(cell.end) >
                this._getComparableTime(start)
            );
        });
    }

    /**
     * Get a transparent version of the color.
     *
     * @param {string} color CSS color value.
     * @returns {string} Transparent version of the color.
     */
    _getTransparentColor(color) {
        if (!color) {
            return undefined;
        }

        const isHex = color.match(/#([a-zA-Z0-9]{3}$|[a-zA-Z0-9]{6}$)/);
        if (isHex) {
            return isHex[0].length === 4
                ? `${isHex[0]}${isHex[1]}50`
                : `${isHex[0]}50`;
        }
        const isRGB = color.match(/rgb\(([0-9]+,\s?[0-9]+,\s?[0-9]+)\)/);
        if (isRGB) {
            return `rgba(${isRGB[1]}, 0.3)`;
        }
        return color;
    }

    /**
     * Set the length of the event through its CSS style.
     *
     * @param {number} length Length of the event.
     */
    _setLength(length) {
        const style = this.hostElement.style;
        if (this.isVertical) {
            style.height = length ? `${length}px` : null;
            if (this.cellWidth && this.numberOfEventsInThisTimeFrame) {
                const width =
                    this.cellWidth / this.numberOfEventsInThisTimeFrame;
                style.width = `${width}px`;
            } else if (this.isCalendar) {
                style.width = `${this.cellWidth}px`;
            } else {
                style.width = null;
            }
        } else {
            style.width = `${length}px`;
            style.height = null;
        }
    }

    /**
     * Add the computed position to the inline style of the component host.
     */
    _updateHostTranslate() {
        let x = this.x;
        if (this.isVertical && !this.referenceLine) {
            x = this.x + this.offsetSide;
        } else if (!this.isVertical) {
            x = this.x + this._offsetStart;
        }
        const y = this.isVertical ? this.y + this._offsetStart : this.y;
        if (this.hostElement) {
            this.hostElement.style.transform = `translate(${x}px, ${y}px)`;
        }
    }

    /**
     * Update the length of the item in the scheduler grid.
     */
    _updateLength() {
        if (this.isStandalone) {
            this._updateStandaloneLength();
            this._offsetStart = 0;
            return;
        } else if (this.hostElement) {
            this.hostElement.style.width = null;
        }
        const { cellHeight, cellWidth, cellDuration } = this;
        const from = this._getComparableTime(this.from);
        const headerCells = this.cells;

        let to = this._getComparableTime(this.to);
        const cellSize = this.isVertical ? cellHeight : cellWidth;
        if (!headerCells || !cellSize || !cellDuration) {
            return;
        }

        // Find the cell where the event starts
        let i = this._getStartCellIndex(headerCells);
        if (i < 0) return;

        let length = 0;
        const startsInMiddleOfCell =
            this._getComparableTime(headerCells[i].start) < from;

        if (startsInMiddleOfCell) {
            // If the event starts in the middle of a cell,
            // add only the appropriate length in the first cell
            const cellEnd = this._getComparableTime(headerCells[i].end);
            length += this._getOffsetStart(cellEnd, cellSize);
            if (this.referenceLine) return;

            if (cellEnd > to && from.ts !== to.ts) {
                // If the event ends before the end of the first column
                // remove the appropriate length of the first column
                length -= this._getOffsetEnd(cellEnd, cellSize, to);
                this._setLength(length);
                return;
            }
            i += 1;
        } else if (this.referenceLine) return;

        // Add the length of the header cells completely filled by the event
        while (i < headerCells.length) {
            const cellStart = this._getComparableTime(headerCells[i].start);
            if (cellStart + cellDuration > to) break;
            length += cellSize;
            i += 1;
        }

        // If the event ends in the middle of a column,
        // add the remaining length
        const cell = headerCells[i];
        const cellStart = cell && this._getComparableTime(cell.start);
        if (cell && cellStart < to) {
            const eventDurationLeft = to - cellStart;
            const colPercentEnd = eventDurationLeft / cellDuration;
            length += cellSize * colPercentEnd;
        }
        this._setLength(length);
    }

    /**
     * Update the position of the item.
     */
    _updatePosition() {
        // Used by child classes
    }

    /**
     * Compute and update the length of a standalone event.
     */
    _updateStandaloneLength() {
        const headerCells = this.headerCells.xAxis;
        const { to, cellWidth } = this;
        const isOneCellLength =
            this.referenceLine || !this.spansOnMoreThanOneDay;

        if ((isOneCellLength || !headerCells) && this.hostElement) {
            // The event should span on one cell
            this.hostElement.style.width = cellWidth ? `${cellWidth}px` : null;
            this.hostElement.style.height = null;
            return;
        }

        // The event should span on more than one cell.
        // Find the cell where it starts.
        const from = this.occurrence.firstAllowedDate;
        let i = headerCells.findIndex((cell) => {
            const cellStart = this._createDate(cell.start);
            return cellStart.weekday === from.weekday;
        });
        if (i < 0) return;

        let length = 0;

        // Add the full length of the cells the event passes through
        while (i < headerCells.length) {
            const cellStart = this._createDate(headerCells[i].start);
            const sameWeek = getWeekNumber(from) === getWeekNumber(to);
            if (getWeekday(cellStart) > getWeekday(to) && sameWeek) {
                break;
            }
            length += cellWidth;
            i += 1;
        }
        this._setLength(length);
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the blur event fired by the scheduler event.
     * Dispatch a privateblur event.
     *
     * @param {Event} event
     */
    handleBlur() {
        this._focused = false;

        /**
         * The event fired when the occurrence is blurred, if it is not disabled.
         *
         * @event
         * @name privateblur
         */
        this.dispatchEvent(new CustomEvent('privateblur'));
    }

    /**
     * Handle the contextmenu event fired by the scheduler event.
     * Dispatch a privatecontextmenu event.
     *
     * @param {Event} event
     */
    handleContextMenu(event) {
        event.preventDefault();
        // Used by child classes
    }

    /**
     * Handle the keydown event fired by the scheduler event.
     * Open the context menu if the space bar or enter were pressed.
     *
     * @param {Event} event
     */
    handleKeyDown(event) {
        const key = event.key;
        if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
            event.preventDefault();
            this.handleContextMenu(event);
        }
    }
}
