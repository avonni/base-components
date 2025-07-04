import Component from '../../storybookWrappers/publisher/publisherWithActionsSlot';

customElements.define(
    'ac-base-publisher-with-actions-slot',
    Component.CustomElementConstructor
);

export const PublisherWithActionsSlot = ({
    buttonLabel,
    disabled,
    placeholder,
    submitAction,
    value,
    variant
}) => {
    const element = document.createElement(
        'ac-base-publisher-with-actions-slot'
    );
    element.buttonLabel = buttonLabel;
    element.disabled = disabled;
    element.placeholder = placeholder;
    element.submitAction = submitAction;
    element.value = value;
    element.variant = variant;
    return element;
};
