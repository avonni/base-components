import Component from '../../storybookWrappers/publisher/publisher';

customElements.define('ac-base-publisher', Component.CustomElementConstructor);

export const Publisher = ({
    placeholder,
    buttonLabel,
    submitAction,
    variant,
    disabled,
    value
}) => {
    const element = document.createElement('ac-base-publisher');
    element.placeholder = placeholder;
    element.buttonLabel = buttonLabel;
    element.submitAction = submitAction;
    element.variant = variant;
    element.disabled = disabled;
    element.value = value;
    return element;
};
