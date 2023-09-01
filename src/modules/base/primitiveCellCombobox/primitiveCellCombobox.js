import { LightningElement, api } from 'lwc';
import { isEditable } from 'c/primitiveCellUtils';
import { normalizeArray } from 'c/utilsPrivate';

export default class PrimitiveCellCombobox extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownLength;
    @api isMultiSelect;
    @api placeholder;

    _columnsWidth = 0;
    _index;
    _options = [];
    _value;

    visible = false;
    editable = false;
    readOnly = true;

    connectedCallback() {
        // Dispatches the inline edit event to the parent component.
        this.template.addEventListener('inlineeditchange', (event) => {
            this.handleChange(event);
        });

        this.template.addEventListener('ieditfinishedcustom', () => {
            this.toggleInlineEdit();
        });
        this.dispatchStateAndColumnsEvent();
    }

    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = normalizeArray(value);
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

    get displayedValue() {
        if (this.isMultiSelect && this.value) {
            const selectedOptions = this.options.filter((option) =>
                this.value.includes(option.value)
            );

            // Sort the selected options by the order they appear in the value array
            selectedOptions.sort((a, b) => {
                return (
                    this.value.indexOf(a.value) - this.value.indexOf(b.value)
                );
            });

            return selectedOptions.map((option) => ({
                label: option.label,
                name: option.value
            }));
        } else if (this.isMultiSelect && !this.value) {
            return [];
        }

        const selectedOption = this.options.find(
            (option) => option.value === this.value
        );

        return selectedOption?.label ?? this.value;
    }

    get displayPillContainer() {
        return this.isMultiSelect && this.displayedValue?.length > 0;
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
    dispatchCellChangeEvent(state) {
        const dirtyValues = state.inlineEdit.dirtyValues;
        dirtyValues[this.rowKeyValue][this.colKeyValue] = this.value;
        this.dispatchEvent(
            new CustomEvent('cellchangecustom', {
                detail: {
                    draftValues: this.getResolvedCellChanges(state, dirtyValues)
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

    getCellChangesByColumn(state, changes) {
        return Object.keys(changes).reduce((result, colKey) => {
            const columns = state.columns;
            const columnIndex = state.headerIndexes[colKey];
            const columnDef = columns[columnIndex];
            result[columnDef.columnKey || columnDef.fieldName] =
                changes[colKey];
            return result;
        }, {});
    }

    getResolvedCellChanges(state, dirtyValues) {
        const keyField = state.keyField;
        return Object.keys(dirtyValues).reduce((result, rowKey) => {
            // Get the changes made by column
            const cellChanges = this.getCellChangesByColumn(
                state,
                dirtyValues[rowKey]
            );
            if (Object.keys(cellChanges).length > 0) {
                // Add identifier for which row has change
                cellChanges[keyField] = rowKey;
                result.push(cellChanges);
            }
            return result;
        }, []);
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

    handleChange(event) {
        const detail = {
            value: event.detail.value,
            colKeyValue: this.colKeyValue,
            rowKeyValue: this.rowKeyValue,
            callbacks: {
                dispatchCellChangeEvent: this.dispatchCellChangeEvent.bind(this)
            }
        };
        this._value = event.detail.value;
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
    }

    // Toggles the visibility of the inline edit panel and the readOnly property of combobox.
    toggleInlineEdit() {
        this.visible = !this.visible;
        this.readOnly = !this.readOnly;
    }
}
