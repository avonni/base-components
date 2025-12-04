import {
    getResolvedCellChanges,
    isEditable,
    startPanelPositioning
} from 'c/primitiveCellUtils';
import { normalizeArray } from 'c/utils';
import { LightningElement, api } from 'lwc';

export default class PrimitiveCellCombobox extends LightningElement {
    @api colKeyValue;
    @api disabled;
    @api dropdownAlignment;
    @api dropdownLength;
    @api isMultiSelect;
    @api placeholder;
    @api rowKeyValue;
    @api wrapText;

    _options = [];
    _value;
    _wrapTextMaxLines;

    dt;
    visible = false;
    editable = false;

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

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get computedWrapTextClass() {
        if (this.wrapText && !this.isMultiSelect) {
            return this._wrapTextMaxLines
                ? 'slds-hyphenate slds-line-clamp'
                : 'slds-hyphenate';
        }
        return 'slds-truncate';
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
        this._wrapTextMaxLines = state.wrapTextMaxLines;
        const index = state.headerIndexes[this.colKeyValue];
        this.editable = isEditable(this.state, index, columns);
    }

    /**
     * Toggles the visibility of the inline edit panel of the combobox.
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
     * Handles the change event and dispatches it.
     */
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
     * Dispatches the cell change event.
     */
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
