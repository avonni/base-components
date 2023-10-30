import Component from '../../storybookWrappers/publisher/publisherWithFigureSlot';

customElements.define(
    'ac-base-publisher-with-figure-slot',
    Component.CustomElementConstructor
);

export const PublisherWithFigureSlot = ({
    placeholder,
    buttonLabel,
    submitAction,
    variant,
    disabled,
    value
}) => {
    const element = document.createElement(
        'ac-base-publisher-with-figure-slot'
    );
    element.placeholder = placeholder;
    element.buttonLabel = buttonLabel;
    element.submitAction = submitAction;
    element.variant = variant;
    element.disabled = disabled;
    element.value = value;
    return element;
};
