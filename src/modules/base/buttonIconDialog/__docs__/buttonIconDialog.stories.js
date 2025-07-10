import { ButtonIconDialog } from '../__examples__/buttonIconDialog';

export default {
    title: 'Example/Button Icon Dialog',
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
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        iconClass: {
            name: 'icon-class',
            control: {
                type: 'text'
            },
            description:
                'The class to be applied to the contained icon element.',
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
        isButtonLoading: {
            name: 'is-button-loading',
            control: {
                type: 'boolean'
            },
            description: 'If present, shows a loading spinner over the button.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the button is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading...' }
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
        size: {
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium'],
            description:
                'The size of the buttonIcon. For the bare variant, options include x-small, small, medium, and large. For non-bare variants, options include xx-small, x-small, small, and medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
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
        cancelButtonLabel: 'Cancel',
        disabled: false,
        isButtonLoading: false,
        loadingStateAlternativeText: 'Loading...',
        saveButtonLabel: 'Save',
        size: 'medium',
        variant: 'border'
    }
};

const Template = (args) => ButtonIconDialog(args);
const darkBackground = {
    backgrounds: {
        default: 'dark'
    }
};

export const Bare = Template.bind({});
Bare.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'bare'
};

export const BareInverse = Template.bind({});
BareInverse.parameters = darkBackground;
BareInverse.args = {
    tooltip: 'Show modal',
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

export const Border = Template.bind({});
Border.args = {
    iconName: 'utility:animal_and_nature',
    tooltip: 'Show modal'
};

export const BorderWithWarningIcon = Template.bind({});
BorderWithWarningIcon.args = {
    iconName: 'utility:warning',
    iconClass: 'slds-icon-text-warning',
    tooltip: 'Show modal'
};

export const BorderWithErrorIcon = Template.bind({});
BorderWithErrorIcon.args = {
    iconName: 'utility:error',
    iconClass: 'slds-icon-text-error',
    tooltip: 'Show modal'
};

export const BorderWithSuccessIcon = Template.bind({});
BorderWithSuccessIcon.args = {
    iconName: 'utility:success',
    tooltip: 'Show modal',
    iconClass: 'slds-icon-text-success'
};

export const BorderWithLightIcon = Template.bind({});
BorderWithLightIcon.args = {
    iconName: 'utility:check',
    tooltip: 'Show modal',
    iconClass: 'slds-icon-text-light'
};

export const BorderSmall = Template.bind({});
BorderSmall.args = {
    iconName: 'utility:animal_and_nature',
    tooltip: 'Show modal',
    size: 'small'
};

export const BorderDisabled = Template.bind({});
BorderDisabled.args = {
    iconName: 'utility:animal_and_nature',
    tooltip: 'Show modal',
    disabled: true
};

export const BorderFilled = Template.bind({});
BorderFilled.args = {
    iconName: 'utility:animal_and_nature',
    tooltip: 'Show modal',
    variant: 'Border-Filled'
};

export const BorderInverse = Template.bind({});
BorderInverse.parameters = darkBackground;
BorderInverse.args = {
    iconName: 'utility:animal_and_nature',
    tooltip: 'Show modal',
    variant: 'Border-inverse'
};

export const Brand = Template.bind({});
Brand.args = {
    iconName: 'utility:einstein',
    tooltip: 'Show modal',
    variant: 'brand'
};

export const BrandOutline = Template.bind({});
BrandOutline.args = {
    iconName: 'utility:einstein',
    variant: 'brand-outline'
};

export const Container = Template.bind({});
Container.args = {
    iconName: 'utility:animal_and_nature',
    tooltip: 'Show modal',
    variant: 'Container'
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
