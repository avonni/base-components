import { ProgressCircle } from '../__examples__/progressCircle';

export default {
    title: 'Example/Progress Circle',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        },
        color: {
            control: {
                type: 'color'
            },
            defaultValue: '#1589ee',
            table: {
                defaultValue: { summary: '#1589ee' }
            }
        },
        value: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: '0' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['standard', 'value-hidden']
            },
            defaultValue: 'standard',
            table: {
                defaultValue: { summary: 'standard' }
            }
        },
        direction: {
            control: {
                type: 'select',
                options: ['fill', 'drain']
            },
            defaultValue: 'fill',
            table: {
                defaultValue: { summary: 'fill' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large', 'x-large']
            },
            defaultValue: 'medium',
            table: {
                defaultValue: { summary: 'medium' }
            }
        }
    }
};

const Template = (args) => ProgressCircle(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Label',
    value: 45
};
