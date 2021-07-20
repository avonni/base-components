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
import { normalizeArray } from 'c/utilsPrivate';
import {
    count,
    countUnique,
    sum,
    average,
    median,
    max,
    min,
    mode
} from './summarizeFunctions';

import avatar from './avatar.html';
import avatarGroup from './avatarGroup.html';
import badge from './badge.html';
import checkboxButton from './checkboxButton.html';
import colorPicker from './colorPicker.html';
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
    'input-counter',
    'input-date-range',
    'input-toggle',
    'rating',
    'slider'
];

const SUMMARIZATIONS = [
    'count',
    'countUnique',
    'sum',
    'average',
    'median',
    'min',
    'max',
    'mode'
];

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
            ],
            standardCellLayout: true
        },
        'avatar-group': {
            template: avatarGroup,
            typeAttributes: ['layout', 'maxCount', 'size', 'variant'],
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

    _currencyArray = [];
    _numberArray = [];
    _percentArray = [];
    rendered = false;

    _countArray = [];
    _sumArray = [];
    _countUniqueArray = [];
    _averageArray = [];
    _medianArray = [];
    _maxArray = [];
    _minArray = [];
    _modeArray = [];

    connectedCallback() {
        super.connectedCallback();

        this.template.addEventListener(
            'privateeditcustomcell',
            this.handleEditCell
        );
        console.log('Count', this._countArray);
        console.log('Count Unique', this._countUniqueArray);
        console.log('Sum', this._sumArray);
        console.log('Average', this._averageArray);
        console.log('Median', this._medianArray);
        console.log('Max', this._maxArray);
        console.log('Min', this._minArray);
        console.log('Mode', this._modeArray);
    }

    renderedCallback() {
        super.renderedCallback();

        this._data = JSON.parse(JSON.stringify(normalizeArray(super.data)));
        this.computeEditableOption();

        if (!this.rendered) {
            this.computeSummarizationNumber();
            this.computeSummarizationCurrency();
            this.computeSummarizationPercent();
        }

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

    computeSummarizationCurrency() {
        if (this.columns && this._data) {
            this.columns.forEach((column) => {
                const summarizeTypes = column.summarizeTypes;
                if (
                    'currency'.includes(column.type) &&
                    SUMMARIZATIONS.some((i) => summarizeTypes.includes(i))
                ) {
                    const fieldName = column.fieldName;
                    this._data.forEach((row) => {
                        const value = row[fieldName];
                        row[fieldName] = {
                            value: value
                        };
                        this._currencyArray.push(value);
                    });
                    this.summarizations(
                        this._currencyArray,
                        column.summarizeTypes,
                        'currency'
                    );
                }
            });
        }
    }

    computeSummarizationNumber() {
        if (this.columns && this._data) {
            this.columns.forEach((column) => {
                const summarizeTypes = column.summarizeTypes;
                if (
                    'number'.includes(column.type) &&
                    SUMMARIZATIONS.some((i) => summarizeTypes.includes(i))
                ) {
                    const fieldName = column.fieldName;
                    this._data.forEach((row) => {
                        const value = row[fieldName];
                        row[fieldName] = {
                            value: value
                        };
                        this._numberArray.push(value);
                    });
                    this.summarizations(
                        this._numberArray,
                        summarizeTypes,
                        'number'
                    );
                }
            });
        }
    }

    computeSummarizationPercent() {
        if (this.columns && this._data) {
            this.columns.forEach((column) => {
                const summarizeTypes = column.summarizeTypes;
                if (
                    'percent'.includes(column.type) &&
                    SUMMARIZATIONS.some((i) => summarizeTypes.includes(i))
                ) {
                    const fieldName = column.fieldName;
                    this._data.forEach((row) => {
                        const value = row[fieldName];
                        row[fieldName] = {
                            value: value
                        };
                        this._percentArray.push(value);
                    });
                    this.summarizations(
                        this._percentArray,
                        summarizeTypes,
                        'percent'
                    );
                }
            });
        }
    }

    summarizations(array, summarizationTypes, type) {
        if (summarizationTypes.includes('count')) {
            this._countArray.push({ [type]: count(array) });
        }
        if (summarizationTypes.includes('countUnique')) {
            this._countUniqueArray.push({
                [type]: countUnique(array, count(array))
            });
        }
        if (summarizationTypes.includes('sum')) {
            this._sumArray.push({ [type]: sum(array) });
        }
        if (summarizationTypes.includes('average')) {
            this._averageArray.push({ [type]: average(array) });
        }
        if (summarizationTypes.includes('median')) {
            this._medianArray.push({ [type]: median(array) });
        }
        if (summarizationTypes.includes('max')) {
            this._maxArray.push({ [type]: max(array) });
        }
        if (summarizationTypes.includes('min')) {
            this._minArray.push({ [type]: min(array) });
        }
        if (summarizationTypes.includes('mode')) {
            this._modeArray.push({ [type]: mode(array) });
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

        // Show yellow background and save/cancel button
        super.updateRowsState(this.state);
    };
}
