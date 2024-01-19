import Component from 'avonni/progressIndicator';

customElements.define(
    'ac-base-progress-indicator',
    Component.CustomElementConstructor
);

export const ProgressIndicator = ({
    completedSteps,
    disabledSteps,
    errorSteps,
    warningSteps,
    currentStep,
    variant,
    steps
}) => {
    const element = document.createElement('ac-base-progress-indicator');
    element.completedSteps = completedSteps;
    element.disabledSteps = disabledSteps;
    element.errorSteps = errorSteps;
    element.warningSteps = warningSteps;
    element.currentStep = currentStep;
    element.variant = variant;
    element.steps = steps;
    return element;
};
