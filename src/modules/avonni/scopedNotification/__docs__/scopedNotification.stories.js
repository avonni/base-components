import { ScopedNotification } from '../__examples__/scopedNotification';

export default {
    title: 'Example/Scoped Notification',
    argTypes: {
        title: {
            control: {
                type: 'text'
            }
        },
        iconName: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'light',
                    'dark',
                    'warning',
                    'error',
                    'success'
                ]
            },
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        },
        iconSize: {
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        }
    }
};

const Template = (args) => ScopedNotification(args);

export const Base = Template.bind({});
Base.args = {
    iconName: 'utility:info'
};
