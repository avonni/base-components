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

export default class Occurrence extends LightningElement {
    @api color;
    @api eventName;
    @api from;
    @api iconName;
    @api occurrenceKey;
    @api rowKey;
    @api theme;
    @api title;
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

    @api
    get columnDuration() {
        return this._columnDuration;
    }
    set columnDuration(value) {
        this._columnDuration = !isNaN(Number(value)) ? Number(value) : 0;
    }

    @api
    get columns() {
        return this._columns;
    }
    set columns(value) {
        this._columns = normalizeArray(value);
    }

    @api
    get columnWidth() {
        return this._columnWidth;
    }
    set columnWidth(value) {
        this._columnWidth = !isNaN(Number(value)) ? Number(value) : 0;
    }

    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get keyFields() {
        return this._keyFields;
    }
    set keyFields(value) {
        this._keyFields = normalizeArray(value);
    }

    @api
    get occurrence() {
        return this._occurrence;
    }
    set occurrence(value) {
        this._occurrence = typeof value === 'object' ? value : {};
    }

    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    @api
    get rows() {
        return this._rows;
    }
    set rows(value) {
        this._rows = normalizeArray(value);
    }

    @api
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = parseInt(value, 10);
        this.updateHostTranslate();
    }

    @api
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = parseInt(value, 10);
        this.updateHostTranslate();
    }

    get computedClass() {
        const theme = this.theme;
        return classSet(
            `slds-p-vertical_xx-small slds-p-horizontal_small scheduler__event slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate scheduler__event_${theme}`
        )
            .add({
                'slds-text-color_inverse slds-current-color':
                    theme === 'default' || theme === 'rounded'
            })
            .toString();
    }

    get computedColor() {
        return this.color || this.rowColor;
    }

    get hostElement() {
        return this.template.host;
    }

    get key() {
        return this.occurrenceKey;
    }

    get offsetTop() {
        return this.occurrence.offsetTop || 0;
    }

    get rowColor() {
        const row = this.rows.find(
            (computedRow) => computedRow.key === this.rowKey
        );
        return row && row.color;
    }

    get showTitle() {
        return this.disabled && (this.title || this.iconName);
    }

    get style() {
        const { computedColor, transparentColor, theme } = this;
        const isDefault = theme === 'default';
        const isTransparent = theme === 'transparent';
        const isRounded = theme === 'rounded';
        const isHollow = theme === 'hollow';
        const isLine = theme === 'line';

        let style = '';
        if (isDefault || isRounded) {
            style += `background-color: ${computedColor};`;
        }
        if (isTransparent) {
            style += `
                background-color: ${transparentColor};
                border-left-color: ${computedColor};
            `;
        }
        if (isHollow || isLine) {
            style += `border-color: ${computedColor}`;
        }

        return style;
    }

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

    updateHostTranslate() {
        if (this.hostElement) {
            this.hostElement.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
    }

    handleContextMenu(event) {
        event.preventDefault();
        this.dispatchCustomEvent('privatecontextmenu', event);
    }

    dispatchCustomEvent(name, event) {
        const x =
            event.clientX || event.currentTarget.getBoundingClientRect().x;
        const y =
            event.clientY || event.currentTarget.getBoundingClientRect().bottom;

        this.dispatchEvent(
            new CustomEvent(name, {
                detail: {
                    eventName: this.eventName,
                    key: this.key,
                    from: this.from,
                    x,
                    y
                }
            })
        );
    }

    handleMouseEnter(event) {
        this.dispatchCustomEvent('privatemouseenter', event);
    }

    handleMouseLeave(event) {
        this.dispatchCustomEvent('privatemouseleave', event);
    }

    handleDoubleClick(event) {
        if (this.readOnly) return;

        this.dispatchCustomEvent('privatedblclick', event);
    }

    handleFocus(event) {
        this.dispatchCustomEvent('privatefocus', event);
    }

    handleBlur() {
        this.dispatchEvent(new CustomEvent('privateblur'));
    }

    handleMouseDown(event) {
        if (event.button !== 0 || this.readOnly) return;

        const resize = event.target.dataset.resize;

        this.dispatchEvent(
            new CustomEvent('privatemousedown', {
                detail: {
                    eventName: this.eventName,
                    key: this.key,
                    from: this.from,
                    x: event.clientX,
                    y: event.clientY,
                    side: resize
                }
            })
        );
    }

    handleKeyDown(event) {
        const key = event.key;
        if (key === 'Enter' || key === ' ' || key === 'Spacebar') {
            event.preventDefault();
            this.handleContextMenu(event);
        }
    }
}
