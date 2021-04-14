import { ButtonIconPopover } from '../__examples__/buttonIconPopover';

export default {
    title: 'Example/Button Icon Popover',
    argTypes: {
        accessKey: {
            control: {
                type: 'text'
            }
        },
        alternativeText: {
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
        iconClass: {
            control: {
                type: 'text'
            }
        },
        loadingStateAlternativeText: {
            control: {
                type: 'text'
            }
        },
        tooltip: {
            control: {
                type: 'text'
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
                    'bare',
                    'container',
                    'brand',
                    'border',
                    'border-filled',
                    'bare-inverse',
                    'border-inverse'
                ]
            },
            defaultValue: 'border',
            table: {
                defaultValue: { summary: 'border' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
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
    variant: 'Container',
    popoverVariant: 'error',
    popoverSize: 'small'
};
