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
import { normalizeBoolean } from 'c/utilsPrivate';

export default class PrimitiveCollapsibleGroup extends LightningElement {
    /**
     * The value is the number of levels deep it is nested to indicate the distinct grouping is nested within.
     *
     * @type {number}
     */
    @api level;

    /**
     * Width of the header datatable.
     *
     * @type {number}
     */
    @api tableWidth;

    /**
     * The title can include text, and is displayed in the header.
     *
     * @type {string}
     */
    @api title;

    /**
     * If present, close the section.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get closed() {
        return this._closed;
    }

    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    /**
     * If the section is not collapsible, the left icon is hidden.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get collapsible() {
        return this._collapsible;
    }

    set collapsible(value) {
        this._collapsible = normalizeBoolean(!value);
    }

    /**
     * Size of the group displayed.
     *
     * @type {number}
     */
    @api
    get size() {
        return this._size;
    }

    set size(value) {
        this._size = typeof value === 'number' ? value : parseInt(value, 10);
    }

    _closed = false;
    _collapsible = false;
    _size;

    renderedCallback() {
        this.sectionPaddingLeft();
        this.sectionWidth();
    }

    /**
     * Computed section class styling.
     *
     * @type {string}
     */
    get sectionClass() {
        return classSet('slds-section')
            .add({
                'slds-is-open': !this.collapsible || !this.closed,
                'avonni-primitive-collapsible-group__section_margin_bottom': !this
                    .closed
            })
            .toString();
    }

    /**
     * Computed section title class styling.
     *
     * @type {string}
     */
    get sectionTitleClass() {
        return classSet(
            'slds-section__title avonni-primitive-collapsible-group__section_padding_bottom'
        )
            .add({
                'slds-theme_shade': !this.collapsible
            })
            .toString();
    }

    /**
     * Returns the section element.
     *
     * @type {element}
     */
    get section() {
        return this.template.querySelector('.slds-section__title');
    }

    /**
     * Section change status toggle.
     */
    changeSectionStatus() {
        this._closed = !this._closed;
    }

    /**
     * Sets padding left for section title depending on the level.
     */
    sectionPaddingLeft() {
        this.section.style.paddingLeft = `${this.level}rem`;
    }

    /**
     * Sets the width of the section depending on the width of the header datatable.
     */
    sectionWidth() {
        this.template.querySelectorAll('.slds-section').forEach((section) => {
            section.style.width = `${this.tableWidth}px`;
        });
    }
}
