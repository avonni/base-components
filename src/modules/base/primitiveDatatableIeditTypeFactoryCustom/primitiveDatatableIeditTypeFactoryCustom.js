import { LightningElement, api } from 'lwc';
import ColorPickerTpl from './colorPicker.html';
import ComboboxTpl from './combobox.html';
import counterTpl from './counter.html';
import dateRangeTpl from './dateRange.html';
import percentFormatted from './percentFormatted.html';
import richTextTpl from './richText.html';
import textareaTpl from './textarea.html';
import DefaultTpl from './default.html';

const CUSTOM_TYPES_TPL = {
    'color-picker': ColorPickerTpl,
    combobox: ComboboxTpl,
    counter: counterTpl,
    'date-range': dateRangeTpl,
    'percent-formatted': percentFormatted,
    'rich-text': richTextTpl,
    textarea: textareaTpl
};

const INVALID_TYPE_FOR_EDIT =
    'column custom type not supported for inline edit';

export default class PrimitiveDatatableIeditTypeFactoryCustom extends LightningElement {
    @api editedValue;
    @api isMassEditEnabled;
    @api required;

    // shared attributes
    @api disabled;
    @api label;
    @api name;
    @api placeholder;
    @api type;

    // color picker attributes
    @api colors;
    @api hideColorInput;
    @api menuAlignment;
    @api menuIconName;
    @api menuIconSize;
    @api menuVariant;
    @api opacity;

    // combobox attributes
    @api dropdownLength;
    @api isMultiSelect;
    _options;

    // counter attributes
    @api max;
    @api min;
    // ...also shared with percent-formatted:
    @api step;

    // date-range attributes
    @api dateStyle;
    @api labelEndDate;
    @api labelStartDate;
    @api timeStyle;
    @api timezone;
    _startDate;
    _endDate;

    // rich-text attributes
    @api variant;
    _formats;

    // textarea attributes
    @api maxLength;
    @api minLength;

    render() {
        return CUSTOM_TYPES_TPL[this.columnType] || DefaultTpl;
    }

    connectedCallback() {
        this._blurHandler = this.handleComponentBlur.bind(this);
        this._focusHandler = this.handleComponentFocus.bind(this);
        this._changeHandler = this.handleComponentChange.bind(this);
        this.getComboboxOptionsEvent();
        this.getRichTextFormatsEvent();
    }

    renderedCallback() {
        if (!this.concreteComponent) return;
        this.concreteComponent.addEventListener('change', this._changeHandler);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get columnDef() {
        return this._columnDef;
    }
    set columnDef(value) {
        // eslint-disable-next-line no-prototype-builtins
        if (!CUSTOM_TYPES_TPL.hasOwnProperty(value.type)) {
            throw new Error(INVALID_TYPE_FOR_EDIT);
        }
        this._columnDef = value;
        this.columnLabel = value.label;
    }

    @api
    get endDate() {
        return typeof this.editedValue === 'object'
            ? this.editedValue.endDate
            : undefined;
    }
    set endDate(value) {
        this._endDate = value;
    }

    @api
    get formats() {
        return this._formats;
    }
    set formats(value) {
        this._formats = value;
    }

    @api
    get options() {
        return this._options;
    }
    set options(options) {
        this._options = options;
    }

    @api
    get startDate() {
        return typeof this.editedValue === 'object'
            ? this.editedValue.startDate
            : undefined;
    }
    set startDate(value) {
        this._startDate = value;
    }

    @api
    get validity() {
        return this.concreteComponent.validity;
    }

    @api
    get value() {
        return this.concreteComponent.value;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Gets the data inputable element.
     *
     * @type {Element}
     */
    get concreteComponent() {
        return this.template.querySelector('[data-inputable="true"]');
    }

    get columnType() {
        return this.columnDef.type;
    }

    get displayInfo() {
        return {
            primaryField: this.relationshipFieldName
        };
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    focus() {
        this.concreteComponent.focus();
    }

    @api
    showHelpMessageIfInvalid() {
        if (this.columnType !== 'rich-text') {
            this.concreteComponent.showHelpMessageIfInvalid();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    getComboboxOptionsEvent() {
        if (this.columnType !== 'combobox') return;
        this.dispatchEvent(
            new CustomEvent('getcomboboxoptions', {
                detail: {
                    name: this.columnDef.fieldName,
                    callbacks: {
                        getComboboxOptions: this.getComboboxOptions.bind(this)
                    }
                },
                bubbles: true,
                composed: true
            })
        );
    }

    getRichTextFormatsEvent() {
        if (this.columnType !== 'rich-text') return;
        this.dispatchEvent(
            new CustomEvent('getrichtextformats', {
                detail: {
                    name: this.columnDef.fieldName,
                    callbacks: {
                        getRichTextFormats: this.getRichTextFormats.bind(this)
                    }
                },
                bubbles: true,
                composed: true
            })
        );
    }

    getComboboxOptions(options) {
        this._options = options;
    }

    getRichTextFormats(formats) {
        this._formats = formats;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    handleComboboxChange(event) {
        if (this.isMultiSelect || this.isMassEditEnabled) return;
        const valid = this.validity.valid;
        this.dispatchEvent(
            new CustomEvent('inlineeditchange', {
                detail: {
                    value: event.detail.value,
                    validity: valid
                },
                bubbles: true,
                composed: true
            })
        );
    }

    handleComponentBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }

    handleComponentChange() {
        this.showHelpMessageIfInvalid();
    }

    handleComponentFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleLoad() {
        this.concreteComponent.addEventListener('focusout', this._blurHandler);
        this.concreteComponent.addEventListener('focusin', this._focusHandler);
        requestAnimationFrame(() => {
            this.focus();
        });
    }
}
