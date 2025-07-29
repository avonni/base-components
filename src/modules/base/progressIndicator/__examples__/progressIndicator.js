import Component from 'avonni/progressIndicator';

customElements.define(
    'ac-base-progress-indicator',
    Component.CustomElementConstructor
);

export const ProgressIndicator = ({
    completedSteps,
    currentStep,
    disabledSteps,
    errorSteps,
    steps,
    variant,
    warningSteps
}) => {
    const element = document.createElement('ac-base-progress-indicator');
    element.completedSteps = completedSteps;
    element.currentStep = currentStep;
    element.disabledSteps = disabledSteps;
    element.errorSteps = errorSteps;
    element.steps = steps;
    element.variant = variant;
    element.warningSteps = warningSteps;
    return element;
};
