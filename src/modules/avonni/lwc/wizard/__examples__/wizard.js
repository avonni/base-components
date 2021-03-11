import Component from '../../storybookWrappers/wizard/wizard';

customElements.define('ac-avonni-wizard', Component.CustomElementConstructor);

export const Wizard = ({
    title,
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
    fractionPrefixLabel,
    fractionLabel
}) => {
    const element = document.createElement('ac-avonni-wizard');
    element.title = title;
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
    element.fractionPrefixLabel = fractionPrefixLabel;
    element.fractionLabel = fractionLabel;
    return element;
};
