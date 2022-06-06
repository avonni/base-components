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
import { AvonniResizeObserver } from 'c/resizeObserver';
import { FieldConstraintApiWithProxyInput } from 'c/inputUtils';

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const PERCENT_SCALING_FACTOR = 100;
const DEFAULT_STEP = 1;
const INPUT_THUMB_RADIUS = 8.5;

const SLIDER_SIZES = {
    valid: ['x-small', 'small', 'medium', 'large', 'full'],
    default: 'full'
};
const SLIDER_TYPES = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};
const LABEL_VARIANTS = {
    valid: ['standard', 'label-hidden'],
    default: 'standard'
};
const SLIDER_UNITS = {
    valid: ['decimal', 'currency', 'percent', 'custom'],
    default: 'decimal'
};
const TICK_MARK_STYLES = {
    valid: ['inner-tick', 'tick', 'dot'],
    default: 'inner-tick'
};
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

export default class Slider extends LightningElement {
    /**
     * Text label to describe the slider.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Error message to be displayed when a bad input is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenBadInput;
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
     * Error message to be displayed when a type mismatch is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenTypeMismatch;
    /**
     * Error message to be displayed when the value is missing.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;

    _disabled = false;
    _disableSwap = false;
    _max = DEFAULT_MAX;
    _min = DEFAULT_MIN;
    _minimumDistance = DEFAULT_MIN;
    _pin = false;
    _removeTrack = false;
    _showTickMarks = false;
    _size = SLIDER_SIZES.default;
    _step = DEFAULT_STEP;
    _tickMarkStyle = TICK_MARK_STYLES.default;
    _type = SLIDER_TYPES.default;
    _unit = SLIDER_UNITS.default;
    _unitAttributes = {};
    _variant = LABEL_VARIANTS.default;
    _value = (DEFAULT_MAX - DEFAULT_MIN) / 2;

    _computedMax = DEFAULT_MAX;
    _computedMin = DEFAULT_MIN;
    _computedValues = [(DEFAULT_MAX - DEFAULT_MIN) / 2];
    _customLabels = [];
    _helpMessage;
    _moveEventWait = false;
    _previousScalingFactor = 1;
    _progressInterval = [DEFAULT_MIN, (DEFAULT_MAX - DEFAULT_MIN) / 2];
    _resizeObserver;
    _focusedInputIndex;
    _scalingFactor = 1;
    _constraintApis = [];
    _constraintApiProxyInputUpdaters = [];

    _connected = false;
    _domModified = false;
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
        this.template.addEventListener('focusin', (event) => {
            if (event.target.dataset.groupName === 'input') {
                this._focusedInputIndex = event.target.dataset.index;
            }
        });
    }

    connectedCallback() {
        this.scaleValues();
        this.capValues();
        this._connected = true;
    }

    renderedCallback() {
        if (!this.resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }
        if (!this._rendered || this._domModified) {
            this.updateTrack(this._computedValues);
            if (this.hasCustomLabels) {
                this.displayCustomLabels();
            }
            this._rendered = true;
            this._domModified = false;
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
     * If present, the slider thumbs can swap order.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disableSwap() {
        return this._disableSwap;
    }
    set disableSwap(value) {
        this._disableSwap = value;
    }

    /**
     * The maximum value of the input slider.
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
        let intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            this._computedMax = intValue;
            this._max = intValue;
            if (this._connected) {
                this.scaleValues();
            }
        }
    }

    /**
     * The minimum value of the input slider.
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
        let intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            this._computedMin = intValue;
            this._min = intValue;
            if (this._connected) {
                this.scaleValues();
            }
        }
    }

    /**
     * The minimum distance between nodes if there are many.
     *
     * @type {number}
     * @public
     * @default 0
     */
    @api
    get minimumDistance() {
        return this._minimumDistance;
    }
    set minimumDistance(value) {
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            this._minimumDistance = intValue;
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
        this._domModified = true;
    }

    /**
     * If present, track progress is removed.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get removeTrack() {
        return this._removeTrack;
    }
    set removeTrack(value) {
        this._removeTrack = normalizeBoolean(value);
        this._domModified = true;
    }

    /**
     * If present, minor tick marks are displayed at every step.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get showTickMarks() {
        return this._showTickMarks;
    }
    set showTickMarks(value) {
        this._showTickMarks = normalizeBoolean(value);
        this._domModified = true;
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
     * The step increment value of the input slider. Example steps include 0.1, 1, or 10.
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
        this._scalingFactor =
            0 < this._step && this._step < 1 ? 1 / this.step : 1;
        if (this._connected) {
            this.scaleValues();
            this.capValues();
        }
        this._domModified = true;
    }

    /**
     * If present, tick marks are displayed with the according style. Accepted styles are inner-tick, tick, dot.
     *
     * @type {boolean}
     * @public
     * @default inner-tick
     */
    @api
    get tickMarkStyle() {
        return this._tickMarkStyle;
    }
    set tickMarkStyle(value) {
        this._tickMarkStyle = normalizeString(value, {
            fallbackValue: TICK_MARK_STYLES.default,
            validValues: TICK_MARK_STYLES.valid
        });
        this._domModified = true;
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
        return this._unit === 'custom' ? SLIDER_UNITS.default : this._unit;
    }
    set unit(unit) {
        this._unit = normalizeString(unit, {
            fallbackValue: SLIDER_UNITS.default,
            validValues: SLIDER_UNITS.valid
        });
        if (this._unit === 'percent') {
            this._scalingFactor = PERCENT_SCALING_FACTOR;
        }
    }
    /**
     * Object containing selected fields for the unit type (currencyCode, currencyDisplayAs, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, customLabels).
     *
     * @type {object}
     * @public
     * @default
     */
    @api
    get unitAttributes() {
        return this._unitAttributes;
    }
    set unitAttributes(value) {
        if (value && value.customLabels) {
            this._customLabels = normalizeArray(value.customLabels, 'object');
            this._domModified = true;
        }
        this._unitAttributes = normalizeObject(value);
    }

    /**
     * Represents the validity states that an element can be in, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api
    get validity() {
        return this._constraints.reduce((result, nextConstraintApi) => {
            return result && nextConstraintApi.validity;
        }, true);
    }

    /**
     * The value of the slider. If an array is passed, many thumbs will displayed on slider.
     * Returns a number if one value, returns an array if many values (array is always returned in ascending order).
     *
     * @type {string}
     * @public
     * @default 0
     */
    @api
    get value() {
        return this._value;
    }

    set value(value) {
        if (value !== 0 && !value) {
            return;
        }
        if (!isNaN(Number(value))) {
            this._value = [Number(value)];
        } else {
            this._value = [];
            normalizeArray(value, 'number').forEach((val) => {
                this._value.push(val);
            });
        }
        this._value = this._value.sort((a, b) => a - b);
        this._computedValues = [...this._value];
        if (this._connected) {
            this.scaleValues();
            this.capValues();
        }
        this._removeTrack =
            this._computedValues.length > 2 || this._removeTrack;
        this._domModified = true;
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

    /**
     * Computed label class styling.
     *
     * @type {string}
     */
    get computedLabelClass() {
        return classSet('avonni-slider__label').add({
            'slds-slider-label__label': true,
            'slds-hide': this._variant === 'label-hidden'
        });
    }

    /**
     * Computed container class styling ( size, vertical ).
     *
     * @type {string}
     */
    get computedContainerClass() {
        return classSet('')
            .add({
                [`avonni-slider__container-horizontal-size_${this._size}`]:
                    this._size,
                'avonni-slider__vertical': this.isVertical,
                [`avonni-slider__container-vertical-origin_${this._size}`]:
                    this.isVertical
            })
            .toString();
    }

    /**
     * Computed pin class styling.
     *
     * @type {string}
     */
    get computedPinClass() {
        return classSet('').add({
            'avonni-slider__bubble-vertical': this.isVertical,
            'avonni-slider__bubble': !this.isVertical
        });
    }

    /**
     * Computed input class styling.
     *
     * @type {string}
     */
    get computedInputClass() {
        return classSet('slds-slider__range').add({
            'avonni-slider__slider': true,
            'avonni-slider__slider_disabled': this.disabled
        });
    }

    /**
     * Computed progress class styling.
     *
     * @type {string}
     */
    get computedProgressClass() {
        return classSet('avonni-slider__progress').add({
            'avonni-slider__progress_disabled': this.disabled
        });
    }

    /**
     * Computed custom label class styling.
     *
     * @type {string}
     */
    get computedCustomLabelClass() {
        return classSet('').add({
            'avonni-slider__custom-label_horizontal': !this.isVertical,
            'avonni-slider__custom-label_vertical': this.isVertical
        });
    }
    /**
     * Computed custom label container class styling.
     *
     * @type {string}
     */
    get computedCustomLabelContainerClass() {
        const isVertical = this.type === 'vertical';
        return classSet('').add({
            'avonni-slider__custom-label-container_horizontal': !isVertical,
            'avonni-slider__custom-label-container_vertical': isVertical,
            'avonni-slider__custom-label-container_close':
                this._tickMarkStyle !== 'tick',
            [`avonni-slider__container-vertical-size_${this._size}`]: isVertical
        });
    }

    get computedSpacerClass() {
        return classSet(`avonni-slider__container-vertical-size_${this._size}`);
    }

    /**
     * Computed right pin class styling.
     *
     * @type {string}
     */
    get computedUnitContainerClass() {
        return classSet('avonni-slider__unit-container').add({
            'avonni-slider__unit-container_ticks-horizontal':
                !this.isVertical &&
                this.showAnyTickMarks &&
                this.tickMarkStyle !== 'tick',
            'avonni-slider__unit-container_ticks-horizontal-tick':
                !this.isVertical &&
                this.showAnyTickMarks &&
                this.tickMarkStyle === 'tick'
        });
    }

    /**
     * customLabels for display in DOM
     */
    get customLabels() {
        return this._customLabels;
    }

    get generateKey() {
        return generateUUID();
    }

    /**
     * Verify if the slider has custom labels.
     *
     * @type {boolean}
     */
    get hasCustomLabels() {
        return this._customLabels.length !== 0 && this._unit === 'custom';
    }

    /**
     * Returns the color corresponding to highlight (depends on disabled)
     *
     * @type {string}
     */
    get highlightColor() {
        return this.disabled ? '#919191' : '#0176D3';
    }

    /**
     * Verify if slider is vertical.
     *
     * @type {boolean}
     */
    get isVertical() {
        return this._type === 'vertical';
    }

    /**
     * Verify if slider is vertical and does not have custom labels.
     *
     * @type {boolean}
     */
    get isNormalVertical() {
        return this._type === 'vertical' && !this.hasCustomLabels;
    }
    /**
     * Verify if slider is vertical and does not have custom labels.
     *
     * @type {boolean}
     */
    get isNormalHorizontal() {
        return this._type !== 'vertical' && !this.hasCustomLabels;
    }

    /**
     * min for display in DOM
     */
    get privateMin() {
        return this._computedMin;
    }

    /**
     * max for display in DOM
     */
    get privateMax() {
        return this._computedMax;
    }

    /**
     * To show or not the tick marks.
     *
     * @type {boolean}
     */
    get showAnyTickMarks() {
        return this.hasCustomLabels || this._showTickMarks;
    }

    /**
     * To show or not the major tick marks.
     *
     * @type {boolean}
     */
    get showOnlyMajorTicks() {
        return this.hasCustomLabels && !this._showTickMarks;
    }

    /**
     * values for display in DOM
     */
    get values() {
        return this._computedValues;
    }

    /**
     * Compute constraintApis with fieldConstraintApiWithProxyInputs.
     */
    get _constraints() {
        if (this._constraintApis.length === 0) {
            for (let i = 0; i < this._computedValues.length; i++) {
                let constraintApi = new FieldConstraintApiWithProxyInput(
                    () => this
                );

                this._constraintApiProxyInputUpdaters[i] =
                    constraintApi.setInputAttributes({
                        type: () => 'number',
                        value: () => this._computedValues[i],
                        max: () => this.max,
                        min: () => this.min,
                        step: () => this.step,
                        formatter: () => this.unit,
                        disabled: () => this.disabled
                    });

                this._constraintApis[i] = constraintApi;
            }
        }
        return this._constraintApis;
    }

    /**
     *  Returns the progress bar html element.
     */
    get _progress() {
        return this.template.querySelector('[data-element-id="progress-bar"]');
    }

    /**
     *  Returns the tick ruler html element.
     */
    get _ruler() {
        return this.template.querySelector('[data-element-id="ruler"]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Removes keyboard focus from the input element.
     *
     * @public
     */
    @api
    blur() {
        if (this._rendered) {
            this.template
                .querySelectorAll('[data-group-name="input"]')
                .forEach((elem) => {
                    elem.blur();
                });
            this._focusedInputIndex = undefined;
        }
    }

    /**
     * Checks if the input is valid.
     *
     * @returns {boolean} True if the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this._constraints.reduce((result, nextConstraintApi) => {
            return result && nextConstraintApi.checkValidity();
        }, true);
    }

    /**
     * Sets focus on the next input element.
     *
     * @public
     */
    @api
    focus() {
        if (this._rendered) {
            if (!this._focusedInputIndex) {
                this._focusedInputIndex = 0;
            } else {
                this._focusedInputIndex++;
            }
            if (this._focusedInputIndex >= this._computedValues.length) {
                this._focusedInputIndex = 0;
            }
            const inputs = this.template.querySelectorAll(
                '[data-group-name="input"]'
            );
            inputs[this._focusedInputIndex].focus();
            console.log('focused');
        }
    }

    /**
     * Displays the error messages. If the input is valid, reportValidity() clears displayed error messages.
     *
     * @returns {boolean} False if invalid, true if valid.
     * @public
     */
    @api
    reportValidity() {
        this.helpMessage = '';
        return this._constraints.reduce((result, constraintApi, index) => {
            return (
                result &&
                constraintApi.reportValidity((message) => {
                    this.helpMessage += `Slider ${index}: ${message} `;
                })
            );
        }, true);
    }

    /**
     * Sets a custom error message to be displayed when a form is submitted.
     *
     * @param {string} message The string that describes the error. If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this._constraints.forEach((constraintApi) => {
            constraintApi.setCustomValidity(message);
        });
    }

    /**
     * Displays error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when <code>checkValidity()</code> is called.
     *
     * @public
     */
    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    capValues() {
        this._computedValues.forEach((val, index) => {
            this._computedValues[index] = Math.min(
                Math.max(val, this._computedMin),
                this._computedMax
            );
            this._computedValues[index] =
                Math.round(this._computedValues[index] / this._step) *
                this._step;
        });
        this.updatePublicValue();
    }

    /**
     * Update slider values.
     */
    changeSlider() {
        this._updateProxyInputAttributes('value');

        /**
         * The event fired when the slider value changed.
         *
         * @event
         * @name change
         * @param {number} value The value of the slider.
         * @public
         */
        const selectedEvent = new CustomEvent('change', {
            detail: {
                value: this._value
            }
        });

        this.dispatchEvent(selectedEvent);
    }

    /**
     * Displays and positions the custom labels for the slider
     */
    displayCustomLabels() {
        const customLabelNodes = this.template.querySelectorAll(
            `${'.avonni-slider__custom-label-wrapper'}`
        );
        const totalWidth = this.isVertical
            ? this.template.querySelector('[data-element-id="spacer"]')
                  .clientHeight -
              2 * INPUT_THUMB_RADIUS
            : this.template.querySelector(
                  '[data-element-id="custom-label-container"]'
              ).clientWidth;
        customLabelNodes.forEach((element, index) => {
            let value = this._customLabels[index].value;
            if (this.isVertical) {
                element.style.top = `${
                    totalWidth - this.getPercentOfValue(value) * totalWidth
                }px`;
            } else {
                element.style.left = `${
                    this.getPercentOfValue(value) * totalWidth
                }px`;
            }
        });
    }

    /**
     * Draws the tick marks as SVG depending on its style.
     */
    drawRuler(drawPositions = false) {
        const ruler = this._ruler;
        if (drawPositions) {
            ruler.querySelectorAll('*').forEach((child) => {
                child.remove();
            });
        }
        const totalWidth = ruler.clientWidth;
        const numberOfSteps =
            (this._computedMax - this._computedMin) /
            (this.step * this._scalingFactor);
        const stepWidth = (totalWidth - INPUT_THUMB_RADIUS * 2) / numberOfSteps;
        let leftPosition = INPUT_THUMB_RADIUS;

        switch (this._tickMarkStyle) {
            case 'tick':
                this.drawTickRuler(
                    numberOfSteps,
                    leftPosition,
                    stepWidth,
                    drawPositions
                );
                break;
            case 'dot':
                this.drawDotRuler(
                    numberOfSteps,
                    leftPosition,
                    stepWidth,
                    drawPositions
                );
                break;
            default:
                // or when = 'inner-tick'
                this.drawInnerTickRuler(
                    numberOfSteps,
                    leftPosition,
                    stepWidth,
                    drawPositions
                );
                break;
        }
    }

    /**
     * draws the tick marks for inner-tick style
     */
    drawInnerTickRuler(numberOfSteps, leftPosition, stepWidth, drawPositions) {
        const ruler = this._ruler;

        if (drawPositions) {
            // square slider edges
            const upperEdgePos = numberOfSteps * stepWidth;
            let backgroundColor = getComputedStyle(
                this.template.host
            ).getPropertyValue('background-color');
            if (!backgroundColor || backgroundColor === 'rgba(0, 0, 0, 0)') {
                backgroundColor = 'white';
            }
            for (let i = 0; i < 2; i++) {
                let line = document.createElementNS(SVG_NAMESPACE, 'rect');
                line.setAttribute('fill', `${backgroundColor}`);
                line.setAttribute('height', `15`);
                line.setAttribute('width', `5`);
                line.setAttribute(
                    'x',
                    `${
                        i === 0 ? leftPosition - 5 : leftPosition + upperEdgePos
                    }`
                );
                line.setAttribute('y', '10');
                ruler.appendChild(line);
            }
            // drawTicks
            for (let i = 0; i < numberOfSteps + 1; i++) {
                let valueOfStep =
                    (i / numberOfSteps) *
                    (this._computedMax - this._computedMin);
                let isMajorStep = i === 0 || i === numberOfSteps;
                if (this.hasCustomLabels) {
                    isMajorStep =
                        isMajorStep ||
                        this._customLabels.some(
                            (customLabel) =>
                                customLabel.value === i + this._computedMin
                        );
                }
                if (this.showOnlyMajorTicks && !isMajorStep) {
                    leftPosition += stepWidth;
                    continue;
                }
                let line = document.createElementNS(SVG_NAMESPACE, 'line');
                line.setAttribute('height', `15`);
                line.setAttribute('width', `5`);
                line.setAttribute('x1', `${leftPosition}`);
                line.setAttribute('y1', `${isMajorStep ? 10.65 : 11.3}`);
                line.setAttribute('x2', `${leftPosition}`);
                line.setAttribute('y2', `${isMajorStep ? 22.65 : 22}`);
                ruler.appendChild(line);
                line.dataset.tickValue = valueOfStep;
                leftPosition += stepWidth;
            }
        }

        this.template.querySelectorAll('line').forEach((line) => {
            const isColored =
                this._progressInterval[0] <= line.dataset.tickValue &&
                line.dataset.tickValue <= this._progressInterval[1];
            line.setAttribute(
                'stroke',
                `${isColored ? this.highlightColor : '#ecebea'}`
            );
        });
    }

    /**
     * draws the tick marks for tick style
     */
    drawTickRuler(numberOfSteps, leftPosition, stepWidth, drawPositions) {
        if (drawPositions) {
            const ruler = this._ruler;
            for (let i = 0; i < numberOfSteps + 1; i++) {
                let isMajorStep = i === 0 || i === numberOfSteps;
                if (this.hasCustomLabels) {
                    isMajorStep =
                        isMajorStep ||
                        this._customLabels.some(
                            (customLabel) =>
                                customLabel.value === i + this._computedMin
                        );
                }
                if (this.showOnlyMajorTicks && !isMajorStep) {
                    leftPosition += stepWidth;
                    continue;
                }
                let line = document.createElementNS(SVG_NAMESPACE, 'line');
                line.setAttribute(
                    'stroke',
                    `${isMajorStep ? 'black' : 'gray'}`
                );
                line.setAttribute('height', `10`);
                line.setAttribute('width', `5`);
                line.setAttribute('x1', `${leftPosition}`);
                line.setAttribute('y1', '27');
                line.setAttribute('x2', `${leftPosition}`);
                line.setAttribute('y2', `${isMajorStep ? 34 : 32}`);
                ruler.appendChild(line);
                leftPosition += stepWidth;
            }
        }
    }

    /**
     * draws the tick marks for dot style
     */
    drawDotRuler(numberOfSteps, leftPosition, stepWidth, drawPositions) {
        if (drawPositions) {
            const ruler = this._ruler;
            for (let i = 0; i < numberOfSteps + 1; i++) {
                const valueOfStep =
                    (i / numberOfSteps) *
                    (this._computedMax - this._computedMin);
                let isMajorStep = i === 0 || i === numberOfSteps;
                if (this.hasCustomLabels) {
                    isMajorStep =
                        isMajorStep ||
                        this._customLabels.some(
                            (customLabel) =>
                                customLabel.value === i + this._computedMin
                        );
                }
                if (this.showOnlyMajorTicks && !isMajorStep) {
                    leftPosition += stepWidth;
                    continue;
                }
                let circle = document.createElementNS(SVG_NAMESPACE, 'circle');
                circle.setAttribute('cx', `${leftPosition}`);
                circle.setAttribute('cy', '16.4');
                circle.setAttribute('r', '1.2');
                ruler.appendChild(circle);
                circle.dataset.tickValue = valueOfStep;
                leftPosition += stepWidth;
            }
        }
        this.template.querySelectorAll('circle').forEach((circle) => {
            const isColored =
                this._progressInterval[0] <= circle.dataset.tickValue &&
                circle.dataset.tickValue <= this._progressInterval[1];
            circle.setAttribute('fill', `${isColored ? '#ffffff' : '#979797'}`);
        });
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        if (!this.showAnyTickMarks) return null;
        const resizeObserver = new AvonniResizeObserver(() => {
            if (this.showAnyTickMarks) {
                this.drawRuler(true);
            }
            if (this.hasCustomLabels) {
                this.displayCustomLabels();
            }
        });
        resizeObserver.observe(
            this.template.querySelector('[data-element-id="div-wrapper"]')
        );
        return resizeObserver;
    }

    /**
     *  Returns the input html element.
     */
    getInput(index) {
        return this.template.querySelector(
            `[data-group-name="input"][data-index="${index}"]`
        );
    }

    /**
     * Get the percentage associated to a value of the slider
     * @param value
     * @type {number}
     */
    getPercentOfValue(value) {
        return (
            (value - this._computedMin) /
            (this._computedMax - this._computedMin)
        );
    }

    /**
     * Handle any slider value change.
     *
     * @param {Event} event
     */
    handleChange(event) {
        this.updateInputSliders(event);
        if (this._pin) {
            this.setBubblePosition(event);
        }
        this.updatePublicValue();
        this.changeSlider();
    }

    manageCollisions(updatedSliderIndex, newValues) {
        const hasLeftNeighbor = updatedSliderIndex - 1 >= 0;
        const hasRightNeighbor = updatedSliderIndex + 1 < newValues.length;

        let neighborIndex = 0;
        if (hasLeftNeighbor) {
            neighborIndex = updatedSliderIndex - 1;
            if (
                newValues[updatedSliderIndex] - newValues[neighborIndex] <
                this._minimumDistance
            ) {
                newValues[updatedSliderIndex] =
                    newValues[neighborIndex] + this._minimumDistance;
            }
        }
        if (hasRightNeighbor) {
            neighborIndex = updatedSliderIndex + 1;
            if (
                newValues[neighborIndex] - newValues[updatedSliderIndex] <
                this._minimumDistance
            ) {
                newValues[updatedSliderIndex] =
                    newValues[neighborIndex] - this._minimumDistance;
            }
        }
    }

    scaleValues() {
        if (!isNaN(this._value)) {
            this._computedValues = [this._value * this._scalingFactor];
        } else {
            this._computedValues = this._value.map(
                (val) => val * this._scalingFactor
            );
        }
        this._computedMin = this._min * this._scalingFactor;
        this._computedMax = this._max * this._scalingFactor;
    }

    /**
     * If slider is closer to mouse, adds a class which puts it above the others.
     *
     * @param {Event} event
     */
    setClosestOnTop(event) {
        let total = this.getInput(0).clientWidth;
        let inputPos = [];
        // get all X positions of input thumbs
        for (let i = 0; i < this._computedValues.length; i++) {
            inputPos[i] =
                total *
                    this.getPercentOfValue(
                        parseInt(this.getInput(i).value, 10)
                    ) +
                i;
        }

        // find closestX from mouse from input pos
        let closestX = inputPos.reduce((previous, current) => {
            return Math.abs(current - event.offsetX) <
                Math.abs(previous - event.offsetX)
                ? current
                : previous;
        });

        // set classes accordingly
        for (let i = 0; i < inputPos.length; i++) {
            if (inputPos.indexOf(closestX) === i) {
                this.getInput(i).classList.add('avonni-slider__slider_above');
            } else {
                this.getInput(i).classList.remove(
                    'avonni-slider__slider_above'
                );
            }
        }
    }

    /**
     * Display pin.
     */
    showBubble(event) {
        if (this._pin) {
            this.setBubblePosition(event);
            this.template
                .querySelector(
                    `[data-group-name="pin"][data-index="${event.target.dataset.index}"]`
                )
                .classList.add('avonni-slider__bubble_visible');
        }
    }

    /**
     * Hide right pin.
     */
    hideBubble(event) {
        if (this._pin) {
            this.template
                .querySelector(
                    `[data-group-name="pin"][data-index="${event.target.dataset.index}"]`
                )
                .classList.remove('avonni-slider__bubble_visible');
        }
    }

    /**
     * Calculate Bubbles position.
     */
    setBubblePosition(event) {
        let pin = this.template.querySelector(
            `[data-group-name="pin"][data-index="${event.target.dataset.index}"]`
        );
        let bubbleProgress =
            this.getPercentOfValue(
                this._computedValues[parseInt(event.target.dataset.index, 10)]
            ) * PERCENT_SCALING_FACTOR;
        let transformedValue =
            this._computedValues[parseInt(event.target.dataset.index, 10)];
        if (this._scalingFactor !== 1) {
            transformedValue = transformedValue / this._scalingFactor;
        }
        pin.firstChild.firstChild.value = transformedValue;

        pin.style.left =
            'calc(' +
            bubbleProgress +
            '% - ' +
            (bubbleProgress * 0.16 + 8) +
            'px)';
    }

    /**
     * Updates the inputslidervalues based on its current value.
     *
     * @param {Event} event
     */
    updateInputSliders(event) {
        let newValues = [...this._computedValues];
        const targetIndex = parseInt(event.target.dataset.index, 10);
        newValues[targetIndex] = parseInt(event.target.value, 10);
        if (this._disableSwap) {
            this.manageCollisions(targetIndex, newValues);
        }
        this.updateTrack(newValues);
    }

    updatePublicValue() {
        if (this._computedValues.length === 1) {
            this._value = this._computedValues[0] / this._scalingFactor;
        } else {
            this._value = this._computedValues.map(
                (val) => val / this._scalingFactor
            );
            this._value = this._value.sort((a, b) => a - b);
        }
    }

    updateTrack(values) {
        for (let i = 0; i < this._computedValues.length; i++) {
            this.getInput(i).value = values[i];
            this._computedValues[i] = values[i];
        }
        if (this._removeTrack) {
            this._progressInterval = [
                this._computedMin - 1,
                this._computedMin - 1
            ];
            return;
        }
        if (this._computedValues.length >= 2) {
            const lowestValue = Math.max(
                ...[Math.min(...values), this._computedMin]
            );
            this._progress.style.left =
                this.getPercentOfValue(lowestValue) * PERCENT_SCALING_FACTOR +
                '%';
            this._progressInterval[0] = lowestValue - this._computedMin;
        } else {
            this._progress.style.left = '0%';
            this._progressInterval[0] = this._computedMin;
        }
        const highestValue = Math.min(
            ...[Math.max(...values), this._computedMax]
        );
        this._progress.style.right =
            PERCENT_SCALING_FACTOR -
            this.getPercentOfValue(highestValue) * PERCENT_SCALING_FACTOR +
            '%';
        this._progressInterval[1] = highestValue - this._computedMin;
        if (this.showAnyTickMarks) {
            this.drawRuler(!this._rendered || this._domModified);
        }
    }

    /**
     * Proxy Input Attributes updater.
     *
     * @param {object} attributes
     */
    _updateProxyInputAttributes(attributes) {
        if (this._constraintApiProxyInputUpdaters.length === 0) {
            this._constraintApiProxyInputUpdaters.forEach((updater) => {
                updater(attributes);
            });
        }
    }
}
