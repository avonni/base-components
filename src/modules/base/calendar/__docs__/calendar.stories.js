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
    value: '05/03/2021',
    disabled: false,
    weekNumber: false,
    disabledDates: [
        new Date(2021, 4, 9),
        new Date(2021, 4, 26),
        13,
        14,
        20,
        21,
        'Wed',
        'Thu'
    ],
    min: new Date('04/15/2021'),
    max: new Date('06/10/2021')
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: '05/05/2021',
    disabled: true,
    weekNumber: false,
    disabledDates: [],
    min: new Date('04/15/2021'),
    max: new Date('06/10/2021')
};

export const BaseWithWeekNumber = Template.bind({});
BaseWithWeekNumber.args = {
    value: '05/09/2021',
    multiValue: '05/11/2021',
    disabled: false,
    weekNumber: true,
    disabledDates: [
        new Date(2021, 4, 9),
        new Date(2021, 4, 26),
        13,
        14,
        20,
        21,
        'Wed',
        'Thu'
    ],
    min: new Date('04/15/2021'),
    max: new Date('06/10/2021')
};
