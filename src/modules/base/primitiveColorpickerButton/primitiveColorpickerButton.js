import { LightningElement, api } from 'lwc';
import { Direction, AutoPosition } from 'c/positionLibrary';
import { normalizeBoolean } from 'c/utils';

const i18n = {
    a11yTriggerText: 'Choose a color. Current color: '
};

export default class PrimitiveColorpickerButton extends LightningElement {
    /**
     * The label for the cancel button.
     * @type {string}
     * @default Cancel
     */
    @api cancelButtonLabel;
    /**
     * The label for the done button.
     * @type {string}
     * @default Done
     */
    @api doneButtonLabel;

    _disabled = false;
    _value = '';

    static delegatesFocus = true;
    isColorPickerPanelOpen = false;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the input field is disabled and users cannot interact with it.
     * @type {boolean}
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
     * The value of the input field.
     * @type {string}
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The style of the input field.
     * @type {string}
     */
    get colorInputStyle() {
        return `background: ${this.value || '#5679C0'};`;
    }

    /**
     * Localization.
     * @type {object}
     */
    get i18n() {
        return i18n;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Blur the input field.
     */
    @api
    blur() {
        const button = this.template.querySelector(
            '[data-element-id="button"]'
        );
        button?.blur();
    }

    /**
     * Focus the input field.
     */
    @api
    focus() {
        const button = this.template.querySelector(
            '[data-element-id="button"]'
        );
        button?.focus();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Start the color picker positioning.
     */
    startColorPickerPositioning() {
        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition.start({
            target: () =>
                this.template.querySelector('[data-element-id="button"]'),
            element: () =>
                this.template
                    .querySelector(
                        '[data-element-id="avonni-color-picker-panel"]'
                    )
                    .shadowRoot.querySelector('section'),
            align: {
                horizontal: Direction.Left,
                vertical: Direction.Top
            },
            targetAlign: {
                horizontal: Direction.Left,
                vertical: Direction.Bottom
            },
            autoFlip: true
        });
    }

    /**
     * Stop the color picker positioning.
     */
    stopColorPickerPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Toggle the color picker panel.
     * @param {Event} event
     */
    handleColorPickerToggleClick(event) {
        event.preventDefault();
        this.isColorPickerPanelOpen = !this.isColorPickerPanelOpen;

        if (this.isColorPickerPanelOpen) {
            this.startColorPickerPositioning();
        } else {
            this.stopColorPickerPositioning();
        }
    }

    /**
     * Update the color event.
     * @param {Event} event
     */
    handleUpdateColorEvent(event) {
        event.stopPropagation();
        const detail = event.detail;
        this.isColorPickerPanelOpen = false;
        this.stopColorPickerPositioning();
        this.dispatchEvent(
            new CustomEvent('change', {
                detail
            })
        );
    }
}
