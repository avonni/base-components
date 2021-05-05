import { Path } from '../__examples__/path';

export default {
    title: 'Example/Path',
    argTypes: {
        steps: {
            control: {
                type: 'object'
            },
            description: 'Array of step objects.',
            type: {
                required: true
            },
            table: {
                type: { summary: 'object[]' }
            }
        },
        currentStep: {
            name: 'current-step',
            control: {
                type: 'text'
            },
            description: 'Name of the current step.',
            table: {
                type: { summary: 'string' }
            }
        },
        keyFieldsLabel: {
            name: 'key-fields-label',
            control: {
                type: 'text'
            },
            description: 'Label of the key fields section.',
            defaultValue: 'Key Fields',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Key Fields' }
            }
        },
        guidanceLabel: {
            name: 'guidance-label',
            control: {
                type: 'text'
            },
            description: 'Label of the guidance section.',
            defaultValue: 'Guidance for Success',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Guidance for Success' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: 'If true, the path is disabled.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        format: {
            control: {
                type: 'radio'
            },
            options: ['linear', 'non-linear'],
            description: 'Valid values include linear and non-linear.',
            defaultValue: 'linear',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'linear' }
            }
        },
        hidePathUpdateButton: {
            name: 'hide-path-update-button',
            control: {
                type: 'boolean'
            },
            description: 'If true, hide the path update button.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        pathUpdateButtonLabel: {
            name: 'path-update-button-label',
            control: {
                type: 'text'
            },
            description: 'Label of the update button.',
            defaultValue: 'Mark as Complete',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Mark as Complete' }
            }
        },
        pathUpdateButtonIconName: {
            name: 'path-update-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used for the path update button.\n Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        pathUpdateButtonIconPosition: {
            name: 'path-update-button-icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description: 'Valid values include left and right.',
            defaultValue: 'left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        actions: {
            control: {
                type: 'object'
            },
            description: 'Array of default step actions.',
            table: {
                type: { summary: 'object[]' }
            }
        }
    }
};

const actions = [
    {
        name: 'action-edit',
        label: 'Edit',
        iconName: 'utility:edit'
    },
    {
        name: 'action-remove',
        label: 'Remove',
        iconName: 'utility:delete',
        disabled: true
    }
];

const steps = [
    {
        name: 'open',
        label: 'Open',
        keyFields: [
            {
                label: 'Name',
                value: 'Mr. John Doe'
            },
            {
                label: 'Phone',
                value: '514-234-5678'
            },
            {
                label: 'Website',
                value: 'https://www.avonni.app/'
            }
        ],
        guidance:
            "Respond to lead within 5 minutes. Visit the lead's website to learn about their business.",
        actions: [
            {
                name: 'action-add-email',
                label: 'Add email',
                iconName: 'utility:email'
            }
        ]
    },
    {
        name: 'qualification',
        label: 'Qualification',
        keyFields: [
            {
                label: 'Company',
                value: 'John Doe Inc.'
            },
            {
                label: 'Description',
                value: 'John Doe Inc. is the lead retailer of yarn in Canada.'
            },
            {
                label: 'Number of employees',
                value: '2300'
            }
        ],
        guidance:
            "Qualify the opportunity and confirm budget. What's their business? What problems are they trying to solve? How does solving these problems help them?"
    },
    {
        name: 'contacted',
        label: 'Contacted',
        keyFields: [
            {
                label: 'Date of call',
                value: '2021/10/23'
            },
            {
                label: 'Notes',
                value:
                    'John Doe Inc. is the lead retailer of yarn in Canada. It has 2,300 employees.'
            }
        ],
        guidance:
            'Verify contact information and qualify your lead. Gather all the contact information you can. The better armed you are, the higher the likelihood of developing positive communications with your lead and improving your prospecting success.'
    },
    {
        name: 'closed',
        label: 'Closed',
        keyFields: [
            {
                label: 'Close date',
                value: '2021/10/30'
            },
            {
                label: 'Budget Confirmed',
                value: '$300.000'
            }
        ],
        hideDefaultActions: true
    }
];

const Template = (args) => Path(args);

export const Base = Template.bind({});
Base.args = {
    steps: steps
};

export const NonLinearButtonHidden = Template.bind({});
NonLinearButtonHidden.args = {
    steps: steps,
    actions: actions,
    format: 'non-linear',
    hidePathUpdateButton: true
};

export const DisabledWithCurrentStep = Template.bind({});
DisabledWithCurrentStep.args = {
    steps: steps,
    currentStep: 'contacted',
    disabled: true,
    format: 'non-linear',
    keyFieldsLabel: 'Details',
    guidanceLabel: 'Instructions',
    pathUpdateButtonLabel: 'Done',
    pathUpdateButtonIconName: 'utility:check',
    pathUpdateButtonIconPosition: 'right'
};
