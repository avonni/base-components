import BaseWrapper from '../../storybookWrappers/wizard/base';

customElements.define(
    'ac-avonni-base-wizard',
    BaseWrapper.CustomElementConstructor
);

export const BaseWizard = ({
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
    navigationPosition,
    fractionPrefixLabel,
    fractionLabel
}) => {
    const element = document.createElement('ac-avonni-base-wizard');
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
    element.navigationPosition = navigationPosition;
    element.fractionPrefixLabel = fractionPrefixLabel;
    element.fractionLabel = fractionLabel;
    return element;
};
