import { Dialog } from '../__examples__/dialog';

export default {
    title: 'Example/Dialog',
    argTypes: {
        dialogName: {
            control: {
                type: 'text'
            }
        },
        title: {
            control: {
                type: 'text'
            }
        },
        loadingStateAlternativeText: {
            control: {
                type: 'text'
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        isLoading: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        showDialog: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => Dialog(args);

export const Base = Template.bind({});
Base.args = {
    dialogName: 'dialog',
    showDialog: true
};
