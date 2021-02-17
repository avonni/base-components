import Component from '../../storybookWrappers/slides/slides';

customElements.define('ac-avonni-slides', Component.CustomElementConstructor);

export const Slides = ({
    slidesPerView,
    spaceBetween,
    autoplayDelay,
    initialSlide,
    speed,
    buttonPreviousIconName,
    buttonPreviousLabel,
    buttonNextIconName,
    buttonNextLabel,
    fractionPrefixLabel,
    fractionLabel,
    width,
    height,
    coverflowSlideWidth,
    coverflowSlideHeight,
    direction,
    effect,
    buttonPreviousIconPosition,
    buttonPreviousVariant,
    buttonNextIconPosition,
    buttonNextVariant,
    buttonPosition,
    indicatorType,
    indicatorPosition,
    navigation,
    buttonInner,
    indicators,
    indicatorInner,
    loop
}) => {
    const element = document.createElement('ac-avonni-slides');
    element.slidesPerView = slidesPerView;
    element.spaceBetween = spaceBetween;
    element.autoplayDelay = autoplayDelay;
    element.initialSlide = initialSlide;
    element.speed = speed;
    element.buttonPreviousIconName = buttonPreviousIconName;
    element.buttonPreviousLabel = buttonPreviousLabel;
    element.buttonNextIconName = buttonNextIconName;
    element.buttonNextLabel = buttonNextLabel;
    element.fractionPrefixLabel = fractionPrefixLabel;
    element.fractionLabel = fractionLabel;
    element.width = width;
    element.height = height;
    element.coverflowSlideWidth = coverflowSlideWidth;
    element.coverflowSlideHeight = coverflowSlideHeight;
    element.direction = direction;
    element.effect = effect;
    element.buttonPreviousIconPosition = buttonPreviousIconPosition;
    element.buttonPreviousVariant = buttonPreviousVariant;
    element.buttonNextIconPosition = buttonNextIconPosition;
    element.buttonNextVariant = buttonNextVariant;
    element.buttonPosition = buttonPosition;
    element.indicatorType = indicatorType;
    element.indicatorPosition = indicatorPosition;
    element.navigation = navigation;
    element.buttonInner = buttonInner;
    element.indicators = indicators;
    element.indicatorInner = indicatorInner;
    element.loop = loop;
    return element;
};
