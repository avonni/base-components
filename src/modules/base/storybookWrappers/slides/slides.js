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

const DEFAULT_SLIDES_PER_VIEW = 1;
const DEFAULT_SPACE_BETWEEN = 0;
const DEFAULT_SPEED = 300;
const DEFAULT_BUTTON_PREVIOUS_ICON_NAME = 'utility:left';
const DEFAULT_BUTTON_NEXT_ICON_NAME = 'utility:right';
const DEFAULT_FRACTION_LABEL = '/';
const DEFAULT_INITIAL_SLIDE = 0
const DEFAULT_SLIDES_DIRECTION = 'horizontal'
const DEFAULT_SLIDES_EFFECT = 'slide'
const DEFAULT_PREVIOUS_ICON_POSITION = 'left'
const DEFAULT_BUTTONS_VARIANT = 'neutral'
const DEFAULT_NEXT_ICON_POSITION = 'right'
const DEFAULT_BUTTON_POSITION = 'middle'
const DEFAULT_INDICATOR_TYPE = 'bullets'
const DEFAULT_INDICATOR_POSITION = 'bottom-center' 


export default class Slides extends LightningElement {
    @api slidesPerView = DEFAULT_SLIDES_PER_VIEW;
    @api spaceBetween = DEFAULT_SPACE_BETWEEN;
    @api autoplayDelay;
    @api speed = DEFAULT_SPEED;
    @api initialSlide = DEFAULT_INITIAL_SLIDE;
    @api buttonPreviousIconName = DEFAULT_BUTTON_PREVIOUS_ICON_NAME;
    @api buttonPreviousLabel;
    @api buttonNextIconName = DEFAULT_BUTTON_NEXT_ICON_NAME;
    @api buttonNextLabel;
    @api fractionPrefixLabel;
    @api fractionLabel = DEFAULT_FRACTION_LABEL;
    @api width;
    @api height;
    @api coverflowSlideWidth;
    @api coverflowSlideHeight;
    @api direction = DEFAULT_SLIDES_DIRECTION;
    @api effect = DEFAULT_SLIDES_EFFECT;
    @api buttonPreviousIconPosition = DEFAULT_PREVIOUS_ICON_POSITION;
    @api buttonPreviousVariant = DEFAULT_BUTTONS_VARIANT;
    @api buttonNextIconPosition = DEFAULT_NEXT_ICON_POSITION;
    @api buttonNextVariant = DEFAULT_BUTTONS_VARIANT;
    @api buttonPosition = DEFAULT_BUTTON_POSITION;
    @api indicatorType = DEFAULT_INDICATOR_TYPE;
    @api indicatorPosition = DEFAULT_INDICATOR_POSITION;
    @api navigation = false;
    @api buttonInner = false;
    @api indicators = false;
    @api indicatorInner = false;
    @api loop = false;
}
