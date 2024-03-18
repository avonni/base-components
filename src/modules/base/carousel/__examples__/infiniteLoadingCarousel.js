import Component from '../../storybookWrappers/carousel/infiniteLoading';

customElements.define(
    'ac-base-infinite-loading-carousel',
    Component.CustomElementConstructor
);

export const InfiniteLoadingCarousel = ({
    actionsPosition,
    actionsVariant,
    assistiveText,
    currentPanel,
    disableAutoRefresh,
    disableAutoScroll,
    hideIndicator,
    hidePreviousNextPanelNavigation,
    imagePosition,
    indicatorVariant,
    isInfinite,
    isLoading,
    items,
    itemsPerPanel,
    largeItemsPerPanel,
    loadMoreOffset,
    mediumItemsPerPanel,
    scrollDuration,
    smallItemsPerPanel
}) => {
    const element = document.createElement('ac-base-infinite-loading-carousel');
    element.actionsPosition = actionsPosition;
    element.actionsVariant = actionsVariant;
    element.assistiveText = assistiveText;
    element.currentPanel = currentPanel;
    element.disableAutoRefresh = disableAutoRefresh;
    element.disableAutoScroll = disableAutoScroll;
    element.hideIndicator = hideIndicator;
    element.hidePreviousNextPanelNavigation = hidePreviousNextPanelNavigation;
    element.imagePosition = imagePosition;
    element.indicatorVariant = indicatorVariant;
    element.isInfinite = isInfinite;
    element.isLoading = isLoading;
    element.items = items;
    element.itemsPerPanel = itemsPerPanel;
    element.largeItemsPerPanel = largeItemsPerPanel;
    element.loadMoreOffset = loadMoreOffset;
    element.mediumItemsPerPanel = mediumItemsPerPanel;
    element.scrollDuration = scrollDuration;
    element.smallItemsPerPanel = smallItemsPerPanel;
    return element;
};
