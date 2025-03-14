import LightningDatatable from 'lightning/datatable';
import { api } from 'lwc';
import {
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import {
    getCellValue,
    getCurrentSelectionLength,
    isSelectedRow,
    processInlineEditFinishCustom
} from './inlineEdit';
import avatar from './avatar.html';
import avatarGroup from './avatarGroup.html';
import badge from './badge.html';
import checkboxButton from './checkboxButton.html';
import colorPicker from './colorPicker.html';
import combobox from './combobox.html';
import counter from './counter.html';
import dateRange from './dateRange.html';
import dynamicIcon from './dynamicIcon.html';
import image from './image.html';
import percentFormatted from './percentFormatted.html';
import progressBar from './progressBar.html';
import progressCircle from './progressCircle.html';
import progressRing from './progressRing.html';
import qrcode from './qrcode.html';
import rating from './rating.html';
import richText from './richText.html';
import slider from './slider.html';
import textarea from './textarea.html';
import toggle from './toggle.html';
import urls from './urls.html';

const CUSTOM_TYPES_ALWAYS_WRAPPED = [
    'avatar',
    'avatar-group',
    'checkbox-button',
    'color-picker',
    'counter',
    'dynamic-icon',
    'date-range',
    'image',
    'toggle',
    'percent-formatted',
    'progress-bar',
    'qrcode',
    'rating',
    'slider',
    'urls'
];

const CUSTOM_TYPES_EDITABLE = [
    'checkbox-button',
    'color-picker',
    'combobox',
    'counter',
    'date-range',
    'percent-formatted',
    'rating',
    'rich-text',
    'slider',
    'textarea',
    'toggle'
];

const COLUMNS_TYPES_NON_EDITABLE = [
    'action',
    'avatar',
    'avatar-group',
    'badge',
    'button',
    'button-icon',
    'dynamic-icon',
    'image',
    'location',
    'progress-bar',
    'progress-circle',
    'progress-ring',
    'qrcode',
    'urls'
];

const COLUMN_WIDTHS_MODES = { valid: ['fixed', 'auto'], default: 'fixed' };

const SORT_DIRECTIONS = { valid: ['asc', 'desc'], default: 'desc' };

/**
 * Lightning datatable with custom cell types and extended functionalities.
 *
 * @class
 * @descriptor avonni-datatable
 * @storyId example-datatable--data-types-from-a-to-b
 * @public
 */
export default class Datatable extends LightningDatatable {
    static customTypes = {
        avatar: {
            template: avatar,
            typeAttributes: [
                'alternativeText',
                'entityIconName',
                'entitySrc',
                'fallbackIconName',
                'initials',
                'size',
                'presence',
                'primaryText',
                'secondaryText',
                'status',
                'variant'
            ]
        },
        'avatar-group': {
            template: avatarGroup,
            typeAttributes: [
                'layout',
                'maxCount',
                'size',
                'variant',
                'actionIconName',
                'name'
            ]
        },
        badge: {
            template: badge,
            typeAttributes: ['variant'],
            standardCellLayout: true
        },
        'checkbox-button': {
            template: checkboxButton,
            typeAttributes: ['disabled', 'label', 'name']
        },
        'color-picker': {
            template: colorPicker,
            typeAttributes: [
                'colors',
                'disabled',
                'hideColorInput',
                'label',
                'menuAlignment',
                'menuIconName',
                'menuIconSize',
                'menuVariant',
                'name',
                'opacity',
                'type'
            ]
        },
        combobox: {
            template: combobox,
            typeAttributes: [
                'disabled',
                'dropdownAlignment',
                'dropdownLength',
                'isMultiSelect',
                'placeholder',
                'options'
            ]
        },
        counter: {
            template: counter,
            typeAttributes: ['disabled', 'label', 'max', 'min', 'name', 'step']
        },
        'date-range': {
            template: dateRange,
            typeAttributes: [
                'dateStyle',
                'disabled',
                'label',
                'labelStartDate',
                'labelEndDate',
                'timeStyle',
                'timezone',
                'type'
            ]
        },
        'dynamic-icon': {
            template: dynamicIcon,
            typeAttributes: ['alternativeText', 'option'],
            standardCellLayout: true
        },
        image: {
            template: image,
            typeAttributes: [
                'alternativeText',
                'height',
                'sizes',
                'srcset',
                'thumbnail',
                'width'
            ],
            standardCellLayout: true
        },
        'percent-formatted': {
            template: percentFormatted,
            typeAttributes: [
                'maximumFractionDigits',
                'maximumSignificantDigits',
                'minimumFractionDigits',
                'minimumIntegerDigits',
                'minimumSignificantDigits',
                'step'
            ]
        },
        'progress-bar': {
            template: progressBar,
            typeAttributes: [
                'label',
                'referenceLines',
                'showValue',
                'textured',
                'theme',
                'thickness',
                'valueLabel',
                'valuePrefix',
                'valueSuffix',
                'valuePostion',
                'variant'
            ]
        },
        'progress-ring': {
            template: progressRing,
            typeAttributes: ['direction', 'hideIcon', 'size', 'variant'],
            standardCellLayout: true
        },
        'progress-circle': {
            template: progressCircle,
            typeAttributes: [
                'direction',
                'label',
                'size',
                'thickness',
                'variant'
            ],
            standardCellLayout: true
        },
        qrcode: {
            template: qrcode,
            typeAttributes: [
                'background',
                'borderColor',
                'borderWidth',
                'color',
                'encoding',
                'errorCorrection',
                'padding',
                'size'
            ],
            standardCellLayout: true
        },
        rating: {
            template: rating,
            typeAttributes: [
                'disabled',
                'iconName',
                'iconSize',
                'label',
                'max',
                'min',
                'selection',
                'valueHidden'
            ]
        },
        'rich-text': {
            template: richText,
            typeAttributes: ['disabled', 'formats', 'placeholder', 'variant']
        },
        slider: {
            template: slider,
            typeAttributes: ['disabled', 'label', 'max', 'min', 'size', 'step']
        },
        textarea: {
            template: textarea,
            typeAttributes: ['minLength', 'maxLength', 'placeholder']
        },
        toggle: {
            template: toggle,
            typeAttributes: [
                'disabled',
                'hideMark',
                'label',
                'messageToggleActive',
                'messageToggleInactive',
                'name',
                'size'
            ]
        },
        urls: {
            template: urls,
            typeAttributes: ['urls']
        }
    };

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('privateeditcustomcell', (event) => {
            this.handleEditCell(event);
            if (event.detail.callbacks)
                event.detail.callbacks.dispatchCellChangeEvent(this.state);
        });

        this.template.addEventListener(
            'privateavatarclick',
            this.handleDispatchEvents
        );

        this.template.addEventListener(
            'privateactionclick',
            this.handleDispatchEvents
        );

        this.template.addEventListener(
            'editbuttonclickcustom',
            this.handleEditButtonClickCustom.bind(this)
        );

        this.template.addEventListener(
            'ieditfinishedcustom',
            this.handleInlineEditFinishCustom
        );

        this.template.addEventListener(
            'getdatatablestateandcolumns',
            (event) => {
                event.detail.callbacks.getStateAndColumns(this);
            }
        );
        this.template.addEventListener('getcomboboxoptions', (event) => {
            const fieldName = event.detail.name;
            const column = this._columns.find((c) => c.fieldName === fieldName);
            if (!column) return;

            const options = column.typeAttributes.options;
            // if options is a fieldname, get the options from the data
            if (options?.fieldName) {
                const field = this.state.data[0][options.fieldName];
                event.detail.callbacks.getComboboxOptions(field);
            } else {
                event.detail.callbacks.getComboboxOptions(options);
            }
        });

        this.template.addEventListener('getrichtextformats', (event) => {
            const fieldName = event.detail.name;
            const column = this.columns.find((c) => c.fieldName === fieldName);
            if (!column) return;

            const formats = column.typeAttributes.formats;
            event.detail.callbacks.getRichTextFormats(formats);
        });
    }

    renderedCallback() {
        super.renderedCallback();

        this._data = deepCopy(normalizeArray(super.data));
        this.computeEditableOption();

        if (this.isLoading) {
            const spinner = this.template.querySelector(
                'lightning-primitive-datatable-loading-indicator'
            );
            if (spinner) {
                spinner.style.height = '40px';
            }
        }

        // Make sure custom edited cells stay yellow on hover
        // Make sure error cells appear edited and with a red border
        const tdEdited = Array.from(
            this.template.querySelectorAll('td.slds-is-edited')
        );
        const thEdited = Array.from(
            this.template.querySelectorAll('th.slds-is-edited')
        );
        const error = Array.from(
            this.template.querySelectorAll('td.slds-has-error')
        );
        const editCells = tdEdited.concat(thEdited).concat(error);

        editCells.forEach((cell) => {
            cell.classList.add('slds-cell-edit');
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.template.removeEventListener(
            'privateeditcustomcell',
            this.handleEditCell
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Specifies how column widths are calculated. Set to 'fixed' for columns with equal widths.
     * Set to 'auto' for column widths that are based on the width of the column content and the table width. The default is 'fixed'.
     * @public
     * @type {string}
     * @default fixed
     */
    @api
    get columnWidthsMode() {
        return super.columnWidthsMode;
    }
    set columnWidthsMode(value) {
        super.columnWidthsMode = normalizeString(value, {
            fallbackValue: COLUMN_WIDTHS_MODES.default,
            validValues: COLUMN_WIDTHS_MODES.valid
        });
    }

    /**
     * Array of the columns object that's used to define the data types.
     * Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'.
     * See the Documentation tab for more information.
     * @public
     * @type {array}
     */
    @api
    get columns() {
        return super.columns;
    }
    set columns(value) {
        value = deepCopy(value);
        this.removeWrapOption(value);
        this.removeNonEditableColumns(value);
        this.computeEditableOption(value);
        super.columns = value;

        this._columns = deepCopy(super.columns);
    }

    /**
     * Specifies the default sorting direction on an unsorted column.
     * Valid options include 'asc' and 'desc'. The default is 'asc' for sorting in ascending order.
     * @public
     * @type {string}
     * @default asc
     */
    @api
    get defaultSortDirection() {
        return super.defaultSortDirection;
    }
    set defaultSortDirection(value) {
        super.defaultSortDirection = normalizeString(value, {
            fallbackValue: SORT_DIRECTIONS.default,
            validValues: SORT_DIRECTIONS.valid
        });
    }

    /**
     * The current values per row that are provided during inline edit.
     * @public
     * @type {object}
     */
    @api
    get draftValues() {
        return super.draftValues;
    }
    set draftValues(value) {
        super.draftValues = value;
    }

    /**
     * If present, you can load a subset of data and then display more
     * when users scroll to the end of the table.
     * Use with the onloadmore event handler to retrieve more data.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get enableInfiniteLoading() {
        return super.enableInfiniteLoading;
    }
    set enableInfiniteLoading(value) {
        super.enableInfiniteLoading = normalizeBoolean(value);
    }

    /**
     * Specifies an object containing information about cell level, row level, and table level errors.
     * When it's set, error messages are displayed on the table accordingly.
     * @public
     * @type {object}
     */
    @api
    get errors() {
        return super.errors;
    }
    set errors(value) {
        super.errors = value;
    }

    /**
     * If present, the checkbox column for row selection is hidden.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideCheckboxColumn() {
        return super.hideCheckboxColumn;
    }
    set hideCheckboxColumn(value) {
        super.hideCheckboxColumn = normalizeBoolean(value);
    }

    /**
     * If present, the table header is hidden.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideTableHeader() {
        return super.hideTableHeader;
    }
    set hideTableHeader(value) {
        super.hideTableHeader = normalizeBoolean(value);
    }

    /**
     * If present, a spinner is shown to indicate that more data is loading.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get isLoading() {
        return super.isLoading;
    }
    set isLoading(value) {
        super.isLoading = normalizeBoolean(value);
    }

    /**
     * Required for better performance.
     * Associates each row with a unique ID.
     * @public
     * @type {string}
     * @required
     */
    @api
    get keyField() {
        return super.keyField;
    }
    set keyField(value) {
        super.keyField = value;
    }

    /**
     * Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table.
     * @public
     * @type {number}
     * @default 20
     */
    @api
    get loadMoreOffset() {
        return super.loadMoreOffset;
    }
    set loadMoreOffset(value) {
        if (value === undefined) return;
        super.loadMoreOffset = value;
    }

    /**
     * The maximum width for all columns.
     * @public
     * @type {number}
     * @default 1000px
     */
    @api
    get maxColumnWidth() {
        return super.maxColumnWidth;
    }
    set maxColumnWidth(value) {
        if (value === undefined) return;
        super.maxColumnWidth = value;
    }

    /**
     * The maximum number of rows that can be selected.
     * Checkboxes are used for selection by default, and radio buttons are used when maxRowSelection is 1.
     * @public
     * @type {number}
     */
    @api
    get maxRowSelection() {
        return super.maxRowSelection;
    }
    set maxRowSelection(value) {
        if (
            this.maxRowSelection === 1 &&
            (value === undefined || value === null)
        ) {
            // Patch for a bug in the Lightning Datatable:
            // If the maxRowSelection was 1 and it is removed,
            // the radio buttons are not changed into checkboxes.
            super.maxRowSelection = 2;
        }
        super.maxRowSelection = value;
    }

    /**
     * The minimum width for all columns.
     * @public
     * @type {number}
     * @default 50px
     */
    @api
    get minColumnWidth() {
        return super.minColumnWidth;
    }
    set minColumnWidth(value) {
        if (value === undefined) return;
        super.minColumnWidth = value;
    }

    /**
     * Make widthsData accessible
     * @public
     * @type {object}
     */
    @api
    get primitiveWidthsData() {
        return super.widthsData;
    }

    /**
     * The array of data to be displayed. The objects keys depend on the columns fieldNames.
     * @public
     * @type {array}
     */
    @api
    get records() {
        return super.data;
    }
    set records(value) {
        super.data = normalizeArray(value);
    }

    /**
     * Reserved for internal use.
     * Enables and configures advanced rendering modes.
     * @public
     * @type {RenderManagerConfig} value - config object for datatable rendering
     */
    @api
    get renderConfig() {
        return super.renderConfig;
    }
    set renderConfig(value) {
        super.renderConfig = value;
    }

    /**
     * Reserved for internal use.
     * Allows developer to opt-in to a role-based table.
     * Allowed options - "role-based" or "default"
     * `role-based` -> Renders <div>
     * `default`    -> Renders <table>
     */
    @api
    get renderMode() {
        return super.renderMode;
    }
    set renderMode(value) {
        super.renderMode = value;
    }

    /**
     * If present, column resizing is disabled.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get resizeColumnDisabled() {
        return super.resizeColumnDisabled;
    }
    set resizeColumnDisabled(value) {
        super.resizeColumnDisabled = normalizeBoolean(value);
    }

    /**
     * The width to resize the column when a user presses left or right arrow.
     * @public
     * @type {number}
     * @default 10px
     */
    @api
    get resizeStep() {
        return super.resizeStep;
    }
    set resizeStep(value) {
        if (value === undefined) return;
        super.resizeStep = value;
    }

    /**
     * Determines where to start counting the row number.
     * @public
     * @type {number}
     * @default 0
     */
    @api
    get rowNumberOffset() {
        return super.rowNumberOffset;
    }
    set rowNumberOffset(value) {
        if (value === undefined) return;
        super.rowNumberOffset = value;
    }

    /**
     * Make scrollable x container accessible.
     * @public
     * @type {Element}
     */
    @api
    get scrollerX() {
        return this.template.querySelector('.slds-scrollable_x');
    }

    /**
     * Make scrollable y container accessible.
     * @public
     * @type {Element}
     */
    @api
    get scrollerY() {
        return this.template.querySelector('.slds-scrollable_y');
    }

    /**
     * Enables programmatic row selection with a list of key-field values.
     * @public
     * @type {string[]}
     */
    @api
    get selectedRows() {
        return super.selectedRows;
    }
    set selectedRows(value) {
        if (value === undefined) return;
        super.selectedRows = value;
    }

    /**
     * If present, the row numbers are shown in the first column.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get showRowNumberColumn() {
        return super.showRowNumberColumn;
    }
    set showRowNumberColumn(value) {
        super.showRowNumberColumn = normalizeBoolean(value);
    }

    /**
     * The column key or fieldName that controls the sorting order.
     * Sort the data using the onsort event handler.
     * @public
     * @type {string}
     */
    @api
    get sortedBy() {
        return super.sortedBy;
    }
    set sortedBy(value) {
        super.sortedBy = value;
    }

    /**
     * Specifies the sorting direction. Sort the data using the onsort event handler. Valid options include 'asc' and 'desc'.
     * @public
     * @type {string}
     */
    @api
    get sortedDirection() {
        return super.sortedDirection;
    }
    set sortedDirection(value) {
        super.sortedDirection = normalizeString(value, {
            fallbackValue: SORT_DIRECTIONS.default,
            validValues: SORT_DIRECTIONS.valid
        });
    }

    /**
     * If present, the footer that displays the Save and Cancel buttons is hidden during inline editing.
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get suppressBottomBar() {
        return super.suppressBottomBar;
    }
    set suppressBottomBar(value) {
        super.suppressBottomBar = normalizeBoolean(value);
    }

    /**
     * This value specifies the number of lines after which the content will be cut off and hidden. It must be at least 1 or more.
     * The text in the last line is truncated and shown with an ellipsis.
     * @public
     * @type {integer}
     */
    @api
    get wrapTextMaxLines() {
        return super.wrapTextMaxLines;
    }
    set wrapTextMaxLines(value) {
        if (value === undefined) return;
        super.wrapTextMaxLines = value;
    }

    /**
     * If present, the table header is wrapped.
     * @type {boolean}
     * @default false
     */
    @api
    get wrapTableHeader() {
        return super.wrapTableHeader;
    }
    set wrapTableHeader(value) {
        super.wrapTableHeader = normalizeBoolean(value);
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get wrapText() {
        return this.state.wrapText;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the first cell of a given row.
     *
     * @param {string} rowKeyField The key field value of the row to focus.
     * @public
     */
    @api
    focusRow(rowKeyField) {
        const row = this.template.querySelector(
            `[data-row-key-value="${rowKeyField}"]`
        );
        if (row) {
            const cell = row.querySelector(':first-child');

            if (cell) {
                const colKeyValue = cell.dataset.colKeyValue;
                this.setActiveCell(rowKeyField, colKeyValue);
                this.state.cellClicked = true;
                cell.focus();
            }
        }
    }

    /**
     * Gets a row height.
     *
     * @param {string} rowKeyField The key field value of the row.
     * @returns {number} The height of the row, in pixels.
     * @public
     */
    @api
    getRowHeight(rowKeyField) {
        const row = this.template.querySelector(
            `tr[data-row-key-value="${rowKeyField}"]`
        );

        if (row) {
            return rowKeyField === this.data[0][this.keyField]
                ? row.offsetHeight + 1
                : row.offsetHeight;
        }
        return null;
    }

    /**
     * Calls the resize column method of lightning-datatable.
     *
     * @param {event} event
     * @public
     */
    @api
    resizeColumn(event) {
        super.handleResizeColumn(event);
    }

    /**
     * Sets the height of a row.
     *
     * @param {string} rowKeyField The key field value of the row.
     * @param {number} height The new height of the row, in pixels.
     * @public
     */
    @api
    setRowHeight(rowKeyField, height) {
        const row = this.template.querySelector(
            `tr[data-row-key-value="${rowKeyField}"]`
        );

        if (row) {
            row.style.height = height ? `${height}px` : undefined;
        }
    }

    /**
     * Scroll the inner table to the top.
     *
     * @public
     */
    @api
    scrollToTop(y = 0) {
        const scrollable_y = this.template.querySelector('.slds-scrollable_y');
        if (scrollable_y) {
            scrollable_y.scrollTop = y;
        }
    }

    /**
     * Updates the checkbox column state.
     *
     * @param {boolean} disabled If true, columns are to be disabled.
     * @param {number} nbSelectedRows The number of selected rows.
     * @public
     */
    @api
    updateCheckboxColumn(disabled, nbSelectedRows) {
        const rows = this.state.rows;
        rows.forEach((row) => {
            row.isDisabled = !isSelectedRow(this.state, row.key) && disabled;
        });
        this.updateBulkSelectionState(nbSelectedRows);
    }

    /**
     * Returns data in each selected row.
     *
     * @name getSelectedRows
     * @function
     * @public
     */

    /**
     * Opens the inline edit panel for the datatable's currently active cell. If the active cell is not
     * editable, then the panel is instead opened for the first editable cell in the table. Given two
     * distinct cells, C_x and C_y, C_x is considered "first" in the cell ordering if the following condition
     * evaluates to true:
     *
     * (C_x.rowIndex < C_y.rowIndex) || (C_x.rowIndex === C_y.rowIndex && C_x.columnIndex < C_y.columnIndex)
     *
     * If there is no data in the table or there are no editable cells in the table then calling this function
     * results in a no-op.
     *
     * @name openInlineEdit
     * @function
     * @public
     */

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * If the data type is editable, transforms the value into an object containing the editable property.
     *
     * @param {Array} columns - The array of column definitions.
     */
    computeEditableOption(columns = this._columns) {
        if (columns?.length && this._data?.length) {
            columns.forEach((column) => {
                if (CUSTOM_TYPES_EDITABLE.includes(column.type)) {
                    const fieldName = column.fieldName;
                    this._data.forEach((row) => {
                        const value = row[fieldName];
                        row[fieldName] = {
                            value: value,
                            editable: !!column.editable
                        };
                    });
                }
            });
        }
    }

    /**
     * Returns the bulk selection state of the checkbox column in the table header
     */
    getBulkSelectionState(selected) {
        const total = this.maxRowSelection || this.state.rows.length;
        return selected === 0 ? 'none' : selected === total ? 'all' : 'some';
    }

    /**
     * Adjusts the `editable` attribute of columns based on their type's eligibility for editing.
     *
     * @param {Array} columns - The array of column definitions.
     */
    removeNonEditableColumns(columns) {
        if (!columns) return;
        columns.forEach((column) => {
            if (COLUMNS_TYPES_NON_EDITABLE.includes(column.type)) {
                column.editable = false;
            }
        });
    }

    /**
     * Sets the wrapText and hideDefaultActions attributes to true for custom types that are always wrapped.
     *
     * @param {Array} columns - The array of column definitions.
     */
    removeWrapOption(columns) {
        if (columns) {
            columns.forEach((column) => {
                if (CUSTOM_TYPES_ALWAYS_WRAPPED.includes(column.type)) {
                    column.wrapText = true;
                    column.hideDefaultActions = true;
                }
            });
        }
    }

    /**
     * Updates the bulk selection state of the checkbox column in the table header
     */
    updateBulkSelectionState(selected) {
        const selectBoxesColumnIndex = this.state.columns.findIndex(
            (column) => column.type === 'SELECTABLE_CHECKBOX'
        );
        if (selectBoxesColumnIndex >= 0) {
            this.state.columns[selectBoxesColumnIndex] = {
                ...this.state.columns[selectBoxesColumnIndex],
                bulkSelection: this.getBulkSelectionState(selected)
            };
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS && DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handles the edit button click event of each custom cell type.
     *
     * @param {event} event
     */
    handleEditButtonClickCustom(event) {
        const { colKeyValue, rowKeyValue } = event.detail;
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        const inlineEdit = this.state.inlineEdit;

        inlineEdit.panelVisible = true;
        inlineEdit.rowKeyValue = rowKeyValue;
        inlineEdit.colKeyValue = colKeyValue;
        inlineEdit.editedValue = getCellValue(
            this.state,
            rowKeyValue,
            colKeyValue
        );
        inlineEdit.massEditSelectedRows = getCurrentSelectionLength(this.state);
        inlineEdit.massEditEnabled =
            isSelectedRow(this.state, rowKeyValue) &&
            inlineEdit.massEditSelectedRows > 1;

        const colIndex = this.state.headerIndexes[colKeyValue];
        inlineEdit.columnDef = this.state.columns[colIndex];
        super.state = this.state;
    }

    /**
     * Handles the inline editing event of each custom cell type.
     *
     * @param {event} event
     */
    handleEditCell = (event) => {
        event.stopPropagation();
        const { colKeyValue, rowKeyValue, value } = event.detail;
        const dirtyValues = this.state.inlineEdit.dirtyValues;

        // If no values have been edited in the row yet,
        // create the row object in the state dirty values
        if (!dirtyValues[rowKeyValue]) {
            dirtyValues[rowKeyValue] = {};
        }

        // Add the new cell value to the state dirty values
        dirtyValues[rowKeyValue][colKeyValue] = value;
        if (
            value !== this.state.inlineEdit.editedValue ||
            this.state.inlineEdit.massEditEnabled
        ) {
            // Show yellow background and save/cancel button
            super.updateRowsState(this.state);
        }
    };

    /**
     * Handles the finish of inline editing of custom cell type.
     *
     * @param {event} event
     */
    handleInlineEditFinishCustom = (event) => {
        const {
            reason,
            rowKeyValue,
            colKeyValue,
            value,
            valid,
            isMassEditChecked
        } = event.detail;
        processInlineEditFinishCustom(
            this.state,
            reason,
            rowKeyValue,
            colKeyValue,
            value,
            valid,
            isMassEditChecked
        );
        super.state = this.state;
    };

    /**
     * Dispatches event from the lighnting-datatable.
     *
     * @param {event} event
     */
    handleDispatchEvents(event) {
        event.stopPropagation();
        this.dispatchEvent(
            new CustomEvent(`${event.detail.type}`, {
                detail: event.detail.detail,
                bubbles: event.detail.bubbles,
                composed: event.detail.composed,
                cancelable: event.detail.cancelable
            })
        );
    }
}
