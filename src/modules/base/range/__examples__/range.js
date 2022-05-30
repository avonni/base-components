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

import Component from 'avonni/range';

customElements.define('ac-base-range', Component.CustomElementConstructor);

export const Range = ({
    label,
    size,
    type,
    variant,
    unit,
    unitAttributes,
    valueLower,
    valueUpper,
    pin,
    tickMarkStyle,
    showTickMarks,
    min,
    max,
    step,
    disabled,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenStepMismatch,
    messageWhenValueMissing,
    messageWhenTooLong,
    messageWhenBadInput,
    messageWhenPatternMismatch,
    messageWhenTypeMismatch
}) => {
    const element = document.createElement('ac-base-range');
    element.label = label;
    element.size = size;
    element.type = type;
    element.variant = variant;
    element.unit = unit;
    element.unitAttributes = unitAttributes || [];
    element.valueLower = valueLower;
    element.valueUpper = valueUpper;
    element.pin = pin;
    element.tickMarkStyle = tickMarkStyle;
    element.showTickMarks = showTickMarks;
    element.min = min || 0;
    element.max = max || 100;
    element.step = step || 1;
    element.disabled = disabled;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenStepMismatch = messageWhenStepMismatch;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.messageWhenTooLong = messageWhenTooLong;
    element.messageWhenBadInput = messageWhenBadInput;
    element.messageWhenPatternMismatch = messageWhenPatternMismatch;
    element.messageWhenTypeMismatch = messageWhenTypeMismatch;
    return element;
};
