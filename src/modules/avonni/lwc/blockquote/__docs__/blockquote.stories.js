import { Blockquote } from '../__examples__/blockquote';

export default {
    title: 'Example/Blockquote',
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
                options: ['default', 'brand', 'warning', 'error', 'success']
            },
            defaultValue: 'default',
            table: {
                defaultValue: { summary: 'default' }
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
        iconSize: {
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'small',
            table: {
                defaultValue: { summary: 'small' }
            }
        }
    }
};

const Template = (args) => Blockquote(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Keep in mind',
    iconName: 'utility:animal_and_nature'
};

export const BaseWithIconXxsmall = Template.bind({});
BaseWithIconXxsmall.args = {
    title: 'Keep in mind',
    iconName: 'utility:animal_and_nature',
    iconSize: 'xx-small'
};

export const Brand = Template.bind({});
Brand.args = {
    title: 'Keep in mind',
    iconName: 'utility:user',
    variant: 'brand'
};

export const WarningWithIconLarge = Template.bind({});
WarningWithIconLarge.args = {
    title: 'Warning',
    iconName: 'utility:warning',
    iconSize: 'large',
    variant: 'warning'
};

export const ErrorWithIconMedium = Template.bind({});
ErrorWithIconMedium.args = {
    title: 'Keep in mind',
    iconName: 'utility:error',
    iconSize: 'medium',
    variant: 'error'
};

export const SuccessWithIconRight = Template.bind({});
SuccessWithIconRight.args = {
    title: 'Keep in mind',
    iconName: 'utility:success',
    iconPosition: 'right',
    variant: 'success'
};

export const SuccessWithIconXsmall = Template.bind({});
SuccessWithIconXsmall.args = {
    title: 'Keep in mind',
    iconName: 'utility:success',
    iconSize: 'x-small',
    variant: 'success'
};
