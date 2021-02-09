import { InputDateRange } from '../__examples__/inputDateRange';

export default {
    title: 'Example/Input Date Range',
    argTypes: {
        type: {
            control: {
                type: 'select',
                options: ['date', 'datetime']
            },
            defaultValue: 'date',
            table: {
                defaultValue: { summary: 'date' }
            }
        },
        dateStyle: {
            control: {
                type: 'select',
                options: ['short', 'medium', 'long']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        timeStyle: {
            control: {
                type: 'select',
                options: ['short', 'medium', 'long']
            },
            defaultValue: 'short',
            table: {
                defaultValue: { summary: 'short' }
            }
        },
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
        labelStartDate: {
            control: {
                type: 'text'
            }
        },
        labelEndDate: {
            control: {
                type: 'text'
            }
        },
        startDate: {
            control: {
                type: 'text'
            }
        },
        endDate: {
            control: {
                type: 'text'
            }
        },
        timezone: {
            control: {
                type: 'text'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            }
        }
    }
};

const Template = (args) => InputDateRange(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Label',
    fieldLevelHelp: 'Help text',
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    startDate: new Date('7/20/2020 10:00'),
    endDate: new Date('7/21/2020 18:15')
};
