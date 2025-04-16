import { ButtonIcon } from '../__examples__/buttonIcon';
import ButtonIconSizesComponent from '../__examples__/sizes/sizes';
import ButtonIconVariantsComponent from '../__examples__/variants/variants';

export default {
    title: 'Example/Button Icon',
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
            description:
                "If present, the button icon can't be clicked by users.",
            table: {
                type: { summary: 'boolean' }
            }
        },
        iconClass: {
            name: 'icon-class',
            control: {
                type: 'text'
            },
            description:
                'The class to be applied to the contained icon element. Only Lightning Design System utility classes are currently supported.',
            table: {
                type: { summary: 'string' },
                category: 'icon'
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
        isButtonLoading: {
            name: 'is-button-loading',
            control: {
                type: 'boolean'
            },
            description:
                'Setting it to true show a loading spinner over the button.',
            table: {
                type: { summary: 'boolean' }
            }
        },
        size: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the button-icon. For the bare variant, options include x-small, small, medium, and large. For non-bare variants, options include xx-small, x-small, small, and medium.',
            table: {
                defaultValue: { summary: 'medium' },
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
        tooltip: {
            control: {
                type: 'text'
            },
            description:
                'Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.',
            table: {
                type: { summary: 'string' }
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
                defaultValue: { summary: 'border' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        disabled: false,
        size: 'medium',
        type: 'button',
        variant: 'border'
    }
};

const Template = (args) => ButtonIcon(args);
const darkBackground = {
    backgrounds: {
        default: 'dark'
    }
};

export const Bare = Template.bind({});
Bare.args = {
    iconName: 'utility:animal_and_nature',
    variant: 'bare'
};

export const BareInverse = Template.bind({});
BareInverse.parameters = darkBackground;
BareInverse.args = {
    iconName: 'utility:animal_and_nature',
    variant: 'bare-inverse'
};

export const Base = Template.bind({});
Base.args = {
    iconName: 'utility:animal_and_nature',
    variant: 'base'
};

export const BorderImage = Template.bind({});
BorderImage.args = {
    iconSrc: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    variant: 'border'
};

export const BorderFilled = Template.bind({});
BorderFilled.parameters = darkBackground;
BorderFilled.args = {
    iconName: 'utility:animal_and_nature',
    variant: 'border-filled'
};

export const BorderInverse = Template.bind({});
BorderInverse.parameters = darkBackground;
BorderInverse.args = {
    iconName: 'utility:animal_and_nature',
    variant: 'border-inverse'
};

export const BrandSmall = Template.bind({});
BrandSmall.args = {
    iconName: 'utility:einstein',
    size: 'small',
    variant: 'brand'
};

export const BrandOutline = Template.bind({});
BrandOutline.args = {
    iconName: 'utility:einstein',
    variant: 'brand-outline'
};

export const ContainerLarge = Template.bind({});
ContainerLarge.args = {
    iconName: 'utility:animal_and_nature',
    size: 'large',
    variant: 'container'
};

export const Destructive = Template.bind({});
Destructive.args = {
    iconName: 'utility:error',
    variant: 'destructive'
};

export const DestructiveText = Template.bind({});
DestructiveText.args = {
    iconName: 'utility:error',
    variant: 'destructive-text'
};

export const Inverse = Template.bind({});
Inverse.parameters = darkBackground;
Inverse.args = {
    iconName: 'utility:animal_and_nature',
    variant: 'inverse'
};

export const Neutral = Template.bind({});
Neutral.args = {
    iconName: 'utility:animal_and_nature',
    label: 'Button'
};

export const Success = Template.bind({});
Success.args = {
    iconName: 'utility:success',
    variant: 'success'
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    iconName: 'utility:animal_and_nature',
    variant: 'success'
};

/**
 * Example with different combinations of sizes, icon types.
 * Allows to quickly scan if there is any problems.
 */
customElements.define(
    'ac-base-button-icon-sizes',
    ButtonIconSizesComponent.CustomElementConstructor
);
const ButtonIconSizes = ({ isButtonLoading, variant }) => {
    const element = document.createElement('ac-base-button-icon-sizes');
    element.isButtonLoading = isButtonLoading;
    element.variant = variant;
    return element;
};
const TemplateSizes = (args) => ButtonIconSizes(args);
export const Sizes = TemplateSizes.bind({});

/**
 * Example with the different variants and there lightning counterpart.
 * Allows to quickly scan if there is any problems.
 */
customElements.define(
    'ac-base-button-icon-variants',
    ButtonIconVariantsComponent.CustomElementConstructor
);
const ButtonIconVariants = () =>
    document.createElement('ac-base-button-icon-variants');
const TemplateVariants = (args) => ButtonIconVariants(args);
export const Variants = TemplateVariants.bind({});
