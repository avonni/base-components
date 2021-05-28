import Component from 'avonni/path';

customElements.define('ac-base-path', Component.CustomElementConstructor);

export const Path = ({
    currentStep,
    keyFieldsLabel,
    guidanceLabel,
    disabled,
    format,
    hideCoaching,
    hideButtons,
    nextButtonLabel,
    nextButtonIconName,
    nextButtonIconPosition,
    selectButtonLabel,
    selectButtonIconName,
    selectButtonIconPosition,
    changeCompletionStatusLabel,
    steps,
    actions
}) => {
    const element = document.createElement('ac-base-path');
    element.currentStep = currentStep;
    element.keyFieldsLabel = keyFieldsLabel;
    element.guidanceLabel = guidanceLabel;
    element.disabled = disabled;
    element.format = format;
    element.hideCoaching = hideCoaching;
    element.hideButtons = hideButtons;
    element.nextButtonLabel = nextButtonLabel;
    element.nextButtonIconName = nextButtonIconName;
    element.nextButtonIconPosition = nextButtonIconPosition;
    element.selectButtonLabel = selectButtonLabel;
    element.selectButtonIconName = selectButtonIconName;
    element.selectButtonIconPosition = selectButtonIconPosition;
    element.changeCompletionStatusLabel = changeCompletionStatusLabel;
    element.steps = steps;
    element.actions = actions;
    return element;
};
