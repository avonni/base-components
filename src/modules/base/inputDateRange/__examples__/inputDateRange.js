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
    labelEndDate,
    startDate,
    endDate,
    dateStyle,
    readOnly,
    timeStyle,
    timezone,
    disabled,
    required,
    variant
}) => {
    const element = document.createElement('ac-base-input-date-range');
    element.type = type;
    element.label = label;
    element.fieldLevelHelp = fieldLevelHelp;
    element.labelStartDate = labelStartDate;
    element.labelEndDate = labelEndDate;
    element.startDate = startDate;
    element.endDate = endDate;
    element.dateStyle = dateStyle;
    element.readOnly = readOnly;
    element.timeStyle = timeStyle;
    element.timezone = timezone;
    element.disabled = disabled;
    element.required = required;
    element.variant = variant;
    return element;
};
