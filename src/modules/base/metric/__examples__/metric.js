

import Component from '../metric';

customElements.define('ac-metric', Component.CustomElementConstructor);

export const Metric = ({
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
    secondaryPosition,
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
    const element = document.createElement('ac-metric');
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
    element.secondaryPosition = secondaryPosition;
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
