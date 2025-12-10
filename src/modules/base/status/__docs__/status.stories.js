import { Status } from '../__examples__/status';

export default {
    title: 'Example/Status',
    argTypes: {
        iconPosition: {
            name: 'icon-position',
            control: { type: 'text' },
            description:
                'Position of the icon relative to the label. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: { type: 'text' },
            description:
                'Size of the icon. Valid values include xx-small, x-small, small, medium, or large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        states: {
            name: 'states',
            control: { type: 'object' },
            description:
                'Array of available state objects. The selected state will be displayed as the current status.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        value: {
            name: 'value',
            control: { type: 'text' },
            description: 'Value of the selected state.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        iconPosition: 'left',
        iconSize: 'medium'
    }
};

const STATES = [
    {
        iconName: 'utility:success',
        label: 'Success',
        value: 'success',
        color: 'green'
    },
    {
        iconName: 'utility:warning',
        label: 'Warning',
        value: 'warning',
        color: 'tomato'
    },
    {
        iconName: 'utility:error',
        label: 'Error',
        value: 'error',
        color: 'red'
    },
    {
        iconName: 'utility:info',
        label: 'Info',
        value: 'info',
        color: 'blue'
    }
];

const Template = (args) => Status(args);

export const Base = Template.bind({});
Base.args = {
    states: STATES,
    value: 'success'
};
