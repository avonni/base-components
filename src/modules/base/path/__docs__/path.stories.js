import { Path } from '../__examples__/path';
import { ACTIONS, STEPS } from './data';

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

const Template = (args) => Path(args);

export const Base = Template.bind({});
Base.args = {
    steps: STEPS
};

export const NonLinear = Template.bind({});
NonLinear.args = {
    steps: STEPS,
    format: 'non-linear',
    actions: ACTIONS
};

export const ButtonHiddenWithCurrentStep = Template.bind({});
ButtonHiddenWithCurrentStep.args = {
    steps: STEPS,
    actions: ACTIONS,
    hideButton: true,
    currentStep: 'contacted'
};

export const Disabled = Template.bind({});
Disabled.args = {
    steps: STEPS,
    disabled: true,
    keyFieldsLabel: 'Details',
    guidanceLabel: 'Instructions'
};

export const NoCoachingWithCustomButtonLabels = Template.bind({});
NoCoachingWithCustomButtonLabels.args = {
    steps: STEPS,
    actions: ACTIONS,
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
