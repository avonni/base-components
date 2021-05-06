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
        hideCoaching: {
            name: 'hide-coaching',
            control: {
                type: 'boolean'
            },
            description: 'If true, the coaching section will be hidden.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Coaching'
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
                defaultValue: { summary: 'Key Fields' },
                category: 'Coaching'
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
                defaultValue: { summary: 'Guidance for Success' },
                category: 'Coaching'
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
                defaultValue: { summary: 'linear' },
                category: 'Path navigation'
            }
        },
        actions: {
            control: {
                type: 'object'
            },
            description: 'Array of default step actions.',
            table: {
                type: { summary: 'object[]' },
                category: 'Coaching'
            }
        },
        hideButton: {
            name: 'hide-button',
            control: {
                type: 'boolean'
            },
            description: 'If true, hide the path button.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        nextButtonLabel: {
            name: 'next-button-label',
            control: {
                type: 'text'
            },
            description:
                'Default label of the path button. On click on the button, the path will go to the next step.',
            defaultValue: 'Mark as Complete',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Mark as Complete' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        nextButtonIconName: {
            name: 'next-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used for the path update button.\n Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        nextButtonIconPosition: {
            name: 'next-button-icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description: 'Valid values include left and right.',
            defaultValue: 'left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        selectButtonLabel: {
            name: 'select-button-label',
            control: {
                type: 'text'
            },
            description:
                'Label of the path button, when the user clicked on a different step than the current one. On click on the button, the selected step will become the current step.',
            defaultValue: 'Mark as Current Stage',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Mark as Current Stage' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        selectButtonIconName: {
            name: 'select-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used for the path update button.\n Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        selectButtonIconPosition: {
            name: 'select-button-icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description: 'Valid values include left and right.',
            defaultValue: 'left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        selectLastStepButtonLabel: {
            name: 'select-last-step-button-label',
            control: {
                type: 'text'
            },
            description:
                'Label of the path button, when the user clicks on the last step. On click on the button, the closing dialog will be opened.',
            defaultValue: 'Select Closed Stage',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Select Closed Stage' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        selectLastStepButtonIconName: {
            name: 'select-last-step-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used for the path update button.\n Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        selectLastStepButtonIconPosition: {
            name: 'select-last-step-button-icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description: 'Valid values include left and right.',
            defaultValue: 'left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        changeClosedStatusButtonLabel: {
            name: 'change-closed-status-button-label',
            control: {
                type: 'text'
            },
            description:
                'Label of the path button, when the path has been closed. On click on the button, the closing dialog will be opened.',
            defaultValue: 'Change Closed Stage',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Change Closed Stage' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        changeClosedStatusButtonIconName: {
            name: 'change-closed-status-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used for the path update button.\n Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        changeClosedStatusButtonIconPosition: {
            name: 'change-closed-status-button-icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description: 'Valid values include left and right.',
            defaultValue: 'left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Path navigation',
                subcategory: 'Button'
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
        tooltip: '1 day in Open',
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
        tooltip: '3 days in Open',
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
        tooltip: '5 days in Open',
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
        tooltip: 'Closed',
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
    hideButton: true
};

export const DisabledWithCurrentStep = Template.bind({});
DisabledWithCurrentStep.args = {
    steps: steps,
    currentStep: 'contacted',
    disabled: true,
    keyFieldsLabel: 'Details',
    guidanceLabel: 'Instructions'
};

export const NoCoachingWithCustomButtonLabels = Template.bind({});
NoCoachingWithCustomButtonLabels.args = {
    steps: steps,
    actions: actions,
    hideCoaching: true,
    nextButtonLabel: 'Next',
    nextButtonIconName: 'utility:chevronright',
    nextButtonIconPosition: 'right',
    selectButtonLabel: 'Move to this step',
    selectButtonIconName: 'utility:level_down',
    selectLastStepButtonLabel: 'Close',
    selectLastStepButtonIconName: 'utility:check',
    selectLastStepButtonIconPosition: 'right',
    changeClosedStatusButtonLabel: 'Change status',
    changeClosedStatusButtonIconName: 'utility:replace'
};
