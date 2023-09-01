

import Component from '../../storybookWrappers/dialog/dialog';

customElements.define('ac-base-dialog', Component.CustomElementConstructor);

export const Dialog = ({
    dialogName,
    isLoading,
    loadingStateAlternativeText,
    size,
    showDialog,
    title
}) => {
    const element = document.createElement('ac-base-dialog');
    element.dialogName = dialogName;
    element.isLoading = isLoading;
    element.loadingStateAlternativeText = loadingStateAlternativeText;
    element.size = size;
    element.showDialog = showDialog;
    element.title = title;
    return element;
};
