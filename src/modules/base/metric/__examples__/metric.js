import Component from '../metric';

customElements.define('ac-metric', Component.CustomElementConstructor);

// Add all the new attributes for Metric and secondaryMetric
export const Metric = ({
    avatar,
    currencyCode,
    currencyDisplayAs,
    day,
    description,
    era,
    errorMessage,
    formatStyle,
    hour,
    label,
    labelPosition,
    loadingStateAlternativeText,
    maximumFractionDigits,
    maximumIntegerDigits,
    maximumSignificantDigits,
    minimumFractionDigits,
    minimumIntegerDigits,
    minimumSignificantDigits,
    minute,
    month,
    prefix,
    secondaryCurrencyCode,
    secondaryCurrencyDisplayAs,
    secondaryDay,
    secondaryEra,
    secondaryFormatStyle,
    secondaryHour,
    secondaryHour12,
    secondaryMaximumFractionDigits,
    secondaryMaximumSignificantDigits,
    secondaryMinimumFractionDigits,
    secondaryMinimumIntegerDigits,
    secondaryMinimumSignificantDigits,
    secondaryMinute,
    secondaryMonth,
    secondaryPosition,
    secondaryPrefix,
    secondaryShowTrendColor,
    secondarySuffix,
    secondaryTimeZone,
    secondaryTimeZoneName,
    secondaryTrendBreakpointValue,
    secondaryTrendIcon,
    secondaryValue,
    secondaryValueIsLoading,
    secondaryValueSign,
    secondaryWeekday,
    secondaryYear,
    showTrendColor,
    suffix,
    timeZone,
    timeZoneName,
    tooltip,
    trendBreakpointValue,
    trendIcon,
    value,
    valueIsLoading,
    valueSign,
    weekday,
    year
}) => {
    const element = document.createElement('ac-metric');
    element.avatar = avatar;
    element.currencyCode = currencyCode;
    element.currencyDisplayAs = currencyDisplayAs;
    element.day = day;
    element.description = description;
    element.era = era;
    element.errorMessage = errorMessage;
    element.formatStyle = formatStyle;
    element.hour = hour;
    element.label = label;
    element.labelPosition = labelPosition;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.maximumFractionDigits = maximumFractionDigits;
    element.maximumIntegerDigits = maximumIntegerDigits;
    element.maximumSignificantDigits = maximumSignificantDigits;
    element.minimumFractionDigits = minimumFractionDigits;
    element.minimumIntegerDigits = minimumIntegerDigits;
    element.minimumSignificantDigits = minimumSignificantDigits;
    element.minute = minute;
    element.month = month;
    element.prefix = prefix;
    element.secondaryCurrencyCode = secondaryCurrencyCode;
    element.secondaryCurrencyDisplayAs = secondaryCurrencyDisplayAs;
    element.secondaryDay = secondaryDay;
    element.secondaryEra = secondaryEra;
    element.secondaryFormatStyle = secondaryFormatStyle;
    element.secondaryHour = secondaryHour;
    element.secondaryHour12 = secondaryHour12;
    element.secondaryMaximumFractionDigits = secondaryMaximumFractionDigits;
    element.secondaryMaximumSignificantDigits =
        secondaryMaximumSignificantDigits;
    element.secondaryMinimumFractionDigits = secondaryMinimumFractionDigits;
    element.secondaryMinimumIntegerDigits = secondaryMinimumIntegerDigits;
    element.secondaryMinimumSignificantDigits =
        secondaryMinimumSignificantDigits;
    element.secondaryMinute = secondaryMinute;
    element.secondaryMonth = secondaryMonth;
    element.secondaryPosition = secondaryPosition;
    element.secondaryPrefix = secondaryPrefix;
    element.secondaryShowTrendColor = secondaryShowTrendColor;
    element.secondarySuffix = secondarySuffix;
    element.secondaryTimeZone = secondaryTimeZone;
    element.secondaryTimeZoneName = secondaryTimeZoneName;
    element.secondaryTrendBreakpointValue = secondaryTrendBreakpointValue;
    element.secondaryTrendIcon = secondaryTrendIcon;
    element.secondaryValue = secondaryValue;
    element.secondaryValueIsLoading = secondaryValueIsLoading;
    element.secondaryValueSign = secondaryValueSign;
    element.secondaryWeekday = secondaryWeekday;
    element.secondaryYear = secondaryYear;
    element.showTrendColor = showTrendColor;
    element.suffix = suffix;
    element.timeZone = timeZone;
    element.timeZoneName = timeZoneName;
    element.tooltip = tooltip;
    element.trendBreakpointValue = trendBreakpointValue;
    element.trendIcon = trendIcon;
    element.value = value;
    element.valueIsLoading = valueIsLoading;
    element.valueSign = valueSign;
    element.weekday = weekday;
    element.year = year;
    return element;
};
