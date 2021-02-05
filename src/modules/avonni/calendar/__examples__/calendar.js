import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/calendar';

buildAndRegisterCustomElement('avonni-calendar', Component);

export const Calendar = ({
    value,
    multiValue,
    disabled,
    weekNumber,
    disabledDates,
    min,
    max
}) => {
    const element = document.createElement('avonni-calendar');
    element.value = value;
    element.multiValue = multiValue;
    element.disabled = disabled;
    element.weekNumber = weekNumber;
    element.disabledDates = disabledDates;
    element.min = min;
    element.max = max;
    return element;
};
