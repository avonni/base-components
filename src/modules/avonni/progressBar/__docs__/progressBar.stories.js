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
                options: ['x-small', 'small', 'medium', 'large', 'full']
            },
            defaultValue: 'full',
            description:
                'The size of the progress bar. Valid values are x-small, small, medium, large and full. The default value is medium.',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'full' }
            }
        },
        value: {
            control: {
                type: 'number',
                min: 0,
                max: 100
            },
            defaultValue: 0,
            description: 'The percentage value of the progress bar.',
            table: {
                type: { summary: 'Number', detail: 'From 0 to 100' },
                defaultValue: { summary: '0' }
            }
        },
        showValue: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true, display the value.',
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
            description:
                'Valid values include left, right, top-right, top-left, bottom-right, bottom-left and centered',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'top-right' }
            }
        },
        valueLabel: {
            control: {
                type: 'text'
            },
            description:
                'Text display next to the value. <br> Example: 25% Complete',
            table: {
                type: { summary: 'String' }
            }
        },
        badges: {
            control: {
                type: 'object'
            },
            description:
                'Field: <ul><li>label: string</li> <li>value: number</li> <li>variant: string (default, darker, lightest, success, warning, error)</li> <li>borderStyle: string</li>',
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
            description:
                'The variant changes the appearance of the progress bar. Accepted variants include base or circular. This value defaults to base.',
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
            description:
                'Valid values includes base, success, inverse, alt-inverse, warning, info, error and offline.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        textured: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If true display a texture background.',
            table: {
                type: { summary: 'Boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        thickness: {
            control: {
                type: 'select',
                options: ['x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'medium',
            description:
                'Set progress bar thickness. Valid values include x-small, small, medium and large',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'medium' }
            }
        },
        orientation: {
            control: {
                type: 'select',
                options: ['horizontal', 'vertical']
            },
            defaultValue: 'horizontal',
            description:
                'Orientation of the progress bar to be used. Valid values include horizontal and vertical.',
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
        borderStyle: 'dashed'
    }
];

const Template = (args) => ProgressBar(args);

export const Horizontal = Template.bind({});
Horizontal.args = {
    label: 'Label',
    value: 45,
    badges: badges
};

export const Vertical = Template.bind({});
Vertical.args = {
    label: 'Label',
    value: 45,
    orientation: 'vertical',
    badges: [...badges]
};
