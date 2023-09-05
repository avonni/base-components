import { LightningElement, api } from 'lwc';
import { isEditable } from 'c/primitiveCellUtils';

export default class PrimitiveCellDateRange extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api dateStyle;
    @api timeStyle;
    @api timezone;
    @api disabled;
    @api label;
    @api labelStartDate;
    @api labelEndDate;
    @api type;

    _columnsWidth = 0;
    _index;
    _value;

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

    get computedPanelStyle() {
        return this._columnsWidth < 310
            ? 'position: absolute; top: 0; right: 0'
            : 'position: absolute; top: 0; left: 0';
    }

    get endDate() {
        return typeof this.value === 'object' ? this.value.endDate : undefined;
    }

    get startDate() {
        return typeof this.value === 'object'
            ? this.value.startDate
            : undefined;
    }

    /**
     * Return true if cell is editable and not disabled.
     *
     * @type {Boolean}
     */
    get showEditButton() {
        return this.editable && !this.disabled;
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
    getStateAndColumns(state, columns, width) {
        this.state = state;
        this.columns = columns;
        this._index = this.state.headerIndexes[this.colKeyValue];
        this._columnsWidth = width
            ? width.slice(this._index).reduce((a, b) => a + b, 0)
            : 0;

        this.editable = isEditable(this.state, this._index, this.columns);
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
    }

    // Toggles the visibility of the inline edit panel and the readOnly property of combobox.
    toggleInlineEdit() {
        this.visible = !this.visible;
        this.readOnly = !this.readOnly;
    }
}
