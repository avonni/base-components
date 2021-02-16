import { InputToggle } from '../__examples__/inputToggle';

export default {
    title: 'Example/Input Toggle',
    argTypes: {
        accessKey: {
            control: {
                type: 'text'
            }
        }
    }
};

const Template = (args) => InputToggle(args);

export const Base = Template.bind({});
Base.args = {
    accessKey: 'Blabloubli'
};
