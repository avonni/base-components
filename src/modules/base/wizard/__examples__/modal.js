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

import Component from '../../storybookWrappers/wizard/modal';

customElements.define(
    'ac-avonni-modal-wizard',
    Component.CustomElementConstructor
);

export const ModalWizard = ({
    title,
    iconName,
    variant,
    currentStep,
    hideNavigation,
    indicatorType,
    indicatorPosition,
    hideIndicator,
    buttonPreviousIconName,
    buttonPreviousIconPosition,
    buttonPreviousLabel,
    buttonPreviousVariant,
    buttonNextIconName,
    buttonNextIconPosition,
    buttonNextLabel,
    buttonNextVariant,
    buttonFinishIconName,
    buttonFinishIconPosition,
    buttonFinishLabel,
    buttonFinishVariant,
    buttonAlignmentBump,
    actionPosition,
    fractionPrefixLabel,
    fractionLabel
}) => {
    const element = document.createElement('ac-avonni-modal-wizard');
    element.title = title;
    element.iconName = iconName;
    element.variant = variant;
    element.currentStep = currentStep;
    element.hideNavigation = hideNavigation;
    element.indicatorType = indicatorType;
    element.indicatorPosition = indicatorPosition;
    element.hideIndicator = hideIndicator;
    element.buttonPreviousIconName = buttonPreviousIconName;
    element.buttonPreviousIconPosition = buttonPreviousIconPosition;
    element.buttonPreviousLabel = buttonPreviousLabel;
    element.buttonPreviousVariant = buttonPreviousVariant;
    element.buttonNextIconName = buttonNextIconName;
    element.buttonNextIconPosition = buttonNextIconPosition;
    element.buttonNextLabel = buttonNextLabel;
    element.buttonNextVariant = buttonNextVariant;
    element.buttonFinishIconName = buttonFinishIconName;
    element.buttonFinishIconPosition = buttonFinishIconPosition;
    element.buttonFinishLabel = buttonFinishLabel;
    element.buttonFinishVariant = buttonFinishVariant;
    element.buttonAlignmentBump = buttonAlignmentBump;
    element.actionPosition = actionPosition;
    element.fractionPrefixLabel = fractionPrefixLabel;
    element.fractionLabel = fractionLabel;
    return element;
};
