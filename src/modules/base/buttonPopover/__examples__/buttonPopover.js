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
import Component from '../../storybookWrappers/buttonPopover/buttonPopover';

customElements.define(
    'ac-base-button-popover',
    Component.CustomElementConstructor
);

export const ButtonPopover = ({
    accessKey,
    label,
    title,
    iconName,
    loadingStateAlternativeText,
    iconPosition,
    popoverSize,
    placement,
    variant,
    triggers,
    popoverVariant,
    disabled,
    isLoading
}) => {
    const element = document.createElement('ac-base-button-popover');
    element.accessKey = accessKey;
    element.label = label;
    element.title = title;
    element.iconName = iconName;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.iconPosition = iconPosition;
    element.popoverSize = popoverSize;
    element.placement = placement;
    element.variant = variant;
    element.triggers = triggers;
    element.popoverVariant = popoverVariant;
    element.disabled = disabled;
    element.isLoading = isLoading;
    return element;
};
