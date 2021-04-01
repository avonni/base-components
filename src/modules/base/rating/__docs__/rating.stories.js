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
            description:
                "The Lightning Design System name of the icon. Specify the name in the format 'utility:favorite' where 'utility' is the category, and 'favorite' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'large',
            description:
                'Valid values include x-small, small, medium and large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'large' }
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
        variant: {
            control: {
                type: 'select',
                options: [
                    'standard',
                    'label-inline',
                    'label-hidden',
                    'label-stacked'
                ]
            },
            defaultValue: 'standard',
            description:
                'The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.',
            table: {
                defaultValue: { summary: 'standard' },
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

export const StarsMediumLabelInline = Template.bind({});
StarsMediumLabelInline.args = {
    label: 'Star rating',
    iconName: 'utility:favorite',
    iconSize: 'medium',
    value: 3,
    variant: 'label-inline',
    fieldLevelHelp: 'icon-name is set to "utility:favorite"'
};

export const StarsSmall = Template.bind({});
StarsSmall.args = {
    label: 'Star rating',
    iconName: 'utility:favorite',
    iconSize: 'small',
    value: 3,
    fieldLevelHelp: 'icon-name is set to "utility:favorite"'
};

export const StarsX_Small = Template.bind({});
StarsX_Small.args = {
    label: 'Star rating',
    iconName: 'utility:favorite',
    iconSize: 'x-small',
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

export const SingleSelectionLabelHidden = Template.bind({});
SingleSelectionLabelHidden.args = {
    label: 'Single selection rating',
    value: 3,
    variant: 'label-hidden',
    selection: 'single'
};

export const SingleSelectionLabelStacked = Template.bind({});
SingleSelectionLabelStacked.args = {
    label: 'Single selection rating',
    value: 3,
    variant: 'label-stacked',
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
