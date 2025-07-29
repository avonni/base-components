import Component from '../../storybookWrappers/publisher/publisherWithFigureSlot';

customElements.define(
    'ac-base-publisher-with-figure-slot',
    Component.CustomElementConstructor
);

export const PublisherWithFigureSlot = ({
    buttonLabel,
    disabled,
    placeholder,
    submitAction,
    value,
    variant
}) => {
    const element = document.createElement(
        'ac-base-publisher-with-figure-slot'
    );
    element.buttonLabel = buttonLabel;
    element.disabled = disabled;
    element.placeholder = placeholder;
    element.submitAction = submitAction;
    element.value = value;
    element.variant = variant;
    return element;
};
