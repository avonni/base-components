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
import Pill from './pill';
import { deepCopy, keyCodes, normalizeBoolean, normalizeArray } from 'c/utilsPrivate';
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

    @track computedPills = [];
    _dragState;
    _dragTimeOut;
    _focusedIndex = 0;
    _focusedTabIndex = 0;
    _hasFocus = false;
    _pillsNotFittingCount;
    _pillContainerElementId;
    _resizeObserver;

    connectedCallback() {
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    renderedCallback() {
        if (this._resizeObserver && !this.computedIsCollapsible) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        } else if (!this._resizeObserver && this.computedIsCollapsible) {
            this._resizeObserver = this.initResizeObserver();
        }

        // if (this.listElement) {
        //     if (this.items.length === 0) {
        //         // If no option is present, set ul has the focus (SLDS require UL has focus).
        //         this.listElement.tabIndex = 0;
        //     } else {
        //         this.listElement.tabIndex = -1;
        //         this.setFocusedItemTabIndex(0);
        //         // Consider adding pills programmatically to empty pill container.
        //         // UL has focus, so should shift focus to pill.
        //         if (this.template.querySelector('ul:focus')) {
        //             this.focus();
        //         }
        //     }
        // }
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }

        window.removeEventListener('mouseup', this.handleMouseUp);
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
        this.clearDrag();
    }

    @api
    get isExpanded() {
        return this._isExpanded;
    }
    set isExpanded(value) {
        this._isExpanded = normalizeBoolean(value);
        this.clearDrag();
    }

    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = deepCopy(normalizeArray(value));

        this.initPills();
        this.clearDrag();
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
        this.clearDrag();
    }

    @api
    get sortable() {
        return this._sortable;
    }
    set sortable(value) {
        this._sortable = normalizeBoolean(value);
        this.clearDrag();
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

    get computedListItemClass() {
        return classSet('slds-listbox-item').add({
            'slds-is-relative': this.sortable,
            'avonni-pill-container__item_sortable-single-line': this.sortable && this.singleLine
        });
    }

    get computedPillClass() {
        return classSet('slds-pill').add({
            'avonni-pill-container__pill-sortable': this.sortable
        }).toString();
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

    // get computedPills() {
    //     return this.items.map((item, index) => {
    //         return new Pill({
    //             ...item,
    //             tabIndex:
    //                 this._focusedIndex === index ? this._focusedTabIndex : -1
    //         });
    //     });
    // }

    get computedWrapperClass() {
        return classSet().add({
            'slds-is-expanded': this.computedIsExpanded && !this.singleLine,
            'slds-pill_container': this.singleLine,
            'slds-listbox_selection-group': !this.singleLine
        });
    }

    // get focusedIndex() {
    //     if (this._focusedIndex >= this.items.length) {
    //         // Change is due to itemremove event, should move focus to the last one.
    //         this._focusedIndex = this._deleteLast ? this.items.length - 1 : 0;
    //         this._deleteLast = false;
    //     } else if (this._focusedIndex < 0) {
    //         this._focusedIndex = this.items.length - 1;
    //     }
    //     return this._focusedIndex;
    // }

    // set focusedIndex(value) {
    //     // Host may asynchronous update items. For example, move focus to latest item with right/left key, then host change items.
    //     // Then at renderedCallback call, need to update which item should has focus, but index > items.length.
    //     // When set it, the index is valid, but when rendered, index is not valid, so the validation check is happened at getter.
    //     this._focusedIndex = value;
    // }

    get focusedNode() {
        const pills = this.template.querySelectorAll(
            '[data-element-id="span-pill"]'
        );
        return pills.length <= 0 ? null : pills[this._focusedIndex];
    }

    get itemElements() {
        return this.template.querySelectorAll('[data-element-id="li"]');
    }

    get listElement() {
        return this.template.querySelector('[data-element-id="ul"]');
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
        if (this.listElement) this.listElement.focus();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initPills() {
        this.computedPills = this.items.map((item) => {
            return new Pill(item);
        });
    }

    initResizeObserver() {
        if (!this.listElement) return null;

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
        resizeObserver.observe(this.listElement);
        return resizeObserver;
    }

    clearDrag() {
        clearTimeout(this._dragTimeOut);
        if (!this._dragState) return;
        
        const index = this._dragState.lastHoveredIndex;
        this.itemElements[index].classList.remove('avonni-pill-container__pill_left-border', 'avonni-pill-container__pill_right-border');
        const wrapper = this.template.querySelector('[data-element-id="div-wrapper"]');
        wrapper.classList.remove('avonni-pill-container__list_dragging');
        this._dragState = null;
    }

    // setFocusedItemTabIndex(value) {
    //     const focusedNode = this.focusedNode;
    //     if (focusedNode) {
    //         this._focusedTabIndex = value;
    //     }
    // }

    // switchFocus(newValue) {
    //     // remove focus from current pill
    //     this.setFocusedItemTabIndex(-1);
    //     // move to next
    //     this.focusedIndex = newValue;
    //     // set focus
    //     this.setFocusedItemTabIndex(0);
    //     this.focus();
    // }

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
        const itemIndex = Number(event.currentTarget.dataset.index);

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: actionName,
                    item: this.items[itemIndex]
                }
            })
        );
    }

    handleKeyDown(event) {
        // if (this.items.length <= 0) {
        //     return;
        // }
        // const index = this.focusedIndex;
        // switch (event.keyCode) {
        //     case keyCodes.left:
        //     case keyCodes.up:
        //         this.switchFocus(index - 1);
        //         break;
        //     case keyCodes.right:
        //     case keyCodes.down:
        //         this.switchFocus(index + 1);
        //         break;
        //     default:
        //         this.focus();
        // }
    }

    handleLinkMouseDown(event) {
        if (!this.sortable) return;

        // Prevent the link from being dragged,
        // to allow for dragging the whole item
        event.preventDefault();
    }

    handleMoreClick() {
        this.focus();
    }

    handleMouseMove(event) {
        if (!this._dragState) return;

        const index = Number(event.currentTarget.dataset.index);
        const lastIndex = this._dragState.lastHoveredIndex;

        this.itemElements[lastIndex].classList.remove('avonni-pill-container__pill_left-border', 'avonni-pill-container__pill_right-border');
        if (lastIndex !== index) {
            this._dragState.lastHoveredIndex = index;
        }
        
        const coordinates = event.currentTarget.getBoundingClientRect();
        const onLeft = event.clientX < coordinates.left + coordinates.width / 2;
        if (onLeft) {
            // The cursor is on the left side of the pill
            event.currentTarget.classList.add('avonni-pill-container__pill_left-border');
            this._dragState.position = 'left';
        } else {
            // The cursor is on the right side of the pill
            event.currentTarget.classList.add('avonni-pill-container__pill_right-border');
            this._dragState.position = 'right';
        }
    }

    handleMouseUp = () => {
        if (!this._dragState || this._dragState.lastHoveredIndex === this._dragState.initialIndex) {
            this.clearDrag();
            return;
        }

        const { initialIndex, lastHoveredIndex, position } = this._dragState;
        const index = position === 'left' ? lastHoveredIndex : lastHoveredIndex + 1;

        if (lastHoveredIndex > initialIndex) {
            this.items.splice(index, 0, this.items[initialIndex]);
            this.items.splice(initialIndex, 1);
        } else {
            const pill = this.items.splice(initialIndex, 1)[0];
            this.items.splice(index, 0, pill);
        }

        this.initPills();
        this.dispatchEvent(new CustomEvent('reorder', {
            detail: {
                items: this.items
            }
        }));

        this.clearDrag();
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

    handlePillMouseDown(event) {
        if (!this.sortable) return;

        const index = Number(event.currentTarget.dataset.index);
        this._dragTimeOut = setTimeout(() => {
            this._dragState = {
                initialIndex: index,
                lastHoveredIndex: index
            };
            const wrapper = this.template.querySelector('[data-element-id="div-wrapper"]');
            wrapper.classList.add('avonni-pill-container__list_dragging');
        }, 200);
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}
