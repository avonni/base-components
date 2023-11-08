import { Alert } from '../__examples__/alert';

export default {
    title: 'Example/Alert',
    argTypes: {
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium', 'large']
            },
            description:
                'The size of the icon. Valid values include xx-small, x-small, small, medium, and large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'error', 'offline', 'warning'],
            description:
                'The variant change the apparence of the alert. Valid values include base, error, offline and warning.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        isDismissible: {
            name: 'is-dismissible',
            control: {
                type: 'boolean'
            },
            description: 'Specify if the alert can be close.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        closeAction: {
            name: 'close-action',
            control: {
                type: 'action'
            },
            description:
                'Custom function to execute when the user close the alert.',
            table: {
                type: { summary: 'action' }
            }
        }
    },
    args: {
        closeAction: false,
        iconSize: 'small',
        isDismissible: false,
        variant: 'base'
    }
};

const Template = (args) => Alert(args);

export const Base = Template.bind({});
Base.args = {
    iconName: 'utility:user'
};

export const DismissibleWithCloseAction = Template.bind({});
DismissibleWithCloseAction.args = {
    iconName: 'utility:user',
    isDismissible: true,
    closeAction: () => {
        console.log('Close action triggered');
    }
};

export const Error = Template.bind({});
Error.args = {
    iconName: 'utility:error',
    variant: 'error'
};

export const Offline = Template.bind({});
Offline.args = {
    iconName: 'utility:clock',
    variant: 'offline'
};

export const Warning = Template.bind({});
Warning.args = {
    iconName: 'utility:warning',
    variant: 'warning'
};
