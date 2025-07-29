import { LightningElement, api } from 'lwc';
import { normalizeArray, normalizeBoolean } from 'c/utils';
import { handleKeyDownOnMenuItem } from './keyboard';

/**
 * @class
 * @descriptor avonni-primitive-dropdown-menu
 */
export default class PrimitiveDropdownMenu extends LightningElement {
    _cancelBlur = false;
    _items = [];
    _show = false;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._keyboardInterface = this.menuKeyboardInterface();
    }

    renderedCallback() {
        if (this.show) this.focusOnMenuItemAfterRender();
    }

    /*
     * -------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of item objects. Valid object keys include name, label and iconName.
     *
     * @type {object[]}
     * @public
     */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = normalizeArray(value);
    }

    /**
     * Dropdown height.
     *
     * @type {number}
     * @public
     */
    @api
    get offsetHeight() {
        const menu = this.template.querySelector('.slds-popover');
        return menu && menu.offsetHeight;
    }

    /**
     * Dropdown width.
     *
     * @type {number}
     * @public
     */
    @api
    get offsetWidth() {
        const menu = this.template.querySelector('.slds-popover');
        return menu && menu.offsetWidth;
    }

    /**
     * If present, show the menu.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get show() {
        return this._show;
    }
    set show(value) {
        this._show = normalizeBoolean(value);
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Menu items HTML elements.
     *
     * @type {HTMLElement}
     */
    get menuItems() {
        return Array.from(
            this.template.querySelectorAll(
                '[data-element-id="lightning-menu-item"]'
            )
        );
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Allow blur and closing of the dropdown.
     */
    allowBlur() {
        this._cancelBlur = false;
    }

    /**
     * Prevent the dropdown to close on blur. Set focus on the HTML element given.
     *
     * @param {HTMLElement} menuItem
     */
    cancelBlurAndFocusOnMenuItem(menuItem) {
        if (menuItem) {
            // prevent blur during a non-blurring focus change
            // set lock so that while focusing on menutitem, menu doesnt close
            this._cancelBlur = true;
            menuItem.focus();
        }
        // allowBlur is called when the menu items receives focus
    }

    /**
     * Get a menu item HTML element, using the item index in the menuItems array.
     *
     * @param {number} index
     * @returns {HTMLElement} Menu item element
     */
    getMenuItemByIndex(index) {
        return this.menuItems[index];
    }

    /**
     * Find the index of a menu item HTML element, in the menuItems array.
     *
     * @param {HTMLElement} menuItemElement
     * @returns {number} index
     */
    findMenuItemIndex(menuItemElement) {
        return this.menuItems.indexOf(menuItemElement);
    }

    /**
     * Find the closest parent menu item.
     *
     * @param {HTMLElement} childElement
     * @returns {HTMLElement} menuItemElement
     */
    findMenuItemFromEventTarget(childElement) {
        let currentNode = childElement;
        while (currentNode) {
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

    /**
     * Set the focus on the first menu item.
     */
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

    /**
     * Set the focus on a menu item. The index given corresponds to an index in the menuItems array.
     *
     * @param {itemIndex}
     */
    focusOnMenuItem(itemIndex) {
        if (this.show) {
            const menuItem = this.getMenuItemByIndex(itemIndex);
            this.cancelBlurAndFocusOnMenuItem(menuItem);
        }
    }

    /**
     * Computed keyboard interface. It contains the possible actions on the menu items and is used to handle a key down on a menu item.
     *
     * @returns {object} Keyboard interface
     */
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

    /**
     * Toggle menu visibility and dispatch close event if the menu was closed.
     */
    toggleMenuVisibility() {
        this._show = !this.show;
        if (!this.show) {
            /**
             * The event fired when the dropdown is closed.
             * @event
             * @name close
             */
            this.dispatchEvent(new CustomEvent('close'));
        }
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Handle the keydown event fired by the menu item elements.
     *
     * @param {}
     * @returns {}
     * @public
     */
    handleKeyDownMenuItem(event) {
        const menuItem = this.findMenuItemFromEventTarget(event.target);
        if (menuItem) {
            handleKeyDownOnMenuItem(
                event,
                this.findMenuItemIndex(menuItem),
                this._keyboardInterface
            );
        }
    }

    /**
     * Handle the mousedown event fired by the dropdown menu.
     * Prevent the menu from closing on dragging its scrollbar with the mouse.
     * @param {Event} event
     */
    handleMenuMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this._cancelBlur = true;
        }
    }

    /**
     * Handle the mouseleave event fired by the dropdown menu.
     * It is used to close the menu after mousedown happens on scrollbar. In this case we close immediately if no menu-items were hovered/focused. Without it the menu would remain open, since the blur on the menu items has happened already when clicking the scrollbar.
     *
     */
    handleMenuMouseLeave() {
        if (!this._hasFocus && this.show) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Handle the mouseup event fired by the dropdown menu.
     * Allow blur after a scrollbar was dragged with the mouse.
     */
    handleMenuMouseUp() {
        this.allowBlur();
    }

    /**
     * Handle the mouseover event fired by the menu item elements. Set focus on the hovered menu item.
     *
     * @param {Event} event
     */
    handleMouseOverOnMenuItem(event) {
        const menuItem = this.findMenuItemFromEventTarget(event.target);
        if (menuItem) {
            const menuItemIndex = this.findMenuItemIndex(menuItem);
            this.focusOnMenuItem(menuItemIndex);
        }
    }

    /**
     * Handle the privateblur event fired by the menu item elements.
     * If blurring is allowed, close the dropdown menu.
     *
     * @param {Event} event
     */
    handleMenuItemPrivateBlur(event) {
        event.stopPropagation();
        if (this._cancelBlur) return;

        if (this.show) {
            this.toggleMenuVisibility();
        }
        this._hasFocus = false;
    }

    /**
     * Handle the privatefocus event fired by the menu item elements.
     *
     * @param {Event} event
     */
    handleMenuItemPrivateFocus(event) {
        event.stopPropagation();
        this._cancelBlur = false;
        this._hasFocus = true;
    }

    /**
     * Handle the privateselect event fired by the menu item elements.
     * Close the dropdown and dispatch a privateselect event.
     *
     * @param {Event} event
     */
    handleMenuItemPrivateSelect(event) {
        event.stopPropagation();

        if (this.show) {
            this.toggleMenuVisibility();
        }

        /**
         * The event fired when selecting an item.
         *
         * @event
         * @name privateselect
         * @param {string} name Value of the item selected.
         */
        this.dispatchEvent(
            new CustomEvent('privateselect', {
                detail: {
                    name: event.detail.value
                }
            })
        );
    }

    /**
     * Handle the scroll event on the dropdown menu.
     * Stop the propagation of the event to prevent scrolling in parents.
     *
     * @param {Event} event
     */
    handleMenuScroll(event) {
        event.stopPropagation();
    }

    /**
     * Dispatch the returnfocus event.
     */
    dispatchReturnFocus() {
        this.dispatchEvent(new CustomEvent('returnfocus'));
    }
}
