import { Segment } from '../__examples__/segment';

export default {
    title: 'Example/Segment',
    argTypes: {
        value: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['shade', 'success', 'warning', 'error']
            },
            defaultValue: 'shade',
            table: {
                defaultValue: { summary: 'shade' }
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
        }
    }
};

const Template = (args) => Segment(args);

export const Base = Template.bind({});
Base.args = {
    value: 2
};
