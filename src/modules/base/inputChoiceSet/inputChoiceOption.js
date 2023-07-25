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

import { classSet } from 'c/utils';

const POSITION_ICON = {
    TOP: 'top',
    BOTTOM: 'bottom',
    RIGHT: 'right',
    LEFT: 'left'
};

/**
 * Input choice set options
 * @class
 * @param {string} label Label of the option.
 * @param {string} value Value of the option.
 * @param {string} iconName The Lightning Design System name of the icon. Names are written in the format standard:opportunity. The icon is appended to the left of the header label.
 * @param {string} iconPosition The position of the icon with respect to the label. Valid options include left, right, top and bottom. This value defaults to left.
 */
export default class InputChoiceOption {
    constructor(option, value, index) {
        this.label = option.label;
        this.value = option.value;
        this.id = `checkbox-${index}`;
        this.iconName = option.iconName;
        this.iconPosition = option.iconPosition;

        if (value && Array.isArray(value)) {
            this.isChecked = value.includes(option.value);
        } else {
            this.isChecked = value === option.value;
        }
    }

    /**
     * Class of options's icon button.
     *
     * @type {string}
     */
    get computedIconButtonClass() {
        return classSet('')
            .add({
                'slds-align_absolute-center slds-m-top_x-small':
                    this.iconPosition === POSITION_ICON.TOP,
                'slds-align_absolute-center slds-m-bottom_x-small':
                    this.iconPosition === POSITION_ICON.BOTTOM,
                'slds-m-left_x-small':
                    this.label && this.iconPosition === POSITION_ICON.RIGHT,
                'slds-m-right_x-small':
                    this.label &&
                    (this.iconPosition === POSITION_ICON.LEFT ||
                        !this.iconPosition)
            })
            .toString();
    }

    get computedIconClass() {
        return classSet('slds-p-right_x-small')
            .add({
                'slds-order_0': this.isIconTopLeft,
                'slds-order_2': this.isIconBottomRight
            })
            .toString();
    }

    /**
     * Class of options's label button.
     *
     * @type {string}
     */
    get computedLabelButtonClass() {
        return classSet('slds-checkbox_faux')
            .add({
                'slds-align_absolute-center':
                    this.iconPosition === POSITION_ICON.TOP ||
                    this.iconPosition === POSITION_ICON.BOTTOM
            })
            .toString();
    }

    /**
     * Class of options's button variant.
     *
     * @type {string}
     */
    get computedVariantButton() {
        return this.isChecked ? 'inverse' : 'base';
    }

    /**
     * True if options's icon position is bottom or right.
     *
     * @type {boolean}
     */
    get isIconBottomRight() {
        return (
            this.iconPosition === POSITION_ICON.BOTTOM ||
            this.iconPosition === POSITION_ICON.RIGHT
        );
    }

    /**
     * True if options's icon position is top or left or no icon position or no icon name.
     *
     * @type {boolean}
     */
    get isIconTopLeft() {
        return (
            this.iconPosition === POSITION_ICON.TOP ||
            this.iconPosition === POSITION_ICON.LEFT ||
            !this.iconPosition ||
            !this.iconName
        );
    }
}
