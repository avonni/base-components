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
        value: 1,
        label: '1',
        labelPosition: 'bottom',
        assistiveText: '1',
        description: 'Step #1',
        descriptionPosition: 'top',
        buttonName: 'button',
        buttonLabel: 'Press',
        buttonTitle: 'title',
        buttonVariant: 'success',
        buttonPosition: 'top'
    },
    {
        value: 2,
        label: '2',
        labelPosition: 'bottom',
        assistiveText: '2',
        iconName: 'utility:down',
        iconSize: 'large',
        iconPosition: 'top'
    },
    {
        value: 3,
        label: '3',
        labelPosition: 'bottom',
        assistiveText: '3',
        buttonName: 'button',
        buttonLabel: 'doing',
        buttonTitle: 'title',
        buttonVariant: 'success',
        buttonPosition: 'inside-nubbin',
        buttonDisabled: true,
        popoverState: 'show'
    },
    {
        value: 4,
        label: '4',
        labelPosition: 'inside-nubbin',
        popoverState: 'show',
        buttonName: 'button',
        buttonLabel: 'Completed',
        buttonTitle: 'title',
        buttonVariant: 'brand',
        buttonPosition: 'inside-nubbin'
    },
    {
        value: 5,
        label: '5',
        labelPosition: 'inside-nubbin',
        description: 'step #5',
        descriptionPosition: 'inside-nubbin',
        popoverState: 'show'
    },
    {
        value: 6,
        label: '6',
        labelPosition: 'bottom',
        assistiveText: '6'
    },
    {
        value: 7,
        label: 'Warning for this step',
        assistiveText: '7',
        description: 'step #7',
        descriptionPosition: 'bottom'
    }
];

const Template = (args) => ProgressIndicator(args);

export const Base = Template.bind({});
Base.args = {
    type: 'base',
    variant: 'base',
    currentStep: 3,
    steps: steps,
    errorSteps: [1],
    warningSteps: [7],
    completedSteps: [4, 2, 5],
    disabledSteps: [5]
};
