import Component from 'avonni/dateTimePicker';

customElements.define(
    'ac-avonni-date-time-picker',
    Component.CustomElementConstructor
);

export const DateTimePicker = ({
    disabled,
    fieldLevelHelp,
    label,
    variant,
    messageWhenValueMissing,
    name,
    readOnly,
    required,
    value,
    startTime,
    endTime,
    timeSlotDuration,
    disabledDateTimes,
    max,
    min,
    visibility,
    showTimeZone,
    hideNavigation,
    hideDatePicker
}) => {
    const element = document.createElement('ac-avonni-date-time-picker');
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.label = label;
    element.variant = variant;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.name = name;
    element.readOnly = readOnly;
    element.required = required;
    element.value = value;
    element.startTime = startTime;
    element.endTime = endTime;
    element.timeSlotDuration = timeSlotDuration;
    element.disabledDateTimes = disabledDateTimes;
    element.max = max;
    element.min = min;
    element.visibility = visibility;
    element.showTimeZone = showTimeZone;
    element.hideNavigation = hideNavigation;
    element.hideDatePicker = hideDatePicker;
    return element;
};
