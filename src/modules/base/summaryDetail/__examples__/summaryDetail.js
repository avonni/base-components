import Component from '../../storybookWrappers/summaryDetail/summaryDetail';

customElements.define(
    'ac-base-summary-detail',
    Component.CustomElementConstructor
);

export const SummaryDetail = ({
    closed,
    expandIconName,
    fullWidth,
    hideIcon,
    removeBodyIndentation,
    shrinkIconName,
    title
}) => {
    const element = document.createElement('ac-base-summary-detail');
    element.closed = closed;
    element.expandIconName = expandIconName;
    element.fullWidth = fullWidth;
    element.hideIcon = hideIcon;
    element.removeBodyIndentation = removeBodyIndentation;
    element.shrinkIconName = shrinkIconName;
    element.title = title;
    return element;
};
