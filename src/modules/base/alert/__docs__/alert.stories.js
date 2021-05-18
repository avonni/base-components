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
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'error', 'offline', 'warning'],
            defaultValue: 'base',
            description:
                'Valid values include base, error, offline and warning.',
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
            defaultValue: 0,
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
            defaultValue: 0,
            description:
                'Custom function to execute when the user close the alert.',
            table: {
                type: { summary: 'action' }
            }
        }
    },
    args: {
        isDismissible: false
    }
};

const Template = (args) => Alert(args);

export const Base = Template.bind({});
Base.args = {
    iconName: 'utility:user',
    closeAction: () => console.log('Close action')
};

export const Error = Template.bind({});
Error.args = {
    iconName: 'utility:error',
    variant: 'error',
    closeAction: () => console.log('Close action')
};

export const Offline = Template.bind({});
Offline.args = {
    iconName: 'utility:clock',
    variant: 'offline',
    closeAction: () => console.log('Close action')
};

export const Warning = Template.bind({});
Warning.args = {
    iconName: 'utility:warning',
    variant: 'warning',
    closeAction: () => console.log('Close action')
};
