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

import Component from 'avonni/combobox';

customElements.define('ac-base-combobox', Component.CustomElementConstructor);

export const Combobox = ({
    actions,
    allowSearch,
    disabled,
    dropdownAlignment,
    dropdownLength,
    fieldLevelHelp,
    groups,
    hideSelectedOptions,
    isLoading,
    isMultiSelect,
    label,
    loadingStateAlternativeText,
    messageWhenValueMissing,
    multiLevelGroups,
    name,
    options,
    placeholder,
    readOnly,
    removeSelectedOptions,
    required,
    scopes,
    scopesGroups,
    search,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-combobox');
    element.actions = actions;
    element.allowSearch = allowSearch;
    element.disabled = disabled;
    element.dropdownAlignment = dropdownAlignment;
    element.dropdownLength = dropdownLength;
    element.fieldLevelHelp = fieldLevelHelp;
    element.groups = groups;
    element.hideSelectedOptions = hideSelectedOptions;
    element.isLoading = isLoading;
    element.isMultiSelect = isMultiSelect;
    element.label = label;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.multiLevelGroups = multiLevelGroups;
    element.name = name;
    element.options = options;
    element.placeholder = placeholder;
    element.readOnly = readOnly;
    element.removeSelectedOptions = removeSelectedOptions;
    element.required = required;
    element.scopes = scopes;
    element.scopesGroups = scopesGroups;
    element.search = search;
    element.value = value;
    element.variant = variant;
    return element;
};
