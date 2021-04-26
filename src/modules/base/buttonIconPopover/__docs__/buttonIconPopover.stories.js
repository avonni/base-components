import { ButtonIconPopover } from '../__examples__/buttonIconPopover';

export default {
    title: 'Example/Button Icon Popover',
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
        title: {
            control: {
                type: 'text'
            },
            description:
                'The tile can include text, and is displayed in the header. To include additional markup or another component, use the title slot.',
            table: {
                type: { summary: 'string' },
                category: 'Popover'
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
                type: { summary: 'string' }
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
                type: { summary: 'string' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the popover is in the loading state.',
            table: {
                type: { summary: 'string' },
                category: 'Popover'
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
        triggers: {
            control: {
                type: 'select'
            },
            options: ['click', 'hover', 'focus'],
            defaultValue: 'click',
            description:
                "Specify which triggers will show the popover. Supported values are 'click', 'hover', 'focus'.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'click' }
            }
        },
        placement: {
            control: {
                type: 'select'
            },
            options: [
                'auto',
                'left',
                'center',
                'right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ],
            defaultValue: 'left',
            description:
                'Determines the alignment of the popover relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the popover based on available space.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Popover'
            }
        },
        popoverSize: {
            name: 'popover-size',
            control: {
                type: 'select'
            },
            description:
                'Width of the popover. Accepted values include small, medium and large. ',
            options: ['small', 'medium', 'large'],
            defaultValue: 'medium',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' },
                category: 'Popover'
            }
        },
        popoverVariant: {
            name: 'popover-variant',
            control: {
                type: 'select'
            },
            options: ['base', 'warning', 'error', 'walkthrough'],
            defaultValue: 'base',
            description:
                'The variant changes the appearance of the popover. Accepted variants include base, warning, error, walkthrough.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' },
                category: 'Popover'
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'container',
                'border',
                'border-filled',
                'bare-inverse',
                'border-inverse'
            ],
            defaultValue: 'border',
            description:
                'The variant changes the appearance of buttonIcon. Accepted variants include bare, container, brand, border, border-filled, bare-inverse, and border-inverse.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the popover is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Popover'
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
        disabled: false,
        isLoading: false
    }
};

const Template = (args) => ButtonIconPopover(args);

export const BorderWithPopoverBase = Template.bind({});
BorderWithPopoverBase.args = {
    iconName: 'utility:favorite',
    tooltip: 'Tooltip text'
};

export const BorderWithPopoverLoading = Template.bind({});
BorderWithPopoverLoading.args = {
    iconName: 'utility:favorite',
    tooltip: 'Tooltip text',
    isLoading: 'true'
};

export const BorderWithPopoverWarning = Template.bind({});
BorderWithPopoverWarning.args = {
    iconName: 'utility:warning',
    iconClass: 'slds-icon-text-warning',
    tooltip: 'Tooltip text',
    size: 'small',
    popoverVariant: 'warning'
};

export const BorderFilledWithGreenSuccessIcon = Template.bind({});
BorderFilledWithGreenSuccessIcon.args = {
    iconName: 'utility:success',
    iconClass: 'slds-icon-text-success',
    tooltip: 'Tooltip text',
    variant: 'border-filled'
};

export const BorderFilledWithLightCheckIcon = Template.bind({});
BorderFilledWithLightCheckIcon.args = {
    iconName: 'utility:check',
    iconClass: 'slds-icon-text-light',
    tooltip: 'Tooltip text',
    variant: 'border-filled'
};

export const BorderFilledWithLargePopoverWalkthrough = Template.bind({});
BorderFilledWithLargePopoverWalkthrough.args = {
    iconName: 'utility:favorite',
    tooltip: 'Tooltip text',
    variant: 'border-filled',
    popoverVariant: 'walkthrough',
    popoverSize: 'large'
};

export const ContainerWithSmallPopoverError = Template.bind({});
ContainerWithSmallPopoverError.args = {
    iconName: 'utility:error',
    iconClass: 'slds-icon-text-error',
    tooltip: 'Tooltip text',
    variant: 'Container',
    popoverVariant: 'error',
    popoverSize: 'small'
};
