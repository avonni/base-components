import { LightningElement, api, track } from 'lwc';
import { Direction, AutoPosition } from 'c/positionLibrary';
import { normalizeBoolean } from 'c/utilsPrivate';

const i18n = {
    a11yTriggerText: 'Choose a color. Current color: '
};

export default class PrimitiveColorpickerButton extends LightningElement {
    static delegatesFocus = true;

    @track _isColorPickerPanelOpen = false;
    @track _value = '';
    @track _disabled = false;

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

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

    @api
    focus() {
        const button = this.template.querySelector('button');
        return button && button.focus();
    }

    @api
    blur() {
        const button = this.template.querySelector('button');
        return button && button.blur();
    }

    get colorInputStyle() {
        return `background: ${this.value || '#5679C0'};`;
    }

    handleColorPickerToggleClick(event) {
        event.preventDefault();
        this._isColorPickerPanelOpen = !this._isColorPickerPanelOpen;

        if (this._isColorPickerPanelOpen) {
            this.startColorPickerPositioning();
        } else {
            this.stopColorPickerPositioning();
        }
    }

    startColorPickerPositioning() {
        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition.start({
            target: () =>
                this.template.querySelector(
                    'button.slds-color-picker__summary-button'
                ),
            element: () =>
                this.template
                    .querySelector('c-color-picker-panel')
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

    stopColorPickerPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }

    handleUpdateColorEvent(event) {
        event.stopPropagation();
        const detail = event.detail;
        this._isColorPickerPanelOpen = false;
        this.stopColorPickerPositioning();
        this.dispatchEvent(
            new CustomEvent('change', {
                detail
            })
        );
    }

    get i18n() {
        return i18n;
    }
}
