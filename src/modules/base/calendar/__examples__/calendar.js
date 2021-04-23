import Component from 'avonni/calendar';

customElements.define('ac-base-calendar', Component.CustomElementConstructor);

export const Calendar = ({
    value,
    multiValue,
    disabled,
    weekNumber,
    disabledDates,
    markedDates,
    min,
    max
}) => {
    const element = document.createElement('ac-base-calendar');
    element.value = value;
    element.multiValue = multiValue;
    element.disabled = disabled;
    element.weekNumber = weekNumber;
    element.disabledDates = disabledDates;
    element.markedDates = markedDates;
    element.min = min;
    element.max = max;
    return element;
};
