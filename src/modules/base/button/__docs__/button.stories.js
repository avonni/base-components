import { Button } from '../__examples__/button';

export default {
    title: 'Example/Button',
    argTypes: {
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description: 'The keyboard shortcut for the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        disabled: {
            name: 'disabled',
            control: {
                type: 'boolean'
            },
            description: "If present, the button can't be clicked by users.",
            table: {
                type: { summary: 'boolean' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'.",
            table: {
                type: { summary: 'string' },
                category: 'icon'
            }
        },
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon with respect to body. Options include left and right.',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'icon'
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include x-small, small, medium, or large.',
            table: {
                type: { summary: 'string' },
                category: 'icon'
            }
        },
        iconSrc: {
            name: 'icon-src',
            control: {
                type: 'text'
            },
            description: 'URL to set for the image attribute.',
            table: {
                type: { summary: 'string' },
                category: 'icon'
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Optional text to be shown on the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description:
                'Specifies the name of an input element when a form is submitted.',
            table: {
                type: { summary: 'string' }
            }
        },
        stretch: {
            control: {
                type: 'boolean'
            },
            description:
                'Setting it to true allows the button to take up the entire available width.',
            table: {
                type: { summary: 'boolean' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['button', 'reset', 'submit'],
            description:
                'The type of button. Options include button, reset, and submit.',
            table: {
                defaultValue: { summary: 'button' },
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description:
                'The value for the button element. This value is optional and can be used when submitting a form.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'bare-inverse',
                'base',
                'border',
                'border-filled',
                'border-inverse',
                'brand',
                'brand-outline',
                'container',
                'destructive',
                'destructive-text',
                'inverse',
                'neutral',
                'success'
            ],
            description:
                'The variant changes the look of the button. Accepted variants include bare, bare-inverse, border, border-filled, border-inverse, brand, brand-outline, container, destructive, destructive-text, neutral, inverse and success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        disabled: false,
        iconPosition: 'left',
        iconSize: 'x-small',
        stretch: false,
        type: 'button',
        variant: 'neutral'
    }
};

const Template = (args) => Button(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Show modal',
    iconSrc: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    variant: 'success'
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
    iconName: 'utility:einstein',
    variant: 'brand'
};

export const BrandOutline = Template.bind({});
BrandOutline.args = {
    label: 'Show modal',
    iconName: 'utility:einstein',
    variant: 'brand-outline'
};

export const Destructive = Template.bind({});
Destructive.args = {
    label: 'Show modal',
    iconName: 'utility:error',
    variant: 'destructive'
};

export const DestructiveText = Template.bind({});
DestructiveText.args = {
    label: 'Show modal',
    iconName: 'utility:error',
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
    iconName: 'utility:success',
    variant: 'success',
    alternativeText: 'This is a success button dialog'
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'success',
    disabled: true
};
