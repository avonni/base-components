import Component from 'avonni/carousel';

customElements.define('ac-base-carousel', Component.CustomElementConstructor);

export const Carousel = ({
    actionsPosition,
    actionsVariant,
    assistiveText,
    cropFit,
    currentPanel,
    disableAutoRefresh,
    disableAutoScroll,
    hideIndicator,
    hidePreviousNextPanelNavigation,
    imageErrorLabel,
    imagePosition,
    indicatorVariant,
    isInfinite,
    isLoading,
    items,
    itemsPerPanel,
    largeItemsPerPanel,
    loadMoreOffset,
    maxIndicatorItems,
    mediumItemsPerPanel,
    noImageLabel,
    scrollDuration,
    smallItemsPerPanel
}) => {
    const element = document.createElement('ac-base-carousel');
    element.actionsPosition = actionsPosition;
    element.actionsVariant = actionsVariant;
    element.assistiveText = assistiveText;
    element.cropFit = cropFit;
    element.currentPanel = currentPanel;
    element.disableAutoRefresh = disableAutoRefresh;
    element.disableAutoScroll = disableAutoScroll;
    element.hideIndicator = hideIndicator;
    element.hidePreviousNextPanelNavigation = hidePreviousNextPanelNavigation;
    element.imageErrorLabel = imageErrorLabel;
    element.imagePosition = imagePosition;
    element.indicatorVariant = indicatorVariant;
    element.isInfinite = isInfinite;
    element.isLoading = isLoading;
    element.items = items;
    element.itemsPerPanel = itemsPerPanel;
    element.largeItemsPerPanel = largeItemsPerPanel;
    element.loadMoreOffset = loadMoreOffset;
    element.maxIndicatorItems = maxIndicatorItems;
    element.mediumItemsPerPanel = mediumItemsPerPanel;
    element.noImageLabel = noImageLabel;
    element.scrollDuration = scrollDuration;
    element.smallItemsPerPanel = smallItemsPerPanel;
    return element;
};
