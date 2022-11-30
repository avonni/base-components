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

const DEFAULT_ALTERNATIVE_TEXT = 'Selected Options:';
const DEFAULT_NUMBER_OF_VISIBLE_ITEMS = 20;
const SHOW_MORE_BUTTON_WIDTH = 80;
const LOADING_OFFSET = 60;
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

    _dragState;
    _dragTimeOut;
    _expandTimeOut;
    _focusedIndex = 0;
    _focusedTabIndex = 0;
    _focusOnRender = false;
    _hasFocus = false;
    _hiddenItemsStartIndex = 0;
    _itemsWidths = [];
    _popoverHasFocus = false;
    _popoverIsLoading = false;
    _resizeObserver;
    _visibleItemsCount = 0;

    showPopover = false;

    connectedCallback() {
        window.addEventListener('mouseup', this.handleMouseUp);
        this.initVisibleItemsCount();
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
        return classSet('slds-listbox-item avonni-pill-container__item').add({
            'slds-is-relative': this.sortable,
            'slds-p-top_xxx-small slds-p-right_xxx-small avonni-pill-container__item_multi-line':
                !this.singleLine,
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
        return classSet('avonni-pill-container__wrapper').add({
            'slds-pill_container slds-p-top_none slds-p-bottom_none':
                this.singleLine
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
     * @default false
     */
    get isCollapsed() {
        return this.items.length > this._visibleItemsCount;
    }

    /**
     * List items' HTML elements.
     *
     * @type {NodeList}
     */
    get itemElements() {
        return this.template.querySelectorAll('[data-element-id^="li"]');
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

    get visibleItems() {
        return this.items.slice(0, this._visibleItemsCount);
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
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        wrapper.classList.add('avonni-pill-container__list_dragging');
        this.updateAssistiveText(index + 1);
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        if (!wrapper) {
            return null;
        }
        const resizeObserver = new AvonniResizeObserver(() => {
            this.updateVisibleItems();
        });
        resizeObserver.observe(wrapper);
        return resizeObserver;
    }

    initVisibleItemsCount() {
        const maxCount = this.items.length;
        const count =
            DEFAULT_NUMBER_OF_VISIBLE_ITEMS > maxCount
                ? maxCount
                : DEFAULT_NUMBER_OF_VISIBLE_ITEMS;
        this._visibleItemsCount = !this.computedIsExpanded ? count : maxCount;
    }

    /**
     * Clear the reorder state.
     */
    clearDrag() {
        clearTimeout(this._dragTimeOut);
        if (!this._dragState) return;

        this.clearDragBorder();
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        wrapper.classList.remove('avonni-pill-container__list_dragging');
        this._dragState = null;
        this.altTextElement.textContent = '';
    }

    /**
     * Remove the border showing the current position during the reorder of a pill.
     */
    clearDragBorder() {
        const lastIndex = this._dragState.lastHoveredIndex;
        const item = this.template.querySelector(
            `[data-element-id^="li"][data-index="${lastIndex}"]`
        );
        item.classList.remove(
            'avonni-pill-container__pill_before-border',
            'avonni-pill-container__pill_after-border'
        );
    }

    getFirstVisibleItemInPopover(target) {
        const elements = this.template.querySelectorAll(
            '[data-element-id="li-hidden"]'
        );
        const firstVisibleElement = Array.from(elements).find((el) => {
            const position = el.getBoundingClientRect();
            return target + 1 >= position.top && target <= position.bottom;
        });
        const position = firstVisibleElement.getBoundingClientRect();
        const offset = target - position.top;
        const name = firstVisibleElement.dataset.name;
        return { name, offset };
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
            `[data-element-id^="li"][data-index="${index}"]`
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
            // Expand the pills
            this.handleExpand();
        }

        let item = this.template.querySelector(
            `[data-element-id^="li"][data-index="${index}"]`
        );
        if (item) {
            item.classList.add('avonni-pill-container__pill_after-border');
        } else {
            // Wait for the items to be expanded
            requestAnimationFrame(() => {
                item = this.template.querySelector(
                    `[data-element-id^="li"][data-index="${index}"]`
                );
                item.classList.add('avonni-pill-container__pill_after-border');
            });
        }
        this._dragState.position = 'after';
        const position =
            index >= this._dragState.initialIndex ? index + 1 : index + 2;
        this.updateAssistiveText(position);
    }

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

    saveItemsWidths() {
        this.itemElements.forEach((item, i) => {
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

    updateVisibleItems() {
        const maxCount = this.items.length;
        if (this.computedIsExpanded) {
            this._visibleItemsCount = maxCount;
            return;
        }

        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        if (!wrapper || !this.listElement) {
            return;
        }

        const totalWidth = wrapper.offsetWidth - SHOW_MORE_BUTTON_WIDTH;
        const availableSpace = totalWidth - this.listElement.offsetWidth;
        const hasHiddenItems = this._visibleItemsCount < maxCount;

        if (hasHiddenItems && availableSpace > 0) {
            const nextItemWidth = this._itemsWidths[this._visibleItemsCount];
            const nextItemFits =
                !nextItemWidth || availableSpace > nextItemWidth;

            if (nextItemFits) {
                // Show more items
                const newCount =
                    this._visibleItemsCount + DEFAULT_NUMBER_OF_VISIBLE_ITEMS;
                this._visibleItemsCount =
                    newCount > maxCount ? maxCount : newCount;
            }
            return;
        }

        // Show less items
        let fittingCount = 0;
        let width = 0;
        const visibleItems = this.template.querySelectorAll(
            '[data-element-id="li"]'
        );
        while (fittingCount < visibleItems.length) {
            width += this._itemsWidths[fittingCount];
            if (width > totalWidth) {
                break;
            }
            fittingCount += 1;
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
     * @param {Event} event
     */
    handleActionClick(event) {
        event.stopPropagation();

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
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: event.detail.name,
                    index: Number(event.currentTarget.dataset.index),
                    targetName: event.detail.targetName
                }
            })
        );
    }

    /**
     * Handle the expansion of a collapsed pill container.
     */
    handleExpand() {
        if (this.singleLine) {
            this.togglePopover();
        } else {
            this._isExpanded = true;
            this.updateVisibleItems();
        }
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

    handleMoreButtonMouseMove() {
        if (!this._dragState || this.showPopover) {
            return;
        }

        clearTimeout(this._expandTimeOut);
        this._expandTimeOut = setTimeout(() => {
            this.handleExpand();
        }, 300);
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

        if (lastHoveredIndex < this._visibleItemsCount && this.showPopover) {
            // If the pill was not released in the popover, close it
            this.togglePopover();
        }
    };

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
        const isHidden = pill.dataset.elementId === 'li-hidden';
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
    }

    handlePopoverFocusIn() {
        this._popoverHasFocus = true;
    }

    handlePopoverFocusOut() {
        this._popoverHasFocus = false;

        requestAnimationFrame(() => {
            if (
                !this._popoverHasFocus &&
                this.showPopover &&
                !this._popoverIsLoading
            ) {
                this.togglePopover();
            }
            this._popoverIsLoading = false;
        });
    }

    handlePopoverScroll(event) {
        const popover = event.currentTarget;
        const popoverTop = popover.getBoundingClientRect().top;
        const height = popover.scrollHeight;
        const scrolledDistance = popover.scrollTop;
        const bottomLimit = height - popover.clientHeight - LOADING_OFFSET;
        const loadDown = scrolledDistance >= bottomLimit;
        const loadUp = scrolledDistance <= LOADING_OFFSET;

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
            const topItem = this.getFirstVisibleItemInPopover(popoverTop);
            this._hiddenItemsStartIndex = newIndex;
            this._popoverIsLoading = true;
            this._focusOnRender = true;

            requestAnimationFrame(() => {
                // Move the scroll bar back to the previous top item
                const previousTopItem = this.template.querySelector(
                    `[data-element-id="li-hidden"][data-name="${topItem.name}"]`
                );
                const index = Number(previousTopItem.dataset.index);
                this.switchFocus(index);
                popover.scrollTop = previousTopItem.offsetTop + topItem.offset;
            });
        }
    }
}
