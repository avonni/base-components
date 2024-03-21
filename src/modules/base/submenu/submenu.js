import { LightningElement, api } from 'lwc';
import { normalizeBoolean } from 'c/utilsPrivate';

const DEFAULT_TAB_INDEX = '0';

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
    _tabIndex = DEFAULT_TAB_INDEX;

    isOpen = false;
    init = false;

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
         * The event fired when you focus the menu item.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * Close the submenu.
     *
     * @public
     */
    @api
    close() {
        this.isOpen = false;
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
            } else {
                this.dispatchSelect();
            }

            this.isOpen = true;
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

    /**
     * Select event dispatcher.
     */
    dispatchSelect() {
        /**
         * Private select menu item event.
         *
         * @event
         * @name privateselect
         * @param {string} type 'submenu'
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('privateselect', {
                bubbles: true,
                cancelable: true,
                detail: {
                    type: 'submenu'
                }
            })
        );
    }
}
