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

import Component from '../metrics';

customElements.define('ac-metrics', Component.CustomElementConstructor);

export const Metrics = ({
    align,
    avatar,
    currencyCode,
    currencyDisplayAs,
    description,
    formatStyle,
    label,
    maximumFractionDigits,
    maximumSignificantDigits,
    minimumFractionDigits,
    minimumIntegerDigits,
    minimumSignificantDigits,
    prefix,
    secondaryCurrencyCode,
    secondaryCurrencyDisplayAs,
    secondaryFormatStyle,
    secondaryMaximumFractionDigits,
    secondaryMaximumSignificantDigits,
    secondaryMinimumFractionDigits,
    secondaryMinimumIntegerDigits,
    secondaryMinimumSignificantDigits,
    secondaryPrefix,
    secondaryShowTrendColor,
    secondarySuffix,
    secondaryValueSign,
    secondaryTrendBreakpointValue,
    secondaryTrendIcon,
    secondaryValue,
    showTrendColor,
    suffix,
    tooltip,
    trendBreakpointValue,
    trendIcon,
    valueSign,
    value
}) => {
    const element = document.createElement('ac-metrics');
    element.align = align;
    element.avatar = avatar;
    element.currencyCode = currencyCode;
    element.currencyDisplayAs = currencyDisplayAs;
    element.description = description;
    element.formatStyle = formatStyle;
    element.label = label;
    element.maximumFractionDigits = maximumFractionDigits;
    element.maximumSignificantDigits = maximumSignificantDigits;
    element.minimumFractionDigits = minimumFractionDigits;
    element.minimumIntegerDigits = minimumIntegerDigits;
    element.minimumSignificantDigits = minimumSignificantDigits;
    element.prefix = prefix;
    element.secondaryCurrencyCode = secondaryCurrencyCode;
    element.secondaryCurrencyDisplayAs = secondaryCurrencyDisplayAs;
    element.secondaryFormatStyle = secondaryFormatStyle;
    element.secondaryMaximumFractionDigits = secondaryMaximumFractionDigits;
    element.secondaryMaximumSignificantDigits =
        secondaryMaximumSignificantDigits;
    element.secondaryMinimumFractionDigits = secondaryMinimumFractionDigits;
    element.secondaryMinimumIntegerDigits = secondaryMinimumIntegerDigits;
    element.secondaryMinimumSignificantDigits =
        secondaryMinimumSignificantDigits;
    element.secondaryPrefix = secondaryPrefix;
    element.secondaryShowTrendColor = secondaryShowTrendColor;
    element.secondarySuffix = secondarySuffix;
    element.secondaryTrendBreakpointValue = secondaryTrendBreakpointValue;
    element.secondaryTrendIcon = secondaryTrendIcon;
    element.secondaryValueSign = secondaryValueSign;
    element.showTrendColor = showTrendColor;
    element.trendBreakpointValue = trendBreakpointValue;
    element.trendIcon = trendIcon;
    element.secondaryValue = secondaryValue;
    element.suffix = suffix;
    element.tooltip = tooltip;
    element.value = value;
    element.valueSign = valueSign;
    return element;
};
