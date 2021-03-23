import Component from 'base/progressIndicator';

customElements.define(
    'ac-avonni-progress-indicator',
    Component.CustomElementConstructor
);

export const ProgressIndicator = ({
    completedSteps,
    disabledSteps,
    errorSteps,
    warningSteps,
    currentStep,
    type,
    variant,
    steps
}) => {
    const element = document.createElement('ac-base-progress-indicator');
    element.completedSteps = completedSteps;
    element.disabledSteps = disabledSteps;
    element.errorSteps = errorSteps;
    element.warningSteps = warningSteps;
    element.currentStep = currentStep;
    element.type = type;
    element.variant = variant;
    element.steps = steps;
    return element;
};
