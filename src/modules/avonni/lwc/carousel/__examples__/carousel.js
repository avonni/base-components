import Component from 'c/carousel';

customElements.define('ac-avonni-carousel', Component.CustomElementConstructor);

export const Carousel = ({
    assistiveText,
    items,
    disableAutoRefresh,
    disableAutoScroll,
    scrollDuration,
    isInfinite,
    currentPanel,
    hidePreviousNextPanelNavigation,
    itemsPerPanel
}) => {
    const element = document.createElement('ac-avonni-carousel');
    element.assistiveText = assistiveText;
    element.items = items;
    element.disableAutoRefresh = disableAutoRefresh;
    element.disableAutoScroll = disableAutoScroll;
    element.scrollDuration = scrollDuration;
    element.isInfinite = isInfinite;
    element.currentPanel = currentPanel;
    element.hidePreviousNextPanelNavigation = hidePreviousNextPanelNavigation;
    element.itemsPerPanel = itemsPerPanel;
    return element;
};
