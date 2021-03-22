import { ButtonPopover } from '../__examples__/buttonPopover';

export default {
    title: 'Example/Button Popover',
    argTypes: {
        accessKey: {
            control: {
                type: 'text'
            }
        },
        label: {
            control: {
                type: 'text'
            }
        },
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
        loadingStateAlternativeText: {
            control: {
                type: 'text'
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
        popoverSize: {
            control: {
                type: 'select',
                options: ['small', 'medium', 'large']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        placement: {
            control: {
                type: 'select',
                options: [
                    'auto',
                    'left',
                    'center',
                    'right',
                    'bottom-left',
                    'bottom-center',
                    'bottom-right'
                ]
            },
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'neutral',
                    'brand',
                    'brand-outline',
                    'destructive',
                    'destructive-text',
                    'inverse',
                    'success'
                ]
            },
            defaultValue: 'neutral',
            table: {
                defaultValue: { summary: 'neutral' }
            }
        },
        triggers: {
            control: {
                type: 'select',
                options: ['click', 'hover', 'focus']
            },
            defaultValue: 'click',
            table: {
                defaultValue: { summary: 'click' }
            }
        },
        popoverVariant: {
            control: {
                type: 'select',
                options: ['base', 'warning', 'error', 'walkthrough']
            },
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        isLoading: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => ButtonPopover(args);

export const BaseWithPopoverVariantWalkthrough = Template.bind({});
BaseWithPopoverVariantWalkthrough.args = {
    label: 'Info',
    iconName: 'utility:favorite',
    variant: 'base',
    popoverVariant: 'Walkthrough'
};

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
    popoverVariant: 'error'
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
    isLoading: 'true'
};

export const Success = Template.bind({});
Success.args = {
    label: 'Complete',
    iconName: 'utility:success',
    variant: 'success'
};
