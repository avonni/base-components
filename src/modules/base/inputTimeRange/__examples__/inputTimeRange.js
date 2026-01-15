import Component from 'avonni/inputTimeRange';

customElements.define(
    'ac-base-input-time-range',
    Component.CustomElementConstructor
);

export const InputTimeRange = ({
    disabled,
    endTime,
    fieldLevelHelp,
    label,
    labelEndTime,
    labelStartTime,
    readOnly,
    required,
    startTime,
    timeStyle,
    variant
}) => {
    const element = document.createElement('ac-base-input-time-range');
    element.disabled = disabled;
    element.endTime = endTime;
    element.fieldLevelHelp = fieldLevelHelp;
    element.label = label;
    element.labelEndTime = labelEndTime;
    element.labelStartTime = labelStartTime;
    element.readOnly = readOnly;
    element.required = required;
    element.startTime = startTime;
    element.timeStyle = timeStyle;
    element.variant = variant;
    return element;
};
