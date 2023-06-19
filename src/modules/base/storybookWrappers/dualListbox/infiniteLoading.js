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

export default class InfiniteLoading extends LightningElement {
    @api addButtonIconName;
    @api addButtonLabel;
    @api buttonSize;
    @api buttonVariant;
    @api disableReordering;
    @api disabled;
    @api downButtonIconName;
    @api downButtonLabel;
    @api draggable;
    @api fieldLevelHelp;
    @api hideBottomDivider;
    @api label;
    @api loadMoreOffset;
    @api maxVisibleOptions;
    @api max;
    @api min;
    @api messageWhenRangeOverflow;
    @api messageWhenRangeUnderflow;
    @api messageWhenValueMissing;
    @api name;
    @api removeButtonIconName;
    @api removeButtonLabel;
    @api required;
    @api requiredOptions;
    @api allowSearch;
    @api selectedLabel;
    @api selectedPlaceholder;
    @api size;
    @api sourceLabel;
    @api upButtonIconName;
    @api upButtonLabel;
    @api validity;
    @api value;
    @api variant;

    isLoading = false;
    options = [];

    generateNewOptions(searchTerm) {
        const newOptions = [...this.options];

        for (let i = 0; i < 5; i++) {
            const value = newOptions.length.toString();
            let label = `Auto generated option #${value}`;
            if (searchTerm) {
                label += `, with search term ${searchTerm}`;
            }

            const newOption = {
                label,
                value
            };

            newOptions.push(newOption);
        }

        return newOptions;
    }

    handleLoadMore(event) {
        const loadMore = this.options.length < 50;
        if (loadMore) {
            this.isLoading = true;

            setTimeout(() => {
                this.options = this.generateNewOptions(event.detail.searchTerm);
                this.isLoading = false;
            }, 1000);
        } else {
            this.isLoading = false;
        }
    }
}
