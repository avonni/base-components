import { Chip } from '../__examples__/chip';

export default {
    title: 'Example/Chip',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'brand',
                    'inverse',
                    'alt-inverse',
                    'success',
                    'info',
                    'warning',
                    'error',
                    'offline'
                ]
            },
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        },
        outline: {
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

const Template = (args) => Chip(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Chip'
};
