import { Button } from '../__examples__/button';
import ButtonSizesComponent from '../__examples__/sizes/sizes';

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
        disableAnimation: {
            name: 'disable-animation',
            control: {
                type: 'boolean'
            },
            description:
                'Reserved for internal use. If present, disables button animation.',
            table: {
                type: { summary: 'boolean' }
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
                defaultValue: { summary: 'x-small' },
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
                'The variant changes the look of the button. Accepted variants include bare, bare-inverse, border, border-filled, border-inverse, brand, brand-outline, container, destructive, destructive-text, inverse, neutral and success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        disableAnimation: false,
        disabled: false,
        iconPosition: 'left',
        iconSize: 'x-small',
        stretch: false,
        type: 'button',
        variant: 'neutral'
    }
};

const Template = (args) => Button(args);
const darkBackground = {
    backgrounds: {
        default: 'dark'
    }
};

export const Bare = Template.bind({});
Bare.args = {
    label: 'Button',
    variant: 'bare'
};

export const BareInverseImage = Template.bind({});
BareInverseImage.parameters = darkBackground;
BareInverseImage.args = {
    iconSrc: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    label: 'Button',
    variant: 'bare-inverse'
};

export const Base = Template.bind({});
Base.args = {
    label: 'Button',
    variant: 'base'
};

export const Border = Template.bind({});
Border.args = {
    iconName: 'utility:animal_and_nature',
    label: 'Button',
    variant: 'border'
};

export const BorderFilled = Template.bind({});
BorderFilled.parameters = darkBackground;
BorderFilled.args = {
    iconName: 'utility:animal_and_nature',
    label: 'Button',
    variant: 'border-filled'
};

export const BorderInverseIconRight = Template.bind({});
BorderInverseIconRight.parameters = darkBackground;
BorderInverseIconRight.args = {
    iconName: 'utility:animal_and_nature',
    iconPosition: 'right',
    label: 'Button',
    variant: 'border-inverse'
};

export const BrandSmallIcon = Template.bind({});
BrandSmallIcon.args = {
    iconName: 'utility:einstein',
    iconSize: 'small',
    label: 'Button',
    variant: 'brand'
};

export const BrandOutlineMediumIcon = Template.bind({});
BrandOutlineMediumIcon.args = {
    iconName: 'utility:einstein',
    iconSize: 'medium',
    label: 'Button',
    variant: 'brand-outline'
};

export const ContainerLargeIcon = Template.bind({});
ContainerLargeIcon.args = {
    iconName: 'utility:animal_and_nature',
    iconSize: 'large',
    label: 'Button',
    variant: 'container'
};

export const DestructiveStretch = Template.bind({});
DestructiveStretch.args = {
    iconName: 'utility:error',
    label: 'Button',
    stretch: true,
    variant: 'destructive'
};

export const DestructiveText = Template.bind({});
DestructiveText.args = {
    iconName: 'utility:error',
    label: 'Button',
    variant: 'destructive-text'
};

export const InverseStretch = Template.bind({});
InverseStretch.parameters = darkBackground;
InverseStretch.args = {
    iconName: 'utility:animal_and_nature',
    label: 'Button',
    stretch: true,
    variant: 'inverse'
};

export const NeutralIconRight = Template.bind({});
NeutralIconRight.args = {
    iconName: 'utility:animal_and_nature',
    iconPosition: 'right',
    label: 'Button'
};

export const Success = Template.bind({});
Success.args = {
    iconName: 'utility:success',
    label: 'Button',
    variant: 'success'
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    iconName: 'utility:animal_and_nature',
    label: 'Button',
    variant: 'success'
};

/**
 * Example with different combinations of sizes, icon types.
 * Allows to quickly scan if there is any problems.
 */
customElements.define(
    'ac-base-button-sizes',
    ButtonSizesComponent.CustomElementConstructor
);
const ButtonSizes = ({ variant }) => {
    const element = document.createElement('ac-base-button-sizes');
    element.variant = variant;
    return element;
};
const TemplateSizes = (args) => ButtonSizes(args);
export const Sizes = TemplateSizes.bind({});
