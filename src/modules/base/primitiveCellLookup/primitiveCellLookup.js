import { LightningElement, api } from 'lwc';
import {
    isEditable,
    getResolvedCellChanges,
    startPanelPositioning
} from 'c/primitiveCellUtils';

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
    _wrapTextMaxLines;

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
        // If the value changes, we need to update the name.
        this.dispatchValueChangeEvent();
    }

    @api
    get wrapText() {
        return this._wrapText;
    }
    set wrapText(value) {
        this._wrapText = value;
    }

    get computedWrapTextClass() {
        if (this.wrapText) {
            return this._wrapTextMaxLines
                ? 'slds-hyphenate slds-line-clamp'
                : 'slds-hyphenate';
        }
        return 'slds-truncate';
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
    dispatchCellChangeEvent(state) {
        const dirtyValues = state.inlineEdit.dirtyValues;
        dirtyValues[this.rowKeyValue][this.colKeyValue] = this.value;
        this.dispatchEvent(
            new CustomEvent('cellchangecustom', {
                detail: {
                    dirtyValue: this.value,
                    draftValues: getResolvedCellChanges(state, dirtyValues),
                    callbacks: {
                        setLookupName: this.setName.bind(this)
                    }
                },
                bubbles: true,
                composed: true
            })
        );
    }

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

    dispatchValueChangeEvent() {
        this.dispatchEvent(
            new CustomEvent('valuechange', {
                detail: {
                    dirtyValue: this._value,
                    callbacks: {
                        setLookupName: this.setName.bind(this)
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
        this._wrapTextMaxLines = state.wrapTextMaxLines;
        const index = state.headerIndexes[this.colKeyValue];
        this.editable = isEditable(this.state, index, columns);
    }

    setName(name) {
        this._name = name;
    }

    handleChange(event) {
        const value = event.detail.value || null;
        const detail = {
            value,
            colKeyValue: this.colKeyValue,
            rowKeyValue: this.rowKeyValue,
            callbacks: {
                dispatchCellChangeEvent: this.dispatchCellChangeEvent.bind(this)
            }
        };
        this._value = value;
        this.dispatchEvent(
            new CustomEvent('privateeditcustomcell', {
                detail: detail,
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
