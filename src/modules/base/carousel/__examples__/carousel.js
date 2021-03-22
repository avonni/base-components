import Component from 'base/carousel';

customElements.define('ac-base-carousel', Component.CustomElementConstructor);

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
    const element = document.createElement('ac-base-carousel');
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
