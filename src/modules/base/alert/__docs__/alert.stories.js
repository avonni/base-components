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
        textured: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
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
