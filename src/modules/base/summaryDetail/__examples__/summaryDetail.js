import Component from '../../storybookWrappers/summaryDetail/summaryDetail';

customElements.define(
    'ac-base-summary-detail',
    Component.CustomElementConstructor
);

export const SummaryDetail = ({
    title,
    fullWidth,
    removeBodyIndentation,
    shrinkIconName,
    expandIconName,
    closed
}) => {
    const element = document.createElement('ac-base-summary-detail');
    element.title = title;
    element.fullWidth = fullWidth;
    element.removeBodyIndentation = removeBodyIndentation;
    element.shrinkIconName = shrinkIconName;
    element.expandIconName = expandIconName;
    element.closed = closed;
    return element;
};
