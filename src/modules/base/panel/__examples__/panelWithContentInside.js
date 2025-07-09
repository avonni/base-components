import Component from '../../storybookWrappers/panel/panelWithContentInside';

customElements.define(
    'ac-with-content-panel',
    Component.CustomElementConstructor
);

export const PanelWithContentInside = ({
    closeButtonAlternativeText,
    position,
    showPanel,
    size,
    title
}) => {
    const element = document.createElement('ac-with-content-panel');
    element.closeButtonAlternativeText = closeButtonAlternativeText;
    element.position = position;
    element.showPanel = showPanel;
    element.size = size;
    element.title = title;
    return element;
};
