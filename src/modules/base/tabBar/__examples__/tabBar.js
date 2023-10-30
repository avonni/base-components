import Component from '../tabBar';

customElements.define(
    'avonni-builder-tab-bar',
    Component.CustomElementConstructor
);

export const TabBar = ({ items, labels, tabsHidden, defaultTab }) => {
    const element = document.createElement('avonni-builder-tab-bar');
    element.items = items;
    element.labels = labels;
    element.tabsHidden = tabsHidden;
    element.defaultTab = defaultTab;
    return element;
};
