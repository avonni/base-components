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
    label,
    labelEndDate,
    labelEndTime,
    labelStartDate,
    labelStartTime,
    messageWhenValueMissing,
    readOnly,
    required,
    startDate,
    timeStyle,
    timezone,
    todayButtonLabel,
    type,
    variant
}) => {
    const element = document.createElement('ac-base-input-date-range');
    element.dateStyle = dateStyle;
    element.disabled = disabled;
    element.endDate = endDate;
    element.fieldLevelHelp = fieldLevelHelp;
    element.label = label;
    element.labelEndDate = labelEndDate;
    element.labelEndTime = labelEndTime;
    element.labelStartDate = labelStartDate;
    element.labelStartTime = labelStartTime;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.readOnly = readOnly;
    element.required = required;
    element.startDate = startDate;
    element.timeStyle = timeStyle;
    element.timezone = timezone;
    element.todayButtonLabel = todayButtonLabel;
    element.type = type;
    element.variant = variant;
    return element;
};
