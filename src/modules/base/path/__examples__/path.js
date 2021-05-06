import Component from 'avonni/path';

customElements.define('ac-base-path', Component.CustomElementConstructor);

export const Path = ({
    currentStep,
    keyFieldsLabel,
    guidanceLabel,
    disabled,
    format,
    hideCoaching,
    hideButton,
    nextButtonLabel,
    nextButtonIconName,
    nextButtonIconPosition,
    selectButtonLabel,
    selectButtonIconName,
    selectButtonIconPosition,
    selectLastStepButtonLabel,
    selectLastStepButtonIconName,
    selectLastStepButtonIconPosition,
    changeClosedStatusButtonLabel,
    changeClosedStatusButtonIconName,
    changeClosedStatusButtonIconPosition,
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
    element.hideButton = hideButton;
    element.nextButtonLabel = nextButtonLabel;
    element.nextButtonIconName = nextButtonIconName;
    element.nextButtonIconPosition = nextButtonIconPosition;
    element.selectButtonLabel = selectButtonLabel;
    element.selectButtonIconName = selectButtonIconName;
    element.selectButtonIconPosition = selectButtonIconPosition;
    element.selectLastStepButtonLabel = selectLastStepButtonLabel;
    element.selectLastStepButtonIconName = selectLastStepButtonIconName;
    element.selectLastStepButtonIconPosition = selectLastStepButtonIconPosition;
    element.changeClosedStatusButtonLabel = changeClosedStatusButtonLabel;
    element.changeClosedStatusButtonIconName = changeClosedStatusButtonIconName;
    element.changeClosedStatusButtonIconPosition = changeClosedStatusButtonIconPosition;
    element.steps = steps;
    element.actions = actions;
    return element;
};
