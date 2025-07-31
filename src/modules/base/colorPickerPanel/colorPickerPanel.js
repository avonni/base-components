import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { keyValues } from 'c/utilsPrivate';

const i18n = {
    cancelButton: 'Cancel',
    customTab: 'Custom',
    defaultTab: 'Default',
    doneButton: 'Done'
};

const DEFAULT_COLOR = '#000000';

/**
 * @class
 * @descriptor avonni-color-picker-panel
 */
export default class ColorPickerPanel extends LightningElement {
    /**
     * The label for the cancel button.
     * @type {string}
     * @default Cancel
     */
    @api cancelButtonLabel = i18n.cancelButton;
    /**
     * Get currentColor.
     *
     * @public
     */
    @api currentColor;
    /**
     * The label for the done button.
     * @type {string}
     * @default Done
     */
    @api doneButtonLabel = i18n.doneButton;

    _isCustomTabActive = false;
    _selectedColor = null;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._selectedColor = this.currentColor || DEFAULT_COLOR;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Aria for Custom Panel.
     *
     * @type {string}
     */
    get ariaSelectedCustom() {
        return this._isCustomTabActive.toString();
    }

    /**
     * Aria for Default Panel.
     *
     * @type {string}
     */
    get ariaSelectedDefault() {
        return !this._isCustomTabActive.toString();
    }

    /**
     * Computed Panel class custom styling.
     *
     * @type {string}
     */
    get computedClassCustom() {
        return classSet('slds-tabs_default__item')
            .add({
                'slds-is-active': this._isCustomTabActive
            })
            .toString();
    }

    /**
     * Computed Panel class default styling.
     *
     * @type {string}
     */
    get computedClassDefault() {
        return classSet('slds-tabs_default__item')
            .add({
                'slds-is-active': !this._isCustomTabActive
            })
            .toString();
    }

    /**
     * Localization.
     *
     * @type {object}
     */
    get i18n() {
        return i18n;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Handle Click on cancel.
     */
    handleCancelClick() {
        this.dispatchUpdateColorEventWithColor(this.currentColor);
    }

    /**
     * Handle Click on done.
     */
    handleDoneClick() {
        this.dispatchUpdateColorEventWithColor(this._selectedColor);
    }

    /**
     * Handle Keydown event.
     *
     * @param {Event} event
     */
    handleKeydown(event) {
        if (event.key === keyValues.escape) {
            event.preventDefault();
            this.dispatchUpdateColorEventWithColor(this.currentColor);
        } else if (
            event.shiftKey &&
            event.key === keyValues.tab &&
            event.target.dataset.id === 'color-anchor'
        ) {
            event.preventDefault();
            this.template.querySelector('button[name="done"]').focus();
        } else if (
            !event.shiftKey &&
            event.key === keyValues.tab &&
            event.target.name === 'done'
        ) {
            event.preventDefault();
            this.template
                .querySelector('[data-element-id="avonni-color-picker-custom"]')
                .focus();
        }
    }

    /**
     * Tab change handler.
     *
     * @param {Event} event
     */
    handleTabChange(event) {
        event.preventDefault();
        const tabElement = event.currentTarget;
        if (tabElement.classList.contains('slds-is-active')) {
            return;
        }
        this._isCustomTabActive = tabElement.title !== i18n.defaultTab;
    }

    /**
     * Selected Color update handler.
     *
     * @param {Event} event
     */
    handleUpdateSelectedColor(event) {
        this._selectedColor = event.detail.color;
    }

    /**
     * Updated color event dispatcher.
     *
     * @param {string} color
     */
    dispatchUpdateColorEventWithColor(color) {
        /**
         * Event that fires when updating the color value.
         *
         * @event
         * @name updatecolor
         * @param {string} color
         * @composed
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('updatecolor', {
                composed: true,
                bubbles: true,
                detail: { color }
            })
        );
    }
}
