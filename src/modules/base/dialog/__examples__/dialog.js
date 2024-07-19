import Component from '../../storybookWrappers/dialog/dialog';

customElements.define('ac-base-dialog', Component.CustomElementConstructor);

export const Dialog = ({
    ariaDescribedBy,
    ariaLabelledBy,
    closeButtonAlternativeText,
    dialogName,
    isLoading,
    loadingStateAlternativeText,
    size,
    showDialog,
    title
}) => {
    const element = document.createElement('ac-base-dialog');
    element.ariaDescribedBy = ariaDescribedBy;
    element.ariaLabelledBy = ariaLabelledBy;
    element.closeButtonAlternativeText = closeButtonAlternativeText;
    element.dialogName = dialogName;
    element.isLoading = isLoading;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.size = size;
    element.showDialog = showDialog;
    element.title = title;
    return element;
};
