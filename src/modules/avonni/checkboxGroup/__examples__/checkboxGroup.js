import '@lwc/synthetic-shadow';
import buildAndRegisterCustomElement from '../../../../../.storybook/utils/build-custom-element';
import Component from 'avonni/checkboxGroup';

buildAndRegisterCustomElement('avonni-checkbox-group', Component);

export const CheckboxGroup = ({ 
    disabled,
    label,
    type,
    messageWhenValueMissing,
    options,
    required,
    value,
    variant
}) => {
    const element = document.createElement('avonni-checkbox-group');
    element.disabled = disabled;
    element.label = label;
    element.type = type;
    element.messageWhenValueMissing = messageWhenValueMissing;
    element.options = options;
    element.required = required;
    element.value = value;
    element.variant = variant;
    return element;
};