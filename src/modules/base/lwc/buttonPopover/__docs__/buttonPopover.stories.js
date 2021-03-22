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

export const Base = Template.bind({});
Base.args = {
    label: 'Info',
    iconName: 'utility:favorite'
};
