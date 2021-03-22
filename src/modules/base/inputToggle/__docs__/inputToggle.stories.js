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
        fieldLevelHelp: {
            control: {
                type: 'text'
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
        value: {
            control: {
                type: 'text'
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
        },
        checked: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
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
        hideMark: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        required: {
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

const Template = (args) => InputToggle(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Toggle label',
    messageToggleActive: 'Active',
    messageToggleInactive: 'Inactive',
    messageWhenValueMissing: 'Value missing',
    size: 'medium',
    ariaControls: 'input',
    ariaDescribedBy: 'input'
};
