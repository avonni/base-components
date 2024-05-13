import { LightningElement, api } from 'lwc';
import { isEditable, startPanelPositioning } from 'c/primitiveCellUtils';

export default class PrimitiveCellPercentFormatted extends LightningElement {
    @api colKeyValue;
    @api maximumFractionDigits;
    @api maximumSignificantDigits;
    @api minimumFractionDigits;
    @api minimumIntegerDigits;
    @api minimumSignificantDigits;
    @api rowKeyValue;
    @api step;
    @api wrapText;

    _value;
    _wrapTextMaxLines;

    dt;
    editable = false;
    visible = false;

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

    get computedWrapTextClass() {
        if (this.wrapText) {
            return this._wrapTextMaxLines
                ? 'slds-hyphenate slds-line-clamp'
                : 'slds-hyphenate';
        }
        return 'slds-truncate';
    }

    get dividedValue() {
        return isNaN(this.value) ? undefined : this.value / 100;
    }

    /*
     * -------------------------------------------------------------
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
        this._wrapTextMaxLines = state.wrapTextMaxLines;
        this.editable = isEditable(this.state, index, columns);
    }

    /**
     * Toggles the visibility of the inline edit panel.
     */
    toggleInlineEdit() {
        this.visible = !this.visible;
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
