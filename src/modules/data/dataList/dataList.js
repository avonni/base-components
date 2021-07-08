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

import { LightningElement, api, track } from 'lwc';
import { classSet, generateUniqueId } from 'c/utils';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';

/**
 * @constant
 * @type {object}
 * @property {string[]} valid   - The valid icon positions.
 * @property {string}   default - The default icon position.
 */
const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};

/**
 * @constant
 * @type {object}
 * @property {string[]} valid   - The valid list item dividers.
 * @property {string}   default - The default list item divider.
 */
const LIST_ITEM_DIVIDERS = {
    valid: ['top', 'bottom', 'around'],
    default: 'around'
};

/**
 * @class
 * @classdesc Editable and sortable data list.
 * @name DataList
 * @descriptor avonni-data-list
 * @example example-data-list--base
 * @public
 */
export default class AvonniDataListBasic extends LightningElement {
    /**
     * Label of the list.
     * @type {string}
     * @public
     */
    @api label;
    @api sortableIconName;
    @api alternativeText;

    @track _actions = [];
    @track _data = [];
    @track _fields = [];
    @track _listActions = [];
    _divider = LIST_ITEM_DIVIDERS.default;
    _sortable = false;
    _sortableIconPosition = ICON_POSITIONS.default;

    @track popoverFields = [];
    currentPopover;
    isInsidePopover = false;
    shiftPressed = false;
    tabPressed = false;

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
    }

    /* eslint-disable */
    @api
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = normalizeArray(value);
    }
    /* eslint-enable */

    @api
    get divider() {
        return this._divider;
    }
    set divider(value) {
        this._divider = normalizeString(value, {
            fallbackValue: LIST_ITEM_DIVIDERS.default,
            validValues: LIST_ITEM_DIVIDERS.valid
        });
    }

    @api
    get fields() {
        return this._fields;
    }
    set fields(value) {
        this._fields = normalizeArray(value);
    }

    @api
    get listActions() {
        return this._listActions;
    }
    set listActions(value) {
        this._listActions = normalizeArray(value);
    }

    @api
    get sortable() {
        return this._sortable;
    }
    set sortable(value) {
        this._sortable = normalizeBoolean(value);
    }

    @api
    get sortableIconPosition() {
        return this._sortableIconPosition;
    }
    set sortableIconPosition(value) {
        this._sortableIconPosition = normalizeString(value, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    get dataAsItems() {
        let items = [];
        this.data.forEach((element) => {
            items.push({
                label: element.label,
                href: element.href,
                description: element.description,
                infos: element.infos,
                icons: element.icons,
                avatarSrc: element.avatarSrc,
                avatarFallbackIconName: element.avatarFallbackIconName,
                imageSrc: element.imageSrc
            });
        });
        return items;
    }

    get hasListActions() {
        return this.listActions.length > 0;
    }

    get showPopover() {
        return this.currentPopover !== undefined;
    }

    get computedPopover() {
        return classSet('slds-popover')
            .add({
                'slds-nubbin_top': true,
                'slds-nubbin_right-top': false,
                'slds-nubbin_left-top': false
            })
            .toString();
    }

    @api
    reset() {
        this.template.querySelector('avonni-list').reset();
    }

    handleReorder(event) {
        this.dispatchEvent(
            new CustomEvent('reorder', {
                detail: {
                    items: event.detail.items
                }
            })
        );
    }

    handleActionClick(event) {
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: event.detail.name,
                    item: event.detail.item
                }
            })
        );
    }

    handleListActionClick(event) {
        this.dispatchEvent(
            new CustomEvent('listactionclick', {
                detail: {
                    name: event.target.getAttribute('data-name')
                }
            })
        );
    }

    handlePopoverDoneClick() {
        this.currentPopover = undefined;
        this.tabIndex = false;
        this.shiftPressed = false;
    }

    handleCurrentPopoverChange(event) {
        this.currentPopover = parseInt(event.target.value, 10);
        this.generatePopoverContent();
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            this.template.querySelector('c-data-input')?.focus();
        }, 0);
    }

    generatePopoverContent() {
        for (let i = 0; i < this.data.length; i++) {
            if (i === this.currentPopover) {
                this.popoverFields = [];
                this.fields.forEach((field) => {
                    this.popoverFields.push({
                        fieldId: generateUniqueId(),
                        label: field.label,
                        name: field.name,
                        type: field.type,
                        value: this.data[i][field.name]
                    });
                });
                break;
            }
        }
    }

    handlePopoverInputBlur(event) {
        if (this.currentPopover !== undefined) {
            let newData = JSON.parse(JSON.stringify(this.data));
            newData[this.currentPopover][event.target.name] =
                event.target.value;
            this._data = newData;

            this.handlePopoverBlur();
            this.dispatchSaveEvent();

            const trapFocus =
                event.target === this.template.querySelector('c-data-input') &&
                this.tabPressed &&
                this.shiftPressed;
            if (trapFocus) {
                this.template.querySelector('.slds-col_bump-left').focus();
            }
        }
    }

    dispatchSaveEvent() {
        this.dispatchEvent(
            new CustomEvent('save', {
                detail: {
                    draftValues: this.data
                }
            })
        );
    }

    handlePopoverDoneButtonBlur(event) {
        this.handlePopoverBlur();

        const trapFocus =
            event.target ===
                this.template.querySelector('.slds-col_bump-left') &&
            this.tabPressed &&
            !this.shiftPressed;
        if (trapFocus) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(() => {
                this.template.querySelector('c-data-input').focus();
            }, 0);
        }
    }

    handlePopoverMouseEnter() {
        this.isInsidePopover = true;
    }

    handlePopoverBlur() {
        if (!this.isInsidePopover && !this.tabPressed) {
            this.handlePopoverDoneClick();
            this.generatePopoverContent();
        }
    }

    handlePopoverMouseLeave() {
        this.isInsidePopover = false;
    }

    /**
     * Handles a keydown inside the popover.
     * @param {Event} event
     */
    handlePopoverKeydown(event) {
        if (event.keyCode === 9) {
            this.tabPressed = true;
        } else if (event.keyCode === 16) {
            this.shiftPressed = true;
        } else if (event.keyCode === 27) {
            this.handlePopoverDoneClick();
        }
    }

    /**
     * Handles a keyup inside the popover.
     * @param {Event} event
     */
    handlePopoverKeyup(event) {
        if (event.keyCode === 9) {
            this.tabPressed = false;
        } else if (event.keyCode === 16) {
            this.shiftPressed = false;
        }
    }
}
