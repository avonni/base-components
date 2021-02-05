import { Calendar } from '../__examples__/calendar';

export default {
    title: 'Example/Calendar',
    argTypes: {
        disabledDates: {
            control: {
                type: 'object'
            }
        },
        min: {
            control: {
                type: 'date'
            }
        },
        max: {
            control: {
                type: 'date'
            }
        }
    }
};

const Template = (args) => Calendar(args);

export const Base = Template.bind({});
Base.args = {
    value: '05/05/2020',
    multiValue: '05/09/2020',
    disabled: false,
    weekNumber: false,
    disabledDates: [
        new Date(2020, 4, 9),
        new Date(2020, 4, 26),
        13,
        14,
        20,
        21,
        'Wed',
        'Thu'
    ],
    min: new Date('04/15/2020'),
    max: new Date('06/10/2020')
};
