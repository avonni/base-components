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
    closed,
    hideIcon
}) => {
    const element = document.createElement('ac-base-summary-detail');
    element.title = title;
    element.fullWidth = fullWidth;
    element.removeBodyIndentation = removeBodyIndentation;
    element.shrinkIconName = shrinkIconName;
    element.expandIconName = expandIconName;
    element.closed = closed;
    element.hideIcon = hideIcon;
    return element;
};
