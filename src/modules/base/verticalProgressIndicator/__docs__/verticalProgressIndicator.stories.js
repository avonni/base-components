import { VerticalProgressIndicator } from '../__examples__/verticalProgressIndicator';

export default {
    title: 'Example/Vertical Progress Indicator',
    argTypes: {
        completedSteps: {
            name: 'completed-steps',
            control: {
                type: 'object'
            },
            description: 'All completed steps values.',
            table: {
                type: { summary: 'String[]' }
            }
        },
        currentStep: {
            name: 'current-step',
            control: {
                type: 'text'
            },
            description:
                'Sets current-step to match the value attribute of one of progress-step components. If current-step is not provided, the value of the first progress-step component is used.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'shade'],
            description:
                'Changes the appearance of the progress indicator for the base type only. Valid values are base or shaded. The shaded variant adds a light gray border to the step indicators.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        format: {
            control: {
                type: 'select'
            },
            options: ['linear', 'non-linear'],
            description:
                'Sets the progression format of the vertical progress indicator. Valid values include linear and non-linear.',
            table: {
                defaultValue: { summary: 'linear' },
                type: { summary: 'string' }
            }
        },
        hasError: {
            name: 'has-error',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the current step is in error state and an error icon is displayed on the step indicator. Only the base type can display errors.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        contentInLine: {
            name: 'content-in-line',
            control: {
                type: 'boolean'
            },
            description:
                'If present, add the class slds-progress__item_content to all vertical-progress-step items. Example: https://www.lightningdesignsystem.com/components/setup-assistant/#Hub-with-Expandable-Steps',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        markAsComplete: {
            name: 'mark-as-complete',
            control: {
                type: 'boolean'
            },
            description: 'If present, all steps are completed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        contentInLine: false,
        format: 'linear',
        hasError: false,
        markAsComplete: false,
        variant: 'base'
    }
};

const Template = (args) => VerticalProgressIndicator(args);

export const Base = Template.bind({});
Base.args = {
    currentStep: '2'
};

export const shaded = Template.bind({});
shaded.args = {
    currentStep: '2',
    variant: 'shaded'
};

export const hasError = Template.bind({});
hasError.args = {
    currentStep: '2',
    hasError: true
};

export const contentInLine = Template.bind({});
contentInLine.args = {
    currentStep: '2',
    contentInLine: true
};

export const complete = Template.bind({});
complete.args = {
    markAsComplete: true
};

export const nonLinear = Template.bind({});
nonLinear.args = {
    format: 'non-linear',
    completedSteps: ['1', '3'],
    currentStep: '2'
};
