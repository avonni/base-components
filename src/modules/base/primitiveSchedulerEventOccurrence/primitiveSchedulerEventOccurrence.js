/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { DateTime } from 'c/luxon';
import { normalizeArray, normalizeBoolean } from 'c/utilsPrivate';

/**
 * Event occurrence displayed by the scheduler.
 *
 * @class
 * @descriptor c-primitive-scheduler-event-occurrence
 */
export default class PrimitiveSchedulerEventOccurrence extends LightningElement {
    /**
     * Background color of the occurrence.
     *
     * @type {string}
     * @public
     */
    @api color;

    /**
     * Unique name of the event this occurrence belongs to.
     *
     * @type {string}
     * @public
     */
    @api eventName;

    /**
     * Start date of the occurrence.
     *
     * @type {DateTime}
     * @public
     */
    @api from;

    /**
     * The Lightning Design System name of the icon. Names are written in the format utility:user.
     * The icon is appended to the left of the title.
     *
     * @type {string}
     * @public
     */
    @api iconName;

    /**
     * Unique key of the occurrence.
     *
     * @type {string}
     * @public
     */
    @api occurrenceKey;

    /**
     * Recurrence of the parent event.
     *
     * @type {string}
     * @public
     */
    @api recurrence;

    /**
     * Unique key of the scheduler row this occurrence appears on.
     *
     * @type {string}
     * @public
     */
    @api rowKey;

    /**
     * Theme of the occurrence. Valid values include default, transparent, line, hollow and rounded.
     *
     * @type {string}
     * @public
     */
    @api theme;

    /**
     * Title of the occurrence.
     *
     * @type {string}
     * @public
     */
    @api title;

    /**
     * End date of the occurrence.
     *
     * @type {DateTime}
     * @public
     */
    @api to;

    _columnDuration = 0;
    _columns = [];
    _columnWidth = 0;
    _disabled = false;
    _from;
    _keyFields = [];
    _occurrence = {};
    _readOnly = false;
    _rows = [];
    _to;

    _focused = false;
    _x = 0;
    _y = 0;

    connectedCallback() {
        if (!this.disabled)
            this.template.host.classList.add('scheduler__primitive-event');
    }

    renderedCallback() {
        this.updatePosition();
        this.updateWidth();
        this.updateHeight();
    }

    /**
     * Duration of a scheduler column, in milliseconds.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get columnDuration() {
        return this._columnDuration;
    }
    set columnDuration(value) {
        this._columnDuration = !isNaN(Number(value)) ? Number(value) : 0;
    }

    /**
     * The columns of the shortest header unit of the scheduler.
     *
     * @type {object[]}
     * @public
     */
    @api
    get columns() {
        return this._columns;
    }
    set columns(value) {
        this._columns = normalizeArray(value);
    }

    /**
     * Width of a column, in pixels.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get columnWidth() {
        return this._columnWidth;
    }
    set columnWidth(value) {
        this._columnWidth = !isNaN(Number(value)) ? Number(value) : 0;
    }

    /**
     * If present, the occurrence is a disabled date/time.
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
     * Keys of the rows the event appears on. A primitive-scheduler-event-occurrence will be created for each row.
     *
     * @type {string[]}
     * @public
     */
    @api
    get keyFields() {
        return this._keyFields;
    }
    set keyFields(value) {
        this._keyFields = normalizeArray(value);
    }

    /**
     * Event occurrence object this component is based on. The object is used to make sure the changes made in the scheduler are taken into account, even without a re-render.
     *
     * @type {object}
     * @public
     */
    @api
    get occurrence() {
        return this._occurrence;
    }
    set occurrence(value) {
        this._occurrence = typeof value === 'object' ? value : {};
    }

    /**
     * If true, the occurrence cannot be dragged, resized or edited in any way.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * Array of the scheduler row objects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get rows() {
        return this._rows;
    }
    set rows(value) {
        this._rows = normalizeArray(value);
    }

    /**
     * Horizontal position of the occurrence in the scheduler, in pixels.
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
        this.updateHostTranslate();
    }

    /**
     * Vertical position of the occurrence in the scheduler, in pixels.
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
        this.updateHostTranslate();
    }

    /**
     * Computed class of the occurrence.
     *
     * @type {string}
     */
    get computedClass() {
        const theme = this.theme;
        return classSet(
            `slds-p-vertical_xx-small slds-p-horizontal_small scheduler__event slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate scheduler__event_${theme}`
        )
            .add({
                'slds-text-color_inverse slds-current-color':
                    theme === 'default' ||
                    theme === 'rounded' ||
                    (this._focused && this.theme === 'transparent')
            })
            .toString();
    }

    /**
     * Computed background color of the occurrence.
     *
     * @type {string}
     */
    get computedColor() {
        return this.color || this.rowColor;
    }

    /**
     * Outermost HTML element of the component.
     *
     * @type {HTMLElement}
     */
    get hostElement() {
        return this.template.host;
    }

    /**
     * Space between the top of the occurrence and the top of its row, in pixels.
     *
     * @type {number}
     * @default 0
     */
    get offsetTop() {
        return this.occurrence.offsetTop || 0;
    }

    /**
     * Default color of the occurrence's row.
     *
     * @type {string}
     */
    get rowColor() {
        const row = this.rows.find(
            (computedRow) => computedRow.key === this.rowKey
        );
        return row && row.color;
    }

    /**
     * If true, the title HTML element will be displayed. This property is only used by disabled occurrences.
     *
     * @type {boolean}
     * @default false
     */
    get showTitle() {
        return this.disabled && (this.title || this.iconName);
    }

    /**
     * Computed inline style of the occurrence.
     *
     * @type {string}
     */
    get style() {
        const { computedColor, transparentColor, theme } = this;
        const isDefault = theme === 'default';
        const isTransparent = theme === 'transparent';
        const isRounded = theme === 'rounded';
        const isHollow = theme === 'hollow';
        const isLine = theme === 'line';

        let style = '';
        if (isDefault || isRounded || (isTransparent && this._focused)) {
            style += `background-color: ${computedColor};`;
        } else if (isTransparent && !this._focused) {
            style += `background-color: ${transparentColor};`;
        }
        if (isTransparent) {
            style += `border-left-color: ${computedColor};`;
        }
        if (isHollow || isLine) {
            style += `border-color: ${computedColor}`;
        }

        return style;
    }

    /**
     * If the computedColor is a hexadecimal or RGB color, transparent version of the computedColor (30% of opacity). Else, it is equal to the computedColor.
     *
     * @type {string}
     */
    get transparentColor() {
        if (!this.computedColor) return undefined;

        const isHex = this.computedColor.match(
            /#([a-zA-Z0-9]{3}$|[a-zA-Z0-9]{6}$)/
        );
        if (isHex) {
            return isHex[0].length === 4
                ? `${isHex[0]}${isHex[1]}30`
                : `${isHex[0]}30`;
        }
        const isRGB = this.computedColor.match(
            /rgb\(([0-9]+,\s?[0-9]+,\s?[0-9]+)\)/
        );
        if (isRGB) {
            return `rgba(${isRGB[1]}, .3)`;
        }
        return this.computedColor;
    }

    /**
     * Set the focus on the occurrence.
     *
     * @public
     */
    @api
    focus() {
        this.template.querySelector('.scheduler__event-wrapper').focus();
    }

    /**
     * Update the position of the occurrence in the scheduler grid.
     *
     * @public
     */
    @api
    updatePosition() {
        const { from, columns, columnWidth } = this;

        // Find the column where the event starts
        let i = columns.findIndex((column) => {
            return column.end > from;
        });

        if (i < 0) return;

        // Set the horizontal position
        const x = i * columnWidth;

        // Set the vertical position
        const rows = this.rows;
        let y = 0;
        for (let j = 0; j < rows.length; j++) {
            const rowKey = rows[j].key;
            if (rowKey === this.rowKey) break;

            y += rows[j].height;
        }
        y += this.offsetTop;

        this._x = x;
        this._y = y;
        this.updateHostTranslate();
    }

    /**
     * Update the width of the occurrence in the scheduler grid.
     *
     * @public
     */
    @api
    updateWidth() {
        const { from, to, columns, columnWidth, columnDuration } = this;
        const element = this.hostElement;

        // Find the column where the event starts
        let i = columns.findIndex((column) => {
            return column.end > from;
        });

        if (i < 0) return;

        let width = 0;

        // If the event starts in the middle of a column,
        // add only the appropriate width in the first column
        if (columns[i].start < from) {
            const columnEnd = DateTime.fromMillis(columns[i].end);
            const eventDuration = columnEnd.diff(from).milliseconds;
            const eventPercentageOfCol = eventDuration / columnDuration;
            const offsetWidth = columnWidth * eventPercentageOfCol;
            width += offsetWidth;

            const emptyDuration = columnDuration - eventDuration;
            const emptyPercentageOfCol = emptyDuration / columnDuration;
            this._x += columnWidth * emptyPercentageOfCol;
            this.updateHostTranslate();

            // If the event ends before the end of the first column
            // remove the appropriate width of the first column
            if (columnEnd > to) {
                const durationLeft = columnEnd.diff(to).milliseconds;
                const percentageLeft = durationLeft / columnDuration;
                width = width - percentageLeft * columnWidth;
                element.style.width = `${width}px`;
                return;
            }

            i += 1;
        }

        // Add the width of the columns completely filled by the event
        while (i < columns.length) {
            if (columns[i].end > to) break;
            width += columnWidth;
            i += 1;
        }

        // If the event ends in the middle of a column,
        // add the remaining width
        if (columns[i] && columns[i].start < to) {
            const columnStart = DateTime.fromMillis(columns[i].start);
            const eventDurationLeft = to.diff(columnStart).milliseconds;
            const colPercentEnd = eventDurationLeft / columnDuration;
            width += columnWidth * colPercentEnd;
        }

        element.style.width = `${width}px`;
    }

    /**
     * Update the height of the occurrence in the scheduler grid.
     *
     * @public
     */
    @api
    updateHeight() {
        if (this.disabled) {
            const element = this.hostElement;
            const row = this.rows.find((rw) => rw.key === this.rowKey);

            if (row) {
                const height = row.height;
                element.style.height = `${height}px`;
            }
        }
    }

    /**
     * Add the computed position to the inline style of the component host.
     */
    updateHostTranslate() {
        if (this.hostElement) {
            this.hostElement.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
    }

    /**
     * Handle the contextmenu event fired by the occurrence if it is not disabled.
     * Dispatch a privatecontextmenu event.
     *
     * @param {Event} event
     */
    handleContextMenu(event) {
        event.preventDefault();

        /**
         * The event fired when the user opens the context menu of the occurrence, if it is not disabled.
         *
         * @event
         * @name privatecontextmenu
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatecontextmenu', event);
    }

    /**
     * Dispatch a custom event. The name of the event to dispatch is given as a parameter.
     *
     * @param {string} name
     * @param {Event} event
     */
    dispatchCustomEvent(name, event) {
        const x =
            event.clientX || event.currentTarget.getBoundingClientRect().x;
        const y =
            event.clientY || event.currentTarget.getBoundingClientRect().bottom;

        this.dispatchEvent(
            new CustomEvent(name, {
                detail: {
                    eventName: this.eventName,
                    key: this.occurrenceKey,
                    from: this.from,
                    to: this.to,
                    x,
                    y
                }
            })
        );
    }

    /**
     * Handle the mouseenter event fired by the occurrence if it is not disabled.
     * Dispatch a privatemouseenter event.
     *
     * @param {Event} event
     */
    handleMouseEnter(event) {
        /**
         * The event fired when the mouse enters the occurrence, if it is not disabled.
         *
         * @event
         * @name privatemouseenter
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatemouseenter', event);
    }

    /**
     * Handle the mouseleave event fired by the occurrence if it is not disabled.
     * Dispatch a privatemouseleave event.
     *
     * @param {Event} event
     */
    handleMouseLeave(event) {
        /**
         * The event fired when the mouse leaves the occurrence, if it is not disabled.
         *
         * @event
         * @name privatemouseleave
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatemouseleave', event);
    }

    /**
     * Handle the dblclick event fired by the occurrence if it is not disabled.
     * Dispatch a privatedblclick event.
     *
     * @param {Event} event
     */
    handleDoubleClick(event) {
        if (this.readOnly) return;

        /**
         * The event fired when the user double-clicks on the occurrence, if it is not disabled.
         *
         * @event
         * @name privatedblclick
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatedblclick', event);
    }

    /**
     * Handle the focus event fired by the occurrence if it is not disabled.
     * Dispatch a privatefocus event.
     *
     * @param {Event} event
     */
    handleFocus(event) {
        this._focused = true;
        this.template
            .querySelector('.scheduler__event-wrapper')
            .classList.add('scheduler__event-wrapper_focused');

        /**
         * The event fired when the occurrence is focused, if it is not disabled.
         *
         * @event
         * @name privatefocus
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchCustomEvent('privatefocus', event);
    }

    /**
     * Handle the blur event fired by the occurrence if it is not disabled.
     * Dispatch a privateblur event.
     *
     * @param {Event} event
     */
    handleBlur() {
        this._focused = false;
        this.template
            .querySelector('.scheduler__event-wrapper')
            .classList.remove('scheduler__event-wrapper_focused');

        /**
         * The event fired when the occurrence is blurred, if it is not disabled.
         *
         * @event
         * @name privateblur
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchEvent(new CustomEvent('privateblur'));
    }

    /**
     * Handle the mousedown event fired by the occurrence if it is not disabled.
     * Dispatch a privatemousedown event.
     *
     * @param {Event} event
     */
    handleMouseDown(event) {
        if (event.button !== 0 || this.readOnly) return;

        const resize = event.target.dataset.resize;

        /**
         * The event fired when the mouse is pressed on the occurrence, if it is not disabled.
         *
         * @event
         * @name privatemousedown
         * @param {string} eventName Name of the event this occurrence belongs to.
         * @param {string} key Key of this occurrence.
         * @param {number} x Horizontal position of the occurrence.
         * @param {number} y Vertical position of the occurrence.
         */
        this.dispatchEvent(
            new CustomEvent('privatemousedown', {
                detail: {
                    eventName: this.eventName,
                    key: this.occurrenceKey,
                    from: this.from,
                    x: event.clientX,
                    y: event.clientY,
                    side: resize
                }
            })
        );
    }

    /**
     * Handle the keydown event fired by the occurrence if it is not disabled.
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
