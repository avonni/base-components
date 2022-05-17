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
import { generateUUID } from 'c/inputUtils';
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const DEFAULT_ALTERNATIVE_TEXT = 'Task list';

export default class ChipContainer extends LightningElement {
    _items = [];
    _alternativeText = DEFAULT_ALTERNATIVE_TEXT;
    _outline = false;
    _isCollapsible = false;
    _isExpanded = false;

    _pillsNotFittingCount = 2;

    /**
     * Items to display as chips
     *
     * @type {Object}
     * @public
     */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
    }

    /**
     * Alternative text used to describe the chip container.
     *
     * @type {string}
     * @public
     */
    @api
    get alternativeText() {
        return this._alternativeText;
    }
    set alternativeText(value) {
        this._alternativeText = normalizeString(value, {
            fallbackValue: DEFAULT_ALTERNATIVE_TEXT
        });
    }

    /**
     * If present, the pill list can be collapsed. Use `is-collapsible` with the `is-expanded` attribute to expand and collapse the list of pills.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isCollapsible() {
        return this._isCollapsible;
    }
    set isCollapsible(value) {
        this._isCollapsible = normalizeBoolean(value);
    }

    /**
     * If present and `is-collapsible` too, the list of pills is expanded. This attribute is ignored when `is-collapsible` is false, and the list of pills is expanded even if `is-expanded` is false or not set.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isExpanded() {
        return this._isExpanded;
    }
    set isExpanded(value) {
        this._isExpanded = normalizeBoolean(value);
    }

    renderedCallback() {
        // set the wrapper height to be as high as the biggest element
        if (this.showMore) {
            const tallest = [
                ...this.template.querySelectorAll(
                    '[data-element-id="chip-container-list"] *'
                )
            ].sort((prev, next) => next.clientHeight - prev.clientHeight)[0];
            console.log(tallest.clientHeight);
            this.template.querySelector(
                '[data-element-id="div-wrapper"]'
            ).style.height = `${tallest.clientHeight}px`;
        } else {
            this.template.querySelector(
                '[data-element-id="div-wrapper"]'
            ).style.height = `${
                this.template.querySelector(
                    '[data-element-id="chip-container-list"]'
                ).clientHeight
            }px`;
        }
    }

    /**
     * True if the pill container is considered collapsible.
     *
     * @type {boolean}
     */
    get computedIsCollapsible() {
        return (!this.isCollapsible && !this.isExpanded) || this.isCollapsible;
    }

    /**
     * True of the pill container is considered expanded.
     *
     * @type {boolean}
     */
    get computedIsExpanded() {
        return (this.isCollapsible && this.isExpanded) || !this.isCollapsible;
    }

    /**
     * True if the "show more" button should be visible.
     *
     * @type {boolean}
     * @default false
     */
    get showMore() {
        return this.computedIsCollapsible && !this.computedIsExpanded;
    }

    /**
     * Label of the "show more" button.
     *
     * @type {string}
     */
    get computedShowMoreLabel() {
        if (
            this.computedIsExpanded ||
            isNaN(this._pillsNotFittingCount) ||
            this._pillsNotFittingCount <= 0
        ) {
            return undefined;
        }
        return `+${this._pillsNotFittingCount} more`;
    }

    get computedWrapperClass() {
        return classSet('slds-listbox_selection-group');
    }

    get uniqueKey() {
        return generateUUID();
    }

    handleMoreClick() {
        this._isExpanded = true;
    }
}
