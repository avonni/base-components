import { LightningElement, api } from 'lwc';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { keyValues } from 'c/utilsPrivate';

const DEFAULT_TAB_INDEX = '0';

const MENU_ALIGNMENTS = {
    valid: ['right', 'left'],
    default: 'right'
};
const MENU_ITEM_CLASSES = ['avonni-submenu'];
const MENU_ITEM_TAGS = ['LIGHTNING-MENU-ITEM'];

/**
 * @class
 * @descriptor avonni-submenu
 * @storyId example-submenu--base
 * @public
 */
export default class Submenu extends LightningElement {
    /**
     * The keyboard shortcut for the menu item.
     *
     * @type {string}
     * @public
     */
    @api accessKey;
    /**
     * Describes the reason for showing the draft indicator. This is required when is-draft is present.
     *
     * @type {string}
     * @public
     */
    @api draftAlternativeText;
    /**
     * The name of an icon to display after the text of the menu item.
     *
     * @type {string}
     * @public
     */
    @api iconName;
    /**
     * Text of the menu item.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * The name of an icon to display before the text of the menu item.
     *
     * @type {string}
     * @public
     */
    @api prefixIconName;

    _disabled = false;
    _isDraft = false;
    _menuAlignment = MENU_ALIGNMENTS.default;
    _tabIndex = DEFAULT_TAB_INDEX;

    isOpen = false;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.classList.add('slds-dropdown__item');
        this.classList.add('avonni-submenu');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the menu item is disabled and users cannot interact with it.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * If present, a draft indicator is shown on the menu item.
     * A draft indicator is denoted by blue asterisk on the left of the menu item. When you use a draft indicator, include alternative text for accessibility using draft-alternative-text.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isDraft() {
        return this._isDraft;
    }
    set isDraft(value) {
        this._isDraft = normalizeBoolean(value);
    }

    /**
     * Determines the alignment of the menu relative to the item. Available options are: left or right.
     *
     * @public
     * @type {string}
     * @default left
     */
    @api
    get menuAlignment() {
        return this._menuAlignment;
    }
    set menuAlignment(value) {
        this._menuAlignment = normalizeString(value, {
            fallbackValue: MENU_ALIGNMENTS.default,
            validValues: MENU_ALIGNMENTS.valid
        });
    }

    /**
     * Reserved for internal use. Use tabindex instead to indicate if an element should be focusable. tabindex can be set to 0 or -1.
     * The default tabindex value is 0, which means that the menu item is focusable and participates in sequential keyboard navigation. The value -1 means that the menu item is focusable but does not participate in keyboard navigation.
     *
     * @type {string}
     * @public
     * @default 0
     */
    @api
    get tabIndex() {
        return this._tabIndex;
    }
    set tabIndex(newValue) {
        this._tabIndex = newValue;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedDropdownClass() {
        return classSet('slds-dropdown slds-dropdown_submenu')
            .add(`slds-dropdown_submenu-${this.menuAlignment}`)
            .toString();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Closes the submenu.
     *
     * @public
     */
    @api
    close() {
        this.isOpen = false;
    }

    /**
     * Sets focus on the anchor element in the menu item.
     *
     * @public
     */
    @api
    focus() {
        this.template.querySelector('[data-element-id="a"]').focus();
        /**
         * The event fired when you focus the menu item.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * Opens the submenu.
     *
     * @public
     */
    @api
    open() {
        this.isOpen = true;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Find menu item's index.
     *
     * @param {object} menuItemElement
     * @returns {number} index of menu item
     */
    findMenuItemIndex(menuItemElement) {
        return this.getMenuItems().indexOf(menuItemElement);
    }

    /**
     * Find menu item from event target.
     *
     * @param {Element} element
     * @returns {Element} menu item
     */
    findMenuItemFromEventTarget(element) {
        let currentNode = element;
        const stopAtElement = this.template.querySelector("[role='menu']");

        while (currentNode !== stopAtElement) {
            if (this.isValidMenuItem(currentNode)) {
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
     * Set focus on menu item via Item Index.
     *
     * @param {object} itemIndex
     */
    focusOnMenuItem(itemIndex) {
        const menuItem = this.getMenuItemByIndex(itemIndex);
        if (menuItem) {
            menuItem.focus();
        }
    }

    /**
     * Get item with index in menu item array.
     *
     * @param {object[]} index
     * @return menu item from array
     */
    getMenuItemByIndex(index) {
        return this.getMenuItems()[index];
    }

    /**
     * Get item array from menu.
     *
     * @return {object[]}
     */
    getMenuItems() {
        const slot = this.template.querySelector('slot');
        if (!slot) return [];

        const slottedElements = slot.assignedElements();
        return slottedElements.filter((el) => this.isValidMenuItem(el));
    }

    /**
     * Checks if a DOM node matches menu item tags or classes.
     *
     * @param {Element} element
     * @returns {boolean} True if the node is a menu item.
     */
    isValidMenuItem(element) {
        if (!element || !element.tagName || !element.classList) return false;

        return (
            MENU_ITEM_TAGS.includes(element.tagName) ||
            MENU_ITEM_CLASSES.some((itemClass) =>
                element.classList.contains(itemClass)
            )
        );
    }

    /**
     * To prevent default action and stop propagation of event
     *
     * @param {Event} event
     */
    preventDefaultAndStopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    handleBlur() {
        /**
         * The event fired when the focus is removed from the menu item.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));

        /**
         * Private removal of focus on menu item.
         *
         * @event
         * @name privateblur
         * @bubbles
         * @cancelable
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('privateblur', {
                composed: true,
                bubbles: true,
                cancelable: true
            })
        );
    }

    handleDropdownKeyDown(event) {
        switch (event.key) {
            case keyValues.down:
            case keyValues.up: {
                const menuItem = this.findMenuItemFromEventTarget(event.target);
                if (!menuItem) return;

                const menuItemIndex = this.findMenuItemIndex(menuItem);
                this.preventDefaultAndStopPropagation(event);
                let nextIndex =
                    event.key === keyValues.up
                        ? menuItemIndex - 1
                        : menuItemIndex + 1;

                if (nextIndex >= this.getMenuItems().length) {
                    nextIndex = 0;
                } else if (nextIndex < 0) {
                    nextIndex = this.getMenuItems().length - 1;
                }
                this.focusOnMenuItem(nextIndex);
                break;
            }

            case keyValues.left:
            case keyValues.escape: {
                this.preventDefaultAndStopPropagation(event);
                this.close();
                this.focus();
                break;
            }
            default:
        }
    }

    /**
     * Private Focus event handler.
     */
    handleFocus() {
        /**
         * Private focus on menu item.
         *
         * @event
         * @name privatefocus
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('privatefocus', {
                bubbles: true,
                cancelable: true
            })
        );
    }

    /**
     * Menu item keydown handler.
     *
     * @param {Event} event
     */
    handleMenuItemKeyDown(event) {
        switch (event.key) {
            case keyValues.down:
            case keyValues.up: {
                const menuItem = this.findMenuItemFromEventTarget(event.target);
                if (!menuItem) return;

                const menuItemIndex = this.findMenuItemIndex(menuItem);
                this.preventDefaultAndStopPropagation(event);
                let nextIndex =
                    event.key === keyValues.up
                        ? menuItemIndex - 1
                        : menuItemIndex + 1;

                if (nextIndex >= this.getMenuItems().length) {
                    nextIndex = 0;
                } else if (nextIndex < 0) {
                    nextIndex = this.getMenuItems().length - 1;
                }
                this.focusOnMenuItem(nextIndex);
                break;
            }
            case keyValues.right: {
                this.preventDefaultAndStopPropagation(event);
                if (this.disabled) return;
                this.open();

                requestAnimationFrame(() => {
                    const menuItems = this.getMenuItems();
                    if (menuItems.length > 0) {
                        const firstMenuItem = menuItems[0];
                        if (firstMenuItem) {
                            firstMenuItem.focus();
                        }
                    }
                });
                break;
            }
            case keyValues.left:
            case keyValues.escape: {
                event.preventDefault();
                if (!this.isOpen) return;

                event.stopPropagation();
                this.close();
                this.focus();
                break;
            }
            default:
        }
    }

    /**
     * Mouse enter submenu event handler.
     *
     * @param {Event} event
     */
    handleMouseEnter(event) {
        if (!this._disabled) {
            if (this.isOpen) {
                this.querySelectorAll('.avonni-submenu').forEach((submenu) => {
                    submenu.close();
                });
            }

            this.open();
            event.stopPropagation();
        }

        event.preventDefault();
    }

    /**
     * Prevent event default handler.
     *
     * @param {Event} event
     */
    handlePreventDefault(event) {
        event.preventDefault();
    }
}
