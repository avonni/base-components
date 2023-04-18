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
import { classListMutation, normalizeString } from 'c/utilsPrivate';
import { generateUUID } from 'c/utils';

const ALIGNMENT_BUMPS = {
    default: undefined,
    valid: ['left', 'top', 'right', 'bottom']
};

const CONTAINER_WIDTHS = {
    default: 'default',
    valid: ['default', 'small', 'medium', 'large']
};
const DEFAULT_GROW = 0;
const DEFAULT_SHRINK = 1;
const DEFAULT_SIZE = 'auto';

/**
 * @class
 * @descriptor avonni-layout-item
 * @description Item placed in a layout component.
 * @storyId example-layout--base
 * @public
 */
export default class LayoutItem extends LightningElement {
    _alignmentBump = ALIGNMENT_BUMPS.default;
    _grow = DEFAULT_GROW;
    _largeContainerOrder;
    _largeContainerSize;
    _mediumContainerOrder;
    _mediumContainerSize;
    _order;
    _shrink = DEFAULT_SHRINK;
    _size;
    _smallContainerOrder;
    _smallContainerSize;

    _connected = false;
    _orders = { default: 0 };
    _sizes = { default: DEFAULT_SIZE };
    containerWidth;
    name = generateUUID();

    connectedCallback() {
        this.updateClassAndStyle();
        this._connected = true;

        /**
         * The event fired when the layout item is inserted in the DOM.
         *
         * @event
         * @name privatelayoutitemconnected
         * @param {string} name Unique name of the layout item.
         * @param {object} callbacks Object with one key, setContainerSize, which contains the callback that should be called when the layout size changes.
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('privatelayoutitemconnected', {
                detail: {
                    name: this.name,
                    callbacks: {
                        setContainerSize: this.setContainerSize.bind(this)
                    }
                },
                bubbles: true
            })
        );
    }

    disconnectedCallback() {
        /**
         * The event fired when the layout item is removed from the DOM.
         *
         * @event
         * @name privatelayoutitemdisconnected
         * @param {string} name Unique name of the layout item.
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('privatelayoutitemdisconnected', {
                detail: {
                    name: this.name
                },
                bubbles: true
            })
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Specifies a direction to bump the alignment of adjacent layout items. Allowed values are left, top, right, bottom.
     *
     * @type {string}
     * @public
     */
    @api
    get alignmentBump() {
        return this._alignmentBump;
    }
    set alignmentBump(value) {
        this._alignmentBump = normalizeString(value, {
            fallbackValue: ALIGNMENT_BUMPS.default,
            validValues: ALIGNMENT_BUMPS.valid
        });

        if (this._connected) {
            this.updateClassAndStyle();
        }
    }

    /**
     * Positive number representing the ability for the item to grow if necessary. When set to 0, the item will not grow.
     * The number indicates the proportion of the empty space that the item will take. For example, if one item has a `grow` value of 2, it will take twice as much of the available space than the items that have a `grow` value of 1. If all the items have the same `grow` value, the available empty space will be equally divided between them.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get grow() {
        return this._grow;
    }
    set grow(value) {
        const number = parseInt(value, 10);
        this._grow = number >= 0 ? number : DEFAULT_GROW;

        if (this._connected) {
            this.updateClassAndStyle();
        }
    }

    /**
     * Order of the item when the parent layout’s size is greater or equal to 1024px.
     *
     * @type {number}
     * @public
     */
    @api
    get largeContainerOrder() {
        return this._largeContainerOrder;
    }
    set largeContainerOrder(value) {
        const normalizedNumber = parseInt(value, 10);
        this._largeContainerOrder = isNaN(normalizedNumber)
            ? undefined
            : normalizedNumber;
        this._orders.large = this.largeContainerOrder;

        if (this.containerWidth === 'large') {
            this.updateClassAndStyle();
        }
    }

    /**
     * Size of the item when the parent layout’s size is greater or equal to 1024px. See `size` for accepted values.
     *
     * @type {string|number}
     * @public
     */
    @api
    get largeContainerSize() {
        return this._largeContainerSize;
    }
    set largeContainerSize(value) {
        this._largeContainerSize = this.normalizeSize(value);
        this._sizes.large = this.largeContainerSize;

        if (this.containerWidth === 'large') {
            this.updateClassAndStyle();
        }
    }

    /**
     * Order of the item when the parent layout’s size is greater or equal to 768px.
     *
     * @type {number}
     * @public
     */
    @api
    get mediumContainerOrder() {
        return this._mediumContainerOrder;
    }
    set mediumContainerOrder(value) {
        const normalizedNumber = parseInt(value, 10);
        this._mediumContainerOrder = isNaN(normalizedNumber)
            ? undefined
            : normalizedNumber;
        this._orders.medium = this.mediumContainerOrder;

        if (this.containerWidth === 'medium') {
            this.updateClassAndStyle();
        }
    }

    /**
     * Size of the item when the parent layout’s size is greater or equal to 768px. See `size` for accepted values.
     *
     * @type {string|number}
     * @public
     */
    @api
    get mediumContainerSize() {
        return this._mediumContainerSize;
    }
    set mediumContainerSize(value) {
        this._mediumContainerSize = this.normalizeSize(value);
        this._sizes.medium = this.mediumContainerSize;

        if (this.containerWidth === 'medium') {
            this.updateClassAndStyle();
        }
    }

    /**
     * Default order of the item in the layout item. It will be applied if the parent layout’s size is lesser than 480px, or if no other order attribute is specified.
     * Beware that since the default is 0, you need to set the order of all the items in the layout for the attribute to work properly.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get order() {
        return this._order;
    }
    set order(value) {
        const normalizedNumber = parseInt(value, 10);
        this._order = isNaN(normalizedNumber) ? 0 : normalizedNumber;
        this._orders.default = this.order;

        if (this.containerWidth === 'default') {
            this.updateClassAndStyle();
        }
    }

    /**
     * Positive number representing the ability for the item to shrink if necessary. When set to 0, the item will not shrink.
     * The number indicates the proportion to which the item will shrink if needed. For example, if one item has a `shrink` value of 2, it will shrink twice as much than the items that have a `shrink` value of 1. If all the items have the same `shrink` value, they will all shrink the same.
     *
     * @type {number}
     * @default 1
     * @public
     */
    @api
    get shrink() {
        return this._shrink;
    }
    set shrink(value) {
        const number = parseInt(value, 10);
        this._shrink = number >= 0 ? number : DEFAULT_SHRINK;

        if (this._connected) {
            this.updateClassAndStyle();
        }
    }

    /**
     * Default size of the item. It will be applied if the parent layout’s size is lesser than 480px, or if no other size attribute is specified.
     * The size can be expressed:
     * * As an integer from 1 through 12, representing the relative space the item occupies in its parent layout.
     * * As a CSS flex-basis valid value (for example "20%", "5rem", etc.).
     *
     * @type {string|number}
     * @default auto
     * @public
     */
    @api
    get size() {
        return this._size;
    }
    set size(value) {
        const size = this.normalizeSize(value);
        this._size = size || size === 0 ? size : DEFAULT_SIZE;
        this._sizes.default = this.size;

        if (this.containerWidth === 'default') {
            this.updateClassAndStyle();
        }
    }

    /**
     * Order of the item when the parent layout’s size is greater or equal to 480px.
     *
     * @type {number}
     * @public
     */
    @api
    get smallContainerOrder() {
        return this._smallContainerOrder;
    }
    set smallContainerOrder(value) {
        const normalizedNumber = parseInt(value, 10);
        this._smallContainerOrder = isNaN(normalizedNumber)
            ? undefined
            : normalizedNumber;
        this._orders.small = this.smallContainerOrder;

        if (this.containerWidth === 'small') {
            this.updateClassAndStyle();
        }
    }

    /**
     * Size of the item when the parent layout’s size is greater or equal to 480px. See `size` for accepted values.
     *
     * @type {string|number}
     * @public
     */
    @api
    get smallContainerSize() {
        return this._smallContainerSize;
    }
    set smallContainerSize(value) {
        this._smallContainerSize = this.normalizeSize(value);
        this._sizes.small = this.smallContainerSize;

        if (this.containerWidth === 'small') {
            this.updateClassAndStyle();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Returns the current value of the attribute (size or order) based on the current container width.
     *
     * @param {object} map Map of the attribute values, with a key for each container width.
     * @returns {string|number}
     */
    getCurrentValue(map) {
        const { large, medium, small, default: defaultSize } = map;

        switch (this.containerWidth) {
            case 'large':
                return large || medium || small || defaultSize;
            case 'medium':
                return medium || small || defaultSize;
            case 'small':
                return small || defaultSize;
            default:
                return defaultSize;
        }
    }

    /**
     * Normalize the given size to a valid CSS flex-basis value.
     *
     * @param {number|string} size
     * @returns {string} Valid CSS flex-basis value.
     */
    normalizeSize(size) {
        const normalizedNumber = parseInt(Number(size), 10);
        const isGridFraction =
            !isNaN(normalizedNumber) &&
            normalizedNumber > 0 &&
            normalizedNumber <= 12;
        if (isGridFraction) {
            return `${(100 / 12) * normalizedNumber}%`;
        }
        return size;
    }

    /**
     * Set the container width.
     *
     * @param {string} width Valid width include default, small, medium or large.
     * @returns {}
     * @public
     */
    setContainerSize(width) {
        this.containerWidth = normalizeString(width, {
            fallbackValue: CONTAINER_WIDTHS.default,
            validValues: CONTAINER_WIDTHS.valid
        });

        this.updateClassAndStyle();
    }

    /**
     * Update the class and style of the item.
     */
    updateClassAndStyle() {
        classListMutation(this.classList, {
            'slds-col_bump-left': this.alignmentBump === 'left',
            'slds-col_bump-right': this.alignmentBump === 'right',
            'slds-col_bump-top': this.alignmentBump === 'top',
            'slds-col_bump-bottom': this.alignmentBump === 'bottom'
        });

        this.template.host.style.flexBasis = this.getCurrentValue(this._sizes);
        this.template.host.style.order = this.getCurrentValue(this._orders);
        this.template.host.style.flexGrow = this.grow;
        this.template.host.style.flexShrink = this.shrink;
    }
}
