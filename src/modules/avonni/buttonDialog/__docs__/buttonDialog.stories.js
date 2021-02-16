import { ButtonDialog } from '../__examples__/buttonDialog';

export default {
    title: 'Example/Button Dialog',
    argTypes: {
        accessKey: {
            control: {
                type: 'text'
            }
        },
        label: {
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
                    'neutral',
                    'brand',
                    'brand-outline',
                    'destructive',
                    'destructive-text',
                    'inverse',
                    'success'
                ]
            },
            defaultValue: 'neutral',
            table: {
                defaultValue: { summary: 'neutral' }
            }
        },
        iconPosition: {
            control: {
                type: 'select',
                options: ['left', 'right']
            },
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        disabled: {
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

const Template = (args) => ButtonDialog(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature'
};
