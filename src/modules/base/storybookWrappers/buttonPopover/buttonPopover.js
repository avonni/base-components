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

const DEFAULT_POPOVER_SIZE = 'medium'
const DEFAULT_POPOVER_PLACEMENT = 'left'
const DEFAULT_POPOVER_VARIANT = 'base'
const DEFAULT_ICON_POSITION = 'left'
const DEFAULT_BUTTON_VARIANT = 'neutral'
const DEFAULT_BUTTON_TRIGGER = 'click'


export default class ButtonPopover extends LightningElement {
    @api accessKey;
    @api label;
    @api title;
    @api iconName;
    @api loadingStateAlternativeText;
    @api disabled = false;
    @api isLoading = false;
    @api popoverSize = DEFAULT_POPOVER_SIZE;
    @api placement = DEFAULT_POPOVER_PLACEMENT;
    @api popoverVariant = DEFAULT_POPOVER_VARIANT;
    @api iconPosition = DEFAULT_ICON_POSITION;
    @api variant = DEFAULT_BUTTON_VARIANT;
    @api triggers = DEFAULT_BUTTON_TRIGGER;
}
