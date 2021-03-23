import { Rating } from '../__examples__/rating';

export default {
    title: 'Example/Rating',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        fieldLevelHelp: {
            name: 'field-level-help',
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'number'
            },
            description: 'Specifies the value of the Rating.',
            table: {
                type: { summary: 'string' }
            }
        },
        min: {
            control: {
                type: 'number'
            },
            defaultValue: 1,
            table: {
                defaultValue: { summary: '1' },
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        max: {
            control: {
                type: 'number'
            },
            defaultValue: 5,
            table: {
                defaultValue: { summary: '5' },
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        selection: {
            control: {
                type: 'select',
                options: ['continuous', 'single']
            },
            defaultValue: 'continuous',
            description: 'Allowed values include continuous and single',
            table: {
                defaultValue: { summary: 'continuous' },
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        valueHidden: {
            name: 'value-hidden',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'Hide the value.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    }
};

const Template = (args) => Rating(args);

export const Base = Template.bind({});

export const Stars = Template.bind({});
Stars.args = {
    label: 'Star rating',
    iconName: 'utility:favorite',
    value: 3,
    fieldLevelHelp: 'icon-name is set to "utility:favorite"'
};

export const EmojiValueHidden = Template.bind({});
EmojiValueHidden.args = {
    label: 'Emoji rating with hidden value',
    iconName: 'utility:emoji',
    value: 3,
    fieldLevelHelp: 'icon-name is set to "utility:emoji"',
    valueHidden: true
};

export const SingleSelection = Template.bind({});
SingleSelection.args = {
    label: 'Single selection rating',
    value: 3,
    selection: 'single'
};

export const MinMax = Template.bind({});
MinMax.args = {
    label: 'Min of 3, max of 10',
    value: 3,
    min: 3,
    max: 10
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled input',
    disabled: true,
    value: 3
};
