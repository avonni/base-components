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

import Component from '../../storybookWrappers/kanban/kanban';

customElements.define('ac-kanban', Component.CustomElementConstructor);

export const Kanban = ({
    groupValues,
    fields,
    records,
    summarizeFieldName,
    actions,
    disableColumnDragAndDrop,
    disableItemDragAndDrop,
    groupFieldName,
    coverImageFieldName,
    isLoading,
    hideHeader,
    subGroupFieldName,
    variant,
    keyField
}) => {
    const element = document.createElement('ac-kanban');
    element.groupValues = groupValues;
    element.fields = fields;
    element.records = records;
    element.summarizeFieldName = summarizeFieldName;
    element.actions = actions;
    element.disableItemDragAndDrop = disableItemDragAndDrop;
    element.disableColumnDragAndDrop = disableColumnDragAndDrop;
    element.groupFieldName = groupFieldName;
    element.isLoading = isLoading;
    element.variant = variant;
    element.coverImageFieldName = coverImageFieldName;
    element.hideHeader = hideHeader;
    element.subGroupFieldName = subGroupFieldName;
    element.keyField = keyField;
    return element;
};