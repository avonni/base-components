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
import { normalizeArray, normalizeBoolean } from 'c/utilsPrivate';
import { handleKeyDownOnMenuItem } from './keyboard';

export default class PrimitiveDropdownMenu extends LightningElement {
    _cancelBlur = false;
    _items = [];
    _show = false;

    connectedCallback() {
        this._keyboardInterface = this.menuKeyboardInterface();
    }

    renderedCallback() {
        if (this.show) this.focusOnMenuItemAfterRender();
    }

    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = normalizeArray(value);
    }

    @api
    get show() {
        return this._show;
    }
    set show(value) {
        this._show = normalizeBoolean(value);
    }

    @api
    get offsetHeight() {
        const menu = this.template.querySelector('.slds-popover');
        return menu && menu.offsetHeight;
    }

    @api
    get offsetWidth() {
        const menu = this.template.querySelector('.slds-popover');
        return menu && menu.offsetWidth;
    }

    get menuItems() {
        return Array.from(
            this.template.querySelectorAll(
                '.slds-dropdown__list .slds-dropdown__item'
            )
        );
    }

    menuKeyboardInterface() {
        const that = this;
        return {
            getTotalMenuItems() {
                return that.menuItems.length;
            },
            focusOnIndex(index) {
                that.focusOnMenuItem(index);
            },
            setNextFocusIndex(index) {
                that._focusOnIndexDuringRenderedCallback = index;
            },
            isMenuVisible() {
                return that.show;
            },
            returnFocus() {
                that.dispatchReturnFocus();
            },
            toggleMenuVisibility() {
                that.toggleMenuVisibility();
            },
            focusMenuItemWithText(text) {
                const match = [...that.menuItems].filter((menuItem) => {
                    const label = menuItem.label;
                    return label && label.toLowerCase().indexOf(text) === 0;
                });
                if (match.length > 0) {
                    that.focusOnMenuItem(match[0]);
                }
            }
        };
    }

    toggleMenuVisibility() {
        this._show = !this.show;
        if (!this.show) {
            this.dispatchEvent(new CustomEvent('close'));
        }
    }

    getMenuItemByIndex(index) {
        return this.menuItems[index];
    }

    findMenuItemIndex(menuItemElement) {
        return this.menuItems.indexOf(menuItemElement);
    }

    findMenuItemFromEventTarget(element) {
        let currentNode = element;
        const stopAtElement = this.menu;
        while (currentNode !== stopAtElement) {
            if (
                currentNode.classList &&
                currentNode.classList.contains('slds-dropdown__item')
            ) {
                return currentNode;
            }
            if (currentNode.parentNode) {
                currentNode = currentNode.parentNode;
            } else {
                return null;
            }
        }
        return null;
    }

    focusOnMenuItemAfterRender() {
        // if no menu items are focused then set focus on the first or last one once registered
        // :: this can occur if there's a delay in loading the menu items (loading from server for example)
        // :: revealing the menu in an empty state to later have menu items loaded
        let focusOnIndex = this._focusOnIndexDuringRenderedCallback || 0;

        // if focus index is greater than the size of the list,
        // or next focus should be on LAST,
        // set to the last item
        const menuItems = this.menuItems;

        // if specified as 'LAST' set it to a valid numeric value instead
        if (focusOnIndex === 'LAST') {
            focusOnIndex = menuItems.length - 1;

            // maintain 'LAST' value if menu items aren't available yet
            if (focusOnIndex < 0) {
                focusOnIndex = 'LAST';
            }
        }

        // only perform operations when we have a valid numeric index
        if (focusOnIndex !== 'LAST') {
            if (focusOnIndex > menuItems.length - 1 && menuItems.length > 0) {
                focusOnIndex = menuItems.length - 1;
            }

            // set the focus
            this.focusOnMenuItem(focusOnIndex);

            // reset tracker value
            this._focusOnIndexDuringRenderedCallback = null;
        }
    }

    focusOnMenuItem(itemIndex) {
        if (this.show) {
            const menuItem = this.getMenuItemByIndex(itemIndex);
            this.cancelBlurAndFocusOnMenuItem(menuItem);
        }
    }

    allowBlur() {
        this._cancelBlur = false;
    }

    cancelBlurAndFocusOnMenuItem(menuItem) {
        if (menuItem) {
            // prevent blur during a non-blurring focus change
            // set lock so that while focusing on menutitem, menu doesnt close
            this._cancelBlur = true;
            menuItem.focus();
        }
        // allowBlur is called when the menu items receives focus
    }

    handleMenuItemPrivateSelect(event) {
        event.stopPropagation();

        if (this.show) {
            this.toggleMenuVisibility();
        }

        this.dispatchEvent(
            new CustomEvent('privateselect', {
                detail: {
                    name: event.detail.value
                }
            })
        );
    }

    handleMenuItemPrivateBlur(event) {
        event.stopPropagation();
        if (this._cancelBlur) return;

        if (this.show) {
            this.toggleMenuVisibility();
        }
        this._hasFocus = false;
    }

    handleMenuItemPrivateFocus(event) {
        event.stopPropagation();
        this._cancelBlur = false;
        this._hasFocus = true;
    }

    handleMouseOverOnMenuItem(event) {
        const menuItem = this.findMenuItemFromEventTarget(event.target);
        if (menuItem) {
            const menuItemIndex = this.findMenuItemIndex(menuItem);
            this.focusOnMenuItem(menuItemIndex);
        }
    }

    handleKeyOnMenuItem(event) {
        const menuItem = this.findMenuItemFromEventTarget(event.target);
        if (menuItem) {
            handleKeyDownOnMenuItem(
                event,
                this.findMenuItemIndex(menuItem),
                this._keyboardInterface
            );
        }
    }

    handleMenuMouseLeave() {
        // this is to close the menu after mousedown happens on scrollbar
        // in this case we close immediately if no menu-items were hovered/focused
        // without this the menu would remain open since the blur on the menuitems has happened already
        // when clicking the scrollbar
        if (!this._hasFocus && this.show) {
            this.toggleMenuVisibility();
        }
    }

    handleMenuMouseDown(event) {
        // if the menu contais a scrollbar due to large number of menu-items
        // this is needed so that menu doesnt close on dragging the scrollbar with the mouse
        const mainButton = 0;
        if (event.button === mainButton) {
            this._cancelBlur = true;
        }
    }

    handleMenuMouseUp() {
        // We need this to make sure that if a scrollbar is being dragged with the mouse, upon release
        // of the drag we allow blur, otherwise the dropdown would not close on blur since we'd have cancel blur
        // set
        this.allowBlur();
    }

    handleMenuScroll(event) {
        // We don't want this to bubble up to the modal which due to event retargeting wouldn't be able
        // to know what is actually being scrolled and thus may lead to the scrolling of the modal
        event.stopPropagation();
    }

    dispatchReturnFocus() {
        this.dispatchEvent(new CustomEvent('returnfocus'));
    }
}
