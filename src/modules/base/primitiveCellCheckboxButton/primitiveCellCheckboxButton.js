import { LightningElement, api } from 'lwc';

export default class PrimitiveCellCheckboxButton extends LightningElement {
    @api colKeyValue;
    @api disabled;
    @api label;
    @api name;
    @api rowKeyValue;

    _value;

    readOnly;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        // When data is first set, the value is an object containing the editable state
        // When the cell is edited, only the value is sent back
        if (typeof value === 'object') {
            this.readOnly = !value.editable;
            this._value = value.value;
        } else {
            this._value = value;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedDisabled() {
        return this.disabled || this.readOnly;
    }

    get showInput() {
        return this.value || !this.computedDisabled;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS && DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handles the change event and dispatches it.
     */
    handleChange(event) {
        const detail = {
            value: event.detail.checked,
            colKeyValue: this.colKeyValue,
            rowKeyValue: this.rowKeyValue,
            callbacks: {
                dispatchCellChangeEvent: this.dispatchCellChangeEvent.bind(this)
            }
        };

        this.dispatchEvent(
            new CustomEvent('privateeditcustomcell', {
                detail: detail,
                bubbles: true,
                composed: true
            })
        );
    }

    /**
     * Dispatches the cell change event.
     */
    dispatchCellChangeEvent(state) {
        const dirtyValues = state.inlineEdit.dirtyValues;
        this.dispatchEvent(
            new CustomEvent('cellchangecustom', {
                detail: {
                    draftValues: dirtyValues
                },
                bubbles: true,
                composed: true
            })
        );
    }
}
