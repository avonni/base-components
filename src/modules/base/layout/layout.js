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
import { AvonniResizeObserver } from 'c/resizeObserver';
import { classSet } from 'c/utils';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

const HORIZONTAL_ALIGNMENTS = {
    valid: ['start', 'center', 'end', 'space', 'spread'],
    default: 'start'
};

const DIRECTIONS = {
    valid: ['row', 'row-reverse', 'column', 'column-reverse'],
    default: 'row'
};

const VERTICAL_ALIGNMENTS = {
    valid: ['start', 'center', 'end', 'stretch'],
    default: 'stretch'
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

    _items = {};
    _resizeObserver;
    _width;

    renderedCallback() {
        if (!this.width) {
            this.updateWidth();
        }
        if (!this._resizeObserver) {
            this.initResizeObserver();
        }
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
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
    get wrapperClass() {
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
                'slds-grid_vertical-align-start':
                    this.verticalAlign === 'start',
                'slds-grid_vertical-align-center':
                    this.verticalAlign === 'center',
                'slds-grid_vertical-align-end': this.verticalAlign === 'end'
            })
            .toString();
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
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        if (!wrapper) {
            return;
        }
        this._resizeObserver = new AvonniResizeObserver(wrapper, () => {
            this.updateWidth();
        });
    }

    /**
     * Get the width of the layout, and update it in each of its items.
     */
    updateWidth() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        if (!wrapper || !Object.values(this._items).length) {
            return;
        }
        const width = wrapper.getBoundingClientRect().width;
        if (width >= 1024) {
            this._width = 'large';
        } else if (width >= 768) {
            this._width = 'medium';
        } else if (width >= 480) {
            this._width = 'small';
        } else {
            this._width = 'default';
        }
        Object.values(this._items).forEach((item) => {
            item.setContainerSize(this._width);
        });
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
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
        this._items[name] = callbacks;
        callbacks.setContainerSize(this._width);
    }

    /**
     * Handle an item removed from the DOM.
     *
     * @param {Event} event `privatelayoutitemdisconnected` event coming from a layout item.
     */
    handleItemDisconnected(event) {
        event.stopPropagation();
        const name = event.detail.name;
        delete this._items[name];
    }
}
