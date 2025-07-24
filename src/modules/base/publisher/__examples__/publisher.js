import Component from '../../storybookWrappers/publisher/publisher';

customElements.define('ac-base-publisher', Component.CustomElementConstructor);

export const Publisher = ({
    buttonLabel,
    disabled,
    placeholder,
    submitAction,
    value,
    variant
}) => {
    const element = document.createElement('ac-base-publisher');
    element.buttonLabel = buttonLabel;
    element.disabled = disabled;
    element.placeholder = placeholder;
    element.submitAction = submitAction;
    element.value = value;
    element.variant = variant;
    return element;
};
