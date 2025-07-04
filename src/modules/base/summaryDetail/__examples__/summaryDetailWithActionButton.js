import Component from '../../storybookWrappers/summaryDetail/summaryDetailWithActionButton';

customElements.define(
    'ac-avonni-summary-detail-with-action-button',
    Component.CustomElementConstructor
);

export const SummaryDetailWithActionButton = ({
    closed,
    expandIconName,
    fullWidth,
    hideIcon,
    removeBodyIndentation,
    shrinkIconName,
    title
}) => {
    const element = document.createElement(
        'ac-avonni-summary-detail-with-action-button'
    );
    element.closed = closed;
    element.expandIconName = expandIconName;
    element.fullWidth = fullWidth;
    element.hideIcon = hideIcon;
    element.removeBodyIndentation = removeBodyIndentation;
    element.shrinkIconName = shrinkIconName;
    element.title = title;
    return element;
};
