import { Dialog } from '../__examples__/dialog';

export default {
    title: 'Example/Dialog',
    argTypes: {
        ariaDescribedBy: {
            name: 'aria-described-by',
            control: {
                type: 'text'
            },
            description: 'Id of the element that describes the dialog.',
            table: {
                type: { summary: 'string' }
            }
        },
        ariaLabelledBy: {
            name: 'aria-labelled-by',
            control: {
                type: 'text'
            },
            description:
                'Id of the element labelling the dialog. If a title is present, defaults to the title tag.',
            table: {
                type: { summary: 'string' }
            }
        },
        cancelButtonLabel: {
            name: 'cancel-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the cancel button.',
            table: {
                defaultValue: { summary: 'Cancel' },
                type: { summary: 'string' }
            }
        },
        closeButtonAlternativeText: {
            name: 'close-button-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Alternative text for the close button. If the dialog contains a cancel button, the alternative text should be equal to the button label.',
            table: {
                defaultValue: { summary: 'Close' },
                type: { summary: 'string' }
            }
        },
        dialogName: {
            name: 'dialog-name',
            control: {
                type: 'text'
            },
            description: '',
            table: {
                type: { summary: 'string' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the modal box is in a loading state and shows a spinner.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the modal box is in the loading state.',
            table: {
                type: { summary: 'string' }
            }
        },
        saveButtonLabel: {
            name: 'save-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the save button.',
            table: {
                defaultValue: { summary: 'Save' },
                type: { summary: 'string' }
            }
        },
        showDialog: {
            name: 'show-dialog',
            control: {
                type: 'boolean'
            },
            description: 'If present, display dialog',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large'],
            description:
                'Width of the modal. Accepted sizes include small, medium, large. ',
            table: {
                type: { summary: 'string' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        cancelButtonLabel: 'Cancel',
        saveButtonLabel: 'Save',
        isLoading: false,
        size: 'medium',
        showDialog: false
    }
};

const Template = (args) => Dialog(args);

export const Base = Template.bind({});
Base.args = {
    dialogName: 'dialog',
    showDialog: true
};

export const BaseXSmall = Template.bind({});
BaseXSmall.args = {
    dialogName: 'dialog',
    size: 'x-small',
    showDialog: true
};

export const BaseSmall = Template.bind({});
BaseSmall.args = {
    dialogName: 'dialog',
    size: 'small',
    showDialog: true
};

export const BaseLarge = Template.bind({});
BaseLarge.args = {
    dialogName: 'dialog',
    size: 'large',
    showDialog: true
};

export const IsLoading = Template.bind({});
IsLoading.args = {
    dialogName: 'dialog',
    showDialog: true,
    isLoading: true,
    loadingStateAlternativeText: 'Modal is loading'
};
