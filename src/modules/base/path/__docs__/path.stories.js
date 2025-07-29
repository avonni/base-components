import { Path } from '../__examples__/path';
import {
    ACTIONS,
    STEPS,
    ALL_STEPS_WITH_COMPLETED_OPTIONS,
    SUCCESS_STEPS_WITH_CLOSING_OPTIONS
} from './data';

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
            description:
                'Sets the progression format of the path. Valid values include linear and non-linear.',
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
        hideButtons: {
            name: 'hide-buttons',
            control: {
                type: 'boolean'
            },
            description: 'If true, hides the path buttons.',
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
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        changeCompletionStatusLabel: {
            name: 'change-completion-status-label',
            control: {
                type: 'text'
            },
            description:
                'Label of the menu item that appears when the previous step had completed options. On click on the menu item, the dialog will reopen, and the user will be able to change the completion status.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Change Completion Status' },
                category: 'Path navigation',
                subcategory: 'Button'
            }
        },
        toggleButtonAlternativeText: {
            name: 'toggle-button-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The alternative text used to describe the toggle button icon.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Toggle Coaching' },
                category: 'Coaching'
            }
        }
    },
    args: {
        changeCompletionStatusLabel: 'Change Completion Status',
        disabled: false,
        format: 'linear',
        guidanceLabel: 'Guidance for Success',
        hideButtons: false,
        hideCoaching: false,
        keyFieldsLabel: 'Key Fields',
        nextButtonLabel: 'Mark as Complete',
        nextButtonIconPosition: 'left',
        selectButtonLabel: 'Mark as Current Stage',
        selectButtonIconPosition: 'left',
        toggleButtonAlternativeText: 'Toggle Coaching'
    }
};

const Template = (args) => Path(args);

export const Base = Template.bind({});
Base.args = {
    steps: STEPS
};

export const SuccessWithClosingOptions = Template.bind({});
SuccessWithClosingOptions.args = {
    steps: SUCCESS_STEPS_WITH_CLOSING_OPTIONS
};

export const CompletedOptionsForEachStep = Template.bind({});
CompletedOptionsForEachStep.args = {
    steps: ALL_STEPS_WITH_COMPLETED_OPTIONS
};

export const NonLinear = Template.bind({});
NonLinear.args = {
    steps: STEPS,
    format: 'non-linear',
    actions: ACTIONS
};

export const NonLinearWithCompletedOptions = Template.bind({});
NonLinearWithCompletedOptions.args = {
    steps: ALL_STEPS_WITH_COMPLETED_OPTIONS,
    format: 'non-linear',
    actions: ACTIONS
};

export const ButtonHiddenWithCurrentStep = Template.bind({});
ButtonHiddenWithCurrentStep.args = {
    steps: STEPS,
    actions: ACTIONS,
    hideButtons: true,
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
    steps: SUCCESS_STEPS_WITH_CLOSING_OPTIONS,
    actions: ACTIONS,
    hideCoaching: true,
    nextButtonLabel: 'Next',
    nextButtonIconName: 'utility:chevronright',
    nextButtonIconPosition: 'right',
    selectButtonLabel: 'Move to this step',
    selectButtonIconName: 'utility:level_down',
    changeCompletionStatusLabel: 'Change status'
};
