import Component from 'avonni/inputDateRange';

customElements.define(
    'ac-base-input-date-range',
    Component.CustomElementConstructor
);

export const InputDateRange = ({
    dateStyle,
    disabled,
    endDate,
    fieldLevelHelp,
    isExpanded,
    label,
    labelEndDate,
    labelEndTime,
    labelRangeOptions,
    labelStartDate,
    labelStartTime,
    messageWhenValueMissing,
    rangeOptionValue,
    readOnly,
    required,
    requiredAlternativeText,
    showRangeOptions,
    startDate,
    timeStyle,
    timezone,
    todayButtonLabel,
    type,
    variant,
    weekStartDay
}) => {
    const element = document.createElement('ac-base-input-date-range');
    element.dateStyle = dateStyle;
    element.disabled = disabled;
    element.endDate = endDate;
    element.fieldLevelHelp = fieldLevelHelp;
    element.isExpanded = isExpanded;
    element.label = label;
    element.labelEndDate = labelEndDate;
    element.labelEndTime = labelEndTime;
    element.labelRangeOptions = labelRangeOptions;
    element.labelStartDate = labelStartDate;
    element.labelStartTime = labelStartTime;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.rangeOptionValue = rangeOptionValue;
    element.readOnly = readOnly;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
    element.showRangeOptions = showRangeOptions;
    element.startDate = startDate;
    element.timeStyle = timeStyle;
    element.timezone = timezone;
    element.todayButtonLabel = todayButtonLabel;
    element.type = type;
    element.variant = variant;
    element.weekStartDay = weekStartDay;
    return element;
};
