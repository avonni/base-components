import Component from '../../storybookWrappers/panel/panelWithButtons';

customElements.define(
    'ac-with-buttons-panel',
    Component.CustomElementConstructor
);

export const PanelWithButtons = ({
    closeButtonAlternativeText,
    position,
    showPanel,
    size,
    title
}) => {
    const element = document.createElement('ac-with-buttons-panel');
    element.closeButtonAlternativeText = closeButtonAlternativeText;
    element.position = position;
    element.showPanel = showPanel;
    element.size = size;
    element.title = title;
    return element;
};
