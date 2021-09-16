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

import Component from 'avonni/dualListbox';

customElements.define(
    'ac-base-dual-listbox',
    Component.CustomElementConstructor
);

export const DualListbox = ({
    addButtonIconName,
    addButtonLabel,
    buttonSize,
    buttonVariant,
    disableReordering,
    disabled,
    downButtonIconName,
    downButtonLabel,
    draggable,
    fieldLevelHelp,
    groups,
    hideBottomDivider,
    isLoading,
    label,
    maxVisibleOptions,
    max,
    min,
    messageWhenRangeOverflow,
    messageWhenRangeUnderflow,
    messageWhenValueMissing,
    name,
    options,
    removeButtonIconName,
    removeButtonLabel,
    required,
    requiredOptions,
    searchEngine,
    selectedLabel,
    selectedPlaceholder,
    size,
    sourceLabel,
    upButtonIconName,
    upButtonLabel,
    validity,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-dual-listbox');
    element.addButtonIconName = addButtonIconName;
    element.addButtonLabel = addButtonLabel;
    element.buttonSize = buttonSize;
    element.buttonVariant = buttonVariant;
    element.disableReordering = disableReordering;
    element.disabled = disabled;
    element.downButtonIconName = downButtonIconName;
    element.downButtonLabel = downButtonLabel;
    element.draggable = draggable;
    element.fieldLevelHelp = fieldLevelHelp;
    element.groups = groups;
    element.hideBottomDivider = hideBottomDivider;
    element.isLoading = isLoading;
    element.label = label;
    element.maxVisibleOptions = maxVisibleOptions;
    element.max = max;
    element.min = min;
    element.messageWhenRangeOverflow = messageWhenRangeOverflow;
    element.messageWhenRangeUnderflow = messageWhenRangeUnderflow;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.options = options;
    element.removeButtonIconName = removeButtonIconName;
    element.removeButtonLabel = removeButtonLabel;
    element.required = required;
    element.requiredOptions = requiredOptions;
    element.searchEngine = searchEngine;
    element.selectedLabel = selectedLabel;
    element.selectedPlaceholder = selectedPlaceholder;
    element.size = size;
    element.sourceLabel = sourceLabel;
    element.upButtonIconName = upButtonIconName;
    element.upButtonLabel = upButtonLabel;
    element.validity = validity;
    element.value = value;
    element.variant = variant;
    return element;
};
