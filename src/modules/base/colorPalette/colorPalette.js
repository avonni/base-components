import { LightningElement, api } from 'lwc';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString,
    generateColors
} from 'c/utilsPrivate';
import { classSet, generateUUID } from 'c/utils';
import grid from './grid.html';
import list from './list.html';
import Color from './color';

const DEFAULT_COLORS = [
    '#e3abec',
    '#c2dbf7',
    '#9fd6ff',
    '#9de7da',
    '#9df0bf',
    '#fff099',
    '#fed49a',
    '#d073df',
    '#86b9f3',
    '#5ebbff',
    '#44d8be',
    '#3be281',
    '#ffe654',
    '#ffb758',
    '#bd35bd',
    '#5778c1',
    '#1b96ff',
    '#00aea9',
    '#3bba4c',
    '#f4bc25',
    '#f99120',
    '#580d8c',
    '#001870',
    '#0a2399',
    '#097476',
    '#096a50',
    '#b67d11',
    '#b85d0d'
];

const DEFAULT_TILE_WIDTH = 20;
const DEFAULT_TILE_HEIGHT = 20;

const VARIANTS = {
    default: 'grid',
    valid: ['grid', 'list']
};

/**
 * @class
 * @descriptor avonni-color-palette
 * @storyId example-color-palette--base
 * @public
 */
export default class ColorPalette extends LightningElement {
    _colors = DEFAULT_COLORS;
    _columns;
    _disabled = false;
    _groups = [];
    _hideOutline = false;
    _isLoading = false;
    _readOnly = false;
    _showCheckmark = false;
    _tileWidth = DEFAULT_TILE_WIDTH;
    _tileHeight = DEFAULT_TILE_HEIGHT;
    _value;
    _variant = VARIANTS.default;

    computedGroups = [];
    _isConnected = false;

    connectedCallback() {
        this.initGroups();
        this._isConnected = true;
    }

    renderedCallback() {
        this.initContainer();
    }

    render() {
        return this.variant === 'list' ? list : grid;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of colors displayed in the default palette. Each color can either be a string or a color object.
     *
     * @type {(string[]|object[])}
     * @default [“#e3abec”, “#c2dbf7”, ”#9fd6ff”, ”#9de7da”, ”#9df0bf”, ”#fff099”, ”#fed49a”, ”#d073df”, ”#86b9f3”, ”#5ebbff”, ”#44d8be”, ”#3be281”, ”#ffe654”, ”#ffb758”, ”#bd35bd”, ”#5778c1”, ”#1b96ff”, ”#00aea9”, ”#3bba4c”, ”#f4bc25”, ”#f99120”, ”#580d8c”, ”#001870”, ”#0a2399”, ”#097476”, ”#096a50”, ”#b67d11”, ”#b85d0d”]
     * @public
     */
    @api
    get colors() {
        return this._colors;
    }
    set colors(value) {
        const colors = normalizeArray(value);
        this._colors = colors.length ? colors : DEFAULT_COLORS;

        if (this._isConnected) {
            this.initGroups();
        }
    }

    /**
     * Specifies the number of columns displayed. If unspecified, the tiles spread to the width of the container.
     *
     * @public
     * @type {number}
     */
    @api
    get columns() {
        return this._columns;
    }

    set columns(value) {
        this._columns = Number(value);
        this.initContainer();
    }

    /**
     * If present, the input field is disabled and users cannot interact with it.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);

        if (this._isConnected) {
            this.initGroups();
        }
    }

    /**
     * Array of group objects.
     *
     * @public
     * @type {object[]}
     */
    @api
    get groups() {
        return this._groups;
    }

    set groups(value) {
        this._groups = normalizeArray(value);

        if (this._isConnected) this.initGroups();
    }

    /**
     * If present, the selected outline is hidden.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideOutline() {
        return this._hideOutline;
    }

    set hideOutline(value) {
        this._hideOutline = normalizeBoolean(value);

        if (this._isConnected) {
            this.initGroups();
        }
    }

    /**
     * If present, a spinner is displayed to indicate that data is loading.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);

        if (this._isConnected) {
            this.initGroups();
        }
    }

    /**
     * If present, the palette is read-only and cannot be edited by users.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);

        if (this._isConnected) {
            this.initGroups();
        }
    }

    /**
     * If present, the selected checkmark is shown.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get showCheckmark() {
        return this._showCheckmark;
    }

    set showCheckmark(value) {
        this._showCheckmark = normalizeBoolean(value);

        if (this._isConnected) {
            this.initGroups();
        }
    }

    /**
     * Tile width in px.
     *
     * @public
     * @default 20
     * @type {number}
     */
    @api
    get tileWidth() {
        return this._tileWidth;
    }

    set tileWidth(value) {
        this._tileWidth = Number(value);

        if (this._isConnected) {
            this.initGroups();
        }
    }

    /**
     * Tile height in px.
     *
     * @public
     * @default 20
     * @type {number}
     */
    @api
    get tileHeight() {
        return this._tileHeight;
    }

    set tileHeight(value) {
        this._tileHeight = Number(value);

        if (this._isConnected) {
            this.initGroups();
        }
    }

    /**
     * Specifies the value of an input element.
     *
     * @public
     * @type {string}
     */
    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;

        if (this._isConnected) {
            this.initGroups();
        }
    }

    /**
     * Changes the appearance of the palette. Valid values include grid and list.
     *
     * @public
     * @default grid
     * @type {string}
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * CSS class of the swatch trigger element.
     *
     * @type {string}
     */
    get computedSwatchTriggerClass() {
        return classSet('slds-color-picker__swatch-trigger')
            .add({
                'avonni-color-picker__show-selected-outline':
                    this.variant === 'grid' && !this._hideOutline,
                'avonni-color-picker__show-selected-checkmark':
                    this.variant === 'grid' && this._showCheckmark
            })
            .toString();
    }

    /**
     * Get the current color object.
     */
    get currentColor() {
        return (
            this.colors.find((col) => col.value && col.value === this.value) ||
            {}
        );
    }

    /**
     * CSS class of the group wrapping div.
     *
     * @type {string|undefined}
     */
    get groupClass() {
        return this.computedGroups.length > 1
            ? 'slds-show slds-m-bottom_x-small'
            : undefined;
    }

    /**
     * Generated unique ID key.
     */
    get generateKey() {
        return generateUUID();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the first palette item.
     *
     * @public
     */
    @api
    focus() {
        const link = this.template.querySelector('[data-element-id^="a"]');
        if (link) {
            link.focus();
        }
    }

    /**
     * Clear the value.
     *
     * @public
     */
    @api
    reset() {
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        this.value = '';
        this.dispatchChange(generateColors(''));
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Initialize Palette container.
     */
    initContainer() {
        const container = this.template.querySelector(
            '[data-element-id="div-palette-container"]'
        );
        if (container) {
            container.style.width = this.columns
                ? `${this.columns * (this.tileWidth + 8)}px`
                : '';
            container.style.minHeight = `${this.tileHeight + 8}px`;
        }
    }

    /**
     * Initialize the computed groups, based on the given colors and groups.
     */
    initGroups() {
        const groups = {};
        const undefinedGroup = {
            name: generateUUID(),
            colors: []
        };

        this.colors.forEach((color) => {
            let hasBeenAddedToAGroup = false;
            let computedColor = {
                disabled: this.disabled,
                displayCheckMark: this.showCheckmark,
                hideOutline: this.hideOutline,
                tileHeight: this.tileHeight,
                tileWidth: this.tileWidth
            };

            if (color instanceof Object) {
                const colorGroups = normalizeArray(color.groups);
                computedColor = new Color({
                    ...computedColor,
                    ...color,
                    selected:
                        this.value &&
                        (this.value === color.value ||
                            this.value === color.color)
                });

                if (this.groups.length && colorGroups.length) {
                    colorGroups.forEach((groupName) => {
                        // Make sure the group exists
                        const groupDefinition = this.groups.find(
                            (grp) => grp.name === groupName
                        );

                        if (groupDefinition) {
                            if (!groups[groupName]) {
                                // If the group does not exist yet, create its structure
                                groups[groupName] = {
                                    name: groupName,
                                    label: groupDefinition.label,
                                    colors: []
                                };
                            }
                            groups[groupName].colors.push(computedColor);
                            hasBeenAddedToAGroup = true;
                        }
                    });
                }
            } else {
                computedColor.color = color;
                computedColor.selected = this.value && this.value === color;
                computedColor = new Color(computedColor);
            }
            if (!hasBeenAddedToAGroup) {
                undefinedGroup.colors.push(computedColor);
            }
        });

        // Create the computed groups, in the order of the groups array
        const computedGroups = [];
        this.groups.forEach((group) => {
            if (groups[group.name]) {
                computedGroups.push(groups[group.name]);
            }
        });

        // Add the undefined group at the beginning of the array
        if (undefinedGroup.colors.length) {
            computedGroups.unshift(undefinedGroup);
        }
        this.computedGroups = computedGroups;
    }

    /**
     * Private focus event handler.
     */
    handleFocus(event) {
        event.stopPropagation();

        /**
         * The event fired when the focus is set on the palette.
         *
         * @event
         * @name focus
         * @public
         */
        this.dispatchEvent(new CustomEvent('focus'));

        /**
         * @event
         * @name privatefocus
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('privatefocus', {
                bubbles: true,
                cancelable: true
            })
        );
    }

    /**
     * Blur and private blur event handler.
     */
    handleBlur(event) {
        event.stopPropagation();

        /**
         * The event fired when the focus is removed from the palette.
         * @event
         * @name blur
         * @public
         */
        this.dispatchEvent(new CustomEvent('blur'));

        /**
         * @event
         * @name privateblur
         * @composed
         * @bubbles
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('privateblur', {
                composed: true,
                bubbles: true,
                cancelable: true
            })
        );
    }

    /**
     * Click event handler.
     *
     * @param {object} event
     * @returns {string} value
     */
    handleClick(event) {
        event.preventDefault();
        if (this.disabled || this.readOnly) {
            return;
        }

        const { color, token } = event.currentTarget.dataset;
        // eslint-disable-next-line @lwc/lwc/no-api-reassignments
        this.value = token || color;
        this.dispatchChange(generateColors(color));
    }

    /**
     * Change event handler.
     */
    dispatchChange(colors) {
        if (!this.disabled && !this.readOnly) {
            const color = this.currentColor;
            /**
             * The event fired when the value is changed.
             *
             * @event
             * @public
             * @name change
             * @param {string} hex Color in hexadecimal format.
             * @param {string} hexa Color in hexadecimal format with alpha.
             * @param {string} rgb Color in rgb format.
             * @param {string} rgba Color in rgba format.
             * @param {string} alpha Alpha value of the color.
             * @param {string} label Color label.
             * @param {string} token Token value.
             * @bubbles
             * @cancelable
             */
            this.dispatchEvent(
                new CustomEvent('change', {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        hex: colors.hex,
                        hexa: colors.hexa,
                        rgb: colors.rgb,
                        rgba: colors.rgba,
                        alpha: colors.A,
                        label: color.label,
                        token: color.value
                    }
                })
            );
        }
    }

    /**
     * Double click event handler.
     *
     */
    handleDblClick(event) {
        event.stopPropagation();

        /**
         * The event fired when a color is clicked twice.
         *
         * @event
         * @name colordblclick
         * @public
         * @bubbles
         * @composed
         */
        this.dispatchEvent(
            new CustomEvent('colordblclick', {
                bubbles: true,
                composed: true
            })
        );
    }
}
