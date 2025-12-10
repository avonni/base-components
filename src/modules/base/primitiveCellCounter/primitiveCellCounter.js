import { isEditable, startPanelPositioning } from 'c/primitiveCellUtils';
import { LightningElement, api } from 'lwc';

export default class PrimitiveCellCounter extends LightningElement {
    @api colKeyValue;
    @api disabled;
    @api label;
    @api max;
    @api min;
    @api name;
    @api rowKeyValue;
    @api step;

    _value;

    dt;
    editable = false;
    readOnly = true;
    visible = false;

    connectedCallback() {
        this.template.addEventListener('ieditfinishedcustom', () => {
            this.toggleInlineEdit();
        });
        this.dispatchStateAndColumnsEvent();
    }

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
        this._value = value;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get showEditButton() {
        return this.editable && !this.disabled;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Gets the state and columns information from the parent component with the dispatch event in the renderedCallback.
     */
    getStateAndColumns(dt) {
        this.dt = dt;
        const { state, columns } = dt;
        this.state = state;
        const index = state.headerIndexes[this.colKeyValue];
        this.editable = isEditable(this.state, index, columns);
    }

    /**
     * Toggles the visibility of the inline edit panel and the readOnly property of counter.
     */
    toggleInlineEdit() {
        this.visible = !this.visible;
        this.readOnly = !this.readOnly;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS && DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handles the edit button click and dispatches the event.
     */
    handleEditButtonClick() {
        this.dispatchEvent(
            new CustomEvent('editbuttonclickcustom', {
                bubbles: true,
                composed: true,
                detail: {
                    rowKeyValue: this.rowKeyValue,
                    colKeyValue: this.colKeyValue,
                    state: this.state
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

    /**
     * Dispatches the state change event.
     */
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
}
