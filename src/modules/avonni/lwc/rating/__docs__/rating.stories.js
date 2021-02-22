import { Rating } from '../__examples__/rating';

export default {
    title: 'Example/Rating',
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
        iconName: {
            control: {
                type: 'text'
            }
        },
        value: {
            control: {
                type: 'number'
            }
        },
        min: {
            control: {
                type: 'number'
            },
            defaultValue: 1,
            table: {
                defaultValue: { summary: '1' }
            }
        },
        max: {
            control: {
                type: 'number'
            },
            defaultValue: 5,
            table: {
                defaultValue: { summary: '5' }
            }
        },
        selection: {
            control: {
                type: 'select',
                options: ['continuous', 'single']
            },
            defaultValue: 'continuous',
            table: {
                defaultValue: { summary: 'continuous' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        valueHidden: {
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

const Template = (args) => Rating(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Label',
    fieldLevelHelp: 'Help text',
    iconName: 'utility:favorite',
    value: 3
};
