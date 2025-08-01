import Component from '../tabBar';

customElements.define(
    'avonni-builder-tab-bar',
    Component.CustomElementConstructor
);

export const TabBar = ({
    defaultTab,
    items,
    labels,
    showMoreButtonAlternativeText,
    tabsHidden
}) => {
    const element = document.createElement('avonni-builder-tab-bar');
    element.defaultTab = defaultTab;
    element.items = items;
    element.labels = labels;
    element.showMoreButtonAlternativeText = showMoreButtonAlternativeText;
    element.tabsHidden = tabsHidden;
    return element;
};
