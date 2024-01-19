import { LightningElement, api } from 'lwc';
import { isEditable, startPanelPositioning } from 'c/primitiveCellUtils';

export default class PrimitiveCellNameLookup extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api path;
    @api target;

    _index;
    _value;
    _wrapText;

    visible = false;
    editable = false;
    readOnly = true;

    connectedCallback() {
        this.template.addEventListener('ieditfinishedcustom', () => {
            this.toggleInlineEdit();
        });
        this.dispatchStateAndColumnsEvent();
    }

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    @api
    get wrapText() {
        return this._wrapText;
    }
    set wrapText(value) {
        this._wrapText = value;
    }

    get computedWrapTextClass() {
        return this.wrapText ? 'slds-line-clamp' : 'slds-truncate';
    }

    get editedValue() {
        return this.state.inlineEdit.editedValue;
    }

    /**
     * Return true if cell is editable and not disabled.
     *
     * @type {Boolean}
     */
    get showEditButton() {
        return this.editable;
    }

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

    toggleInlineEdit() {
        this.visible = !this.visible;
    }
}
