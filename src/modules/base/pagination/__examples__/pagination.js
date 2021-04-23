import Component from 'avonni/pagination';

customElements.define('ac-base-pagination', Component.CustomElementConstructor);

export const Pagination = ({
    disabled,
    value,
    limit,
    perPage,
    totalRows,
    ellipsisText,
    ellipsisClass,
    align,
    firstButtonLabel,
    firstButtonIconName,
    previousButtonLabel,
    previousButtonIconName,
    nextButtonLabel,
    nextButtonIconName,
    lastButtonLabel,
    lastButtonIconName
}) => {
    const element = document.createElement('ac-base-pagination');
    element.disabled = disabled;
    element.value = value;
    element.limit = limit;
    element.perPage = perPage;
    element.totalRows = totalRows;
    element.ellipsisText = ellipsisText;
    element.ellipsisClass = ellipsisClass;
    element.align = align;
    element.firstButtonLabel = firstButtonLabel;
    element.firstButtonIconName = firstButtonIconName;
    element.previousButtonLabel = previousButtonLabel;
    element.previousButtonIconName = previousButtonIconName;
    element.nextButtonLabel = nextButtonLabel;
    element.nextButtonIconName = nextButtonIconName;
    element.lastButtonLabel = lastButtonLabel;
    element.lastButtonIconName = lastButtonIconName;
    return element;
};
