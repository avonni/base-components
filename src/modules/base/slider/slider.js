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
    normalizeString,
    normalizeArray,
    normalizeObject
} from 'c/utilsPrivate';
import { classSet, generateUUID } from 'c/utils';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_STEP = 1;

const SLIDER_SIZES = {
    valid: ['x-small', 'small', 'medium', 'large', 'full'],
    default: 'full'
};
const SLIDER_TYPES = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};
const LABEL_VARIANTS = {
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked'],
    default: 'standard'
};
const SLIDER_UNITS = {
    valid: ['decimal', 'currency', 'percent', 'custom'],
    default: 'decimal'
};

export default class Slider extends LightningElement {
    /**
     * Text label to describe the range.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Error message to be displayed when a range overflow is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenRangeOverflow;
    /**
     * Error message to be displayed when a range underflow is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenRangeUnderflow;
    /**
     * Error message to be displayed when a step mismatch is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenStepMismatch;
    /**
     * Error message to be displayed when the value is missing.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;
    /**
     * Error message to be displayed when the value is too long.
     *
     * @type {string}
     * @public
     */
    @api messageWhenTooLong;
    /**
     * Error message to be displayed when a bad input is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenBadInput;
    /**
     * Error message to be displayed when a pattern mismatch is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenPatternMismatch;
    /**
     * Error message to be displayed when a type mismatch is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenTypeMismatch;

    _disabled = false;
    _max = DEFAULT_MAX;
    _min = DEFAULT_MIN;
    _pin = false;
    _size = SLIDER_SIZES.default;
    _step = DEFAULT_STEP;
    _type = SLIDER_TYPES.default;
    _unit = SLIDER_UNITS.default;
    _values = [(DEFAULT_MAX - DEFAULT_MIN) / 2];
    _variant = LABEL_VARIANTS.default;
    _unitAttributes = {};

    _helpMessage;
    _isFirstInput = true;
    _moveEventWait = false;

    _rendered = false;

    constructor() {
        super();
        this.template.addEventListener('mousemove', (event) => {
            if (!this._moveEventWait) {
                this.setClosestOnTop(event);
                this._moveEventWait = true;
                // after a fraction of a second, allow events again
                setTimeout(() => {
                    this._moveEventWait = false;
                }, 50);
            }
        });
    }

    renderedCallback() {
        if (!this._rendered) {
            this.initRange();
            this._rendered = true;
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the slider is disabled and users cannot interact with it.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * The minimum value of the input range.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get min() {
        return this._min;
    }

    set min(value) {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            this._min = intValue;
        }
    }

    /**
     * The maximum value of the input range.
     *
     * @type {number}
     * @public
     * @default 100
     */
    @api
    get max() {
        return this._max;
    }

    set max(value) {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            this._max = intValue;
        }
    }

    /**
     * If present, a pin containing the value is shown when the knob is pressed.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get pin() {
        return this._pin;
    }

    set pin(value) {
        this._pin = normalizeBoolean(value);
    }

    /**
     * Size of the slider. Accepted values are full, x-small, small, medium, and large.
     *
     * @type {string}
     * @public
     * @default full
     */
    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: SLIDER_SIZES.default,
            validValues: SLIDER_SIZES.valid
        });
    }

    /**
     * The step increment value of the input range. Example steps include 0.1, 1, or 10.
     *
     * @type {number}
     * @public
     * @default 1
     */
    @api
    get step() {
        return this._step;
    }

    set step(value) {
        this._step = Number(value);
    }

    /**
     * The type determines the orientation of the slider. Accepted values are vertical and horizontal.
     *
     * @type {string}
     * @public
     * @default horizontal
     */
    @api
    get type() {
        return this._type;
    }

    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: SLIDER_TYPES.default,
            validValues: SLIDER_TYPES.valid
        });
    }

    /**
     * Format the value displayed. Valid values include decimal, currency and percent.
     *
     * @type {string}
     * @public
     * @default decimal
     */
    @api
    get unit() {
        if (this._unit === 'custom') return SLIDER_UNITS.default;
        return this._unit;
    }
    set unit(unit) {
        this._unit = normalizeString(unit, {
            fallbackValue: SLIDER_UNITS.default,
            validValues: SLIDER_UNITS.valid
        });
    }
    /**
     * Object containing selected fields for the unit type (currencyCode, currencyDisplayAs, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, customLabels).
     *
     * @type {object}
     * @public
     * @default
     */
    @api
    set unitAttributes(value) {
        if (value && value.customLabels) {
            this._customLabels = normalizeArray(value.customLabels, 'object');
        } else this._unitAttributes = normalizeObject(value);
    }
    get unitAttributes() {
        return this._unitAttributes;
    }
    @api
    get customLabels() {
        return this._customLabels;
    }

    /**
     * Represents the validity states of the slider inputs, with respect to constraint validation.
     *
     * @public
     */
    @api
    get validity() {
        return (
            this._constraintLeft.validity +
            ', ' +
            this._constraintRight.validity
        );
    }

    /**
     * The value of the range.
     *
     * @type {string}
     * @public
     * @default 0
     */
    @api
    get value() {
        if (this._values.length !== 1) {
            return this._values;
        }
        return this._values[0];
    }

    set value(value) {
        if (!isNaN(Number(value))) {
            this._values[0] = Number(value);
        } else {
            this._values = [];
            normalizeArray(value, 'number').forEach((val) => {
                this._values.push(val);
            });
            this._values = this._values.sort((a, b) => a - b);
        }
    }

    /**
     * The variant changes the appearance of the slider. Accepted variants include standard and label-hidden.
     *
     * @type {string}
     * @public
     * @default standard
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: LABEL_VARIANTS.default,
            validValues: LABEL_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get values() {
        return this._values;
    }

    /**
     * Computed label class styling.
     *
     * @type {string}
     */
    get computedLabelClass() {
        const classes = classSet('avonni-slider__label');

        classes.add(
            this._variant === 'label-hidden'
                ? 'slds-assistive-text'
                : 'slds-slider-label__label'
        );

        return classes.toString();
    }

    /**
     * Computed container class styling ( size, vertical ).
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet('')
            .add({
                [`avonni-range__container-horizontal-size_${this._size}`]:
                    this._size,
                'avonni-range__vertical': this._type === 'vertical',
                [`avonni-range__container-vertical-size_${this._size}`]:
                    this._size && this._type === 'vertical'
            })
            .toString();
    }

    /**
     * Computed left bubble class styling.
     *
     * @type {string}
     */
    get computedBubbleClass() {
        return classSet('').add({
            'avonni-range__bubble-vertical': this.isVertical,
            'avonni-range__bubble': !this.isVertical
        });
    }

    /**
     * Computed progress class styling.
     *
     * @type {string}
     */
    get computedProgressClass() {
        return classSet('avonni-range__progress').add({
            'avonni-range__progress_disabled': this.disabled
        });
    }

    /**
     * Verify if range is vertical.
     *
     * @type {boolean}
     */
    get isVertical() {
        return this._type === 'vertical';
    }

    get isFirstInput() {
        let boolean = this._isFirstInput;
        this._isFirstInput = false;
        return boolean;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Initialize range cmp.
     */
    initRange() {
        this.updateProgressBar(this._values);
    }

    /**
     * Handle any slider value change.
     *
     * @param {Event} event
     */
    handleChange(event) {
        this.setBubblePosition(event);
        this.updateInputRange(event);
        this.changeRange();
    }

    /**
     * If left slider is closer to mouse, adds a class which puts it above the right.
     *
     * @param {Event} event
     */
    setClosestOnTop(event) {
        let total = this.getInput(0).clientWidth;
        let inputPos = [];
        // get all X positions of input thumbs
        for (let i = 0; i < this._values.length; i++) {
            inputPos[i] =
                total *
                (parseInt(this.getInput(i).value - this.min, 10) /
                    (this.max - this.min));
        }

        // find closestX from mouse from input pos
        let closestX = inputPos.reduce((previous, current) => {
            return Math.abs(current - event.offsetX) <
                Math.abs(previous - event.offsetX)
                ? current
                : previous;
        });

        // set classes accordingly
        for (let i = 0; i < this._values.length; i++) {
            if (inputPos.indexOf(closestX) === i) {
                this.getInput(i).classList.add('avonni-range__slider_above');
            } else {
                this.getInput(i).classList.remove('avonni-range__slider_above');
            }
        }
    }

    /**
     * Display left bubble.
     */
    showBubble(event) {
        if (this._pin) {
            this.setBubblePosition(event);
            this.template
                .querySelector('[data-element-id="bubble"]')
                .classList.add('avonni-range__bubble_visible');
        }
    }

    /**
     * Hide right bubble.
     */
    hideBubble() {
        if (this._pin) {
            this.template
                .querySelector('[data-element-id="bubble"]')
                .classList.remove('avonni-range__bubble_visible');
        }
    }

    /**
     * Calculate Bubbles position.
     */
    setBubblePosition(event) {
        if (this._pin) {
            let bubble = this.template.querySelector(
                '[data-element-id="bubble"]'
            );
            let bubbleProgress =
                ((parseInt(event.target.value, 10) - this.min) /
                    (this.max - this.min)) *
                100;
            bubble.firstChild.firstChild.value = event.target.value;

            bubble.style.left =
                'calc(' +
                bubbleProgress +
                '% - ' +
                (bubbleProgress * 0.16 + 8) +
                'px)';
        }
    }

    /**
     * Updates the input range values based on its current value. Also handle the collision if two slider are equal.
     *
     * @param {Event} event
     */
    updateInputRange(event) {
        let newValues = [...this.values];
        const sliderIndex = event.target.dataset.index;
        newValues[sliderIndex] = parseInt(this.getInput(sliderIndex).value, 10);
        this.updateProgressBar(newValues);
    }

    updateProgressBar(values) {
        for (let i = 0; i < this.values.length; i++) {
            this.getInput(i).value = values[i];
            this._values[i] = values[i];
        }
        if (this._values.length === 2) {
            this._progress.style.left =
                ((Math.min(...values) - this.min) / (this.max - this.min)) *
                    100 +
                '%';
        } else {
            this._progress.style.left = '0%';
        }
        this._progress.style.right =
            100 -
            ((Math.max(...values) - this.min) / (this.max - this.min)) * 100 +
            '%';
    }

    /**
     * Update range upper and lower values.
     */
    changeRange() {
        /**
         * The event fired when the range value changed.
         *
         * @event
         * @name change
         * @param {number} value The value of the range.
         * @public
         */
        const selectedEvent = new CustomEvent('change', {
            detail: {
                value: this.value
            }
        });

        this.dispatchEvent(selectedEvent);
    }

    /**
     *  Returns the progress bar html element.
     */
    get _progress() {
        return this.template.querySelector('[data-element-id="progress-bar"]');
    }

    /**
     *  Returns the input html element.
     */
    getInput(index) {
        return this.template.querySelector(
            `[data-group-name="input"][data-index="${index}"]`
        );
    }

    get generateKey() {
        return generateUUID();
    }
}
