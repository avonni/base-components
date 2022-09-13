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

import Component from '../../storybookWrappers/heroBanner/heroBannerWithButton';

customElements.define(
    'ac-hero-banner-with-button',
    Component.CustomElementConstructor
);

export const HeroBannerWithButton = ({
    backgroundColor,
    caption,
    contentHorizontalAlignment,
    contentVerticalAlignment,
    contentWidth,
    height,
    imageLayout,
    imagePosition,
    maxWidth,
    primaryButtonIconName,
    primaryButtonIconPosition,
    primaryButtonIconSize,
    primaryButtonLabel,
    primaryButtonVariant,
    secondaryButtonIconName,
    secondaryButtonIconPosition,
    secondaryButtonIconSize,
    secondaryButtonLabel,
    secondaryButtonVariant,
    src,
    subtitle,
    title
}) => {
    const element = document.createElement('ac-hero-banner-with-button');
    element.backgroundColor = backgroundColor;
    element.caption = caption;
    element.contentHorizontalAlignment = contentHorizontalAlignment;
    element.contentVerticalAlignment = contentVerticalAlignment;
    element.contentWidth = contentWidth;
    element.height = height;
    element.imageLayout = imageLayout;
    element.imagePosition = imagePosition;
    element.maxWidth = maxWidth;
    element.primaryButtonIconName = primaryButtonIconName;
    element.primaryButtonIconPosition = primaryButtonIconPosition;
    element.primaryButtonIconSize = primaryButtonIconSize;
    element.primaryButtonLabel = primaryButtonLabel;
    element.primaryButtonVariant = primaryButtonVariant;
    element.secondaryButtonIconName = secondaryButtonIconName;
    element.secondaryButtonIconPosition = secondaryButtonIconPosition;
    element.secondaryButtonIconSize = secondaryButtonIconSize;
    element.secondaryButtonLabel = secondaryButtonLabel;
    element.secondaryButtonVariant = secondaryButtonVariant;
    element.src = src;
    element.subtitle = subtitle;
    element.title = title;
    return element;
};
