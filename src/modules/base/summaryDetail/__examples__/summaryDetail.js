import Component from '../../storybookWrappers/summaryDetail/summaryDetail';

customElements.define(
    'ac-base-summary-detail',
    Component.CustomElementConstructor
);

export const SummaryDetail = ({ title, closed }) => {
    const element = document.createElement('ac-base-summary-detail');
    element.title = title;
    element.closed = closed;
    return element;
};
