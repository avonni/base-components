import Component from 'avonni/dateTimePicker';

customElements.define(
    'ac-base-date-time-picker',
    Component.CustomElementConstructor
);

export const DateTimePicker = ({
    avatar,
    datePickerVariant,
    disabled,
    fieldLevelHelp,
    label,
    hideDateLabel,
    hideLabel,
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
    showEndTime,
    showDisabledDates,
    disabledDateTimes,
    max,
    min,
    type,
    showTimeZone,
    hideNavigation,
    hideDatePicker,
    timezone
}) => {
    const element = document.createElement('ac-base-date-time-picker');
    element.avatar = avatar;
    element.datePickerVariant = datePickerVariant;
    element.disabled = disabled;
    element.fieldLevelHelp = fieldLevelHelp;
    element.label = label;
    element.hideDateLabel = hideDateLabel;
    element.hideLabel = hideLabel;
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
    element.showEndTime = showEndTime;
    element.showDisabledDates = showDisabledDates;
    element.disabledDateTimes = disabledDateTimes;
    element.max = max;
    element.min = min;
    element.type = type;
    element.showTimeZone = showTimeZone;
    element.hideNavigation = hideNavigation;
    element.hideDatePicker = hideDatePicker;
    element.timezone = timezone;
    return element;
};
