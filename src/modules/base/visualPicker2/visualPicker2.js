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
import { classSet, generateUUID } from 'c/utils';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

const VISUAL_PICKER_VARIANTS = {
    valid: ['coverable', 'non-coverable'],
    default: 'non-coverable'
};
const INPUT_TYPES = { valid: ['radio', 'checkbox'], default: 'radio' };
const VISUAL_PICKER_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large'],
    default: 'medium'
};
const VISUAL_PICKER_RATIOS = {
    valid: ['1-by-1', '4-by-3', '16-by-9', '3-by-4', '9-by-16'],
    default: '1-by-1'
};

const DEFAULT_REQUIRED = false;
const DEFAULT_DISABLED = false;
const DEFAULT_HIDE_CHECK_MARK = false;

/**
 * @class
 * @descriptor avonni-visual-picker
 * @storyId example-visualpicker--base
 * @public
 */
export default class VisualPicker extends LightningElement {
    /**
     * Array of items with attributes populating the visual picker.
     *
     * @type {object[]}
     * @public
     */
    @api items = [];
    /**
     * Text label to title the visual picker.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Optional message to be displayed when no checkbox is selected and the required attribute is set.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;
    /**
     * The name of the visual picker.
     *
     * @type {string}
     * @public
     * @required
     */
    @api name = generateUUID();

    _disabled = DEFAULT_DISABLED;
    _hideCheckMark = DEFAULT_HIDE_CHECK_MARK;
    _ratio = VISUAL_PICKER_RATIOS.default;
    _required = DEFAULT_REQUIRED;
    _size = VISUAL_PICKER_SIZES.default;
    _value = [];
    _variant = VISUAL_PICKER_VARIANTS.default;

    renderedCallback() {
        console.log(this.listItems);
    }

    /**
     * If present, the visual picker is disabled.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * If present, hide the check mark.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api get hideCheckMark() {
        return this._hideCheckMark;
    }

    set hideCheckMark(value) {
        this._hideCheckMark = normalizeBoolean(value);
    }

    /**
     * The ratio of the items. Valid values include 1-by-1, 4-by-3 and 16-by-9.
     *
     * @type {string}
     * @public
     * @default 1-by-1
     */
    @api get ratio() {
        return this._ratio;
    }

    set ratio(ratio) {
        this._ratio = normalizeString(ratio, {
            fallbackValue: VISUAL_PICKER_RATIOS.default,
            validValues: VISUAL_PICKER_RATIOS.valid
        });
    }

    /**
     * If present, at least one item must be selected.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api get required() {
        return this._required;
    }

    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * The size of the items. Valid values include xx-small (4rem x 4 rem), x-small (6rem x 6 rem), small (8rem x 8rem), medium and large.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: VISUAL_PICKER_SIZES.default,
            validValues: VISUAL_PICKER_SIZES.valid
        });
    }

    /**
     * Valid values include radio and checkbox.
     *
     * @type {string}
     * @public
     * @default radio
     */
    @api get type() {
        return this._type;
    }

    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: INPUT_TYPES.default,
            validValues: INPUT_TYPES.valid
        });
    }

    /**
     * Value of the selected item. For the checkbox type, the value is an array (Ex: [value1, value2]
     *
     * @type {(string|string[])}
     * @public
     */
    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value instanceof Array ? value : [value];
    }

    /**
     * Changes the appearance of the visual picker. Valid values include coverable, non-coverable and vertical.
     *
     * @type {string}
     * @public
     * @default non-coverable
     */
    @api get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VISUAL_PICKER_VARIANTS.default,
            validValues: VISUAL_PICKER_VARIANTS.valid
        });
    }

    /**
     * Computed list items
     * @type {object[]}
     */
    get listItems() {
        return this.items.map((item, index) => {
            let { title, description, disabled, figure, value } = item;
            const checked = this._value.includes(value);
            const key = `visual-picker-key-${index}`;
            const iconIsTop =
                figure.iconPosition === 'top' &&
                figure.iconName &&
                this.isBiggerThanXSmall;
            const iconIsBottom =
                (figure.iconPosition === 'bottom' && figure.iconName) ||
                this._size === 'x-small' ||
                (this._size === 'xx-small' && figure.iconName);
            const iconIsLeft =
                figure.iconPosition === 'left' &&
                figure.iconName &&
                this.isBiggerThanXSmall;
            const iconIsRight =
                figure.iconPosition === 'right' &&
                figure.iconName &&
                this.isBiggerThanXSmall;
            const imgIsTop = figure.imgPosition === 'top' && figure.imgSrc;
            const imgIsBottom =
                figure.imgPosition === 'bottom' && figure.imgSrc;
            const displayFigureTitle =
                (this.isBiggerThanXSmall && figure.iconName) ||
                !figure.iconName;
            const displayCheckCoverable =
                !this.hideCheckMark && checked && this._variant === 'coverable';
            const displayCheckNonCoverable =
                !this.hideCheckMark &&
                checked &&
                this._variant === 'non-coverable';
            disabled = this._disabled ? true : disabled;

            return {
                key,
                title,
                description,
                disabled,
                figure,
                value,
                checked,
                iconIsTop,
                iconIsBottom,
                iconIsLeft,
                iconIsRight,
                imgIsTop,
                imgIsBottom,
                displayFigureTitle,
                displayCheckCoverable,
                displayCheckNonCoverable
            };
        });
    }

    /**
     * Compute visual picker class styling based on selected attributes. ( orientation, size, ratio)
     *
     * @type {string}
     */
    get visualPickerClass() {
        return classSet('slds-visual-picker')
            .add({
                'avonni-visual-picker_xx-small': this._size === 'xx-small',
                'avonni-visual-picker_x-small': this._size === 'x-small',
                'avonni-visual-picker_small': this._size === 'small',
                'avonni-visual-picker_medium': this._size === 'medium',
                'avonni-visual-picker_large': this._size === 'large',
                'avonni-visual-picker_x-large': this._size === 'x-large'
            })
            .add(`ratio-${this._ratio}`)
            .toString();
    }

    /**
     * Compute visual picker type class styling based on selected attributes.
     *
     * @type {string}
     */
    get visualPickerTypeClass() {
        return classSet(
            'slds-align_absolute-center slds-is-relative avonni-visual-picker__figure'
        )
            .add({
                'slds-visual-picker__text': this._variant === 'non-coverable',
                'slds-visual-picker__icon': this._variant === 'coverable',
                'avonni-hide-check-mark': this._hideCheckMark
            })
            .toString();
    }

    /**
     * Compute selected class styling.
     *
     * @type {string}
     */
    get selectedClass() {
        return this._variant === 'coverable' ? 'slds-is-selected' : '';
    }

    /**
     * Compute NOT selected class styling.
     *
     * @type {string}
     */
    get notSelectedClass() {
        return classSet()
            .add({
                'slds-is-not-selected':
                    this._variant === 'coverable' && !this._hideCheckMark,
                'avonni-is-not-selected':
                    this._variant === 'coverable' && this._hideCheckMark
            })
            .toString();
    }

    get computedBottomIconClass() {
        return classSet('')
            .add({
                'slds-m-top_x-small': this.isBiggerThanXSmall
            })
            .toString();
    }

    get displayTags() {
        return (
            (this._size === 'medium' ||
                this._size === 'large' ||
                this._size === 'x-large') &&
            (this._ratio === '1-by-1' ||
                this._ratio === '4-by-3' ||
                this._ratio === '3-by-4' ||
                this._ratio === '9-by-16')
        );
    }

    get displayImg() {
        return (
            (this._size === 'small' ||
                this._size === 'medium' ||
                this._size === 'large' ||
                this._size === 'x-large') &&
            (this._ratio === '1-by-1' ||
                this._ratio === '4-by-3' ||
                this._ratio === '3-by-4' ||
                this._ratio === '9-by-16')
        );
    }

    get isBiggerThanXSmall() {
        return !(this._size === 'x-small' || this._size === 'xx-small');
    }

    /**
     * Verify if variant is coverable.
     *
     * @type {string}
     */
    get isCoverable() {
        return this._variant === 'coverable';
    }

    /**
     * Change event handler.
     *
     * @param {Event} event
     */
    handleChange(event) {
        event.stopPropagation();

        if (this._variant === 'coverable' && this._hideCheckMark) {
            const labels = this.template.querySelectorAll(
                '[data-element-id="label"]'
            );

            labels.forEach((label) => {
                let icon = label.querySelector('lightning-icon');
                if (label.previousSibling.checked) {
                    icon.variant = 'inverse';
                } else {
                    icon.variant = '';
                }
            });
        }

        const inputs = this.template.querySelectorAll(
            '[data-element-id="input"]'
        );
        const value = Array.from(inputs)
            .filter((input) => input.checked)
            .map((input) => input.value);

        this._value = value;

        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string[]} value The visual picker value.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value
                }
            })
        );
    }
}
