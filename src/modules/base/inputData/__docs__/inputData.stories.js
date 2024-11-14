import { InputData } from '../__examples__/inputData';

export default {
    title: 'Example/Input Data',
    argTypes: {
        checked: {
            control: {
                type: 'boolean'
            },
            description:
                'Whether the input is checked. Only has an effect with type boolean.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is disabled and users cannot interact with it.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description:
                'Label of the input. If present, it will be displayed on top of the data.',
            table: {
                type: { summary: 'string' }
            }
        },
        latitude: {
            control: {
                type: 'number'
            },
            description:
                'Latitude of a location. Only has an effect with type location.',
            table: {
                type: { summary: 'number' }
            }
        },
        longitude: {
            control: {
                type: 'number'
            },
            description:
                'Longitude of a location. Only has an effect with type location.',
            table: {
                type: { summary: 'number' }
            }
        },
        maxLines: {
            name: 'maxLines',
            control: {
                type: 'number'
            },
            description: '',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '4' }
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
        options: {
            control: {
                type: 'object'
            },
            description: 'Array of option objects.',
            table: {
                type: { summary: 'object[]' },
                category: 'Data'
            }
        },
        placeholder: {
            control: {
                type: 'text'
            },
            description:
                'Text that is displayed when the field is empty, to prompt the user for a valid entry.',
            table: {
                type: { summary: 'string' }
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is read-only and cannot be edited by users.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: [
                'boolean',
                'currency',
                'date',
                'email',
                'multipicklist',
                'location',
                'number',
                'percent',
                'picklist',
                'phone',
                'url',
                'text'
            ],
            description:
                'Type of the input. Accepted types include boolean, currency, date, email, location, number, percent, phone, url and text. This value defaults to text.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'text' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description:
                'Value of the input. Has an effect with all types, except for boolean and location.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'standard',
                'label-inline',
                'label-hidden',
                'label-stacked'
            ],
            description:
                'The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'standard' }
            }
        }
    },
    args: {
        checked: false,
        disabled: false,
        readOnly: false,
        required: false,
        type: 'text',
        variant: 'standard'
    }
};

const Template = (args) => InputData(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Base input',
    placeholder: 'Placeholder...'
};

export const BaseAsDate = Template.bind({});
BaseAsDate.args = {
    label: 'Date input',
    placeholder: 'Placeholder...',
    type: 'date'
};

export const BaseAsPercent = Template.bind({});
BaseAsPercent.args = {
    label: 'Percent input',
    placeholder: 'Placeholder...',
    type: 'percent',
    value: 0.1
};

export const BaseAsLocation = Template.bind({});
BaseAsLocation.args = {
    label: 'Location input',
    placeholder: 'Placeholder...',
    type: 'location',
    latitude: 37.793846,
    longitude: -122.394837
};

export const BaseAsPhone = Template.bind({});
BaseAsPhone.args = {
    label: 'Phone input',
    placeholder: 'Placeholder...',
    type: 'phone',
    value: '1234567890'
};

export const BaseAsBoolean = Template.bind({});
BaseAsBoolean.args = {
    label: 'Boolean input',
    type: 'boolean',
    checked: true
};

export const MultiSelectPicklist = Template.bind({});
MultiSelectPicklist.args = {
    label: 'Multi-Select Picklist input',
    type: 'multipicklist',
    options: [
        { label: 'Test 1', value: 'test1' },
        { label: 'Test 2', value: 'test2' },
        { label: 'Test 3', value: 'test3' },
        { label: 'Test 4', value: 'test4' },
        { label: 'Test 5', value: 'test5' },
        { label: 'Test 6', value: 'test6' }
    ]
};

export const Picklist = Template.bind({});
Picklist.args = {
    label: 'Picklist input',
    type: 'picklist',
    options: [
        { label: 'Test 1', value: 'test1' },
        { label: 'Test 2', value: 'test2' },
        { label: 'Test 3', value: 'test3' },
        { label: 'Test 4', value: 'test4' },
        { label: 'Test 5', value: 'test5' },
        { label: 'Test 6', value: 'test6' }
    ]
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled input',
    placeholder: 'Placeholder...',
    disabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Read-only input',
    placeholder: 'Placeholder...',
    readOnly: true
};

export const Required = Template.bind({});
Required.args = {
    label: 'Required input',
    placeholder: 'Placeholder...',
    required: true
};

export const LabelInline = Template.bind({});
LabelInline.args = {
    label: 'Inline label input',
    placeholder: 'Placeholder...',
    variant: 'label-inline'
};

export const LabelHidden = Template.bind({});
LabelHidden.args = {
    label: 'Hidden label input',
    placeholder: 'Placeholder...',
    variant: 'label-hidden'
};
