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
import Pill from './pill';
import { keyCodes, normalizeBoolean, normalizeArray } from 'c/utilsPrivate';
import { AvonniResizeObserver } from 'c/resizeObserver';
import { classSet } from 'c/utils';

const DEFAULT_LABEL = 'Selected Options:';

export default class PillContainer extends LightningElement {
    _actions = [];
    _isCollapsible = false;
    _isExpanded = false;
    _items = [];
    _label = DEFAULT_LABEL;
    _singleLine = false;
    _sortable = false;

    _focusedIndex = 0;
    _focusedTabIndex = 0;
    _hasFocus = false;
    _pillsNotFittingCount;
    _pillContainerElementId;
    _resizeObserver;

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    renderedCallback() {
        if (this._resizeObserver && !this.computedIsCollapsible) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        } else if (!this._resizeObserver && this.computedIsCollapsible) {
            this._resizeObserver = this.initResizeObserver();
        }

        const ul = this.template.querySelector('[data-element-id="ul"]');
        if (ul) {
            if (this.items.length === 0) {
                // If no option is present, set ul has the focus (SLDS require UL has focus).
                ul.tabIndex = 0;
            } else {
                ul.tabIndex = -1;
                this.setFocusedItemTabIndex(0);
                // Consider adding pills programmatically to empty pill container.
                // UL has focus, so should shift focus to pill.
                if (this.template.querySelector('ul:focus')) {
                    this.focus();
                }
            }
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
    }

    @api
    get isCollapsible() {
        return this._isCollapsible;
    }
    set isCollapsible(value) {
        this._isCollapsible = normalizeBoolean(value);
    }

    @api
    get isExpanded() {
        return this._isExpanded;
    }
    set isExpanded(value) {
        this._isExpanded = normalizeBoolean(value);
    }

    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = normalizeArray(value);
    }

    @api
    get label() {
        return this._label;
    }
    set label(value) {
        this._label =
            value && typeof value === 'string' ? value : DEFAULT_LABEL;
    }

    @api
    get singleLine() {
        return this._singleLine;
    }
    set singleLine(value) {
        this._singleLine = normalizeBoolean(value);
    }

    @api
    get sortable() {
        return this._sortable;
    }
    set sortable(value) {
        this._sortable = normalizeBoolean(value);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedIsCollapsible() {
        return (!this.isCollapsible && !this.isExpanded) || this.isCollapsible;
    }

    get computedIsExpanded() {
        return (!this.isCollapsible && !this.isExpanded) || this.isExpanded;
    }

    get computedListboxClass() {
        return classSet('slds-listbox slds-is-relative slds-listbox_horizontal')
            .add({
                'slds-listbox_inline': this.singleLine
            })
            .toString();
    }

    get computedPillCountMoreLabel() {
        if (
            this.computedIsExpanded ||
            isNaN(this._pillsNotFittingCount) ||
            this._pillsNotFittingCount <= 0
        ) {
            return undefined;
        }
        return `+${this._pillsNotFittingCount} more`;
    }

    get computedPills() {
        return this.items.map((item, index) => {
            return new Pill({
                ...item,
                tabIndex:
                    this._focusedIndex === index ? this._focusedTabIndex : -1
            });
        });
    }

    get computedWrapperClass() {
        return classSet().add({
            'slds-is-expanded': this.computedIsExpanded && !this.singleLine,
            'slds-pill_container': this.singleLine,
            'slds-listbox_selection-group': !this.singleLine
        });
    }

    get focusedIndex() {
        if (this._focusedIndex >= this.items.length) {
            // Change is due to itemremove event, should move focus to the last one.
            this._focusedIndex = this._deleteLast ? this.items.length - 1 : 0;
            this._deleteLast = false;
        } else if (this._focusedIndex < 0) {
            this._focusedIndex = this.items.length - 1;
        }
        return this._focusedIndex;
    }

    set focusedIndex(value) {
        // Host may asynchronous update items. For example, move focus to latest item with right/left key, then host change items.
        // Then at renderedCallback call, need to update which item should has focus, but index > items.length.
        // When set it, the index is valid, but when rendered, index is not valid, so the validation check is happened at getter.
        this._focusedIndex = value;
    }

    get focusedNode() {
        const pills = this.template.querySelectorAll(
            '[data-element-id="span-pill"]'
        );
        return pills.length <= 0 ? null : pills[this.focusedIndex];
    }

    get oneAction() {
        return this.actions.length === 1 && this.actions[0];
    }

    get severalActions() {
        return this.actions.length > 1;
    }

    get showMore() {
        return this.computedIsCollapsible && !this.computedIsExpanded;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    focus() {
        const ul = this.template.querySelector('[data-element-id="ul"]');
        if (ul) ul.focus();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initResizeObserver() {
        const listBox = this.template.querySelector('[data-element-id="ul"]');
        if (!listBox) return null;

        const resizeObserver = new AvonniResizeObserver(() => {
            let notFittingCount = 0;
            const items = this.template.querySelectorAll(
                '[data-element-id="li"]'
            );
            for (let i = 0; i < items.length; i++) {
                const node = items[i];
                if (node.offsetTop > 0) {
                    notFittingCount += 1;
                }
            }
            this._pillsNotFittingCount = notFittingCount;
        });
        resizeObserver.observe(listBox);
        return resizeObserver;
    }

    setFocusedItemTabIndex(value) {
        const focusedNode = this.focusedNode;
        if (focusedNode) {
            this._focusedTabIndex = value;
        }
    }

    switchFocus(newValue) {
        // remove focus from current pill
        this.setFocusedItemTabIndex(-1);
        // move to next
        this.focusedIndex = newValue;
        // set focus
        this.setFocusedItemTabIndex(0);
        this.focus();
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleActionClick(event) {
        const actionName =
            event.detail instanceof Object
                ? event.detail.value
                : event.currentTarget.value;
        const itemName = event.currentTarget.dataset.itemName;
        const item = this.items.find((it) => it.name === itemName);

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: actionName,
                    item
                }
            })
        );
    }

    handleClick() {
        this.focus();
    }

    handleKeyDown(event) {
        if (this.items.length <= 0) {
            return;
        }
        const index = this.focusedIndex;
        switch (event.keyCode) {
            case keyCodes.left:
            case keyCodes.up:
                this.switchFocus(index - 1);
                break;
            case keyCodes.right:
            case keyCodes.down:
                this.switchFocus(index + 1);
                break;
            default:
                this.focus();
        }
    }

    handleMoreClick() {
        this.focus();
    }

    handlePillBlur(event) {
        if (
            !event.relatedTarget ||
            !this.template.contains(event.relatedTarget)
        ) {
            this._hasFocus = false;
            this.dispatchEvent(new CustomEvent('blur'));
        }
    }

    handlePillClick(event) {
        const index = parseInt(event.currentTarget.name, 10);

        if (index >= 0 && this.focusedIndex !== index) {
            this.switchFocus(index);
        } else {
            this.focus();
        }

        event.stopPropagation();
    }

    handlePillFocus() {
        if (!this._hasFocus) {
            this._hasFocus = true;
            this.dispatchEvent(new CustomEvent('focus'));
        }
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}
