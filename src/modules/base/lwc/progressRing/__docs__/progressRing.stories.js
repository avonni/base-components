import { ProgressRing } from '../__examples__/progressRing';

export default {
    title: 'Example/Progress Ring',
    argTypes: {
        value: {
            control: {
                type: 'number',
                min: 0,
                max: 100
            },
            defaultValue: 0,
            table: {
                type: { summary: 'Number', detail: 'From 0 to 100' },
                defaultValue: { summary: '0' }
            }
        },
        direction: {
            control: {
                type: 'select',
                options: ['fill', 'drain']
            },
            defaultValue: 'fill',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'fill' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['medium', 'large']
            },
            defaultValue: 'medium',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'medium' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'active-step',
                    'warning',
                    'expired',
                    'base-autocomplete'
                ]
            },
            defaultValue: 'base',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'base' }
            }
        },
        hideIcon: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                type: { summary: 'Boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    }
};

const Template = (args) => ProgressRing(args);

export const Base = Template.bind({});
Base.args = {
    value: 25
};
