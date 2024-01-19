import Component from '../../storybookWrappers/verticalProgressIndicator/verticalProgressIndicator';

customElements.define(
    'ac-base-vertical-progress-indicator',
    Component.CustomElementConstructor
);

export const VerticalProgressIndicator = ({
    completedSteps,
    contentInLine,
    currentStep,
    format,
    hasError,
    markAsComplete,
    variant
}) => {
    const element = document.createElement(
        'ac-base-vertical-progress-indicator'
    );
    element.completedSteps = completedSteps;
    element.contentInLine = contentInLine;
    element.currentStep = currentStep;
    element.format = format;
    element.hasError = hasError;
    element.markAsComplete = markAsComplete;
    element.variant = variant;
    return element;
};
