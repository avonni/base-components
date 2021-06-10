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
import { classSet } from 'c/utils';
import { normalizeString } from 'c/utilsPrivate';

const VARIANTS = {
    valid: ['default', 'darker', 'success', 'warning', 'error', 'lightest'],
    default: 'default'
};

const BORDER_STYLES = {
    valid: ['solid', 'dashed', 'dotted', 'none'],
    default: 'dotted'
};

const ORIENTATION = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

const DEFAULT_VALUE = 0;

export default class PrimitiveProgressBarReferenceLine extends LightningElement {
    @api label;
    @api thickness;

    _value = DEFAULT_VALUE;
    _variant = VARIANTS.default;
    _borderStyle = BORDER_STYLES.default;
    _orientation = ORIENTATION.default;

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        if (typeof value === 'number') {
            if (value <= 0) {
                this._value = 0;
            } else if (value > 100) {
                this._value = 100;
            } else {
                this._value = value;
            }
        } else this._value = 0;
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    @api
    get borderStyle() {
        return this._borderStyle;
    }

    set borderStyle(borderStyle) {
        this._borderStyle = normalizeString(borderStyle, {
            fallbackValue: BORDER_STYLES.default,
            validValues: BORDER_STYLES.valid
        });
    }

    @api
    get orientation() {
        return this._orientation;
    }

    set orientation(orientation) {
        this._orientation = normalizeString(orientation, {
            fallbackValue: ORIENTATION.default,
            validValues: ORIENTATION.valid
        });
    }

    get isHorizontal() {
        return this._orientation === 'horizontal';
    }

    get computedBadgeClass() {
        return classSet('avonni-progress-bar-reference-line')
            .add({
                'avonni-progress-bar-reference-line_darker':
                    this._variant === 'darker',
                'avonni-progress-bar-reference-line_lightest':
                    this._variant === 'lightest',
                'avonni-progress-bar-reference-line_success':
                    this._variant === 'success',
                'avonni-progress-bar-reference-line_warning':
                    this._variant === 'warning',
                'avonni-progress-bar-reference-line_error':
                    this._variant === 'error'
            })
            .toString();
    }

    get computedOuterClass() {
        return classSet('')
            .add({
                'avonni-progress-bar-marker': this.isHorizontal
            })
            .add({
                'avonni-progress-bar-reference-line-border-style_dashed':
                    this._borderStyle === 'dashed' && this.isHorizontal,
                'avonni-progress-bar-reference-line-border-style_solid':
                    this._borderStyle === 'solid' && this.isHorizontal,
                'avonni-progress-bar-reference-line-border-style_dotted':
                    this._borderStyle === 'dotted' && this.isHorizontal
            })
            .add({
                'avonni-progress-bar-reference-line-border-thickness_x-small':
                    this.thickness === 'x-small' && this.isHorizontal,
                'avonni-progress-bar-reference-line-border-thickness_small':
                    this.thickness === 'small' && this.isHorizontal,
                'avonni-progress-bar-reference-line-border-thickness_large':
                    this.thickness === 'large' && this.isHorizontal
            })
            .add({
                'avonni-progress-bar-reference-line-border-color_darker':
                    this._variant === 'darker',
                'avonni-progress-bar-reference-line-border-color_success':
                    this._variant === 'success',
                'avonni-progress-bar-reference-line-border-color_warning':
                    this._variant === 'warning',
                'avonni-progress-bar-reference-line-border-color_error':
                    this._variant === 'error',
                'avonni-progress-bar-reference-line-border-color_lightest':
                    this._variant === 'lightest'
            })
            .add({
                'avonni-progress-bar-marker-vertical': !this.isHorizontal
            })
            .add({
                'avonni-progress-bar-reference-line-border-vertical-style_dashed':
                    this._borderStyle === 'dashed' && !this.isHorizontal,
                'avonni-progress-bar-reference-line-border-vertical-style_solid':
                    this._borderStyle === 'solid' && !this.isHorizontal,
                'avonni-progress-bar-reference-line-border-vertical-style_dotted':
                    this._borderStyle === 'dotted' && !this.isHorizontal
            })
            .add({
                'avonni-progress-bar-reference-line-border-thickness-vertical_x-small':
                    this.thickness === 'x-small' && !this.isHorizontal,
                'avonni-progress-bar-reference-line-border-thickness-vertical_small':
                    this.thickness === 'small' && !this.isHorizontal,
                'avonni-progress-bar-reference-line-border-thickness-vertical_large':
                    this.thickness === 'large' && !this.isHorizontal
            })
            .add({
                'avonni-progress-bar-reference-line-border-vertical-color_darker':
                    this._variant === 'darker',
                'avonni-progress-bar-reference-line-border-vertical-color_success':
                    this._variant === 'success',
                'avonni-progress-bar-reference-line-border-vertical-color_warning':
                    this._variant === 'warning',
                'avonni-progress-bar-reference-line-border-vertical-color_error':
                    this._variant === 'error',
                'avonni-progress-bar-reference-line-border-vertical-color_lightest':
                    this._variant === 'lightest'
            })
            .toString();
    }

    get computedStyle() {
        return this.isHorizontal
            ? `width: ${this._value}%`
            : `height: ${this._value}%`;
    }
}
