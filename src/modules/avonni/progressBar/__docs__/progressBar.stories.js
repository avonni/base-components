import { ProgressBar } from '../__examples__/progressBar';

export default {
    title: 'Example/Progress Bar',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'String' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'medium',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'medium' }
            }
        },
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
        showValue: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                type: { summary: 'Boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        valuePosition: {
            control: {
                type: 'select',
                options: [
                    'left',
                    'right',
                    'top-right',
                    'top-left',
                    'bottom-right',
                    'bottom-left'
                ]
            },
            defaultValue: 'top-right',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'top-right' }
            }
        },
        valueLabel: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'String' }
            }
        },
        badges: {
            control: {
                type: 'object'
            },
            table: {
                type: { summary: 'Object' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['base', 'circular']
            },
            defaultValue: 'base',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'base' }
            }
        },
        theme: {
            control: {
                type: 'select',
                options: [
                    'base',
                    'success',
                    'inverse',
                    'alt-inverse',
                    'warning',
                    'info',
                    'error',
                    'offline'
                ]
            },
            defaultValue: 'base',
            table: {
                type: { summary: 'string' },
                defaultValue: 'base'
            }
        },
        textured: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                type: { summary: 'Boolean' },
                defaultValue: 'false'
            }
        },
        thickness: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'medium',
            table: {
                type: { summary: 'String' },
                defaultValue: 'medium'
            }
        },
        orientation: {
            control: {
                type: 'select',
                options: ['horizontal', 'vertical']
            },
            defaultValue: 'horizontal',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        }
    }
};

const badges = [
    {
        label: 'Avg',
        value: 90,
        variant: 'darker',
        borderType: 'dashed'
    }
];

const Template = (args) => ProgressBar(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Label',
    value: 45,
    badges: badges
};
