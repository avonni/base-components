import { ButtonIconDialog } from '../__examples__/buttonIconDialog';

export default {
    title: 'Example/Button Icon Dialog',
    argTypes: {
        accessKey: {
            control: {
                type: 'text'
            }
        },
        alternativeText: {
            control: {
                type: 'text'
            }
        },
        tooltip: {
            control: {
                type: 'text'
            }
        },
        iconClass: {
            control: {
                type: 'text'
            }
        },
        iconName: {
            control: {
                type: 'text'
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'bare',
                    'container',
                    'brand',
                    'border',
                    'border-filled',
                    'bare-inverse',
                    'border-inverse'
                ]
            },
            defaultValue: 'border',
            table: {
                defaultValue: { summary: 'border' }
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

const Template = (args) => ButtonIconDialog(args);

export const Base = Template.bind({});
Base.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature'
};
