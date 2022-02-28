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
import {
    deepCopy,
    keyCodes,
    normalizeBoolean,
    normalizeArray
} from 'c/utilsPrivate';
import { AvonniResizeObserver } from 'c/resizeObserver';
import { classSet, generateUUID } from 'c/utils';

const DEFAULT_LABEL = 'Selected Options:';

export default class PillContainer extends LightningElement {
    @api alternativeText;

    _actions = [];
    _isCollapsible = false;
    _isExpanded = false;
    @track _items = [];
    _label = DEFAULT_LABEL;
    _singleLine = false;
    _sortable = false;

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
            'avonni-pill-container__item_sortable-single-line':
                this.sortable && this.singleLine
        });
    }

    get computedPillClass() {
        return classSet('slds-pill')
            .add({
                'avonni-pill-container__pill-sortable': this.sortable
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

    get computedWrapperClass() {
        return classSet().add({
            'slds-is-expanded': this.computedIsExpanded && !this.singleLine,
            'slds-pill_container': this.singleLine,
            'slds-listbox_selection-group': !this.singleLine
        });
    }

    get altTextElement() {
        return this.template.querySelector(
            '[data-element-id="span-instructions"]'
        );
    }

    get focusedNode() {
        const pillElements = this.template.querySelectorAll(
            '[data-element-id="span-pill"]'
        );
        return pillElements[this._focusedIndex];
    }

    get itemElements() {
        return this.template.querySelectorAll('[data-element-id="li"]');
    }

    get listboxTabIndex() {
        return this.items.length ? -1 : 0;
    }

    get listElement() {
        return this.template.querySelector('[data-element-id="ul"]');
    }

    get showMore() {
        return this.computedIsCollapsible && !this.computedIsExpanded;
    }

    get uniqueKey() {
        return generateUUID();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    focus() {
        if (this.focusedNode && this.items[this._focusedIndex].href) {
            this.focusedNode.focusLink();
        } else if (this.focusedNode) {
            this.focusedNode.focus();
        } else if (this.listElement) {
            this.listElement.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    initDragState(index) {
        this._dragState = {
            initialIndex: index,
            lastHoveredIndex: index
        };
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        wrapper.classList.add('avonni-pill-container__list_dragging');
        this.updateAssistiveText(index + 1);
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
        this.itemElements[index].classList.remove(
            'avonni-pill-container__pill_left-border',
            'avonni-pill-container__pill_right-border'
        );
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        wrapper.classList.remove('avonni-pill-container__list_dragging');
        this._dragState = null;
        this.altTextElement.textContent = '';
    }

    clearDragBorder() {
        const lastIndex = this._dragState.lastHoveredIndex;
        this.itemElements[lastIndex].classList.remove(
            'avonni-pill-container__pill_left-border',
            'avonni-pill-container__pill_right-border'
        );
    }

    moveLeft(index) {
        this.clearDragBorder();
        this._dragState.lastHoveredIndex = index;
        this.itemElements[index].classList.add(
            'avonni-pill-container__pill_left-border'
        );
        this._dragState.position = 'left';
        const position =
            index > this._dragState.initialIndex ? index : index + 1;
        this.updateAssistiveText(position);
    }

    moveRight(index) {
        this.clearDragBorder();
        this._dragState.lastHoveredIndex = index;
        this.itemElements[index].classList.add(
            'avonni-pill-container__pill_right-border'
        );
        this._dragState.position = 'right';
        const position =
            index >= this._dragState.initialIndex ? index + 1 : index + 2;
        this.updateAssistiveText(position);
    }

    switchFocus(index) {
        let normalizedIndex = index;
        if (index > this.items.length - 1) {
            normalizedIndex = 0;
        } else if (index < 0) {
            normalizedIndex = this.items.length - 1;
        }

        // remove focus from current pill
        if (this.focusedNode) {
            this.focusedNode.tabIndex = '-1';
        }

        // move to next
        this._focusedIndex = normalizedIndex;

        // set focus
        this.focusedNode.tabIndex = '0';
        this.focus();
    }

    updateAssistiveText(position) {
        const initialIndex = this._dragState.initialIndex;
        const label = this.items[initialIndex].label;
        const total = this.items.length;
        this.altTextElement.textContent = `${label}. ${position} / ${total}`;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    handleActionClick(event) {
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: event.detail.name,
                    index: Number(event.currentTarget.dataset.index)
                }
            })
        );
    }

    handleKeyDown(event) {
        if (this.items.length <= 0) {
            return;
        }
        const index = this._dragState
            ? this._dragState.lastHoveredIndex
            : this._focusedIndex;
        switch (event.keyCode) {
            case keyCodes.left:
            case keyCodes.up: {
                const previousIndex = index - 1;

                if (!this._dragState) {
                    this.switchFocus(previousIndex);
                } else if (
                    this._dragState.position === 'left' ||
                    previousIndex === this._dragState.initialIndex
                ) {
                    this.moveLeft(previousIndex);
                } else {
                    this.moveLeft(index);
                }
                break;
            }
            case keyCodes.right:
            case keyCodes.down: {
                const nextIndex = index + 1;

                if (!this._dragState) {
                    this.switchFocus(nextIndex);
                } else if (
                    this._dragState.position === 'right' ||
                    nextIndex === this._dragState.initialIndex
                ) {
                    this.moveRight(nextIndex);
                } else {
                    this.moveRight(index);
                }
                break;
            }
            case keyCodes.space:
                if (this._dragState) {
                    this.handleMouseUp();
                } else {
                    this.initDragState(index);
                }
                break;
            case keyCodes.escape:
                this.clearDrag();
                break;
            default:
                this.focus();
        }
    }

    handleMoreClick() {
        this.focus();
    }

    handleMouseMove(event) {
        if (!this._dragState) return;

        const index = Number(event.currentTarget.dataset.index);
        const coordinates = event.currentTarget.getBoundingClientRect();
        const onLeft = event.clientX < coordinates.left + coordinates.width / 2;

        if (onLeft) {
            // The cursor is on the left side of the pill
            this.moveLeft(index);
        } else {
            // The cursor is on the right side of the pill
            this.moveRight(index);
        }
    }

    handleMouseUp = () => {
        if (
            !this._dragState ||
            this._dragState.lastHoveredIndex === this._dragState.initialIndex
        ) {
            this.clearDrag();
            return;
        }

        const { initialIndex, lastHoveredIndex, position } = this._dragState;
        const index =
            position === 'left' ? lastHoveredIndex : lastHoveredIndex + 1;

        if (lastHoveredIndex > initialIndex) {
            this._items.splice(index, 0, this._items[initialIndex]);
            this._items.splice(initialIndex, 1);
        } else {
            const pill = this._items.splice(initialIndex, 1)[0];
            this._items.splice(index, 0, pill);
        }

        this.dispatchEvent(
            new CustomEvent('reorder', {
                detail: {
                    items: deepCopy(this._items)
                }
            })
        );

        this.clearDrag();
        this._focusedIndex = lastHoveredIndex;
        setTimeout(() => {
            // Set the focus on the pill after rerender
            this.focus();
        }, 0);
    };

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
        const index = Number(event.currentTarget.dataset.index);

        if (index >= 0 && this._focusedIndex !== index) {
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
            this.initDragState(index);
        }, 200);
    }
}
