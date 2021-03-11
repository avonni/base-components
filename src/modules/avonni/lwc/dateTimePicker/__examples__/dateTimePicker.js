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
    timeFormatHour,
    timeFormatHour12,
    timeFormatMinute,
    timeFormatSecond,
    dateFormatDay,
    dateFormatWeekday,
    dateFormatMonth,
    dateFormatYear,
    disabledDateTimes,
    max,
    min,
    visibility,
    type,
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
    element.timeFormatHour = timeFormatHour;
    element.timeFormatHour12 = timeFormatHour12;
    element.timeFormatMinute = timeFormatMinute;
    element.timeFormatSecond = timeFormatSecond;
    element.dateFormatDay = dateFormatDay;
    element.dateFormatWeekday = dateFormatWeekday;
    element.dateFormatMonth = dateFormatMonth;
    element.dateFormatYear = dateFormatYear;
    element.disabledDateTimes = disabledDateTimes;
    element.max = max;
    element.min = min;
    element.visibility = visibility;
    element.type = type;
    element.showTimeZone = showTimeZone;
    element.hideNavigation = hideNavigation;
    element.hideDatePicker = hideDatePicker;
    return element;
};
