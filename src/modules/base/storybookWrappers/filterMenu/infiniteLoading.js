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
import { deepCopy, normalizeObject } from 'c/utilsPrivate';

export default class FilterMenuInfiniteLoading extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api applyButtonLabel;
    @api buttonVariant;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownNubbin;
    @api hideApplyResetButtons;
    @api hideSelectedItems;
    @api iconName;
    @api iconSize;
    @api label;
    @api loadingStateAlternativeText;
    @api name;
    @api resetButtonLabel;
    @api title;
    @api tooltip;
    @api type;
    @api value;
    @api variant;

    _isLoading;
    _typeAttributes;

    computedTypeAttributes = {};
    items = [];
    _loadMoreTimeOut;
    _searchTerm;

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = value;
    }

    @api
    get typeAttributes() {
        return this._typeAttributes;
    }
    set typeAttributes(value) {
        this._typeAttributes = value;
        this.computedTypeAttributes = normalizeObject(deepCopy(value));
    }

    generateNewItems() {
        for (let i = 0; i < 10; i++) {
            const number = this.items.length + 1;
            const label = this._searchTerm
                ? `${this._searchTerm} ${number}`
                : `Item ${number}`;
            this.items.push({
                label,
                value: `item-${number}`
            });
        }
    }

    handleClose() {
        clearTimeout(this._loadMoreTimeOut);
        this.items = [];
        this._isLoading = false;
        this.computedTypeAttributes = {
            ...this.computedTypeAttributes,
            enableInfiniteLoading: true,
            items: []
        };
    }

    handleLoadMore() {
        if (this.items.length > 150) {
            this._isLoading = false;
            this.computedTypeAttributes.enableInfiniteLoading = false;
            this.computedTypeAttributes = { ...this.computedTypeAttributes };
            return;
        }

        this._isLoading = true;
        clearTimeout(this._loadMoreTimeOut);

        this._loadMoreTimeOut = setTimeout(() => {
            this.generateNewItems();
            this.computedTypeAttributes.items = this.items;
            this._isLoading = false;
            this.computedTypeAttributes = { ...this.computedTypeAttributes };
        }, 1000);
    }

    handleSearch(event) {
        this._searchTerm = event.detail.value;
    }
}
