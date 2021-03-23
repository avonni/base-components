import Component from '../../storybookWrappers/dialog/dialog';

customElements.define('ac-base-dialog', Component.CustomElementConstructor);

export const Dialog = ({
    dialogName,
    title,
    loadingStateAlternativeText,
    size,
    isLoading,
    showDialog
}) => {
    const element = document.createElement('ac-base-dialog');
    element.dialogName = dialogName;
    element.title = title;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.size = size;
    element.isLoading = isLoading;
    element.showDialog = showDialog;
    return element;
};
