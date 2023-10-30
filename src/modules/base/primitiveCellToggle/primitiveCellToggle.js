import { LightningElement, api } from 'lwc';

export default class PrimitiveCellToggle extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api disabled;
    @api hideMark;
    @api label;
    @api messageToggleActive;
    @api messageToggleInactive;
    @api name;
    @api size;

    checked;
    readOnly;

    @api
    get value() {
        return this.checked;
    }
    set value(value) {
        // When data is first set, the value is an object containing the editable state
        // When the cell is edited, only the value is sent back
        if (typeof value === 'object') {
            this.readOnly = !value.editable;
            this.checked = value.value;
        } else {
            this.checked = value;
        }
    }

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
