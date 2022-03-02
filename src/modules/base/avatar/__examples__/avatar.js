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

import Component from 'avonni/avatar';

customElements.define('ac-base-avatar', Component.CustomElementConstructor);

export const Avatar = ({
    alternativeText,
    entityIconName,
    entityInitials,
    entityPosition,
    entitySrc,
    entityTitle,
    entityVariant,
    fallbackIconName,
    hideAvatarDetails,
    initials,
    presence,
    presenceTitle,
    presencePosition,
    primaryText,
    secondaryText,
    tertiaryText,
    size,
    src,
    status,
    statusPosition,
    statusTitle,
    variant,
    textPosition,
    tags,
    actions,
    actionPosition
}) => {
    const element = document.createElement('ac-base-avatar');
    element.alternativeText = alternativeText;
    element.entityIconName = entityIconName;
    element.entityInitials = entityInitials;
    element.entityPosition = entityPosition;
    element.entitySrc = entitySrc;
    element.entityTitle = entityTitle;
    element.entityVariant = entityVariant;
    element.fallbackIconName = fallbackIconName;
    element.hideAvatarDetails = hideAvatarDetails;
    element.initials = initials;
    element.presence = presence;
    element.presenceTitle = presenceTitle;
    element.presencePosition = presencePosition;
    element.primaryText = primaryText;
    element.secondaryText = secondaryText;
    element.tertiaryText = tertiaryText;
    element.size = size;
    element.src = src;
    element.status = status;
    element.statusPosition = statusPosition;
    element.statusTitle = statusTitle;
    element.variant = variant;
    element.textPosition = textPosition;
    element.tags = tags;
    element.actions = actions;
    element.actionPosition = actionPosition;
    return element;
};
