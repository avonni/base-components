import Component from 'avonni/dateTimePicker';

customElements.define(
    'ac-avonni-date-time-picker',
    Component.CustomElementConstructor
);

export const DateTimePicker = ({ label, disabledDateTimes, min, max }) => {
    const element = document.createElement('ac-avonni-date-time-picker');
    element.label = label;
    element.disabledDateTimes = disabledDateTimes;
    element.min = min;
    element.max = max;
    return element;
};
