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
    value
}) => {
    const element = document.createElement('ac-avonni-date-time-picker');
    element.label = label;
    element.disabledDateTimes = disabledDateTimes;
    element.min = min;
    element.max = max;
    element.value = value;
    return element;
};
