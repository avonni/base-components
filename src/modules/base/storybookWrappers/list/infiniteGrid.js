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

export default class InfiniteGrid extends LightningElement {
    @api label;
    @api alternativeText;
    @api sortable;
    @api actions;
    @api mediaActions;
    @api sortableIconName;
    @api sortableIconPosition;
    @api divider;
    @api variant;
    @api cols;
    @api smallContainerCols;
    @api mediumContainerCols;
    @api largeContainerCols;
    @api imageAttributes;
    @api loadMoreOffset;

    _enableInfiniteLoading = true;
    _isLoading = false;
    _items;

    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = value;
    }

    @api
    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }

    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = value;
    }

    connectedCallback() {
        this._loadedItems = this.items;
    }

    loadMoreData() {
        this._isLoading = true;

        setTimeout(() => {
            const newItems = this.items.concat(this._loadedItems);

            if (newItems.length >= 30) {
                this._isLoading = false;
                this._enableInfiniteLoading = false;
            } else {
                this._isLoading = false;
                this._items = newItems;
            }
        }, 1000);
    }
}
