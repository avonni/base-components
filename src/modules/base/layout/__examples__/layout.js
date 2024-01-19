import Component from '../../storybookWrappers/layout/layout';

customElements.define('ac-layout', Component.CustomElementConstructor);

export const Layout = ({
    columnGap,
    direction,
    horizontalAlign,
    multipleRows,
    rowGap,
    verticalAlign
}) => {
    const element = document.createElement('ac-layout');
    element.columnGap = columnGap;
    element.direction = direction;
    element.horizontalAlign = horizontalAlign;
    element.multipleRows = multipleRows;
    element.rowGap = rowGap;
    element.verticalAlign = verticalAlign;
    return element;
};
