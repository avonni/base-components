import { Alert } from '../__examples__/alert';

export default {
    title: 'Example/Alert',
    argTypes: {
        iconName: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['base', 'error', 'offline', 'warning']
            },
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        },
        isDismissible: {
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
