import '@lwc/synthetic-shadow';
import Component from 'avonni/calendar';

customElements.define('ac-avonni-calendar', Component.CustomElementConstructor);

export const Calendar = ({
    value,
    multiValue,
    disabled,
    weekNumber,
    disabledDates,
    min,
    max
}) => {
    const element = document.createElement('ac-avonni-calendar');
    element.value = value;
    element.multiValue = multiValue;
    element.disabled = disabled;
    element.weekNumber = weekNumber;
    element.disabledDates = disabledDates;
    element.min = min;
    element.max = max;
    return element;
};
