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

import { LightningElement, api } from 'lwc';
import {
    normalizeBoolean,
    generateColors
} from 'c/utilsPrivate';
import { generateUniqueId } from 'c/utils';

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
    '#5ebbff',
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
const DEFAULT_COLUMNS = 7;

const TYPES = { valid: ['base', 'list'], default: 'base' };

/**
 * @class
 * @descriptor avonni-color-palette
 * @storyId example-color-gradient--base
 * @public
 */
export default class ColorPalette extends LightningElement {
    /**
     * Specifies the value of an input element.
     * 
     * @public
     * @type {string}
     */
    @api value;

    _type = TYPES.default;
    _colors = DEFAULT_COLORS;
    bundles = [];
    _columns = DEFAULT_COLUMNS;
    _tileWidth = DEFAULT_TILE_WIDTH;
    _tileHeight = DEFAULT_TILE_HEIGHT;
    _disabled = false;
    _isLoading = false;
    _readOnly = false;
    init = false;
    currentLabel;
	currentToken;
	lastTarget;

    renderedCallback() {
        this.initContainer();
    }

    /**
     * Initialize Palette container.
     */
    initContainer() {
        let containerWidth = this.columns * (Number(this.tileWidth) + 8);
        let containerMinHeight = Number(this.tileHeight) + 8;
        let container = this.template.querySelector('.avonni-pallet-container');

        if (container) {
            container.style.width = `${containerWidth}px`;
            container.style.minHeight = `${containerMinHeight}px`;
        }

        [...this.template.querySelectorAll('.slds-swatch')].forEach(
            (element) => {
                if (this.disabled) {
                    element.style.backgroundColor = '#dddbda';
                } else {
                    element.style.backgroundColor = element.parentElement.getAttribute(
                        'item-color'
                    );
                }

                element.style.height = `${this.tileHeight}px`;
                element.style.width = `${this.tileWidth}px`;
            }
        );
    }
    
    @api
    get colors() {
        return this._colors;
    }
    set colors(values) {
        if (!values || values.length === 0) {
            return;
        }

        if (typeof values[0] == 'object') {
            this.bundles = values;
            this._type = 'list';
        } else {
            this._colors = values;
            this._type = 'base';
        }
    }

    /**
     * Specifies the number of columns that will be displayed. 
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
     * Tile width in px.
     * 
     * @public
     * @type {number}
     */
    @api
    get tileWidth() {
        return this._tileWidth;
    }

    set tileWidth(value) {
        this._tileWidth = Number(value);
        this.initContainer();
    }

    /**
     * Tile height in px.
     * 
     * @public
     * @type {number}
     */
    @api
    get tileHeight() {
        return this._tileHeight;
    }

    set tileHeight(value) {
        this._tileHeight = Number(value);
        this.initContainer();
    }

    /**
     * If present, the input field is disabled and users cannot interact with it.
     * 
     * @public
     * @type {boolean}
     * @default false
     */
    @api get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
        this.initContainer();
    }

    /**
     * If present, a spinner is displayed to indicate that data is loading. 
     * 
     * @public
     * @type {boolean}
     * @default false
     */
    @api get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
        this.initContainer();
    }

    /**
     * If present, the palette is read-only and cannot be edited by users.
     * 
     * @public
     * @type {boolean}
     * @default false
     */
    @api get readOnly() {
        return this._readOnly;
    }

    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
        this.initContainer();
    }

    /**
     * Generate unique Key ID.
     */
    get uniqKey() {
        return generateUniqueId();
    }

    get isBase() {
        return this._type === 'base';
    }

    get isList() {
        return this._type === 'list';
    }

    /**
     * Clears the color value of the ColorPalette.
     * 
     * @public
     */
    @api
    reset() {
        this.value = '';
        this.dispatchChange();
    }

    /**
     * Private focus event handler.
     */
    handleFocus() {
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
    handleBlur() {
        /**
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

	preventD(event){
		event.preventDefault();
	}

    /**
     * Click event handler.
     * 
     * @param {object} event 
     * @returns {string} value 
     */
    handleClick(event) {
        if (this.disabled || this.readOnly) {
            event.preventDefault();
            return;
        }

		if(this.lastTarget!=undefined){
			this.lastTarget.children[0].classList.remove('slds-is-selected');
		}

		let currentTarget = event.currentTarget;
		currentTarget.children[0].classList.add('slds-is-selected');
        this.value = currentTarget.getAttribute('item-color');
		this.currentLabel = currentTarget.getAttribute('item-label');
		this.currentToken = currentTarget.getAttribute('item-token');
		this.lastTarget = currentTarget;
        event.preventDefault();
        this.dispatchChange();
    }

    /**
     * Change event handler.
     */
    dispatchChange() {
        let colors = generateColors(this.value);

        if (!this.disabled && !this.readOnly) {
            /**
             * @event
             * @public
             * @name change
             * @param {string} hex Color in hexadecimal format.
             * @param {string} hexa Color in hexadecimal format with alpha.
             * @param {string} rgb Color in rgb format.
             * @param {string} rgba Color in rgba format.
             * @param {string} alpha Alpha value of the color.
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
						label: this.currentLabel,
						token: this.currentToken
                    }
                })
            );
        }
    }
}
