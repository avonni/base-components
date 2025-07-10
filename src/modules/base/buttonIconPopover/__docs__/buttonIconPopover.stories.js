import { ButtonIconPopover } from '../__examples__/buttonIconPopover';
import { ButtonIconPopoverWithToggle } from '../__examples__/buttonIconPopoverWithToggle';

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
        disabled: {
            control: {
                type: 'boolean'
            },
            description: "If present, the popover can't be opened by users.",
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        hideCloseButton: {
            name: 'hide-close-button',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the close button of the popover is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
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
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the popover is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Popover'
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the popover or the button is in the loading state.',
            table: {
                type: { summary: 'string' },
                category: 'Popover'
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
            description:
                'The variant changes the appearance of the popover. Accepted variants include base, warning, error, walkthrough.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' },
                category: 'Popover'
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
                defaultValue: { summary: 'medium' },
                category: 'icon'
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
            description:
                "Specify which triggers will show the popover. Supported values are 'click', 'hover', 'focus'.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'click' }
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
        alternativeText: 'Button Icon Popover',
        disabled: false,
        hideCloseButton: false,
        isButtonLoading: false,
        isLoading: false,
        loadingStateAlternativeText: 'Loading...',
        placement: 'left',
        popoverSize: 'medium',
        popoverVariant: 'base',
        size: 'medium',
        triggers: 'click',
        variant: 'border'
    }
};

const Template = (args) => ButtonIconPopover(args);
const TemplateWithToggle = (args) => ButtonIconPopoverWithToggle(args);

export const BaseWithPopoverBase = Template.bind({});
BaseWithPopoverBase.args = {
    iconName: 'utility:favorite',
    tooltip: 'Tooltip text'
};

export const BaseWithPopoverLoading = Template.bind({});
BaseWithPopoverLoading.args = {
    iconName: 'utility:favorite',
    tooltip: 'Tooltip text',
    isLoading: true
};

export const BaseWithPopoverWarning = Template.bind({});
BaseWithPopoverWarning.args = {
    iconName: 'utility:warning',
    iconClass: 'slds-icon-text-warning',
    tooltip: 'Tooltip text',
    size: 'small',
    popoverVariant: 'warning'
};

export const BaseWithToggleInDefaultSlot = TemplateWithToggle.bind({});
BaseWithToggleInDefaultSlot.args = {
    iconName: 'utility:favorite'
};

export const Brand = Template.bind({});
Brand.args = {
    iconName: 'utility:check',
    tooltip: 'Tooltip text',
    size: 'small',
    variant: 'brand'
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
    variant: 'container',
    popoverVariant: 'error',
    popoverSize: 'small'
};
