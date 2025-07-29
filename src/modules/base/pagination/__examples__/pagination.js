import Component from 'avonni/pagination';

customElements.define('ac-base-pagination', Component.CustomElementConstructor);

export const Pagination = ({
    align,
    disabled,
    ellipsisText,
    firstButtonIconName,
    firstButtonLabel,
    lastButtonIconName,
    lastButtonLabel,
    limit,
    nextButtonIconName,
    nextButtonLabel,
    perPage,
    previousButtonIconName,
    previousButtonLabel,
    totalRows,
    value
}) => {
    const element = document.createElement('ac-base-pagination');
    element.align = align;
    element.disabled = disabled;
    element.ellipsisText = ellipsisText;
    element.firstButtonIconName = firstButtonIconName;
    element.firstButtonLabel = firstButtonLabel;
    element.lastButtonIconName = lastButtonIconName;
    element.lastButtonLabel = lastButtonLabel;
    element.limit = limit;
    element.nextButtonIconName = nextButtonIconName;
    element.nextButtonLabel = nextButtonLabel;
    element.perPage = perPage;
    element.previousButtonIconName = previousButtonIconName;
    element.previousButtonLabel = previousButtonLabel;
    element.totalRows = totalRows;
    element.value = value;
    return element;
};
