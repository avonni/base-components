import Component from '../../storybookWrappers/verticalProgressIndicator/verticalProgressIndicator';

customElements.define(
    'ac-avonni-vertical-progress-indicator',
    Component.CustomElementConstructor
);

export const VerticalProgressIndicator = ({
    currentStep,
    variant,
    hasError,
    contentInLine
}) => {
    const element = document.createElement(
        'ac-avonni-vertical-progress-indicator'
    );
    element.currentStep = currentStep;
    element.variant = variant;
    element.hasError = hasError;
    element.contentInLine = contentInLine;
    return element;
};
