import { InputToggle } from '../__examples__/inputToggle';

export default {
    title: 'Example/Input Toggle',
    argTypes: {
        accessKey: {
            control: {
                type: 'text'
            }
        },
        ariaControls: {
            control: {
                type: 'text'
            }
        },
        ariaDescribedBy: {
            control: {
                type: 'text'
            }
        },
        ariaLabel: {
            control: {
                type: 'text'
            }
        },
        ariaLabelledBy: {
            control: {
                type: 'text'
            }
        },
        checked: {
            control: {
                type: 'boolean'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            }
        },
        fieldLevelHelp: {
            control: {
                type: 'text'
            }
        },
        hideMark: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            table: {
                defaultValue: { summary: false }
            }
        },
        label: {
            control: {
                type: 'text'
            }
        },
        messageToggleActive: {
            control: {
                type: 'text'
            }
        },
        messageToggleInactive: {
            control: {
                type: 'text'
            }
        },
        messageWhenValueMissing: {
            control: {
                type: 'text'
            }
        },
        name: {
            control: {
                type: 'text'
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            }
        },
        required: {
            control: {
                type: 'boolean'
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        value: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'standard',
                    'label-inline',
                    'label-hidden',
                    'label-stacked'
                ]
            }
        }
    }
};

const Template = (args) => InputToggle(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Toggle label',
    messageToggleActive: 'Active',
    messageToggleInactive: 'Inactive',
    messageWhenValueMissing: 'Value missing',
    size: 'medium'
};
