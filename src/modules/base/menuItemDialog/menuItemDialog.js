

import { LightningElement, api } from 'lwc';
import { normalizeBoolean, keyCodes } from 'c/utilsPrivate';

const DEFAULT_TAB_INDEX = '0';

/**
 * The Menu Item Dialog is used inside an Avonni Button Menu. On click on the item, a modal box is opened.
 *
 * @class
 * @descriptor avonni-menu-item-dialog
 * @storyId example-menu-item-dialog-only-with-avonni-button-menu--base
 * @public
 */
export default class MenuItemDialog extends LightningElement {
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
    /**
     * A value associated with the menu item.
     *
     * @type {string}
     * @public
     */
    @api value;

    _disabled = false;
    _isDraft = false;
    _tabIndex = DEFAULT_TAB_INDEX;

    connectedCallback() {
        this.classList.add('slds-dropdown__item');
        this.setAttribute('role', 'presentation');
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
    @api get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * If present, a draft indicator is shown on the menu item. A draft indicator is denoted by blue asterisk on the left of the menu item.
     * When you use a draft indicator, include alternative text for accessibility using draft-alternative-text.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api get isDraft() {
        return this._isDraft;
    }

    set isDraft(value) {
        this._isDraft = normalizeBoolean(value);
    }

    /**
     * Reserved for internal use. Use tabindex instead to indicate if an element should be focusable.
     * tabindex can be set to 0 or -1. The default tabindex value is 0, which means that the menu item is focusable and participates in sequential keyboard navigation.
     * The value -1 means that the menu item is focusable but does not participate in keyboard navigation.
     *
     * @type {string}
     * @public
     * @default 0
     */
    @api get tabIndex() {
        return this._tabIndex;
    }

    set tabIndex(newValue) {
        this._tabIndex = newValue;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Sets focus on the anchor element in the menu item.
     *
     * @public
     */
    @api
    focus() {
        this.template.querySelector('[data-element-id="a"]').focus();
        /**
         * Event that fires when setting focus on anchor element in menu item.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Handler that removes focus on anchor element in the menu item.
     */
    handleBlur() {
        /**
         * Event that fires when removing focus on anchor element in menu item.
         *
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));

        /**
         * Private Blur event
         *
         * @event
         * @name privateblur
         * @composed
         * @cancelable
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('privateblur', {
                composed: true,
                bubbles: true,
                cancelable: true
            })
        );
    }

    /**
     * Private Focus event handler.
     */
    handleFocus() {
        /**
         * Private Focus event
         *
         * @event
         * @name privatefocus
         * @cancelable
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('privatefocus', {
                bubbles: true,
                cancelable: true
            })
        );
    }

    /**
     * Handle selection click event.
     *
     * @param {Event} event
     */
    handleClick(event) {
        if (this.disabled) {
            event.preventDefault();
            return;
        }

        event.preventDefault();
        this.dispatchSelect();
    }

    /**
     * Handle key down event. Pressing space invokes click event on selection.
     *
     * @param {Event} event
     */
    handleKeyDown(event) {
        if (this.disabled) {
            return;
        }

        if (event.keyCode === keyCodes.space) {
            if (this.href) {
                this.template.querySelector('[data-element-id="a"]').click();
            }
        }
    }

    /**
     * Private Select event dispatcher.
     */
    dispatchSelect() {
        if (!this.disabled) {
            /**
             * Private Select event.
             *
             * @event
             * @name privateselect
             * @param {string} value
             * @param {string} type
             * @bubbles
             * @cancelable
             */
            this.dispatchEvent(
                new CustomEvent('privateselect', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        value: this.value,
                        type: 'dialog'
                    }
                })
            );
        }
    }
}
