import Component from '../../storybookWrappers/layout/layout';

customElements.define('ac-layout', Component.CustomElementConstructor);

export const Layout = ({
    direction,
    equalHeights,
    horizontalAlign,
    multipleRows,
    verticalAlign
}) => {
    const element = document.createElement('ac-layout');
    element.direction = direction;
    element.equalHeights = equalHeights;
    element.horizontalAlign = horizontalAlign;
    element.multipleRows = multipleRows;
    element.verticalAlign = verticalAlign;
    return element;
};
