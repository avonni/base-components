import Component from '../../storybookWrappers/publisher/publisherWithActionsSlot';

customElements.define('ac-base-publisher-with-actions-slot', Component.CustomElementConstructor);

export const PublisherWithActionsSlot = ({
    placeholder,
    buttonLabel,
    submitAction,
    variant,
    disabled,
    value
}) => {
    const element = document.createElement('ac-base-publisher-with-actions-slot');
    element.placeholder = placeholder;
    element.buttonLabel = buttonLabel;
    element.submitAction = submitAction;
    element.variant = variant;
    element.disabled = disabled;
    element.value = value;
    return element;
};
