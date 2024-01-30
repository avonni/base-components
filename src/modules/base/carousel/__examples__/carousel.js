import Component from 'avonni/carousel';

customElements.define('ac-base-carousel', Component.CustomElementConstructor);

export const Carousel = ({
    assistiveText,
    items,
    disableAutoRefresh,
    disableAutoScroll,
    scrollDuration,
    indicatorVariant,
    isInfinite,
    currentPanel,
    hideIndicator,
    hidePreviousNextPanelNavigation,
    itemsPerPanel,
    smallItemsPerPanel,
    mediumItemsPerPanel,
    largeItemsPerPanel,
    actionsPosition,
    actionsVariant,
    imagePosition
}) => {
    const element = document.createElement('ac-base-carousel');
    element.assistiveText = assistiveText;
    element.items = items;
    element.disableAutoRefresh = disableAutoRefresh;
    element.disableAutoScroll = disableAutoScroll;
    element.scrollDuration = scrollDuration;
    element.indicatorVariant = indicatorVariant;
    element.isInfinite = isInfinite;
    element.currentPanel = currentPanel;
    element.hideIndicator = hideIndicator;
    element.hidePreviousNextPanelNavigation = hidePreviousNextPanelNavigation;
    element.itemsPerPanel = itemsPerPanel;
    element.smallItemsPerPanel = smallItemsPerPanel;
    element.mediumItemsPerPanel = mediumItemsPerPanel;
    element.largeItemsPerPanel = largeItemsPerPanel;
    element.actionsPosition = actionsPosition;
    element.actionsVariant = actionsVariant;
    element.imagePosition = imagePosition;
    return element;
};
