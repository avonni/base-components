import Component from '../../storybookWrappers/summaryDetail/summaryDetailWithActionButton';

customElements.define(
    'ac-avonni-summary-detail-with-action-button',
    Component.CustomElementConstructor
);

export const SummaryDetailWithActionButton = ({
    title,
    fullWidth,
    removeBodyIndentation,
    shrinkIconName,
    expandIconName,
    closed,
    hideIcon
}) => {
    const element = document.createElement(
        'ac-avonni-summary-detail-with-action-button'
    );
    element.title = title;
    element.fullWidth = fullWidth;
    element.removeBodyIndentation = removeBodyIndentation;
    element.shrinkIconName = shrinkIconName;
    element.expandIconName = expandIconName;
    element.closed = closed;
    element.hideIcon = hideIcon;
    return element;
};
