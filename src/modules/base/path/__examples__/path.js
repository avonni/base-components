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

import Component from 'avonni/path';

customElements.define('ac-path', Component.CustomElementConstructor);

export const Path = ({
    currentStep,
    keyFieldsLabel,
    guidanceLabel,
    disabled,
    format,
    hideCoaching,
    hideButtons,
    nextButtonLabel,
    nextButtonIconName,
    nextButtonIconPosition,
    selectButtonLabel,
    selectButtonIconName,
    selectButtonIconPosition,
    changeCompletionStatusLabel,
    steps,
    actions
}) => {
    const element = document.createElement('ac-path');
    element.currentStep = currentStep;
    element.keyFieldsLabel = keyFieldsLabel;
    element.guidanceLabel = guidanceLabel;
    element.disabled = disabled;
    element.format = format;
    element.hideCoaching = hideCoaching;
    element.hideButtons = hideButtons;
    element.nextButtonLabel = nextButtonLabel;
    element.nextButtonIconName = nextButtonIconName;
    element.nextButtonIconPosition = nextButtonIconPosition;
    element.selectButtonLabel = selectButtonLabel;
    element.selectButtonIconName = selectButtonIconName;
    element.selectButtonIconPosition = selectButtonIconPosition;
    element.changeCompletionStatusLabel = changeCompletionStatusLabel;
    element.steps = steps;
    element.actions = actions;
    return element;
};
