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

const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Search…';
const DEFAULT_BUTTON_VARIANT = 'border';
const DEFAULT_MENU_ALIGNMENT = 'left';
const DEFAULT_ICON_SIZE = 'medium';
const DEFAULT_ICON_POSITION = 'left';

export default class DynamicMenu extends LightningElement {
    @api accessKey;
    @api allowSearch = false;
    @api alternativeText;
    @api buttonSize;
    @api disabled = false;
    @api hideCheckMark = false;
    @api iconName;
    @api iconPosition = DEFAULT_ICON_POSITION;
    @api iconSize = DEFAULT_ICON_SIZE;
    @api isLoading;
    @api items = [];
    @api label;
    @api loadingStateAlternativeText;
    @api menuAlignment = DEFAULT_MENU_ALIGNMENT;
    @api nubbin = false;
    @api searchInputPlaceholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    @api title;
    @api tooltip;
    @api value;
    @api variant = DEFAULT_BUTTON_VARIANT;
}
