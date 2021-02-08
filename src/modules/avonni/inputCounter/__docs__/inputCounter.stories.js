import { InputCounter } from '../__examples__/inputCounter';

export default {
    title: 'Example/Input Counter',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        },
        fieldLevelHelp: {
            control: {
                type: 'text'
            }
        },
        max: {
            control: {
                type: 'text'
            }
        },
        min: {
            control: {
                type: 'text'
            }
        },
        step: {
            control: {
                type: 'text'
            },
            defaultValue: 1
        },
        value: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['standard', 'label-inline', 'label-hidden']
            },
            defaultValue: 'standard',
            table: {
                defaultValue: { summary: 'standard' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            }
        },
        required: {
            control: {
                type: 'boolean'
            }
        }
    }
};

const Template = (args) => InputCounter(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label',
    fieldLevelHelp: 'Help text'
};
