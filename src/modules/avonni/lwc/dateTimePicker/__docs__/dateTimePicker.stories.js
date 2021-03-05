import { DateTimePicker } from '../__examples__/dateTimePicker';

export default {
    title: 'Example/Date Time Picker',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            type: { required: true },
            description: 'Text label for the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        disabledDateTimes: {
            control: {
                type: 'object'
            }
        },
        min: {
            control: {
                type: 'text'
            },
            defaultValue: '01/01/1900',
            description:
                'Specifies the maximum date, which the calendar can show.',
            table: {
                defaultValue: { summary: '01/01/1900' },
                type: { summary: 'string' }
            }
        },
        max: {
            control: {
                type: 'text'
            },
            defaultValue: '12/31/2099',
            description:
                'Specifies the minimum date, which the calendar can show.',
            table: {
                defaultValue: { summary: '12/31/2099' },
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => DateTimePicker(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Avonni date and time picker',
    disabledDateTimes: [
        {
            date: '03/08/2021',
            times: ['08:00', 'Wrong data', '10:30']
        },
        {
            date: '03/10/2021'
        },
        {
            date: '03/09/2021',
            times: ['Wrong data']
        }
    ]
};
