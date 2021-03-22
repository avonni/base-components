import { InputToggle } from '../__examples__/inputToggle';

export default {
    title: 'Example/Input Toggle',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            type: { required: true },
            description: 'Text label for the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        fieldLevelHelp: {
            name: 'field-level-help',
            control: {
                type: 'text'
            },
            description:
                'Help text detailing the purpose and function of the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        messageToggleActive: {
            name: 'message-toggle-active',
            control: {
                type: 'text'
            },
            defaultValue: 'Active',
            description: 'Text shown for the active state of a toggle.',
            table: {
                type: { summary: 'string' },
                defaultValue: 'Active'
            }
        },
        messageToggleInactive: {
            name: 'message-toggle-inactive',
            control: {
                type: 'text'
            },
            defaultValue: 'Inactive',
            description: 'Text shown for the inactive state of a toggle.',
            table: {
                type: { summary: 'string' },
                defaultValue: 'Inactive'
            }
        },
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when the value is missing. The valueMissing error can be returned when you specify the required attribute for any input type.',
            table: {
                type: { summary: 'string' },
                category: 'Validation'
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'Specifies the name of an input element.',
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description: 'Specifies the value of an input element.',
            table: {
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'medium',
            description:
                'Valid values include x-small, small, medium and large.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
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
            },
            defaultValue: 'standard',
            description:
                'The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.',
            table: {
                type: { summary: 'string' },
                defaultValue: 'standard'
            }
        },
        checked: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, the toggle is selected.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the input field is disabled and users cannot interact with it.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        hideMark: {
            name: 'hide-mark',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If present, hide the mark.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the input field is read-only and cannot be edited by users.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description:
                'Specifies a shortcut key to activate or focus an element.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        ariaControls: {
            name: 'aria-controls',
            control: {
                type: 'text'
            },
            description:
                'A space-separated list of element IDs whose presence or content is controlled by the input.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        ariaDescribedBy: {
            name: 'aria-described-by',
            control: {
                type: 'text'
            },
            description:
                'A space-separated list of element IDs that provide descriptive labels for the input.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        ariaLabel: {
            name: 'aria-label',
            control: {
                type: 'text'
            },
            description: 'Describes the input to assistive technologies.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        ariaLabelledBy: {
            name: 'aria-labelled-by',
            control: {
                type: 'text'
            },
            description:
                'A space-separated list of element IDs that provide labels for the input.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        }
    }
};

const Template = (args) => InputToggle(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label'
};

export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
    label: 'Text label',
    variant: 'label-hidden'
};

export const InlineLabel = Template.bind({});
InlineLabel.args = {
    label: 'Inline label',
    variant: 'label-inline'
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled toggle',
    disabled: true
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
    label: 'Extra small toggle',
    fieldLevelHelp: 'Mark has been hidden',
    hideMark: true,
    size: 'x-small'
};

export const Small = Template.bind({});
Small.args = {
    label: 'Small toggle',
    fieldLevelHelp: 'Active/Inactive messages have been set to an empty string',
    size: 'small',
    messageToggleActive: '',
    messageToggleInactive: ''
};

export const Large = Template.bind({});
Large.args = {
    label: 'Large toggle',
    required: true,
    size: 'large'
};
