import { DateTimePicker } from '../__examples__/dateTimePicker';

export default {
    title: 'Example/Date Time Picker',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        },
        disabledDateTimes: {
            control: {
                type: 'object'
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
            date: '03/05/2021',
            times: ['08:00 AM', '10:30 AM', 'Wrong data']
        },
        {
            date: '03/10/2021'
        }
    ]
};
