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
        descriptionPosition: 'inside-nubbin',
        popoverState: 'button-icon-name'
    },
    {
        value: '2',
        label: '2',
        labelPosition: 'bottom',
        assistiveText: '2',
        description: 'This is step #2',
        descriptionPosition: 'inside-nubbin'
    },
    {
        value: '3',
        label: '3',
        labelPosition: 'bottom',
        assistiveText: '3',
        description: 'This is step #3',
        descriptionPosition: 'inside-nubbin'
    },
    {
        value: '4',
        label: '4',
        labelPosition: 'bottom',
        description: 'This is step #4',
        descriptionPosition: 'inside-nubbin'
    },
    {
        value: '5',
        label: '5',
        labelPosition: 'bottom',
        description: 'This is step #5',
        descriptionPosition: 'inside-nubbin'
    }
];

const stepsLWC = [
    {
        value: '1',
        label: 'Merger & Acquisition',
        labelPosition: 'bottom',
        iconName: 'utility:merge',
        iconPosition: 'inside-nubbin',
        popoverState: 'button-icon-name',
        popoverButtonIcon: 'utility:add'
    },
    {
        value: '2',
        label: 'Expansion',
        labelPosition: 'bottom',
        iconName: 'utility:rules',
        iconPosition: 'inside-nubbin',
        popoverState: 'button-icon-name',
        popoverButtonIcon: 'utility:add'
    },
    {
        value: '3',
        label: 'Executive Change',
        labelPosition: 'bottom',
        iconName: 'utility:block_visitor',
        iconPosition: 'inside-nubbin',
        popoverState: 'button-icon-name',
        popoverButtonIcon: 'utility:add'
    },
    {
        value: '4',
        label: 'Market Listing',
        labelPosition: 'bottom',
        iconName: 'utility:priority',
        iconPosition: 'inside-nubbin',
        popoverState: 'button-icon-name',
        popoverButtonIcon: 'utility:add'
    },
    {
        value: '5',
        label: 'Bankruptcy',
        labelPosition: 'bottom',
        iconName: 'utility:error',
        iconPosition: 'inside-nubbin',
        popoverState: 'button-icon-name',
        popoverButtonIcon: 'utility:add'
    },
    {
        value: '6',
        label: 'New Product Launch',
        labelPosition: 'bottom',
        iconName: 'utility:cases',
        iconPosition: 'inside-nubbin',
        popoverState: 'button-icon-name',
        popoverButtonIcon: 'utility:add'
    },
    {
        value: '7',
        label: 'New Partnership',
        labelPosition: 'bottom',
        iconName: 'utility:change_record_type',
        iconPosition: 'inside-nubbin',
        popoverState: 'button-icon-name',
        popoverButtonIcon: 'utility:add'
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

export const MilesStones = Template.bind({});
MilesStones.args = {
    type: 'base',
    variant: 'base',
    steps: stepsLWC,
    errorSteps: [],
    warningSteps: [],
    completedSteps: [],
    disabledSteps: []
};
