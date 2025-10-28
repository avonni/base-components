import Component from 'avonni/dateTimePicker';

customElements.define(
    'ac-base-date-time-picker',
    Component.CustomElementConstructor
);

export const DateTimePicker = ({
    avatar,
    dateFormatDay,
    dateFormatMonth,
    dateFormatWeekday,
    dateFormatYear,
    datePickerVariant,
    disabled,
    disabledDateTimes,
    endTime,
    fieldLevelHelp,
    hideDateLabel,
    hideDatePicker,
    hideLabel,
    hideNavigation,
    label,
    max,
    messageWhenValueMissing,
    min,
    name,
    nextDatesButtonAlternativeText,
    nextWeekButtonAlternativeText,
    noResultsMessage,
    previousDatesButtonAlternativeText,
    previousWeekButtonAlternativeText,
    readOnly,
    required,
    requiredAlternativeText,
    showDisabledDates,
    showEndTime,
    showTimeZone,
    startTime,
    timeFormatHour,
    timeFormatHour12,
    timeFormatMinute,
    timeFormatSecond,
    timeSlotDuration,
    timezone,
    timezoneLabel,
    timezonePlaceholder,
    todayButtonLabel,
    type,
    value,
    variant,
    weekStartDay
}) => {
    const element = document.createElement('ac-base-date-time-picker');
    element.avatar = avatar;
    element.dateFormatDay = dateFormatDay;
    element.dateFormatMonth = dateFormatMonth;
    element.dateFormatWeekday = dateFormatWeekday;
    element.dateFormatYear = dateFormatYear;
    element.datePickerVariant = datePickerVariant;
    element.disabled = disabled;
    element.disabledDateTimes = disabledDateTimes;
    element.endTime = endTime;
    element.fieldLevelHelp = fieldLevelHelp;
    element.hideDateLabel = hideDateLabel;
    element.hideDatePicker = hideDatePicker;
    element.hideLabel = hideLabel;
    element.hideNavigation = hideNavigation;
    element.label = label;
    element.max = max;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.min = min;
    element.nextDatesButtonAlternativeText = nextDatesButtonAlternativeText;
    element.nextWeekButtonAlternativeText = nextWeekButtonAlternativeText;
    element.noResultsMessage = noResultsMessage;
    element.previousDatesButtonAlternativeText =
        previousDatesButtonAlternativeText;
    element.previousWeekButtonAlternativeText =
        previousWeekButtonAlternativeText;
    element.name = name;
    element.readOnly = readOnly;
    element.required = required;
    element.requiredAlternativeText = requiredAlternativeText;
    element.showDisabledDates = showDisabledDates;
    element.showEndTime = showEndTime;
    element.showTimeZone = showTimeZone;
    element.startTime = startTime;
    element.timeFormatHour = timeFormatHour;
    element.timeFormatHour12 = timeFormatHour12;
    element.timeFormatMinute = timeFormatMinute;
    element.timeFormatSecond = timeFormatSecond;
    element.timeSlotDuration = timeSlotDuration;
    element.timezone = timezone;
    element.timezoneLabel = timezoneLabel;
    element.timezonePlaceholder = timezonePlaceholder;
    element.todayButtonLabel = todayButtonLabel;
    element.type = type;
    element.value = value;
    element.variant = variant;
    element.weekStartDay = weekStartDay;
    return element;
};
