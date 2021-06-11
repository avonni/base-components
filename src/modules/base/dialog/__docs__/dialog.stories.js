import { Dialog } from '../__examples__/dialog';

export default {
    title: 'Example/Dialog',
    argTypes: {
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
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'string' }
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
        size: {
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large'],
            defaultValue: 'medium',
            description:
                'Width of the modal. Accepted sizes include small, medium, large. ',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the modal box is in a loading state and shows a spinner.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        showDialog: {
            name: 'show-dialog',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, display dialog',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        isLoading: false,
        showDialog: false
    }
};

const Template = (args) => Dialog(args);

export const Base = Template.bind({});
Base.args = {
    dialogName: 'dialog',
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
    isLoading: 'true',
    loadingStateAlternativeText: 'Modal is loading'
};
