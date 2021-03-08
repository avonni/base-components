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
        label: '1'
    },
    {
        value: 2,
        label: '2'
    },
    {
        value: 3,
        label: '3'
    },
    {
        value: 4,
        label: '4'
    },
    {
        value: 5,
        label: '5'
    }
];

const Template = (args) => ProgressIndicator(args);

export const Base = Template.bind({});
Base.args = {
    type: 'base',
    variant: 'base',
    currentStep: 2,
    steps: steps
};
