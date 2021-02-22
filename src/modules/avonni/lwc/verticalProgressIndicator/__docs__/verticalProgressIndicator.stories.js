import { VerticalProgressIndicator } from '../__examples__/verticalProgressIndicator';

export default {
    title: 'Example/Vertical Progress Indicator',
    argTypes: {
        currentStep: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['base', 'shade']
            },
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        },
        hasError: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        contentInLine: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => VerticalProgressIndicator(args);

export const Base = Template.bind({});
Base.args = {
    currentStep: '2'
};
