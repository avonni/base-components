import Component from '../../storybookWrappers/wizard/modal';

customElements.define(
    'ac-avonni-modal-wizard',
    Component.CustomElementConstructor
);

export const ModalWizard = ({
    title,
    type,
    currentStep,
    indicatorType,
    hideIndicator,
    buttonPreviousIconName,
    buttonPreviousIconPosition,
    buttonPreviousLabel,
    buttonPreviousVariant,
    buttonNextIconName,
    buttonNextIconPosition,
    buttonNextLabel,
    buttonNextVariant,
    buttonFinishIconName,
    buttonFinishIconPosition,
    buttonFinishLabel,
    buttonFinishVariant,
    buttonAlignmentBump,
    actionPosition,
    fractionPrefixLabel,
    fractionLabel
}) => {
    const element = document.createElement('ac-avonni-modal-wizard');
    element.title = title;
    element.type = type;
    element.currentStep = currentStep;
    element.indicatorType = indicatorType;
    element.hideIndicator = hideIndicator;
    element.buttonPreviousIconName = buttonPreviousIconName;
    element.buttonPreviousIconPosition = buttonPreviousIconPosition;
    element.buttonPreviousLabel = buttonPreviousLabel;
    element.buttonPreviousVariant = buttonPreviousVariant;
    element.buttonNextIconName = buttonNextIconName;
    element.buttonNextIconPosition = buttonNextIconPosition;
    element.buttonNextLabel = buttonNextLabel;
    element.buttonNextVariant = buttonNextVariant;
    element.buttonFinishIconName = buttonFinishIconName;
    element.buttonFinishIconPosition = buttonFinishIconPosition;
    element.buttonFinishLabel = buttonFinishLabel;
    element.buttonFinishVariant = buttonFinishVariant;
    element.buttonAlignmentBump = buttonAlignmentBump;
    element.actionPosition = actionPosition;
    element.fractionPrefixLabel = fractionPrefixLabel;
    element.fractionLabel = fractionLabel;
    return element;
};
