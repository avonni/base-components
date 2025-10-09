import Component from 'avonni/calendar';

customElements.define('ac-base-calendar', Component.CustomElementConstructor);

export const Calendar = ({
    dateLabels,
    disabled,
    disabledDates,
    hideNavigation,
    markedDates,
    min,
    max,
    nextMonthButtonAlternativeText,
    previousMonthButtonAlternativeText,
    yearSelectAssistiveText,
    selectionMode,
    timezone,
    value,
    weekNumber,
    weekStartDay
}) => {
    const element = document.createElement('ac-base-calendar');
    element.dateLabels = dateLabels;
    element.disabled = disabled;
    element.disabledDates = disabledDates;
    element.hideNavigation = hideNavigation;
    element.markedDates = markedDates;
    element.max = max;
    element.min = min;
    element.nextMonthButtonAlternativeText = nextMonthButtonAlternativeText;
    element.previousMonthButtonAlternativeText =
        previousMonthButtonAlternativeText;
    element.yearSelectAssistiveText = yearSelectAssistiveText;
    element.selectionMode = selectionMode;
    element.timezone = timezone;
    element.value = value;
    element.weekNumber = weekNumber;
    element.weekStartDay = weekStartDay;
    return element;
};
