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
import { classSet } from 'c/utils';

const AUTO_SCROLL_INCREMENT = 5;
const AUTO_SCROLL_THRESHOLD = 50;
const DEFAULT_ALTERNATIVE_TEXT = 'Selected Options:';
const DEFAULT_NUMBER_OF_VISIBLE_ITEMS = 20;
const SHOW_MORE_BUTTON_WIDTH = 80;
const LOADING_THRESHOLD = 60;
const MAX_LOADED_ITEMS = 30;

/**
 * @class
 * @descriptor avonni-pill-container
 * @storyId example-pill-container--sortable
 * @public
 */
export default class PillContainer extends LightningElement {
    _actions = [];
    _alternativeText = DEFAULT_ALTERNATIVE_TEXT;
    _isCollapsible = false;
    _isExpanded = false;
    @track _items = [];
    _singleLine = false;
    _sortable = false;

    _selectedAction;
    _dragState;
    _dragTimeOut;
    _expandTimeOut;
    _focusedIndex = 0;
    _focusOnRender = false;
    _hasFocus = false;
    _hiddenItemsStartIndex = 0;
    _itemsWidths = [];
    _popoverHasFocus = false;
    _preventPopoverClosing = false;
    _resizeObserver;
    _scrollingInterval;
    _visibleItemsCount = 0;

    showActionMenu = false;
    showPopover = false;
    _connected = false;

    connectedCallback() {
        window.addEventListener('mouseup', this.handleMouseUp);
        this.initVisibleItemsCount();
        this._connected = true;
    }

    renderedCallback() {
        if (this._resizeObserver && !this.isCollapsible) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        } else if (!this._resizeObserver && this.isCollapsible) {
            this._resizeObserver = this.initResizeObserver();
        }

        if (this.isCollapsible) {
            this.saveItemsWidths();
            this.updateVisibleItems();
        }

        if (this._focusOnRender) {
            this.focus();
            this._focusOnRender = false;
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

    /**
     * Array of actions to display to the right of each pill.
     *
     * @type {object[]}
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
    }

    /**
     * Alternative text used to describe the pill container. If the pill container is sortable, it should describe its behavior, for example: "Sortable pills. Press spacebar to grab or drop an item. Press right and left arrow keys to change position. Press escape to cancel."
     *
     * @type {string}
     * @public
     */
    @api
    get alternativeText() {
        return this._alternativeText;
    }
    set alternativeText(value) {
        this._alternativeText =
            value && typeof value === 'string'
                ? value
                : DEFAULT_ALTERNATIVE_TEXT;
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
        this.clearDrag();

        if (this._connected) {
            this.initVisibleItemsCount();
            this.saveItemsWidths();
            this.updateVisibleItems();
        }
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
        this.clearDrag();

        if (this._connected) {
            this.initVisibleItemsCount();
            this.saveItemsWidths();
            this.updateVisibleItems();
        }
    }

    /**
     * Array of item objects to display as pills in the container.
     *
     * @type {object[]}
     * @public
     */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = deepCopy(normalizeArray(value));
        this._itemsWidths = [];
        this.clearDrag();

        if (this._connected) {
            this.initVisibleItemsCount();
        }
    }

    /**
     * If present, the pills are limited to one line. This attribute overrides the `is-collapsible` and `is-expanded` attributes.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get singleLine() {
        return this._singleLine;
    }
    set singleLine(value) {
        this._singleLine = normalizeBoolean(value);
        this.clearDrag();
    }

    /**
     * If present, the pills can be reordered by dragging and dropping, or using the spacebar key.
     *
     * @type {boolean}
     * @public
     * @default false
     */
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

    /**
     * CSS classes of the items hidden in the single-line collapsed popover.
     *
     * @type {string}
     */
    get computedHiddenListItemClass() {
        return classSet('avonni-pill-container__hidden-pill')
            .add({
                'slds-is-relative': this.sortable
            })
            .toString();
    }

    /**
     * True if the pill container is considered expanded.
     *
     * @type {boolean}
     */
    get computedIsExpanded() {
        return this.isExpanded || !this.isCollapsible;
    }

    /**
     * CSS classes of the listbox element.
     *
     * @type {string}
     */
    get computedListboxClass() {
        return classSet('slds-listbox slds-is-relative slds-listbox_horizontal')
            .add({
                'slds-listbox_inline': this.singleLine
            })
            .toString();
    }

    /**
     * CSS classes of the list item elements.
     *
     * @type {string}
     */
    get computedListItemClass() {
        return classSet(
            'slds-listbox-item avonni-pill-container__item slds-p-top_xxx-small'
        ).add({
            'slds-is-relative': this.sortable,
            'slds-p-right_xxx-small': !this.singleLine,
            'avonni-pill-container__item_sortable-single-line':
                this.sortable && this.singleLine
        });
    }

    /**
     * CSS classes of the pill elements.
     *
     * @type {string}
     */
    get computedPillClass() {
        return classSet()
            .add({
                'avonni-pill-container__pill-sortable': this.sortable
            })
            .toString();
    }

    /**
     * CSS classes of the wrapper element.
     *
     * @type {string}
     */
    get computedWrapperClass() {
        return classSet('avonni-pill-container__wrapper slds-is-relative').add({
            'slds-pill_container slds-p-top_none slds-p-bottom_none':
                this.singleLine,
            'avonni-pill-container__no-items': !this._visibleItemsCount
        });
    }

    /**
     * HTML element containing the instructions used during drag and drop.
     *
     * @type {HTMLElement}
     */
    get altTextElement() {
        return this.template.querySelector(
            '[data-element-id="span-instructions"]'
        );
    }

    /**
     * Filtered items that will be displayed in the single-line collapsed popover.
     *
     * @type {object[]}
     */
    get hiddenItems() {
        let endIndex = this._hiddenItemsStartIndex + MAX_LOADED_ITEMS;
        const lastIndex = this.items.length;
        if (endIndex + 10 >= lastIndex) {
            // If only 10 items are left, load them all
            endIndex = lastIndex;
        }

        const items = this.items.slice(this._hiddenItemsStartIndex, endIndex);
        return items.map((it, index) => {
            return {
                ...it,
                index: index + this._hiddenItemsStartIndex
            };
        });
    }

    /**
     * True if the "show more" button should be visible.
     *
     * @type {boolean}
     */
    get isCollapsed() {
        return this.items.length > this._visibleItemsCount;
    }

    /**
     * Value of the listbox element tabindex.
     *
     * @type {number}
     */
    get listboxTabIndex() {
        return this.items.length ? -1 : 0;
    }

    /**
     * Listbox HTML element.
     *
     * @type {HTMLElement}
     */
    get listElement() {
        return this.template.querySelector('[data-element-id="ul"]');
    }

    /**
     * Label of the "show more" button.
     *
     * @type {string}
     */
    get buttonLabel() {
        const hiddenCount = this.items.length - this._visibleItemsCount;
        return `+${hiddenCount} more`;
    }

    /**
     * Array of items that are always visible, even when the pill container is collapsed.
     *
     * @type {object[]}
     */
    get visibleItems() {
        return this.items.slice(0, this._visibleItemsCount);
    }

    /**
     * Wrapper HTML element.
     *
     * @type {HTMLElement}
     */
    get wrapperElement() {
        return this.template.querySelector('[data-element-id="div-wrapper"]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the pill list.
     *
     * @public
     */
    @api
    focus() {
        const focusedPill = this.template.querySelector(
            `[data-element-id^="avonni-primitive-pill"][data-index="${this._focusedIndex}"]`
        );
        if (focusedPill && focusedPill.href) {
            focusedPill.focusLink();
        } else if (focusedPill) {
            focusedPill.focus();
        } else if (this.listElement) {
            this.listElement.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Initialize the reordering of a pill.
     *
     * @param {number} index Index of the reordered pill.
     */
    initDragState(index) {
        if (!this.sortable) return;

        this._dragState = {
            initialIndex: index,
            lastHoveredIndex: index
        };
        this.wrapperElement.classList.add(
            'avonni-pill-container__list_dragging'
        );
        this.updateAssistiveText(index + 1);
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        if (!this.wrapperElement) {
            return null;
        }
        return new AvonniResizeObserver(
            this.wrapperElement,
            this.updateVisibleItems.bind(this)
        );
    }

    /**
     * Initialize the number visible items.
     */
    initVisibleItemsCount() {
        const maxCount = this.items.length;
        const count =
            DEFAULT_NUMBER_OF_VISIBLE_ITEMS > maxCount
                ? maxCount
                : DEFAULT_NUMBER_OF_VISIBLE_ITEMS;
        this._visibleItemsCount = !this.computedIsExpanded ? count : maxCount;
    }

    /**
     * If the given position is close to the top or the bottom of the single-line collapsed popover, scroll the popover in this direction. Used to scroll automatically the popover when sorting an item.
     * @param {number} y Position of the mouse cursor, on the Y axis.
     */
    autoScrollPopover(y) {
        clearInterval(this._scrollingInterval);
        this._scrollingInterval = setInterval(() => {
            const popover = this.template.querySelector(
                '[data-element-id="div-popover"]'
            );
            const top = popover.getBoundingClientRect().top;
            const bottom = popover.getBoundingClientRect().bottom;
            const isCloseToTop = y - top <= AUTO_SCROLL_THRESHOLD;
            const isCloseToBottom = bottom - y <= AUTO_SCROLL_THRESHOLD;

            if (isCloseToTop) {
                popover.scrollTop -= AUTO_SCROLL_INCREMENT;
                const topItem = this.getHiddenItemFromPosition(top);
                this.moveAfter(topItem.index);
            } else if (isCloseToBottom) {
                popover.scrollTop += AUTO_SCROLL_INCREMENT;
                const bottomItem = this.getHiddenItemFromPosition(bottom);
                this.moveBefore(bottomItem.index);
            }
        }, 20);
    }

    /**
     * Clear the reorder state.
     */
    clearDrag() {
        clearTimeout(this._dragTimeOut);
        clearInterval(this._scrollingInterval);
        if (!this._dragState) return;

        this.clearDragBorder();
        this.wrapperElement.classList.remove(
            'avonni-pill-container__list_dragging'
        );
        this._dragState = null;
        this.altTextElement.textContent = '';
    }

    /**
     * Remove the border showing the current position during the reorder of a pill.
     */
    clearDragBorder() {
        const lastIndex = this._dragState.lastHoveredIndex;
        const item = this.template.querySelector(
            `[data-element-id^="li-item"][data-index="${lastIndex}"]`
        );
        item.classList.remove(
            'avonni-pill-container__pill_before-border',
            'avonni-pill-container__pill_after-border'
        );
    }

    /**
     * Get an item in the single-line collapsed popover, based on its position.
     *
     * @param {number} y Position of the item on the Y axis.
     */
    getHiddenItemFromPosition(y) {
        const elements = this.template.querySelectorAll(
            '[data-element-id="li-item-hidden"]'
        );
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            const position = el.getBoundingClientRect();

            if (y + 1 >= position.top && y - 1 <= position.bottom) {
                return {
                    index: Number(el.dataset.index),
                    name: el.dataset.name,
                    offset: y - position.top
                };
            }
        }
        return null;
    }

    /**
     * Move the reordered pill before another pill.
     *
     * @param {number} index Index of the pill the reordered pill is moving before.
     */
    moveBefore(index) {
        if (index < 0) return;

        this.clearDragBorder();
        this._dragState.lastHoveredIndex = index;
        const item = this.template.querySelector(
            `[data-element-id^="li-item"][data-index="${index}"]`
        );
        item.classList.add('avonni-pill-container__pill_before-border');
        this._dragState.position = 'before';
        const position =
            index > this._dragState.initialIndex ? index : index + 1;
        this.updateAssistiveText(position);
    }

    /**
     * Move the reordered pill after another pill.
     *
     * @param {number} index Index of the pill the reordered pill is moving after.
     */
    moveAfter(index) {
        if (index > this.items.length - 1) return;

        this.clearDragBorder();
        this._dragState.lastHoveredIndex = index;

        const isCollapsed =
            (!this.singleLine && this.isCollapsed) ||
            (this.singleLine && !this.showPopover);
        if (index >= this._visibleItemsCount && isCollapsed) {
            // Expand the pills (used when sorting using the keyboard)
            this.handleExpand();
        }

        let item = this.template.querySelector(
            `[data-element-id^="li-item"][data-index="${index}"]`
        );
        if (item) {
            item.classList.add('avonni-pill-container__pill_after-border');
        } else {
            // Wait for the items to be expanded
            requestAnimationFrame(() => {
                item = this.template.querySelector(
                    `[data-element-id^="li-item"][data-index="${index}"]`
                );
                item.classList.add('avonni-pill-container__pill_after-border');
            });
        }
        this._dragState.position = 'after';
        const position =
            index >= this._dragState.initialIndex ? index + 1 : index + 2;
        this.updateAssistiveText(position);
    }

    /**
     * Make sure the given item index is focusable. Otherwise, normalize it to the right focusable item index.
     *
     * @param {number} index Index of the item to focus.
     * @returns {number} Normalized index of the item to focus.
     */
    normalizeFocusedIndex(index) {
        if (!this.isCollapsed) {
            const moveToFirst = index > this.items.length - 1;
            const moveToLast = index < 0;
            if (moveToFirst) {
                return 0;
            } else if (moveToLast) {
                return this.items.length - 1;
            }
            return index;
        }

        // Collapsed mode
        let position = 'INDEX';
        if (index < 0) {
            position = 'FIRST';
        } else if (
            this._focusedIndex < this._visibleItemsCount &&
            index >= this._visibleItemsCount
        ) {
            position = 'LAST_VISIBLE_ITEM';
        } else if (
            this._focusedIndex >= this._visibleItemsCount &&
            index < this._visibleItemsCount
        ) {
            position = 'FIRST_HIDDEN_ITEM';
        } else if (index >= this.items.length) {
            position = 'LAST';
        }

        switch (position) {
            case 'FIRST':
            case 'LAST_VISIBLE_ITEM':
            case 'FIRST_HIDDEN_ITEM':
            case 'LAST':
                // Keep the focus on the current pill
                return this._focusedIndex;
            default:
                return index;
        }
    }

    /**
     * Set the position of the action menu, based on the given pill position.
     *
     * @param {object} position Position of the pill the action menu was opened on.
     */
    positionActionMenu({ x, y }) {
        // Make sure the menu is not outside of the screen
        const menu = this.template.querySelector(
            '[data-element-id="avonni-primitive-dropdown-menu"]'
        );
        const height = menu.offsetHeight;
        const width = menu.offsetWidth;
        const menuBottom = y + height;
        const menuRight = x + width;

        const bottomView = window.innerHeight;
        const rightView = window.innerWidth;

        const yTransform = menuBottom > bottomView ? height * -1 : 0;
        const xTransform = menuRight > rightView ? width * -1 : 0;

        const { top, left } = this.wrapperElement.getBoundingClientRect();
        menu.style.transform = `translate(${xTransform}px, ${yTransform}px)`;
        menu.style.top = `${y - top + 10}px`;
        menu.style.left = `${x - left + 10}px`;
    }

    /**
     * Make sure the focused item is visible in the hidden items popover, to prevent a jump of the scroll bar next time it is focused.
     */
    scrollToFocusedItem() {
        const focusedItem = this.template.querySelector(
            `[data-element-id="li-item-hidden"][data-index="${this._focusedIndex}"]`
        );
        const popover = this.template.querySelector(
            '[data-element-id="div-popover"]'
        );
        if (!focusedItem || !popover) {
            return;
        }
        const popoverPosition = popover.getBoundingClientRect();
        const itemPosition = focusedItem.getBoundingClientRect();
        const isAbove = itemPosition.top < popoverPosition.top;
        const isBelow = itemPosition.bottom > popoverPosition.bottom;

        if (isAbove) {
            popover.scrollTop -= popoverPosition.top - itemPosition.top - 5;
        } else if (isBelow) {
            popover.scrollTop +=
                itemPosition.bottom - popoverPosition.bottom + 5;
        }
    }

    /**
     * Save the visible items widths, to compute their visibility later.
     */
    saveItemsWidths() {
        const items = this.template.querySelectorAll(
            '[data-element-id^="li-item"]'
        );
        items.forEach((item, i) => {
            this._itemsWidths[i] = item.offsetWidth;
        });
    }

    /**
     * Update the focused index.
     *
     * @param {number} index Index of the new focused pill.
     */
    switchFocus(index) {
        const normalizedIndex = this.normalizeFocusedIndex(index);

        // remove focus from current pill
        const previousPill = this.template.querySelector(
            `[data-element-id^="avonni-primitive-pill"][data-index="${this._focusedIndex}"]`
        );
        if (previousPill) {
            previousPill.tabIndex = '-1';
        }

        // move to next
        this._focusedIndex = normalizedIndex;

        // set focus
        const pill = this.template.querySelector(
            `[data-element-id^="avonni-primitive-pill"][data-index="${normalizedIndex}"]`
        );
        pill.tabIndex = '0';
        this.focus();
    }

    /**
     * Toggle the visibility of the single-line collapsed popover.
     */
    togglePopover() {
        this.showPopover = !this.showPopover;

        if (this.showPopover) {
            this._hiddenItemsStartIndex = this._visibleItemsCount;

            if (!this._dragState) {
                this._focusedIndex = this._hiddenItemsStartIndex;
                this._focusOnRender = true;
            }
        } else {
            this._focusOnRender = true;
            this._focusedIndex = this._visibleItemsCount - 1;
        }
    }

    /**
     * Update the assistive text with the current position of the reordered pill.
     *
     * @param {number} position New position of the reordered pill.
     */
    updateAssistiveText(position) {
        const initialIndex = this._dragState.initialIndex;
        const label = this.items[initialIndex].label;
        const total = this.items.length;
        this.altTextElement.textContent = `${label}. ${position} / ${total}`;
    }

    /**
     * Update the number of visible and collapsed items, depending on the available space.
     */
    updateVisibleItems() {
        const maxCount = this.items.length;
        if (this.computedIsExpanded) {
            this._visibleItemsCount = maxCount;
            return;
        }

        if (!this.wrapperElement) {
            return;
        }

        const totalWidth =
            this.wrapperElement.offsetWidth - SHOW_MORE_BUTTON_WIDTH;

        let fittingCount = 0;
        let width = 0;
        const visibleItems = this.template.querySelectorAll(
            '[data-element-id="li-item"]'
        );
        while (fittingCount < visibleItems.length) {
            // Count the number of visible items that fit
            width += this._itemsWidths[fittingCount];
            if (width > totalWidth) {
                break;
            }
            fittingCount += 1;
        }

        if (fittingCount === visibleItems.length && width < totalWidth) {
            // Add more visible items if needed
            const nextItemWidth = this._itemsWidths[fittingCount];
            const availableSpace = totalWidth - width;
            const nextItemFits =
                !nextItemWidth || availableSpace > nextItemWidth;
            if (nextItemFits) {
                fittingCount += MAX_LOADED_ITEMS;
            }
        }
        this._visibleItemsCount = fittingCount;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the click on a pill action.
     *
     * @param {Event} event `actionclick` event fired by a pill.
     */
    handleActionClick(event) {
        event.stopPropagation();
        const { name, targetName } = event.detail;
        const index = Number(event.currentTarget.dataset.index);
        this.dispatchActionClick({ name, targetName, index });
    }

    /**
     * Handle the click on an action, in the action menu.
     *
     * @param {Event} event `privateselect` event fired by the action menu.
     */
    handleActionSelect(event) {
        const name = event.detail.name;
        const { targetName, index } = this._selectedAction;
        this.dispatchActionClick({ name, targetName, index });
    }

    /**
     * Handle the closing of the action menu.
     */
    handleCloseActionMenu() {
        this.showActionMenu = false;
        this._focusedIndex = this._selectedAction.index;
        this._focusOnRender = true;
    }

    /**
     * Handle the expansion of a collapsed pill container.
     */
    handleExpand() {
        if (this.singleLine) {
            this.togglePopover();
        } else {
            this._isExpanded = true;
            this._focusedIndex = this._visibleItemsCount - 1;
            this._focusOnRender = true;
            this.updateVisibleItems();
        }

        /**
         * The event fired when the pills are collapsed, and the expand button is clicked.
         *
         * @event
         * @name expand
         * @public
         */
        this.dispatchEvent(new CustomEvent('expand'));
    }

    /**
     * Handle a key pressed on the list.
     *
     * @param {Event} event
     */
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
                // Prevent the page from scrolling
                event.preventDefault();

                const previousIndex = index - 1;

                if (!this._dragState) {
                    this.switchFocus(previousIndex);
                } else if (
                    this._dragState.position === 'before' ||
                    previousIndex === this._dragState.initialIndex ||
                    index === this._dragState.initialIndex
                ) {
                    this.moveBefore(previousIndex);
                } else {
                    this.moveBefore(index);
                }
                break;
            }
            case keyCodes.right:
            case keyCodes.down: {
                // Prevent the page from scrolling
                event.preventDefault();

                const nextIndex = index + 1;

                if (!this._dragState) {
                    this.switchFocus(nextIndex);
                } else if (
                    this._dragState.position === 'after' ||
                    nextIndex === this._dragState.initialIndex ||
                    index === this._dragState.initialIndex
                ) {
                    this.moveAfter(nextIndex);
                } else {
                    this.moveAfter(index);
                }
                break;
            }
            case keyCodes.space:
                // Prevent the page from scrolling
                event.preventDefault();

                if (this._dragState) {
                    this.handleMouseUp();
                } else if (this.sortable) {
                    this.initDragState(index);
                }
                break;
            case keyCodes.escape:
                this.clearDrag();
                if (this.showPopover) {
                    this._popoverHasFocus = false;
                    this.togglePopover();
                }
                break;
            default:
                this.focus();
        }
    }

    /**
     * Handle a mouse entering on the "Show more" button. Triggers the expansion of the pills if a pill is being dragged, and the mouse stays on the button for a while.
     */
    handleMoreButtonMouseEnter() {
        if (!this._dragState || this.showPopover) {
            return;
        }

        clearTimeout(this._expandTimeOut);
        this._expandTimeOut = setTimeout(() => {
            this.handleExpand();
        }, 300);
    }

    /**
     * Handle a mouse leaving the "Show more" button. Clears the timeout that triggers the expansion of the pills.
     */
    handleMoreButtonMouseLeave() {
        clearTimeout(this._expandTimeOut);
    }

    /**
     * Handle a mouse button release on the pill container.
     */
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
            position === 'before' ? lastHoveredIndex : lastHoveredIndex + 1;

        if (lastHoveredIndex > initialIndex) {
            this._items.splice(index, 0, this._items[initialIndex]);
            this._items.splice(initialIndex, 1);
        } else {
            const pill = this._items.splice(initialIndex, 1)[0];
            this._items.splice(index, 0, pill);
        }

        /**
         * The event fired when a user reorders the pills.
         *
         * @event
         * @name reorder
         * @param {object[]} items Items in their new order.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('reorder', {
                detail: {
                    items: deepCopy(this._items)
                }
            })
        );

        this.clearDrag();
        this._focusedIndex = lastHoveredIndex;
        this._focusOnRender = true;

        if (this.showPopover && lastHoveredIndex < this._visibleItemsCount) {
            // If the pill was not released in the popover, close it
            this.togglePopover();
        } else if (this.showPopover) {
            this.scrollToFocusedItem();
        }
    };

    /**
     * Handle the opening of the action menu.
     *
     * @param {Event} event `openactionmenu` event fired by a pill.
     */
    handleOpenActionMenu(event) {
        event.stopPropagation();

        this.showActionMenu = true;
        this._selectedAction = {
            targetName: event.detail.targetName,
            index: Number(event.target.dataset.index)
        };
        requestAnimationFrame(() => {
            this.positionActionMenu(event.detail.bounds);
        });
    }

    /**
     * Handle the opening of the action menu from a pill, inside the single-line collapsed popover.
     *
     * @param {Event} event `openactionmenu` event fired by a pill.
     */
    handleOpenHiddenActionMenu(event) {
        this._preventPopoverClosing = true;
        this.handleOpenActionMenu(event);
    }

    /**
     * Handle a focus blur on a pill.
     *
     * @param {Event} event
     */
    handlePillBlur(event) {
        if (
            !event.relatedTarget ||
            !this.template.contains(event.relatedTarget)
        ) {
            this._hasFocus = false;
            /**
             * The event fired when the pill container loses focus.
             *
             * @event
             * @name blur
             * @public
             */
            this.dispatchEvent(new CustomEvent('blur'));
        }
    }

    /**
     * Handle a click on a pill.
     *
     * @param {Event} event
     */
    handlePillClick(event) {
        if (this.showActionMenu) {
            return;
        }
        const index = Number(event.currentTarget.dataset.index);

        if (index >= 0 && this._focusedIndex !== index) {
            this.switchFocus(index);
        } else {
            this.focus();
        }

        event.stopPropagation();
    }

    /**
     * Handle a focus set on a pill.
     */
    handlePillFocus() {
        if (!this._hasFocus) {
            this._hasFocus = true;
            /**
             * The event fired when the pill container gains focus.
             *
             * @event
             * @name focus
             * @public
             */
            this.dispatchEvent(new CustomEvent('focus'));
        }
    }

    /**
     * Handle a mouse button pressed on a pill.
     *
     * @param {Event} event
     */
    handlePillMouseDown(event) {
        if (!this.sortable) return;

        const index = Number(event.currentTarget.dataset.index);
        this._dragTimeOut = setTimeout(() => {
            this.initDragState(index);
        }, 200);
    }

    /**
     * Handle a movement of the mouse on a pill.
     *
     * @param {Event} event
     */
    handlePillMouseMove(event) {
        if (!this._dragState) return;

        const pill = event.currentTarget;
        const index = Number(pill.dataset.index);
        const coordinates = pill.getBoundingClientRect();
        const isHidden = pill.dataset.elementId === 'li-item-hidden';
        const onLeft = event.clientX < coordinates.left + coordinates.width / 2;
        const onTop = event.clientY < coordinates.top + coordinates.height / 2;

        if ((!isHidden && onLeft) || (isHidden && onTop)) {
            // The cursor is on the left side of a visible pill
            // or on the top side of a hidden pill
            this.moveBefore(index);
        } else {
            // The cursor is on the right side of a visible pill
            // or on the bottom side of a hidden pill
            this.moveAfter(index);
        }

        if (isHidden) {
            this.autoScrollPopover(event.clientY, index);
        }
    }

    /**
     * Handle a focus set inside the single-line collapsed popover.
     */
    handlePopoverFocusIn() {
        this._popoverHasFocus = true;
    }

    /**
     * Handle a focus lost inside the single-line collapsed popover.
     */
    handlePopoverFocusOut() {
        this._popoverHasFocus = false;

        requestAnimationFrame(() => {
            if (
                !this._popoverHasFocus &&
                this.showPopover &&
                !this._preventPopoverClosing
            ) {
                this.togglePopover();
            }
            this._preventPopoverClosing = false;
        });
    }

    /**
     * Handle a scroll movement inside the single-line collapsed popover.
     *
     * @param {Event} event `scroll` event fired by the popover.
     */
    handlePopoverScroll(event) {
        const popover = event.currentTarget;
        const popoverTop = popover.getBoundingClientRect().top;
        const height = popover.scrollHeight;
        const scrolledDistance = popover.scrollTop;
        const bottomLimit = height - popover.clientHeight - LOADING_THRESHOLD;
        const loadDown = scrolledDistance >= bottomLimit;
        const loadUp = scrolledDistance <= LOADING_THRESHOLD;

        let newIndex;
        if (loadUp) {
            const previousIndex = this._hiddenItemsStartIndex - 10;
            newIndex = Math.max(previousIndex, this._visibleItemsCount);
        } else if (loadDown) {
            const nextIndex = this._hiddenItemsStartIndex + 10;
            const maxIndex = this.items.length - MAX_LOADED_ITEMS - 10;
            newIndex = Math.min(nextIndex, maxIndex);
        }

        if (!isNaN(newIndex) && this._hiddenItemsStartIndex !== newIndex) {
            const topItem = this.getHiddenItemFromPosition(popoverTop);
            this._hiddenItemsStartIndex = newIndex;
            this._preventPopoverClosing = true;
            this._focusOnRender = true;

            requestAnimationFrame(() => {
                // Move the scroll bar back to the previous top item
                const previousTopItem = this.template.querySelector(
                    `[data-element-id="li-item-hidden"][data-name="${topItem.name}"]`
                );
                popover.scrollTop = previousTopItem.offsetTop + topItem.offset;

                if (this._focusedIndex < topItem.index) {
                    // If the scroll was triggered using the mouse,
                    // keep an item focused
                    this.switchFocus(topItem.index);
                }

                if (this._dragState) {
                    this._preventPopoverClosing = false;
                }
            });
        }
    }

    /**
     * Dispatch the `actionclick` event.
     *
     * @param {object} detail Detail of the event.
     */
    dispatchActionClick(detail) {
        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {number} index Index of the item clicked.
         * @param {string} name Name of the action.
         * @param {string} targetName Name of the item the action belongs to.
         * @public
         */
        this.dispatchEvent(new CustomEvent('actionclick', { detail }));
    }
}
