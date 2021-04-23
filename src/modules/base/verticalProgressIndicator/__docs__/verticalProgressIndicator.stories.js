import { VerticalProgressIndicator } from '../__examples__/verticalProgressIndicator';

export default {
    title: 'Example/Vertical Progress Indicator',
    argTypes: {
        currentStep: {
            name: 'current-step',
            control: {
                type: 'text'
            },
            description:
                'Set current-step to match the value attribute of one of progress-step components. If current-step is not provided, the value of the first progress-step component is used.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['base', 'shaded']
            },
            options: ['base', 'shade'],
            defaultValue: 'base',
            description:
                'Changes the appearance of the progress indicator for the base type only. Valid values are base or shaded. The shaded variant adds a light gray border to the step indicators. The default is base.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        hasError: {
            name: 'has-error',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
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
            defaultValue: 0,
            description:
                'If true, add the class slds-progress__item_content to all vertical-progress-step items. Example: https://www.lightningdesignsystem.com/components/setup-assistant/#Hub-with-Expandable-Steps',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        hasError: false,
        contentInLine: false
    }
};

const Template = (args) => VerticalProgressIndicator(args);

export const Base = Template.bind({});
Base.args = {
    currentStep: '2'
};

export const Shaded = Template.bind({});
Shaded.args = {
    currentStep: '2',
    variant: 'shaded'
};

export const HasError = Template.bind({});
HasError.args = {
    currentStep: '2',
    hasError: true
};

export const contentInLine = Template.bind({});
contentInLine.args = {
    currentStep: '2',
    contentInLine: true
};
