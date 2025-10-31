import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import { InteractingState } from 'c/inputUtils';
import { getResolvedCellChanges } from 'c/primitiveCellUtils';
import { keyValues } from 'c/utilsPrivate';

export default class PrimitiveDatatableIeditPanelCustom extends LightningElement {
    @api colKeyValue;
    @api columnDef;
    @api editedValue;
    @api isMassEditEnabled = false;
    @api numberOfSelectedRows;
    @api rowKeyValue;
    @api visible = false;

    //shared
    @api disabled;
    @api label;
    @api name;
    @api placeholder;
    @api type;

    // Primitive cell color-picker
    @api colors;
    @api hideColorInput;
    @api menuAlignment;
    @api menuIconName;
    @api menuIconSize;
    @api menuVariant;
    @api opacity;

    // Primitive cell combobox
    @api dropdownLength;
    @api isMultiSelect;

    // Primitive cell counter
    @api max;
    @api min;
    // ...also shared with percent-formatted:
    @api step;

    // Primitive cell date-range
    @api startDate;
    @api endDate;
    @api dateStyle;
    @api timeStyle;
    @api timezone;
    @api labelStartDate;
    @api labelEndDate;

    // primitive cell rich-text
    @api formats;
    @api variant;

    // primitive cell textarea
    @api maxLength;
    @api minLength;

    _allowBlur = true;

    connectedCallback() {
        this.interactingState = new InteractingState({
            duration: 10,
            debounceInteraction: true
        });
        this.interactingState.onleave(() => this.handlePanelLoosedFocus());

        this.template.addEventListener('inlineeditchange', (event) =>
            this.processOnChange(event)
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Returns true if massEdit is enabled and checkbox is checked.
     *
     * @type {boolean}
     */
    @api
    get isMassEditChecked() {
        return (
            this.isMassEditEnabled &&
            this.template.querySelector('[data-mass-selection="true"]').checked
        );
    }

    /**
     * Returns validity object of inputable element inside inline edit panel.
     *
     * @type {object}
     */
    @api
    get validity() {
        return this.inputableElement ? this.inputableElement.validity : {};
    }

    /**
     * Returns value of inputable element inside inline edit panel.
     *
     * @type {(string|object)}
     */
    @api
    get value() {
        return this.inputableElement ? this.inputableElement.value : undefined;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed panel class.
     *
     * @type {string}
     */
    get computedPanelClass() {
        return classSet(
            'slds-popover slds-popover_edit avonni-datatable-iedit-panel'
        )
            .add({
                'slds-show': this.visible,
                'slds-hide': !this.visible,
                'avonni-datatable-iedit-panel_size_large':
                    this.isTypeTextArea || this.isTypeRichText
            })
            .toString();
    }

    /**
     * Returns element inputable element inside inline edit panel.
     *
     * @type {element}
     */
    get inputableElement() {
        return this.template.querySelector(
            '[data-element-id="dt-type-edit-factory-custom"]'
        );
    }

    /**
     * Returns true if column type is date-range.
     *
     * @type {boolean}
     */
    get isTypeDateRange() {
        return this.columnDef.type === 'date-range';
    }

    /**
     * Returns true if column type is color-picker.
     *
     * @type {boolean}
     */
    get isTypeColorPicker() {
        return this.columnDef.type === 'color-picker';
    }

    /**
     * Returns true if column type is combobox.
     *
     * @type {boolean}
     */
    get isTypeCombobox() {
        return this.columnDef.type === 'combobox';
    }

    /**
     * Returns true if column type is counter.
     *
     * @type {boolean}
     */
    get isTypeCounter() {
        return this.columnDef.type === 'counter';
    }

    /**
     * Returns true if column type is percent-formatted.
     *
     * @type {boolean}
     */
    get isTypePercentFormatted() {
        return this.columnDef.type === 'percent-formatted';
    }

    /**
     * Returns true if column type is rich-text.
     *
     * @type {boolean}
     */
    get isTypeRichText() {
        return this.columnDef.type === 'rich-text';
    }

    /**
     * Returns true if column type is textarea.
     *
     * @type {boolean}
     */
    get isTypeTextArea() {
        return this.columnDef.type === 'textarea';
    }

    /**
     * Returns true if column type is type with menu.
     *
     * @type {boolean}
     */
    get isTypeWithMenu() {
        return (
            this.isTypeColorPicker ||
            this.isTypeCounter ||
            this.isTypeDateRange ||
            this.isTypeRichText ||
            this.isTypeTextArea ||
            (this.isTypeCombobox && this.isMultiSelect)
        );
    }

    /**
     * Returns the checkbox label when mass edit.
     *
     * @type {string}
     */
    get massEditCheckboxLabel() {
        return `Update ${this.numberOfSelectedRows} selected items`;
    }

    /**
     * Returns true if column is required.
     *
     * @type {boolean}
     */
    get required() {
        return this.columnDef.typeAttributes?.required;
    }

    /**
     * Returns true if column type is a type that needs apply or cancel button for inline editing.
     *
     * @type {boolean}
     */
    get showButtons() {
        return this.isMassEditEnabled || this.isTypeWithMenu;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    focus() {
        this.interactingState.enter();
        if (this.inputableElement) {
            this.inputableElement.focus();
        }
    }

    @api
    getPositionedElement() {
        return this.template.querySelector('section');
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    cancelEdition() {
        this.triggerEditFinished({
            reason: 'edit-canceled'
        });
    }

    comboboxFormattedValue(value) {
        return value.length <= 1 ? value[0] || null : value;
    }

    dateRangeFormattedValue(value) {
        const { startDate, endDate } = value;
        return { startDate, endDate };
    }

    dispatchCellChangeEvent(state) {
        const dirtyValues = state.inlineEdit.dirtyValues;

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

    focusLastElement() {
        this.template.querySelector('[data-form-last-element="true"]').focus();
    }

    handleCellKeydown(event) {
        const { key } = event;

        if (key === keyValues.escape) {
            // Esc key
            event.stopPropagation();
            this.cancelEdition();
        }
    }

    handleEditFormSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        if (!this.isMassEditEnabled && !this.isTypeColorPicker) {
            this.processSubmission();
        }
        return false;
    }

    handleFormStartFocus() {
        this.interactingState.enter();

        if (this.isMassEditEnabled) {
            // on mass edit the panel dont loses the focus with the keyboard.
            this.focusLastElement();
        } else {
            this.triggerEditFinished({
                reason: 'tab-pressed-prev'
            });
        }
    }

    handleFormEndsFocus() {
        this.interactingState.enter();

        if (this.isMassEditEnabled) {
            // on mass edit the panel dont loses the focus with the keyboard.
            this.focus();
        } else {
            this.triggerEditFinished({
                reason: 'tab-pressed-next'
            });
        }
    }

    handleMassEditCheckboxClick() {
        if (this.inputableElement) {
            this.inputableElement.focus();
        }
    }

    handlePanelLoosedFocus() {
        if (this.isTypePercentFormatted && this.visible) {
            this.processSubmission();
        } else if (this.visible) {
            this.triggerEditFinished({
                reason: 'lost-focus'
            });
        }
    }

    handleTypeElemBlur() {
        if (this.visible && !this.template.activeElement && this._allowBlur) {
            this.interactingState.leave();
        }
    }

    handleTypeElemFocus() {
        this.interactingState.enter();
    }

    handleTypeElemMouseLeave() {
        this._allowBlur = true;
    }

    handleTypeElemMouseEnter() {
        this._allowBlur = false;
    }

    processOnChange = (event) => {
        if (event.detail.validity) {
            this.triggerEditFinished({
                reason: 'on-change',
                validity: event.detail.validity
            });
        } else {
            this.inputableElement.showHelpMessageIfInvalid();
        }
    };

    processSubmission() {
        if (this.value === this.editedValue) {
            this.triggerEditFinished({
                reason: 'edit-canceled'
            });
            return;
        }
        const validity =
            this.isTypeRichText || this.inputableElement.validity.valid;
        this.triggerEditFinished({ reason: 'submit-action', validity });
        const value = this.isTypeCombobox
            ? this.comboboxFormattedValue(this.value)
            : this.value;

        const detail = {
            rowKeyValue: this.rowKeyValue,
            colKeyValue: this.colKeyValue,
            value: this.isTypeDateRange
                ? this.dateRangeFormattedValue(this.value)
                : value,
            callbacks: {
                dispatchCellChangeEvent: this.dispatchCellChangeEvent.bind(this)
            }
        };

        if (validity) {
            this.dispatchEvent(
                new CustomEvent('privateeditcustomcell', {
                    detail,
                    bubbles: true,
                    composed: true
                })
            );
        } else {
            this.inputableElement.showHelpMessageIfInvalid();
        }
    }

    triggerEditFinished(detail) {
        const details = {
            rowKeyValue: detail.rowKeyValue || this.rowKeyValue,
            colKeyValue: detail.colKeyValue || this.colKeyValue,
            valid: this.isTypeRichText ? true : detail.validity,
            isMassEditChecked: this.isMassEditChecked,
            isMassEditEnabled: this.isMassEditEnabled,
            reason: detail.reason
        };

        if (this.isTypeCombobox) {
            details.value = this.comboboxFormattedValue(this.value);
        } else {
            details.value = this.isTypeDateRange
                ? this.dateRangeFormattedValue(this.value)
                : this.value;
        }

        this.dispatchEvent(
            new CustomEvent('ieditfinishedcustom', {
                detail: details,
                bubbles: true,
                composed: true
            })
        );
    }
}
