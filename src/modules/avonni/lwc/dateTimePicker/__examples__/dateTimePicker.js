import Component from 'avonni/dateTimePicker';

customElements.define(
    'ac-avonni-date-time-picker',
    Component.CustomElementConstructor
);

export const DateTimePicker = ({ label }) => {
    const element = document.createElement('ac-avonni-date-time-picker');
    element.label = label;
    return element;
};
