import { LightningElement, api } from 'lwc';
import { isEditable, startPanelPositioning } from 'c/primitiveCellUtils';
import { normalizeObject } from 'c/utilsPrivate';

export default class PrimitiveCellPercentFormatted extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;

    _typeAttributes = {};
    _value;

    visible = false;
    editable = false;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.template.addEventListener('ieditfinishedcustom', () => {
            this.toggleInlineEdit();
        });
        this.dispatchStateAndColumnsEvent();
    }

    /*
     * -------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get typeAttributes() {
        return this._typeAttributes;
    }
    set typeAttributes(value) {
        this._typeAttributes = normalizeObject(value);
    }

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get dividedValue() {
        return isNaN(this.value) ? undefined : this.value / 100;
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /*----------- Inline Editing Functions -------------*/
    dispatchStateAndColumnsEvent() {
        this.dispatchEvent(
            new CustomEvent('getdatatablestateandcolumns', {
                detail: {
                    callbacks: {
                        getStateAndColumns: this.getStateAndColumns.bind(this)
                    }
                },
                bubbles: true,
                composed: true
            })
        );
    }

    // Gets the state and columns information from the parent component with the dispatch event in the renderedCallback.
    getStateAndColumns(dt) {
        this.dt = dt;
        const { state, columns } = dt;
        this.state = state;
        const index = state.headerIndexes[this.colKeyValue];
        this.editable = isEditable(this.state, index, columns);
    }

    // Handles the edit button click and dispatches the event.
    handleEditButtonClick() {
        const { rowKeyValue, colKeyValue, state } = this;
        this.dispatchEvent(
            new CustomEvent('editbuttonclickcustom', {
                bubbles: true,
                composed: true,
                detail: {
                    rowKeyValue,
                    colKeyValue,
                    state
                }
            })
        );
        this.dispatchStateAndColumnsEvent();
        this.toggleInlineEdit();
        if (this.visible) {
            startPanelPositioning(
                this.dt,
                this.template,
                this.rowKeyValue,
                this.colKeyValue
            );
        }
    }

    // Toggles the visibility of the inline edit panel
    toggleInlineEdit() {
        this.visible = !this.visible;
    }
}
