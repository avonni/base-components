import Component from 'avonni/path';

customElements.define('ac-path', Component.CustomElementConstructor);

export const Path = ({
    actions,
    changeCompletionStatusLabel,
    currentStep,
    disabled,
    format,
    guidanceLabel,
    hideButtons,
    hideCoaching,
    keyFieldsLabel,
    nextButtonIconName,
    nextButtonIconPosition,
    nextButtonLabel,
    selectButtonIconName,
    selectButtonIconPosition,
    selectButtonLabel,
    steps,
    toggleButtonAlternativeText
}) => {
    const element = document.createElement('ac-path');
    element.actions = actions;
    element.changeCompletionStatusLabel = changeCompletionStatusLabel;
    element.currentStep = currentStep;
    element.disabled = disabled;
    element.format = format;
    element.guidanceLabel = guidanceLabel;
    element.hideButtons = hideButtons;
    element.hideCoaching = hideCoaching;
    element.keyFieldsLabel = keyFieldsLabel;
    element.nextButtonIconName = nextButtonIconName;
    element.nextButtonIconPosition = nextButtonIconPosition;
    element.nextButtonLabel = nextButtonLabel;
    element.selectButtonIconName = selectButtonIconName;
    element.selectButtonIconPosition = selectButtonIconPosition;
    element.selectButtonLabel = selectButtonLabel;
    element.steps = steps;
    element.toggleButtonAlternativeText = toggleButtonAlternativeText;
    return element;
};
