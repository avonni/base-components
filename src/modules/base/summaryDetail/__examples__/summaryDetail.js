import Component from '../../storybookWrappers/summaryDetail/summaryDetail';

customElements.define(
    'ac-base-summary-detail',
    Component.CustomElementConstructor
);

export const SummaryDetail = ({
    title,
    fullWidthHeader,
    shrinkIconName,
    expandIconName,
    closed
}) => {
    const element = document.createElement('ac-base-summary-detail');
    element.title = title;
    element.fullWidthHeader = fullWidthHeader;
    element.shrinkIconName = shrinkIconName;
    element.expandIconName = expandIconName;
    element.closed = closed;
    return element;
};
