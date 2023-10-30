import Component from 'avonni/inputDateRange';

customElements.define(
    'ac-base-input-date-range',
    Component.CustomElementConstructor
);

export const InputDateRange = ({
    type,
    label,
    fieldLevelHelp,
    labelStartDate,
    labelStartTime,
    labelEndTime,
    labelEndDate,
    startDate,
    endDate,
    dateStyle,
    readOnly,
    timeStyle,
    timezone,
    disabled,
    required,
    messageWhenValueMissing,
    variant
}) => {
    const element = document.createElement('ac-base-input-date-range');
    element.type = type;
    element.label = label;
    element.fieldLevelHelp = fieldLevelHelp;
    element.labelStartDate = labelStartDate;
    element.labelStartTime = labelStartTime;
    element.labelEndDate = labelEndDate;
    element.labelEndTime = labelEndTime;
    element.startDate = startDate;
    element.endDate = endDate;
    element.dateStyle = dateStyle;
    element.readOnly = readOnly;
    element.timeStyle = timeStyle;
    element.timezone = timezone;
    element.disabled = disabled;
    element.required = required;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.variant = variant;
    return element;
};
