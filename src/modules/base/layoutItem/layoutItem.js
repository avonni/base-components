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

const DEFAULT_SIZE = 'auto';

export default class LayoutItem extends LightningElement {
    _alignmentBump = ALIGNMENT_BUMPS.default;
    _largeContainerOrder;
    _largeContainerSize;
    _mediumContainerOrder;
    _mediumContainerSize;
    _order;
    _size;
    _smallContainerOrder;
    _smallContainerSize;

    _connected = false;
    _containerWidth = CONTAINER_WIDTHS.default;
    _orders = { default: 0 };
    _sizes = { default: DEFAULT_SIZE };
    name = generateUUID();

    connectedCallback() {
        this.updateClassAndStyle();
        this._connected = true;

        this.dispatchEvent(
            new CustomEvent('privatelayoutitemconnected', {
                detail: {
                    name: this.name,
                    callbacks: {
                        setContainerWidth: this.setContainerWidth.bind(this)
                    }
                },
                bubbles: true
            })
        );
    }

    disconnectedCallback() {
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

        if (this._connected && this._containerWidth === 'large') {
            this.updateClassAndStyle();
        }
    }

    @api
    get largeContainerSize() {
        return this._largeContainerSize;
    }
    set largeContainerSize(value) {
        this._largeContainerSize = this.normalizeSize(value);
        this._sizes.large = this.largeContainerSize;

        if (this._connected && this._containerWidth === 'large') {
            this.updateClassAndStyle();
        }
    }

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

        if (this._connected && this._containerWidth === 'medium') {
            this.updateClassAndStyle();
        }
    }

    @api
    get mediumContainerSize() {
        return this._mediumContainerSize;
    }
    set mediumContainerSize(value) {
        this._mediumContainerSize = this.normalizeSize(value);
        this._sizes.medium = this.mediumContainerSize;

        if (this._connected && this._containerWidth === 'medium') {
            this.updateClassAndStyle();
        }
    }

    @api
    get order() {
        return this._order;
    }
    set order(value) {
        const normalizedNumber = parseInt(value, 10);
        this._order = isNaN(normalizedNumber) ? 0 : normalizedNumber;
        this._orders.default = this.order;

        if (this._connected && this._containerWidth === 'default') {
            this.updateClassAndStyle();
        }
    }

    @api
    get size() {
        return this._size;
    }
    set size(value) {
        const size = this.normalizeSize(value);
        this._size = size || size === 0 ? size : DEFAULT_SIZE;
        this._sizes.default = this.size;

        if (this._connected && this._containerWidth === 'default') {
            this.updateClassAndStyle();
        }
    }

    @api
    get smallContainerSize() {
        return this._smallContainerSize;
    }
    set smallContainerSize(value) {
        this._smallContainerSize = this.normalizeSize(value);
        this._sizes.small = this.smallContainerSize;

        if (this._connected && this._containerWidth === 'small') {
            this.updateClassAndStyle();
        }
    }

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

        if (this._connected && this._containerWidth === 'small') {
            this.updateClassAndStyle();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    getCurrentValue(map) {
        const { large, medium, small, default: defaultSize } = map;

        switch (this._containerWidth) {
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

    setContainerWidth(width) {
        this._containerWidth = normalizeString(width, {
            fallbackValue: CONTAINER_WIDTHS.default,
            validValues: CONTAINER_WIDTHS.valid
        });

        this.updateClassAndStyle();
    }

    updateClassAndStyle() {
        classListMutation(this.classList, {
            'slds-col_bump-left': this.alignmentBump === 'left',
            'slds-col_bump-right': this.alignmentBump === 'right',
            'slds-col_bump-top': this.alignmentBump === 'top',
            'slds-col_bump-bottom': this.alignmentBump === 'bottom'
        });

        this.template.host.style.flexBasis = this.getCurrentValue(this._sizes);
        this.template.host.style.order = this.getCurrentValue(this._orders);
    }
}
