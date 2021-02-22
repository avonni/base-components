import Component from '../../storybookWrappers/summaryDetail/summaryDetail';

customElements.define(
    'ac-avonni-summary-detail',
    Component.CustomElementConstructor
);

export const SummaryDetail = ({ title, closed }) => {
    const element = document.createElement('ac-avonni-summary-detail');
    element.title = title;
    element.closed = closed;
    return element;
};
