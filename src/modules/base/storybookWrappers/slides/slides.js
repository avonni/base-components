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

export default class Slides extends LightningElement {
    @api slidesPerView = 1;
    @api spaceBetween = 0;
    @api autoplayDelay;
    @api initialSlide = 0;
    @api speed = 300;
    @api buttonPreviousIconName = 'utility:left';
    @api buttonPreviousLabel;
    @api buttonNextIconName = 'utility:right';
    @api buttonNextLabel;
    @api fractionPrefixLabel;
    @api fractionLabel = '/';
    @api width;
    @api height;
    @api coverflowSlideWidth;
    @api coverflowSlideHeight;
    @api direction = 'horizontal';
    @api effect = 'slide';
    @api buttonPreviousIconPosition = 'left';
    @api buttonPreviousVariant = 'neutral';
    @api buttonNextIconPosition = 'right';
    @api buttonNextVariant = 'neutral';
    @api buttonPosition = 'middle';
    @api indicatorType = 'bullets';
    @api indicatorPosition = 'bottom-center';
    @api navigation = false;
    @api buttonInner = false;
    @api indicators = false;
    @api indicatorInner = false;
    @api loop = false;
}
