import Component from '../../storybookWrappers/wizard/beforeChange';

customElements.define(
    'ac-avonni-before-change-wizard',
    Component.CustomElementConstructor
);

export const BeforeChangeWizard = ({
    title,
    iconName,
    variant,
    currentStep,
    hideNavigation,
    indicatorType,
    indicatorPosition,
    hideIndicator,
    previousButtonIconName,
    previousButtonIconPosition,
    previousButtonLabel,
    previousButtonVariant,
    nextButtonIconName,
    nextButtonIconPosition,
    nextButtonLabel,
    nextButtonVariant,
    finishButtonIconName,
    finishButtonIconPosition,
    finishButtonLabel,
    finishButtonVariant,
    buttonAlignmentBump,
    actionPosition,
    fractionPrefixLabel,
    fractionLabel
}) => {
    const element = document.createElement('ac-avonni-before-change-wizard');
    element.title = title;
    element.iconName = iconName;
    element.variant = variant;
    element.currentStep = currentStep;
    element.hideNavigation = hideNavigation;
    element.indicatorType = indicatorType;
    element.indicatorPosition = indicatorPosition;
    element.hideIndicator = hideIndicator;
    element.previousButtonIconName = previousButtonIconName;
    element.previousButtonIconPosition = previousButtonIconPosition;
    element.previousButtonLabel = previousButtonLabel;
    element.previousButtonVariant = previousButtonVariant;
    element.nextButtonIconName = nextButtonIconName;
    element.nextButtonIconPosition = nextButtonIconPosition;
    element.nextButtonLabel = nextButtonLabel;
    element.nextButtonVariant = nextButtonVariant;
    element.finishButtonIconName = finishButtonIconName;
    element.finishButtonIconPosition = finishButtonIconPosition;
    element.finishButtonLabel = finishButtonLabel;
    element.finishButtonVariant = finishButtonVariant;
    element.buttonAlignmentBump = buttonAlignmentBump;
    element.actionPosition = actionPosition;
    element.fractionPrefixLabel = fractionPrefixLabel;
    element.fractionLabel = fractionLabel;
    return element;
};
