import Component from '../../storybookWrappers/summaryDetail/summaryDetailWithActionButton';

customElements.define(
    'ac-avonni-summary-detail-with-action-button',
    Component.CustomElementConstructor
);

export const SummaryDetailWithActionButton = ({ title, closed }) => {
    const element = document.createElement(
        'ac-avonni-summary-detail-with-action-button'
    );
    element.title = title;
    element.closed = closed;
    return element;
};
