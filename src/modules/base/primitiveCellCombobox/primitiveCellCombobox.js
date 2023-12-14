import { LightningElement, api } from 'lwc';
import {
    isEditable,
    getResolvedCellChanges,
    startPanelPositioning
} from 'c/primitiveCellUtils';
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

    get displayedValue() {
        if (this.isMultiSelect && this.value) {
            const value =
                this.value && typeof this.value === 'string'
                    ? [this.value]
                    : normalizeArray(this.value);
            const selectedOptions = this.options.filter((option) =>
                value.includes(option.value)
            );

            // Sort the selected options by the order they appear in the value array
            selectedOptions.sort((a, b) => {
                return value.indexOf(a.value) - value.indexOf(b.value);
            });

            return selectedOptions.map((option) => ({
                label: option.label,
                name: option.value
            }));
        } else if (this.isMultiSelect) {
            return [];
        }

        const selectedOption = this.options.find(
            (option) => option.value === this.value
        );

        return selectedOption?.label ?? this.value;
    }

    get displayPillContainer() {
        return (
            this.isMultiSelect &&
            Array.isArray(this.displayedValue) &&
            this.displayedValue.length
        );
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
                    draftValues: getResolvedCellChanges(state, dirtyValues)
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

    // Gets the state and columns information from the parent component with the dispatch event in the renderedCallback.
    getStateAndColumns(dt) {
        this.dt = dt;
        const { state, columns } = dt;
        this.state = state;
        const index = state.headerIndexes[this.colKeyValue];
        this.editable = isEditable(this.state, index, columns);
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

    // Toggles the visibility of the inline edit panel and the readOnly property of combobox.
    toggleInlineEdit() {
        this.visible = !this.visible;
        this.readOnly = !this.readOnly;
    }
}
