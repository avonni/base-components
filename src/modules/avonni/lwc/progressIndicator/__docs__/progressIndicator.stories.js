import { ProgressIndicator } from '../__examples__/progressIndicator';

export default {
    title: 'Example/Progress Indicator',
    argTypes: {
        completedSteps: {
            control: {
                type: 'text'
            },
            description: 'All completed steps values.',
            table: {
                type: { summary: 'String[]' }
            }
        },
        disabledSteps: {
            control: {
                type: 'text'
            },
            description: 'All disabled steps values.',
            table: {
                type: { summary: 'String[]' }
            }
        },
        errorSteps: {
            control: {
                type: 'text'
            },
            description: 'All error steps values.',
            table: {
                type: { summary: 'String[]' }
            }
        },
        warningSteps: {
            control: {
                type: 'text'
            },
            description: 'All warning steps values.',
            table: {
                type: { summary: 'String[]' }
            }
        },
        currentStep: {
            control: {
                type: 'text'
            },
            description:
                'Set current-step to match the value attribute of one of progress-step components. If current-step is not provided, the value of the first progress-step component is used.',
            table: {
                type: { summary: 'String' }
            }
        },
        type: {
            control: {
                type: 'select',
                options: ['base', 'arrow']
            },
            description:
                'Changes the visual pattern of the indicator. Valid values are base and arrow. The default is base.',
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'String' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['base', 'shaded']
            },
            description:
                'Changes the appearance of the progress indicator for the base type only. Valid values are base or shaded. The shaded variant adds a light gray border to the step indicators. The default is base.',
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        steps: {
            control: {
                type: 'object'
            },
            table: {
                type: { summary: 'object[]' }
            }
        }
    }
};

const steps = [
    {
        value: '1',
        label: '1',
        labelPosition: 'bottom',
        assistiveText: '1',
        description: 'This is step #1',
        popoverDescription: '1',
        popoverSize: 'medium',
        popoverRatio: '16-by-9'
    },
    {
        value: '2',
        label: '2',
        labelPosition: 'bottom',
        assistiveText: '2',
        popoverLabel: '2',
        popoverDescription: 'This is step #2',
        popoverSize: 'small',
        popoverRatio: '4-by-3'
    },
    {
        value: '3',
        label: '3',
        labelPosition: 'bottom',
        assistiveText: '3',
        description: 'This is step #3'
    },
    {
        value: '4',
        label: '4',
        labelPosition: 'bottom',
        description: 'This is step #4'
    },
    {
        value: '5',
        label: '5',
        labelPosition: 'bottom',
        description: 'This is step #5'
    }
];

const stepsWithButtons = [
    {
        value: '1',
        label: '1',
        labelPosition: 'top',
        assistiveText: '1',
        description: 'This is step #1',
        buttonLabel: 'Error',
        buttonVariant: 'destructive'
    },
    {
        value: '2',
        label: '2',
        labelPosition: 'top',
        assistiveText: '2',
        description: 'This is step #2',
        buttonLabel: 'Completed',
        buttonVariant: 'success'
    },
    {
        value: '3',
        label: '3',
        labelPosition: 'top',
        assistiveText: '3',
        description: 'This is step #3',
        buttonLabel: 'Completed',
        buttonVariant: 'success'
    },
    {
        value: '4',
        label: '4',
        labelPosition: 'top',
        assistiveText: '4',
        description: 'This is step #4',
        buttonLabel: 'Current',
        buttonVariant: 'brand'
    },
    {
        value: '5',
        label: '5',
        labelPosition: 'top',
        assistiveText: '5',
        description: 'This is step #5',
        buttonLabel: 'Warning',
        buttonVariant: 'destructive-text'
    }
];

const milestonesSteps = [
    {
        value: '1',
        label: 'Merger & Acquisition',
        labelPosition: 'bottom',
        popoverIconName: 'utility:merge',
        popoverIconNameWhenHover: 'utility:add',
        popoverHidden: 'true',
        popoverSize: 'small'
    },
    {
        value: '2',
        label: 'Expansion',
        labelPosition: 'bottom',
        popoverIconName: 'utility:rules',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small'
    },
    {
        value: '3',
        label: 'Executive Change',
        labelPosition: 'bottom',
        popoverIconName: 'utility:block_visitor',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small'
    },
    {
        value: '4',
        label: 'Market Listing',
        labelPosition: 'bottom',
        popoverIconName: 'utility:priority',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small'
    },
    {
        value: '5',
        label: 'Bankruptcy',
        labelPosition: 'bottom',
        popoverIconName: 'utility:error',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small'
    },
    {
        value: '6',
        label: 'New Product Launch',
        labelPosition: 'bottom',
        popoverIconName: 'utility:cases',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small'
    },
    {
        value: '7',
        label: 'New Partnership',
        labelPosition: 'bottom',
        popoverIconName: 'utility:change_record_type',
        popoverIconNameWhenHover: 'utility:add',
        popoverSize: 'small'
    }
];

const Template = (args) => ProgressIndicator(args);

export const Base = Template.bind({});
Base.args = {
    type: 'base',
    variant: 'base',
    steps: steps,
    currentStep: '4',
    errorSteps: ['1'],
    warningSteps: ['5'],
    completedSteps: ['2', '3'],
    disabledSteps: []
};

export const withButtons = Template.bind({});
withButtons.args = {
    type: 'base',
    variant: 'base',
    steps: stepsWithButtons,
    currentStep: '4',
    errorSteps: ['1'],
    warningSteps: ['5'],
    completedSteps: ['2', '3'],
    disabledSteps: ['3']
};

export const milestones = Template.bind({});
milestones.args = {
    type: 'base',
    variant: 'base',
    steps: milestonesSteps,
    errorSteps: [],
    warningSteps: [],
    completedSteps: ['1'],
    disabledSteps: []
};
