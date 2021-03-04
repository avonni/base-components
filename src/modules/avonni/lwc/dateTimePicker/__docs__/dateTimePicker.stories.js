import { DateTimePicker } from '../__examples__/dateTimePicker';

export default {
    title: 'Example/Date Time Picker',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        }
    }
};

const Template = (args) => DateTimePicker(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Avonni date and time picker'
};
