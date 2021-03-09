import Component from 'avonni/dateTimePicker';

customElements.define(
    'ac-avonni-date-time-picker',
    Component.CustomElementConstructor
);

export const DateTimePicker = ({
    label,
    disabledDateTimes,
    min,
    max,
    value,
    startTime,
    endTime,
    timeSlotDuration,
    visibility,
    showTimeZone,
    hideNavigation,
    hideDatePicker
}) => {
    const element = document.createElement('ac-avonni-date-time-picker');
    element.label = label;
    element.disabledDateTimes = disabledDateTimes;
    element.min = min;
    element.max = max;
    element.value = value;
    element.startTime = startTime;
    element.endTime = endTime;
    element.timeSlotDuration = timeSlotDuration;
    element.visibility = visibility;
    element.showTimeZone = showTimeZone;
    element.hideNavigation = hideNavigation;
    element.hideDatePicker = hideDatePicker;
    return element;
};
