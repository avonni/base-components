import { ButtonDialog } from '../__examples__/buttonDialog';

export default {
    title: 'Example/Button Dialog',
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
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description: 'The assistive text for the button.',
            table: {
                type: { summary: 'string' }
            }
        },
        cancelButtonLabel: {
            name: 'cancel-button-label',
            control: {
                type: 'text'
            },
            description: 'The label for the cancel button.',
            table: {
                type: { summary: 'string' },
                category: 'button',
                defaultValue: { summary: 'Cancel' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the popover can be opened by users.',
            table: {
                defaultValue: { summary: 'false' },
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
        saveButtonLabel: {
            name: 'save-button-label',
            control: {
                type: 'text'
            },
            description: 'The label for the save button.',
            table: {
                type: { summary: 'string' },
                category: 'button',
                defaultValue: { summary: 'Save' }
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
                'The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.',
            table: {
                defaultValue: { summary: 'neutral' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        cancelButtonLabel: 'Cancel',
        disabled: false,
        iconPosition: 'left',
        iconSize: 'x-small',
        saveButtonLabel: 'Save',
        stretch: false,
        variant: 'neutral'
    }
};

const Template = (args) => ButtonDialog(args);
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
