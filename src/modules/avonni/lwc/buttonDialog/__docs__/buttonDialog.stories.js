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
    iconName: 'utility:animal_and_nature',
    variant: 'base'
};

export const NeutralWithIconRight = Template.bind({});
NeutralWithIconRight.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature',
    iconPosition: 'right',
    variant: 'neutral'
};

export const Brand = Template.bind({});
Brand.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'brand'
};

export const BrandOutline = Template.bind({});
BrandOutline.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'brand-outline'
};

export const Destructive = Template.bind({});
Destructive.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'destructive'
};

export const DestructiveText = Template.bind({});
DestructiveText.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'destructive-text'
};

export const Inverse = Template.bind({});
Inverse.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'inverse'
};

export const Success = Template.bind({});
Success.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'success'
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'success',
    disabled: 'true'
};
