import Component from 'avonni/path';

customElements.define('ac-base-path', Component.CustomElementConstructor);

export const Path = ({
    currentStep,
    keyFieldsLabel,
    guidanceLabel,
    disabled,
    format,
    hidePathUpdateButton,
    pathUpdateButtonLabel,
    pathUpdateButtonIconName,
    pathUpdateButtonIconPosition,
    steps,
    actions
}) => {
    const element = document.createElement('ac-base-path');
    element.currentStep = currentStep;
    element.keyFieldsLabel = keyFieldsLabel;
    element.guidanceLabel = guidanceLabel;
    element.disabled = disabled;
    element.format = format;
    element.hidePathUpdateButton = hidePathUpdateButton;
    element.pathUpdateButtonLabel = pathUpdateButtonLabel;
    element.pathUpdateButtonIconName = pathUpdateButtonIconName;
    element.pathUpdateButtonIconPosition = pathUpdateButtonIconPosition;
    element.steps = steps;
    element.actions = actions;
    return element;
};
