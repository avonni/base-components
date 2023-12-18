import { ButtonPopover } from '../__examples__/buttonPopover';
import { ButtonPopoverWithToggle } from '../__examples__/buttonPopoverWithToggle';

export default {
    title: 'Example/Button Popover',
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
                type: { summary: 'string' }
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
        label: {
            control: {
                type: 'text'
            },
            description: 'Optional text to be shown on the button.',
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
                'base',
                'neutral',
                'brand',
                'brand-outline',
                'destructive',
                'destructive-text',
                'inverse',
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
        disabled: false,
        hideCloseButton: false,
        iconPosition: 'left',
        iconSize: 'x-small',
        isLoading: false,
        placement: 'left',
        popoverSize: 'medium',
        popoverVariant: 'base',
        stretch: false,
        triggers: 'click',
        variant: 'neutral'
    }
};

const Template = (args) => ButtonPopover(args);
const SecondTemplate = (args) => ButtonPopoverWithToggle(args);

export const Neutral = Template.bind({});
Neutral.args = {
    label: 'Info',
    iconName: 'utility:favorite'
};

export const NeutralLargeWithIconRight = Template.bind({});
NeutralLargeWithIconRight.args = {
    label: 'Info',
    iconName: 'utility:favorite',
    iconPosition: 'right'
};

export const NeutralWithToggleInDefaultSlot = SecondTemplate.bind({});
NeutralWithToggleInDefaultSlot.args = {
    label: 'Info',
    iconName: 'utility:favorite'
};

export const BaseWithPopoverVariantWalkthrough = Template.bind({});
BaseWithPopoverVariantWalkthrough.args = {
    label: 'Info',
    iconName: 'utility:favorite',
    variant: 'base',
    popoverVariant: 'walkthrough'
};

export const Brand = Template.bind({});
Brand.args = {
    label: 'Info',
    iconName: 'utility:einstein',
    variant: 'brand'
};

export const BrandOutlineWithPopoverWarning = Template.bind({});
BrandOutlineWithPopoverWarning.args = {
    label: 'Info',
    iconName: 'utility:question_mark',
    variant: 'brand-outline',
    popoverVariant: 'warning'
};

export const DestructiveWithPopoverError = Template.bind({});
DestructiveWithPopoverError.args = {
    label: 'Error',
    iconName: 'utility:error',
    variant: 'destructive',
    popoverVariant: 'error'
};

export const DestructiveTextWithPopoverError = Template.bind({});
DestructiveTextWithPopoverError.args = {
    label: 'Error',
    iconName: 'utility:error',
    variant: 'destructive-text',
    popoverVariant: 'error'
};

export const InverseWithPopoverLoading = Template.bind({});
InverseWithPopoverLoading.args = {
    label: 'Info',
    iconName: 'utility:favorite',
    variant: 'inverse',
    isLoading: true
};

export const Success = Template.bind({});
Success.args = {
    label: 'Complete',
    iconName: 'utility:success',
    variant: 'success'
};
