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

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
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
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked'],
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
    _showTickMarks = false;
    _disableSwap = false;
    _tickMarkStyle = TICK_MARK_STYLES.default;
    _minimumDistance = DEFAULT_MIN;
    _removeTrack = false;

    _helpMessage;
    _resizeObserver;
    _moveEventWait = false;
    _progressInterval = [DEFAULT_MIN, (DEFAULT_MAX - DEFAULT_MIN) / 2];
    _customLabels = [];

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
        if (!this.resizeObserver) {
            this._resizeObserver = this.initResizeObserver();
        }
        if (!this._rendered) {
            this.progressValues = this._values;
            if (this.hasCustomLabels) {
                this.displayCustomLabels();
            }
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
     * The value of the range. If an array is passed, many thumbs will displayed on slider.
     * Returns a number if one value, returns an array if many values (array is always returned in ascending order).
     *
     * @type {string}
     * @public
     * @default 0
     */
    @api
    get value() {
        if (this._values.length !== 1) {
            return [...this._values].sort((a, b) => a - b);
        }
        return this._values[0];
    }

    set value(value) {
        if (!isNaN(Number(value))) {
            this._values[0] = Math.min(
                Math.max(Number(value), this.min),
                this.max
            );
        } else {
            this._values = [];
            normalizeArray(value, 'number').forEach((val) => {
                this._values.push(Math.min(Math.max(val, this.min), this.max));
            });
            this._values = this._values.sort((a, b) => a - b);
            if (this._values.length > 2) {
                this._removeTrack = true;
            }
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
     * Computed bubble class styling.
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
     * Computed custom label class styling.
     *
     * @type {string}
     */
    get computedCustomLabelClass() {
        return classSet('').add({
            'avonni-range__custom-label_horizontal': this.isHorizontal,
            'avonni-range__custom-label_vertical': !this.isHorizontal
        });
    }
    /**
     * Computed custom label container class styling.
     *
     * @type {string}
     */
    get computedCustomLabelContainerClass() {
        return classSet('').add({
            'avonni-range__custom-label-container_horizontal':
                this.isHorizontal,
            'avonni-range__custom-label-container_vertical': !this.isHorizontal,
            'avonni-range__custom-label-container_close':
                this._tickMarkStyle !== 'tick',
            [`avonni-range__container-vertical-size_${this._size}`]:
                !this.isHorizontal
        });
    }
    /**
     * Computed input class styling.
     */
    get computedInputClass() {
        return classSet('slds-slider__range').add({
            'avonni-range__slider': true
        });
    }

    get computedSpacerClass() {
        return classSet(`avonni-range__container-vertical-size_${this._size}`);
    }

    /**
     * Computed right bubble class styling.
     *
     * @type {string}
     */
    get computedUnitContainerClass() {
        const isHorizontal = this.type === 'horizontal';
        return classSet('avonni-range__unit-container').add({
            'avonni-range__unit-container_ticks-horizontal':
                isHorizontal &&
                this.showAnyTickMarks &&
                this.tickMarkStyle !== 'tick',
            'avonni-range__unit-container_ticks-horizontal-tick':
                isHorizontal &&
                this.showAnyTickMarks &&
                this.tickMarkStyle === 'tick'
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

    /**
     * Verify if range is horizontal.
     *
     * @type {boolean}
     */
    get isHorizontal() {
        return this._type === 'horizontal';
    }
    /**
     * Verify if range is vertical and does not have custom labels.
     *
     * @type {boolean}
     */
    get isNormalVertical() {
        return this._type === 'vertical' && !this.hasCustomLabels;
    }
    /**
     * Verify if range is vertical and does not have custom labels.
     *
     * @type {boolean}
     */
    get isNormalHorizontal() {
        return this._type !== 'vertical' && !this.hasCustomLabels;
    }

    /**
     * Verify if the range has custom labels.
     *
     * @type {boolean}
     */
    get hasCustomLabels() {
        return this._customLabels.length !== 0 && this._unit === 'custom';
    }
    /**
     * Verify if the range has custom labels and does not want to show ticks.
     *
     * @type {boolean}
     */
    get hasOnlyCustomLabels() {
        return this.hasCustomLabels && !this._showTickMarks;
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Displays and positions the custom labels for the range
     */
    displayCustomLabels() {
        const customLabelNodes = this.template.querySelectorAll(
            `${'.avonni-range__custom-label-wrapper'}`
        );
        const totalWidth = !this.isHorizontal
            ? this.template.querySelector('[data-element-id="spacer"]')
                  .clientHeight -
              2 * INPUT_THUMB_RADIUS
            : this.template.querySelector(
                  '[data-element-id="custom-label-container"]'
              ).clientWidth;
        customLabelNodes.forEach((element, index) => {
            let value = this._customLabels[index].value;
            if (!this.isHorizontal) {
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
    drawRuler() {
        const ruler = this.template.querySelector('[data-element-id="ruler"]');
        ruler.querySelectorAll('*').forEach((child) => {
            child.remove();
        });
        const totalWidth = ruler.clientWidth;
        const numberOfSteps = (this.max - this.min) / this.step;
        const stepWidth = (totalWidth - INPUT_THUMB_RADIUS * 2) / numberOfSteps;
        let leftPosition = INPUT_THUMB_RADIUS;

        switch (this._tickMarkStyle) {
            case 'inner-tick':
                this.drawInnerTickRuler(numberOfSteps, leftPosition, stepWidth);
                break;
            case 'tick':
                this.drawTickRuler(numberOfSteps, leftPosition, stepWidth);
                break;
            case 'dot':
                this.drawDotRuler(numberOfSteps, leftPosition, stepWidth);
                break;
            default:
                this.drawInnerTickRuler(numberOfSteps, leftPosition, stepWidth);
                break;
        }
    }

    /**
     * draws the tick marks for inner-tick style
     */
    drawInnerTickRuler(numberOfSteps, leftPosition, stepWidth) {
        const ruler = this.template.querySelector('[data-element-id="ruler"]');

        // square slider edges
        const upperEdgePos = numberOfSteps * stepWidth;
        for (let i = 0; i < 2; i++) {
            let line = document.createElementNS(SVG_NAMESPACE, 'rect');
            line.setAttribute('fill', '#ffffff');
            line.setAttribute('height', `15`);
            line.setAttribute('width', `5`);
            line.setAttribute(
                'x',
                `${i === 0 ? leftPosition - 5 : leftPosition + upperEdgePos}`
            );
            line.setAttribute('y', '10');
            ruler.appendChild(line);
        }

        // drawTicks
        for (let i = 0; i < numberOfSteps + 1; i++) {
            const valueOfStep = (i / numberOfSteps) * (this.max - this.min);

            const isColored =
                this._progressInterval[0] <= valueOfStep &&
                valueOfStep <= this._progressInterval[1];
            let isMajorStep = i === 0 || i === numberOfSteps;
            if (this.hasCustomLabels) {
                isMajorStep =
                    isMajorStep ||
                    this._customLabels.some(
                        (customLabel) => customLabel.value === i + this.min
                    );
            }
            if (this.showOnlyMajorTicks && !isMajorStep) {
                leftPosition += stepWidth;
                continue;
            }
            let line = document.createElementNS(SVG_NAMESPACE, 'line');
            line.setAttribute(
                'stroke',
                `${isColored ? this.highlightColor : '#ecebea'}`
            );
            line.setAttribute('height', `15`);
            line.setAttribute('width', `5`);
            line.setAttribute('x1', `${leftPosition}`);
            line.setAttribute('y1', `${isMajorStep ? 10.65 : 11.3}`);
            line.setAttribute('x2', `${leftPosition}`);
            line.setAttribute('y2', `${isMajorStep ? 22.65 : 22}`);
            ruler.appendChild(line);
            leftPosition += stepWidth;
        }
    }

    /**
     * draws the tick marks for tick style
     */
    drawTickRuler(numberOfSteps, leftPosition, stepWidth) {
        const ruler = this.template.querySelector('[data-element-id="ruler"]');

        for (let i = 0; i < numberOfSteps + 1; i++) {
            let isMajorStep = i === 0 || i === numberOfSteps;
            if (this.hasCustomLabels) {
                isMajorStep =
                    isMajorStep ||
                    this._customLabels.some(
                        (customLabel) => customLabel.value === i + this.min
                    );
            }
            if (this.showOnlyMajorTicks && !isMajorStep) {
                leftPosition += stepWidth;
                continue;
            }
            let line = document.createElementNS(SVG_NAMESPACE, 'line');
            line.setAttribute('stroke', `${isMajorStep ? 'black' : 'gray'}`);
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

    /**
     * draws the tick marks for dot style
     */
    drawDotRuler(numberOfSteps, leftPosition, stepWidth) {
        const ruler = this.template.querySelector('[data-element-id="ruler"]');

        for (let i = 0; i < numberOfSteps + 1; i++) {
            const valueOfStep = (i / numberOfSteps) * (this.max - this.min);
            const isColored =
                this._progressInterval[0] <= valueOfStep &&
                valueOfStep <= this._progressInterval[1];
            let isMajorStep = i === 0 || i === numberOfSteps;
            if (this.hasCustomLabels) {
                isMajorStep =
                    isMajorStep ||
                    this._customLabels.some(
                        (customLabel) => customLabel.value === i + this.min
                    );
            }
            if (this.showOnlyMajorTicks && !isMajorStep) {
                leftPosition += stepWidth;
                continue;
            }
            let circle = document.createElementNS(SVG_NAMESPACE, 'circle');
            circle.setAttribute('fill', `${isColored ? '#ffffff' : '#979797'}`);
            circle.setAttribute('cx', `${leftPosition}`);
            circle.setAttribute('cy', '16.4');
            circle.setAttribute('r', '1.2');
            ruler.appendChild(circle);
            leftPosition += stepWidth;
        }
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
                this.drawRuler();
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
     * Get the percentage associated to a value of the range
     * @param value
     * @type {number}
     */
    getPercentOfValue(value) {
        return (value - this.min) / (this.max - this.min);
    }

    /**
     * Handle any slider value change.
     *
     * @param {Event} event
     */
    handleChange(event) {
        this.updateInputRange(event);
        this.setBubblePosition(event);
        this.changeRange();
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
        for (let i = 0; i < this._values.length; i++) {
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
        for (let i = 0; i < this._values.length; i++) {
            if (inputPos.indexOf(closestX) === i) {
                this.getInput(i).classList.add('avonni-range__slider_above');
            } else {
                this.getInput(i).classList.remove('avonni-range__slider_above');
            }
        }
    }

    /**
     * Display bubble.
     */
    showBubble(event) {
        if (this._pin) {
            this.setBubblePosition(event);
            this.template
                .querySelector(
                    `[data-group-name="bubble"][data-index="${event.target.dataset.index}"]`
                )
                .classList.add('avonni-range__bubble_visible');
        }
    }

    /**
     * Hide right bubble.
     */
    hideBubble(event) {
        if (this._pin) {
            this.template
                .querySelector(
                    `[data-group-name="bubble"][data-index="${event.target.dataset.index}"]`
                )
                .classList.remove('avonni-range__bubble_visible');
        }
    }

    /**
     * Calculate Bubbles position.
     */
    setBubblePosition(event) {
        if (this._pin) {
            let bubble = this.template.querySelector(
                `[data-group-name="bubble"][data-index="${event.target.dataset.index}"]`
            );
            let bubbleProgress =
                this.getPercentOfValue(
                    this._values[parseInt(event.target.dataset.index, 10)]
                ) * 100;
            bubble.firstChild.firstChild.value =
                this._values[parseInt(event.target.dataset.index, 10)];

            bubble.style.left =
                'calc(' +
                bubbleProgress +
                '% - ' +
                (bubbleProgress * 0.16 + 8) +
                'px)';
        }
    }

    /**
     * Updates the input range values based on its current value.
     *
     * @param {Event} event
     */
    updateInputRange(event) {
        let newValues = [...this._values];
        const targetIndex = parseInt(event.target.dataset.index, 10);
        newValues[targetIndex] = parseInt(event.target.value, 10);
        if (this._disableSwap) {
            this.manageCollisions(targetIndex, newValues);
        }
        this.progressValues = newValues;
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

    set progressValues(values) {
        for (let i = 0; i < this._values.length; i++) {
            this.getInput(i).value = values[i];
            this.values[i] = values[i];
        }
        if (this._removeTrack) {
            this._progressInterval = [this.min - 1, this.min - 1];
            return;
        }
        if (this._values.length >= 2) {
            const lowestValue = Math.max(...[Math.min(...values), this.min]);
            this._progress.style.left =
                this.getPercentOfValue(lowestValue) * 100 + '%';
            this._progressInterval[0] = lowestValue - this.min;
        } else {
            this._progress.style.left = '0%';
            this._progressInterval[0] = this.min;
        }
        const highestValue = Math.min(...[Math.max(...values), this.max]);
        this._progress.style.right =
            100 - this.getPercentOfValue(highestValue) * 100 + '%';
        this._progressInterval[1] = highestValue - this.min;
        if (this.showAnyTickMarks) {
            this.drawRuler();
        }
    }

    /**
     * Update slider values.
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
                value: this._value
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
