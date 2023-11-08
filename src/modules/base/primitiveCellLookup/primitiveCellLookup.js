import { LightningElement, api } from 'lwc';
import { isEditable, startPanelPositioning } from 'c/primitiveCellUtils';

export default class PrimitiveCellLookup extends LightningElement {
    @api colKeyValue;
    @api linkify;
    @api objectApiName;
    @api path;
    @api rowKeyValue;

    _index;
    _name;
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
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
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
        return (
            this.recordDirtyValues &&
            typeof this.recordDirtyValues === 'object' &&
            Object.keys(this.recordDirtyValues).includes(this.colKeyValue)
        );
    }

    get recordDirtyValues() {
        return this.state.inlineEdit.dirtyValues[this.rowKeyValue];
    }

    /**
     * Return true if cell is editable and not disabled.
     *
     * @type {Boolean}
     */
    get showEditButton() {
        return this.editable;
    }

    get showLink() {
        return this.path && this.name && !this.hasDirtyValue;
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

    setName(name) {
        this._name = name;
    }

    handleChange(event) {
        if (!this.hasDirtyValue) {
            return;
        }
        event.stopPropagation();

        this.dispatchEvent(
            new CustomEvent('cellchangecustom', {
                detail: {
                    dirtyValue: this.recordDirtyValues[this.colKeyValue],
                    draftValues: event.detail.draftValues,
                    callbacks: {
                        setLookupName: this.setName.bind(this)
                    }
                },
                bubbles: true,
                composed: true
            })
        );
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
