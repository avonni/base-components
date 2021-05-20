import LightningDatatable from 'lightning/datatable';
import { api } from 'lwc';
import { normalizeArray } from 'c/utilsPrivate';

import avatar from './avatar.html';
import avatarGroup from './avatarGroup.html';
import checkboxButton from './checkboxButton.html';
import colorPicker from './colorPicker.html';
import dynamicIcon from './dynamicIcon.html';
import image from './image.html';
import inputCounter from './inputCounter.html';
import inputDateRange from './inputDateRange.html';
import inputToggle from './inputToggle.html';

const CUSTOM_TYPES_ALWAYS_WRAPPED = [
    'avatar',
    'avatar-group',
    'checkbox-button',
    'color-picker',
    'dynamic-icon',
    'image',
    'input-counter',
    'input-date-range',
    'input-toggle',
    'progress-bar',
    'progress-ring',
    'qrcode',
    'range',
    'slider'
];

const CUSTOM_TYPES_EDITABLE = [
    'checkbox-button',
    'color-picker',
    'input-counter',
    'input-date-range',
    'input-toggle',
    'range',
    'rating',
    'slider'
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
        }
    };

    connectedCallback() {
        super.connectedCallback();

        this.template.addEventListener('change', this.dispatchChange);
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.template.removeEventListener('change', this.dispatchChange);
    }

    @api
    get columns() {
        return this._columns;
    }
    set columns(value) {
        super.columns = value;

        this._columns = JSON.parse(JSON.stringify(this._columns));
        this.removeWrapOption();
        this.computeEditableOption();
    }

    @api
    // eslint-disable-next-line @lwc/lwc/valid-api
    get data() {
        return super.data;
    }
    set data(proxy) {
        // Normalize proxy
        this._data = JSON.parse(JSON.stringify(normalizeArray(proxy)));
        this.computeEditableOption();

        super.data = this._data;
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
                    const editable = !!column.editable;

                    this._data.forEach((row) => {
                        const value = row[fieldName];
                        row[fieldName] = {
                            value: value,
                            readOnly: !editable
                        };
                    });
                }
            });
        }
    }

    dispatchChange = (event) => {
        event.stopPropagation();

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: event.detail,
                bubbles: true,
                cancelable: true
            })
        );
    };
}
