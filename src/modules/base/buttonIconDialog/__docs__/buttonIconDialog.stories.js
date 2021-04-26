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
        size: {
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium'],
            defaultValue: 'medium',
            description:
                'The size of the buttonIcon. For the bare variant, options include x-small, small, medium, and large. For non-bare variants, options include xx-small, x-small, small, and medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'container',
                'brand',
                'border',
                'border-filled',
                'bare-inverse',
                'border-inverse'
            ],
            defaultValue: 'border',
            description:
                'The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, the popover can be opened by users.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        disabled: false
    }
};

const Template = (args) => ButtonIconDialog(args);

export const Border = Template.bind({});
Border.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature'
};

export const BorderWithWarningIcon = Template.bind({});
BorderWithWarningIcon.args = {
    tooltip: 'Show modal',
    iconName: 'utility:warning',
    iconClass: 'slds-icon-text-warning'
};

export const BorderWithErrorIcon = Template.bind({});
BorderWithErrorIcon.args = {
    tooltip: 'Show modal',
    iconName: 'utility:error',
    iconClass: 'slds-icon-text-error'
};

export const BorderWithSuccessIcon = Template.bind({});
BorderWithSuccessIcon.args = {
    tooltip: 'Show modal',
    iconName: 'utility:success',
    iconClass: 'slds-icon-text-success'
};

export const BorderWithLightIcon = Template.bind({});
BorderWithLightIcon.args = {
    tooltip: 'Show modal',
    iconName: 'utility:check',
    iconClass: 'slds-icon-text-light'
};

export const BorderSmall = Template.bind({});
BorderSmall.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    size: 'small'
};

export const BorderDisabled = Template.bind({});
BorderDisabled.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    disabled: 'true'
};

export const Brand = Template.bind({});
Brand.args = {
    tooltip: 'Show modal',
    iconName: 'utility:einstein',
    variant: 'brand'
};

export const Container = Template.bind({});
Container.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'Container'
};

export const Bare = Template.bind({});
Bare.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'bare'
};

export const BareInverse = Template.bind({});
BareInverse.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'bare-inverse'
};

export const BorderFilled = Template.bind({});
BorderFilled.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'Border-Filled'
};

export const BorderInverse = Template.bind({});
BorderInverse.args = {
    tooltip: 'Show modal',
    iconName: 'utility:animal_and_nature',
    variant: 'Border-inverse'
};
