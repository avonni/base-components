/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import LightningDatatable from 'lightning/datatable';
import { api } from 'lwc';
import { normalizeArray, normalizeString } from 'c/utilsPrivate';

import avatar from './avatar.html';
import avatarGroup from './avatarGroup.html';
import badge from './badge.html';
import checkboxButton from './checkboxButton.html';
import colorPicker from './colorPicker.html';
import combobox from './combobox.html';
import dynamicIcon from './dynamicIcon.html';
import image from './image.html';
import inputCounter from './inputCounter.html';
import inputDateRange from './inputDateRange.html';
import inputToggle from './inputToggle.html';
import progressBar from './progressBar.html';
import progressCircle from './progressCircle.html';
import progressRing from './progressRing.html';
import qrcode from './qrcode.html';
import slider from './slider.html';
import rating from './rating.html';

const CUSTOM_TYPES_ALWAYS_WRAPPED = [
    'avatar',
    'badge',
    'avatar-group',
    'checkbox-button',
    'color-picker',
    'combobox',
    'dynamic-icon',
    'image',
    'input-counter',
    'input-date-range',
    'input-toggle',
    'progress-bar',
    'progress-circle',
    'progress-ring',
    'qrcode',
    'rating',
    'slider'
];

const CUSTOM_TYPES_EDITABLE = [
    'checkbox-button',
    'color-picker',
    'combobox',
    'input-counter',
    'input-date-range',
    'input-toggle',
    'rating',
    'slider'
];

const COLUMN_WIDTHS_MODES = { valid: ['fixed', 'auto'], default: 'fixed' };

const SORT_DIRECTIONS = { valid: ['asc', 'desc'], default: 'desc' };

export default class PrimitiveDatatable extends LightningDatatable {
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
            ],
            standardCellLayout: true
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
            ],
            standardCellLayout: true
        },
        badge: {
            template: badge,
            typeAttributes: ['variant'],
            standardCellLayout: true
        },
        'checkbox-button': {
            template: checkboxButton,
            typeAttributes: ['disabled', 'label', 'name'],
            standardCellLayout: true
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
            ],
            standardCellLayout: true
        },
        combobox: {
            template: combobox,
            typeAttributes: [
                'disabled',
                'dropdownAlignment',
                'dropdownLenght',
                'isMultiSelect',
                'label',
                'placeholder',
                'options'
            ],
            standardCellLayout: true
        },
        'dynamic-icon': {
            template: dynamicIcon,
            typeAttributes: ['alternativeText', 'option'],
            standardCellLayout: true
        },
        image: {
            template: image,
            typeAttributes: [
                'alt',
                'blank',
                'blankColor',
                'height',
                'rounded',
                'sizes',
                'srcset',
                'thumbnail',
                'width'
            ]
        },
        'input-counter': {
            template: inputCounter,
            typeAttributes: ['disabled', 'label', 'max', 'min', 'name', 'step'],
            standardCellLayout: true
        },
        'input-date-range': {
            template: inputDateRange,
            typeAttributes: [
                'dateStyle',
                'disabled',
                'label',
                'labelStartDate',
                'labelEndDate',
                'timeStyle',
                'timezone',
                'type'
            ],
            standardCellLayout: true
        },
        'input-toggle': {
            template: inputToggle,
            typeAttributes: [
                'disabled',
                'hideMark',
                'label',
                'messageToggleActive',
                'messageToggleInactive',
                'name',
                'size'
            ],
            standardCellLayout: true
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
                'color',
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
            ],
            standardCellLayout: true
        },
        slider: {
            template: slider,
            typeAttributes: ['disabled', 'label', 'max', 'min', 'size', 'step']
        }
    };

    connectedCallback() {
        super.connectedCallback();

        this.template.addEventListener(
            'privateeditcustomcell',
            this.handleEditCell
        );

        this.template.addEventListener(
            'privateavatarclick',
            this.handleDispatchEvents
        );

        this.template.addEventListener(
            'privateactionclick',
            this.handleDispatchEvents
        );
    }

    renderedCallback() {
        super.renderedCallback();

        this._data = JSON.parse(JSON.stringify(normalizeArray(super.data)));

        if (!this.rendered) {
            this.columnsWidthWithoutHeader();
        }

        this.columnsWidth();
        this.tableWidth();
        this.cancelScrollable();

        this.computeEditableOption();

        // Make sure custom edited cells stay yellow on hover
        // Make sure error cells appear edited and with a red border
        const edited = Array.from(
            this.template.querySelectorAll('td.slds-is-edited')
        );
        const error = Array.from(
            this.template.querySelectorAll('td.slds-has-error')
        );
        const editCells = edited.concat(error);

        editCells.forEach((cell) => {
            cell.classList.add('slds-cell-edit');
        });

        this.rendered = true;
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.template.removeEventListener(
            'privateeditcustomcell',
            this.handleEditCell
        );
    }

    @api
    get columns() {
        return super.columns;
    }

    set columns(value) {
        super.columns = value;

        this._columns = JSON.parse(JSON.stringify(this._columns));
        this.removeWrapOption();
        this.computeEditableOption();
    }

    @api
    columnsWidth() {
        this._columnsWidth = JSON.parse(
            JSON.stringify(normalizeArray(super.widthsData.columnWidths))
        );
        console.log(this._columnsWidth);
        return this._columnsWidth;
    }

    @api
    columnsWidthWithoutHeader() {
        const columnsWidthWithoutHeader = [];
        const row = this.template.querySelector('tbody > tr');
        const everything = row.querySelectorAll('td, th');
        everything.forEach((cell) => {
            columnsWidthWithoutHeader.push(cell.offsetWidth);
        });
        return columnsWidthWithoutHeader;
    }

    @api
    columnsEditable() {
        const columns = [];
        this.columns.forEach((column) => {
            columns.push(column.editable);
        });
        return columns;
    }

    @api
    isDatatableEditable() {
        const columns = [];
        this.columns.forEach((column) => {
            columns.push(column.editable);
        });
        return columns.filter(Boolean).length > 0;
    }

    @api
    tableWidth() {
        this._tableWidth = JSON.parse(
            JSON.stringify(super.widthsData.tableWidth)
        );
        return this._tableWidth;
    }

    cancelScrollable() {
        const scrollable = this.template.querySelector(
            '.slds-table_header-fixed_container'
        );
        scrollable.style.overflowX = 'hidden';
        scrollable.style.width = `${this._tableWidth}px`;
        scrollable.style.maxWidth = 'none';
    }

    // Normalization of primitive datatable attributes
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

    @api
    get wrapTextMaxLines() {
        return super.wrapTextMaxLines;
    }

    set wrapTextMaxLines(value) {
        if (value === undefined) return;
        super.wrapTextMaxLines = value;
    }

    @api
    get loadMoreOffset() {
        return super.loadMoreOffset;
    }

    set loadMoreOffset(value) {
        if (value === undefined) return;
        super.loadMoreOffset = value;
    }

    @api
    get maxColumnWidth() {
        return super.maxColumnWidth;
    }

    set maxColumnWidth(value) {
        if (value === undefined) return;
        super.maxColumnWidth = value;
    }

    @api
    get minColumnWidth() {
        return super.minColumnWidth;
    }

    set minColumnWidth(value) {
        if (value === undefined) return;
        super.minColumnWidth = value;
    }

    @api
    get resizeStep() {
        return super.resizeStep;
    }

    set resizeStep(value) {
        if (value === undefined) return;
        super.resizeStep = value;
    }

    @api
    get rowNumberOffset() {
        return super.rowNumberOffset;
    }

    set rowNumberOffset(value) {
        if (value === undefined) return;
        super.rowNumberOffset = value;
    }

    @api
    get maxRowSelection() {
        return super.maxRowSelection;
    }

    set maxRowSelection(value) {
        if (value === undefined) return;
        super.maxRowSelection = value;
    }

    @api
    get selectedRows() {
        return super.selectedRows;
    }

    set selectedRows(value) {
        if (value === undefined) return;
        super.selectedRows = value;
    }

    removeWrapOption() {
        this.columns.forEach((column) => {
            if (CUSTOM_TYPES_ALWAYS_WRAPPED.includes(column.type)) {
                column.wrapText = true;
                column.hideDefaultActions = true;
            }
        });
    }

    computeEditableOption() {
        if (this.columns && this._data) {
            this.columns.forEach((column) => {
                // If the data type is editable,
                // Transform the value into an object containing the editable property
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

        const cellChange = { [rowKeyValue]: { [colKeyValue]: value } };

        this.dispatchEvent(
            new CustomEvent('cellchange', {
                detail: {
                    draftValues: this.getChangesForCustomer(
                        this.state,
                        cellChange
                    )
                }
            })
        );
        // Show yellow background and save/cancel button
        super.updateRowsState(this.state);
    };

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

    getColumnsChangesForCustomer(state, changes) {
        return Object.keys(changes).reduce((result, colKey) => {
            const columns = state.columns;
            const columnIndex = state.headerIndexes[colKey];

            result[columns[columnIndex].fieldName] = changes[colKey];

            return result;
        }, {});
    }

    getChangesForCustomer(state, changes) {
        const keyField = state.keyField;
        return Object.keys(changes).reduce((result, rowKey) => {
            const rowChanges = this.getColumnsChangesForCustomer(
                state,
                changes[rowKey]
            );

            if (Object.keys(rowChanges).length > 0) {
                rowChanges[keyField] = rowKey;
                result.push(rowChanges);
            }
            return result;
        }, []);
    }

    @api
    save(event) {
        super.handleInlineEditSave(event);
    }

    @api
    cancel(event) {
        super.handleInlineEditCancel(event);
    }
}
