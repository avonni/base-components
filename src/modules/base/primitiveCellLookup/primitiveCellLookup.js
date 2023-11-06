import { LightningElement, api } from 'lwc';
import { isEditable, startPanelPositioning } from 'c/primitiveCellUtils';

export default class PrimitiveCellLookup extends LightningElement {
    @api colKeyValue;
    @api linkify;
    @api objectApiName;
    @api relatedObjectApiName;
    @api rowKeyValue;

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

    get computedFieldName() {
        return this.hasDirtyValue || !this.linkify ? 'Name' : this.fieldName;
    }

    get computedObjectApiName() {
        return this.hasDirtyValue || !this.linkify
            ? this.relatedObjectApiName
            : this.objectApiName;
    }

    get computedRecordId() {
        if (this.hasDirtyValue) {
            const recordDirtyValues =
                this.state.inlineEdit.dirtyValues[this.rowKeyValue];
            return recordDirtyValues[this.colKeyValue];
        }
        if (this.linkify) {
            return this.rowKeyValue;
        }
        return this.value;
    }

    get computedWrapTextClass() {
        return this.wrapText ? 'slds-line-clamp' : 'slds-truncate';
    }

    get editedValue() {
        return this.state.inlineEdit.editedValue;
    }

    get fieldName() {
        const column = this.state.columns.find(
            (c) => c.colKeyValue === this.colKeyValue
        );
        if (column) {
            return column.fieldName;
        }
        return null;
    }

    get hasDirtyValue() {
        const recordDirtyValues =
            this.state.inlineEdit.dirtyValues[this.rowKeyValue];
        return (
            recordDirtyValues &&
            typeof recordDirtyValues === 'object' &&
            Object.keys(recordDirtyValues).includes(this.colKeyValue)
        );
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
